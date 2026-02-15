# Concurrency Pitfalls & Best Practices

> **Why it matters:** Concurrency bugs are the hardest to find and the most
> dangerous in production. They're non-deterministic — they might pass 99 tests
> and fail on the 100th. Interviewers specifically test for awareness of these
> pitfalls because they separate developers who *write* concurrent code from
> those who write *correct* concurrent code.

---

## 1 · Pitfall: The Non-Atomic Increment

### The Bug

`count++` looks atomic but it's actually **three operations**:

```
Thread A                    Thread B
────────                    ────────
1. READ count (= 0)
                            1. READ count (= 0)
2. INCREMENT (0 + 1 = 1)
                            2. INCREMENT (0 + 1 = 1)
3. WRITE count (= 1)
                            3. WRITE count (= 1)  ← Lost update!

Expected: count = 2
Actual:   count = 1  ❌
```

### The Code That Fails

```java
// ❌ RACE CONDITION — count++ is NOT atomic
public class BrokenCounter {
    private int count = 0;

    public void increment() {
        count++;   // Read → Modify → Write (3 separate operations)
    }

    public int getCount() {
        return count;
    }
}
```

### The Fix: Three Approaches

```java
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Approach 1: synchronized (works, but slow)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
public class SyncCounter {
    private int count = 0;

    public synchronized void increment() {
        count++;    // Only one thread at a time
    }

    public synchronized int getCount() {
        return count;
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Approach 2: AtomicInteger (fast & correct ✅)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
public class AtomicCounter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();   // Hardware-level CAS
    }

    public int getCount() {
        return count.get();
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Approach 3: LongAdder (fastest under HIGH contention)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
public class AdderCounter {
    private final LongAdder count = new LongAdder();

    public void increment() {
        count.increment();   // Distributes across cells
    }

    public long getCount() {
        return count.sum();
    }
}
```

### Performance Comparison

| Approach | Thread Safety | Blocking? | Under Contention |
| :------- | :------------ | :-------- | :--------------- |
| `count++` | ❌ | No | Fastest (but wrong!) |
| `synchronized` | ✅ | Yes | **Slowest** — threads queue up |
| `AtomicInteger` | ✅ | No (CAS) | **Fast** — spins on retry |
| `LongAdder` | ✅ | No | **Fastest** — distributes writes |

> **Interview tip:** Mention `LongAdder` for extra points. It's designed for
> high-write-contention scenarios (like metrics counters) and outperforms
> `AtomicInteger` when many threads increment simultaneously.

---

## 2 · Pitfall: `volatile` ≠ Atomic

### The Misconception

```java
// ❌ STILL A RACE CONDITION — volatile doesn't help here
private volatile int count = 0;

public void increment() {
    count++;   // volatile ensures visibility, but count++ is STILL 3 operations
}
```

### What `volatile` Actually Does

| `volatile` Guarantees | `volatile` Does NOT Guarantee |
| :----- | :----- |
| **Visibility** — changes are immediately visible to all threads | **Atomicity** — compound operations (read-modify-write) are still unsafe |
| **Ordering** — prevents instruction reordering around the variable | **Mutual exclusion** — multiple threads can still interleave |

### When `volatile` IS Correct

```java
// ✅ CORRECT — volatile is perfect for a simple boolean flag
private volatile boolean running = true;

// Writer thread
public void stop() {
    running = false;    // Single write — atomic for primitives
}

// Reader thread
public void run() {
    while (running) {   // Guaranteed to see the updated value
        doWork();
    }
}
```

**Rule of thumb:** Use `volatile` only for **single reads or writes** of
primitive values (flags, status indicators). For anything else, use
`AtomicInteger`, `synchronized`, or `ReentrantLock`.

---

## 3 · Pitfall: Deadlocks

### Classic Deadlock Scenario

```java
Object lockA = new Object();
Object lockB = new Object();

// Thread 1                    Thread 2
// ─────────                   ─────────
// synchronized(lockA) {       synchronized(lockB) {
//   synchronized(lockB) {       synchronized(lockA) {
//     // work                      // work
//   }                           }
// }                           }
//
// Thread 1 holds A, waits for B.
// Thread 2 holds B, waits for A.
// → DEADLOCK! Both threads wait forever.
```

### Prevention Strategies

| Strategy | How It Works |
| :------- | :----------- |
| **Lock ordering** | Always acquire locks in the same global order (e.g., always A before B). |
| **Timeout** | Use `ReentrantLock.tryLock(timeout)` — gives up instead of waiting forever. |
| **Single lock** | If possible, use one lock for both resources. |
| **Lock-free algorithms** | Use `Atomic` classes, `ConcurrentHashMap.compute()`, etc. |

```java
// ✅ Using tryLock with timeout to prevent deadlock
ReentrantLock lockA = new ReentrantLock();
ReentrantLock lockB = new ReentrantLock();

public void safeMethod() throws InterruptedException {
    boolean gotA = lockA.tryLock(1, TimeUnit.SECONDS);
    if (gotA) {
        try {
            boolean gotB = lockB.tryLock(1, TimeUnit.SECONDS);
            if (gotB) {
                try {
                    // Critical section — both locks acquired
                } finally {
                    lockB.unlock();
                }
            }
        } finally {
            lockA.unlock();
        }
    }
    // If we couldn't get both locks, retry or handle gracefully
}
```

---

## 4 · Pitfall: Thread-Unsafe Collections

### The Problem

Standard collections (`HashMap`, `ArrayList`) are **not thread-safe**:

```java
// ❌ RACE CONDITION — HashMap corrupted under concurrent writes
Map<String, Integer> map = new HashMap<>();

// Multiple threads calling this simultaneously → infinite loops, lost data
map.put("key", map.getOrDefault("key", 0) + 1);
```

### The Solutions

| Scenario | Solution | Performance |
| :------- | :------- | :---------- |
| Thread-safe map | `ConcurrentHashMap` | ✅ High — lock striping |
| Thread-safe list (read-heavy) | `CopyOnWriteArrayList` | ✅ Reads fast, writes slow |
| Thread-safe list (general) | `Collections.synchronizedList()` | ⚠️ OK — full lock |
| Thread-safe queue | `ConcurrentLinkedQueue` | ✅ Lock-free |
| Thread-safe deque | `ConcurrentLinkedDeque` | ✅ Lock-free |

```java
// ✅ ConcurrentHashMap — thread-safe compound operations
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// Atomic read-modify-write
map.compute("key", (k, v) -> v == null ? 1 : v + 1);

// Atomic putIfAbsent
map.putIfAbsent("key", 0);
```

---

## 5 · Pitfall: Forgetting `ExecutorService.shutdown()`

### The Problem

If you don't shut down an `ExecutorService`, its threads keep running and the
**JVM will never exit**:

```java
// ❌ JVM hangs forever — executor threads are still alive
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> doWork());
// main() ends, but JVM doesn't exit!
```

### The Fix

```java
// ✅ Always shut down executors
ExecutorService pool = Executors.newFixedThreadPool(4);
try {
    pool.submit(() -> doWork());
} finally {
    pool.shutdown();                            // Stop accepting new tasks
    pool.awaitTermination(10, TimeUnit.SECONDS); // Wait for running tasks
}

// ✅ Even better — try-with-resources (Java 19+)
try (var pool = Executors.newVirtualThreadPerTaskExecutor()) {
    pool.submit(() -> doWork());
}   // Auto-shutdown!
```

---

## 6 · Pitfall: Over-Synchronizing

### The Problem

Locking too broadly kills parallelism:

```java
// ❌ Entire method is locked — only ONE thread can run at a time
public synchronized Map<String, Object> processData(List<Item> items) {
    Map<String, Object> result = new HashMap<>();
    for (Item item : items) {
        result.put(item.getKey(), expensiveComputation(item));  // Slow!
    }
    return result;
}
```

### The Fix: Minimize Lock Scope

```java
// ✅ Only lock the shared resource, not the computation
private final ConcurrentHashMap<String, Object> cache = new ConcurrentHashMap<>();

public void processData(List<Item> items) {
    for (Item item : items) {
        Object result = expensiveComputation(item);   // Outside any lock
        cache.put(item.getKey(), result);              // ConcurrentHashMap is thread-safe
    }
}
```

---

## 7 · Summary Cheat Sheet

| Pitfall | Root Cause | Fix |
| :------ | :--------- | :-- |
| `count++` race condition | Compound operation (Read-Modify-Write) | `AtomicInteger` or `synchronized` |
| `volatile count++` still broken | `volatile` ≠ atomic | `AtomicInteger` |
| Deadlock | Circular lock dependency | Lock ordering, `tryLock()` with timeout |
| `HashMap` in multi-threaded code | Not thread-safe | `ConcurrentHashMap` |
| JVM won't exit | `ExecutorService` not shut down | `.shutdown()` or try-with-resources |
| Slow concurrent code | Over-synchronizing | Minimize lock scope, use concurrent collections |
| Thread-local memory leaks | `ThreadLocal` not cleaned up | Call `.remove()` in `finally` |
