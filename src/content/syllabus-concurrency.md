# Concurrency & Multithreading

> **Why it matters:** Modern Java applications are inherently multi-threaded —
> web servers, microservices, and data pipelines all depend on concurrency.
> Interviewers test whether you can write **thread-safe** code and reason about
> race conditions, visibility, and deadlocks.

---

## 1 · Thread Lifecycle

A Java thread passes through these states:

```
  NEW ──▶ RUNNABLE ──▶ RUNNING ──▶ TERMINATED
               │  ▲         │
               ▼  │         ▼
           BLOCKED    WAITING / TIMED_WAITING
```

| State              | Description                                           |
| :----------------- | :---------------------------------------------------- |
| `NEW`              | Thread object created, not yet started.               |
| `RUNNABLE`         | Ready to run, waiting for CPU time.                   |
| `RUNNING`          | Actively executing on a CPU core.                     |
| `BLOCKED`          | Waiting to acquire a monitor lock (`synchronized`).   |
| `WAITING`          | Waiting indefinitely (`wait()`, `join()`).            |
| `TIMED_WAITING`    | Waiting with a timeout (`sleep()`, `wait(timeout)`).  |
| `TERMINATED`       | Execution complete or exception thrown.                |

---

## 2 · Creating Threads

### Option A: Implement `Runnable` (Preferred ✅)

```java
Runnable task = () -> {
    System.out.println("Running on: " + Thread.currentThread().getName());
};

Thread thread = new Thread(task);
thread.start();  // Don't call run() — that executes on the SAME thread
```

### Option B: Implement `Callable<T>` (Returns a Result)

```java
Callable<Integer> task = () -> {
    return 42;
};

ExecutorService executor = Executors.newSingleThreadExecutor();
Future<Integer> future = executor.submit(task);
int result = future.get();  // Blocks until result is available
executor.shutdown();
```

### Option C: Extend `Thread` (Discouraged ❌)

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Running...");
    }
}
// Why discouraged? Java doesn't support multiple inheritance.
// Implementing Runnable is more flexible.
```

> **Interview tip:** Always mention `Runnable` first — it's more flexible and
> follows composition over inheritance.

---

## 3 · Synchronization

### 3.1 The `synchronized` Keyword

Prevents multiple threads from executing a critical section simultaneously.

```java
// Method-level synchronization
public synchronized void increment() {
    count++;  // Only one thread at a time
}

// Block-level synchronization (finer control)
public void increment() {
    synchronized (this) {
        count++;
    }
}
```

### 3.2 The `volatile` Keyword

Ensures that a variable's value is always read from **main memory**, not from
a thread's local CPU cache. However, `volatile` does **not** make compound
operations atomic.

```java
private volatile boolean running = true;

// Thread 1
public void stop() {
    running = false;  // Write to main memory immediately
}

// Thread 2
public void run() {
    while (running) {  // Reads from main memory, not cache
        // do work
    }
}
```

| Feature        | `synchronized`             | `volatile`                   |
| :------------- | :------------------------- | :--------------------------- |
| Atomicity      | ✅ Yes                     | ❌ No (only single read/write) |
| Visibility     | ✅ Yes                     | ✅ Yes                       |
| Blocking       | ✅ Yes (acquires lock)     | ❌ No                        |
| Use case       | Compound operations        | Simple flags, status variables |

---

## 4 · High-Level Concurrency Utilities

### 4.1 `ExecutorService` — Thread Pooling

Manual thread management (`new Thread()`) is error-prone and wasteful.
`ExecutorService` manages a **pool of reusable threads**:

```java
// Fixed pool — exactly 4 threads
ExecutorService pool = Executors.newFixedThreadPool(4);

for (int i = 0; i < 100; i++) {
    pool.submit(() -> {
        // Task runs on one of the 4 pooled threads
        processItem();
    });
}

pool.shutdown();          // Graceful shutdown — finish pending tasks
pool.awaitTermination(10, TimeUnit.SECONDS);
```

| Factory Method                           | Description                            |
| :--------------------------------------- | :------------------------------------- |
| `newFixedThreadPool(n)`                  | Fixed number of threads                |
| `newCachedThreadPool()`                  | Dynamically grows/shrinks              |
| `newSingleThreadExecutor()`              | Single thread, tasks execute in order  |
| `newScheduledThreadPool(n)`              | For delayed/periodic tasks             |
| `newVirtualThreadPerTaskExecutor()` 🆕   | Java 21 — one virtual thread per task  |

### 4.2 `ConcurrentHashMap` — Lock Striping

Unlike `Collections.synchronizedMap()` (which locks the **entire map**),
`ConcurrentHashMap` uses **lock striping** — only the affected bucket is locked,
allowing high-throughput concurrent reads and writes.

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// Thread-safe compound operation
map.compute("key", (k, v) -> v == null ? 1 : v + 1);
```

### 4.3 `AtomicInteger` — Lock-Free Counters

Uses hardware-level **CAS (Compare-And-Swap)** instructions. Non-blocking
and orders of magnitude faster than `synchronized` under contention.

```java
AtomicInteger counter = new AtomicInteger(0);

// Thread-safe increment — no locks
counter.incrementAndGet();    // atomic
counter.compareAndSet(5, 10); // only sets to 10 if current value is 5
```

---

## 5 · Deadlocks

A **deadlock** occurs when two or more threads are each waiting for a lock held
by the other:

```java
// ❌ DEADLOCK RISK — threads lock resources in DIFFERENT order
// Thread 1: lock A → lock B
// Thread 2: lock B → lock A

// ✅ FIX — always lock in the SAME order
// Thread 1: lock A → lock B
// Thread 2: lock A → lock B
```

### Prevention Strategies

1. **Lock ordering** — always acquire locks in a consistent, global order.
2. **Timeouts** — use `tryLock(timeout)` from `ReentrantLock`.
3. **Avoid nested locks** — minimize the number of locks held simultaneously.

---

## 6 · Common Interview Questions

| Question | Key Answer Points |
| :------- | :---------------- |
| `Runnable` vs `Callable`? | `Runnable.run()` returns `void`; `Callable.call()` returns a value and can throw checked exceptions. |
| `synchronized` vs `volatile`? | `synchronized` = atomicity + visibility + blocking. `volatile` = visibility only, non-blocking. |
| What is a race condition? | Two threads read-modify-write a shared variable without synchronization, causing lost updates. |
| What is a deadlock? | Two threads each hold a lock the other needs — both wait forever. |
| `start()` vs `run()`? | `start()` creates a new thread; `run()` executes on the current thread (no concurrency). |
| Why use `ExecutorService`? | Reuses threads (pooling), manages lifecycle, avoids overhead of creating/destroying threads. |
