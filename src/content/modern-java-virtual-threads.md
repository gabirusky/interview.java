# Virtual Threads (Java 21)

> **Why it matters:** Virtual Threads are the biggest concurrency feature since
> `java.util.concurrent` was introduced in Java 5. They fundamentally change how
> Java handles I/O-bound workloads, and interviewers are starting to ask about
> them at all levels.

---

## 1 · The Problem Virtual Threads Solve

### Traditional (Platform) Threads

Each Java thread maps 1:1 to an **OS thread**. OS threads are expensive:

| Resource | Cost per Thread |
| :------- | :-------------- |
| Stack memory | ~1 MB |
| OS scheduling overhead | Significant |
| Max practical count | ~2,000–5,000 |

For a web server handling 10,000 concurrent requests, you need 10,000 threads.
That's **10 GB of stack memory** — not feasible.

### The Old Workaround: Reactive / Async

Frameworks like Reactor, RxJava, and CompletableFuture chains allow high
concurrency with few threads — but the code becomes **extremely complex**:

```java
// ❌ Reactive spaghetti
return userService.findById(id)
    .flatMap(user -> orderService.getOrders(user.getId()))
    .flatMap(orders -> paymentService.processAll(orders))
    .onErrorResume(e -> Mono.empty())
    .subscribeOn(Schedulers.boundedElastic());
```

### The Virtual Thread Solution

Virtual threads are **managed by the JVM**, not the OS. They're so lightweight
that you can create **millions** of them:

| Aspect | Platform Thread | Virtual Thread |
| :----- | :-------------- | :------------- |
| Managed by | OS kernel | JVM scheduler |
| Stack size | ~1 MB (fixed) | Starts at ~1 KB (grows as needed) |
| Creation cost | Expensive | Near-zero |
| Max count | ~2,000–5,000 | **Millions** |
| Blocking I/O | Wastes an entire OS thread | Automatically unmounts from carrier thread |

---

## 2 · How Virtual Threads Work

```
┌─────────────────────────────────────────────────────┐
│                     JVM                              │
│                                                      │
│   Virtual Threads:  VT₁  VT₂  VT₃  ...  VT₁₀₀₀₀₀  │
│                      │    │    │                     │
│                      ▼    ▼    ▼                     │
│   ┌──────────────────────────────────┐               │
│   │     JVM Scheduler (ForkJoinPool) │               │
│   │     Maps VTs → Carrier Threads   │               │
│   └──────┬───────────┬───────────┬───┘               │
│          ▼           ▼           ▼                    │
│   Carrier Threads: CT₁        CT₂        CT₃        │
│   (Platform threads, one per CPU core)               │
└─────────────────────────────────────────────────────┘
```

When a virtual thread **blocks** (e.g., waiting for I/O), the JVM
**unmounts** it from its carrier thread. The carrier is then free to run
another virtual thread. When the I/O completes, the virtual thread is
**remounted** on any available carrier.

---

## 3 · Creating Virtual Threads

### Method 1: `Thread.startVirtualThread()`

```java
Thread vt = Thread.startVirtualThread(() -> {
    System.out.println("Hello from virtual thread: "
        + Thread.currentThread());
});
vt.join();  // Wait for completion
```

### Method 2: `Thread.ofVirtual()` Builder

```java
Thread vt = Thread.ofVirtual()
    .name("my-vthread")
    .start(() -> {
        // Task runs on a virtual thread
        fetchDataFromAPI();
    });
```

### Method 3: Virtual Thread Executor (Recommended ✅)

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    // Each submitted task gets its OWN virtual thread
    for (int i = 0; i < 100_000; i++) {
        executor.submit(() -> {
            // This would be impossible with platform threads
            // (100K OS threads = ~100 GB of stack memory)
            String result = callExternalService();
            processResult(result);
        });
    }
}  // Auto-shutdown when try-with-resources exits
```

---

## 4 · Virtual Threads vs. Platform Threads

```java
// Benchmark: create 100,000 threads, each sleeping 1 second

// Platform threads — takes ~100 seconds (limited by thread pool)
try (var executor = Executors.newFixedThreadPool(100)) {
    for (int i = 0; i < 100_000; i++) {
        executor.submit(() -> Thread.sleep(Duration.ofSeconds(1)));
    }
}

// Virtual threads — takes ~1 second! All 100K run concurrently.
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 100_000; i++) {
        executor.submit(() -> Thread.sleep(Duration.ofSeconds(1)));
    }
}
```

---

## 5 · When NOT to Use Virtual Threads

| Scenario | Why Not |
| :------- | :------ |
| **CPU-bound** computation | Virtual threads don't add CPU cores. Use `ForkJoinPool` for parallelism. |
| **`synchronized` blocks** with I/O inside | The carrier thread gets **pinned** — can't unmount. Use `ReentrantLock` instead. |
| **Thread-local** heavy usage | Each VT has its own `ThreadLocal` copy → memory explosion with millions of VTs. |

---

## 6 · Common Interview Questions

| Question | Key Answer Points |
| :------- | :---------------- |
| What are virtual threads? | JVM-managed, lightweight threads. Part of Project Loom, finalized in Java 21. |
| Platform vs. Virtual threads? | Platform = OS thread, ~1 MB stack, expensive. Virtual = JVM scheduled, ~1 KB, near-free. |
| When to use virtual threads? | I/O-bound workloads (web servers, DB calls, API calls). NOT CPU-bound computation. |
| What is thread pinning? | When a virtual thread can't unmount from its carrier — happens with `synchronized` + blocking I/O. |
| Do virtual threads replace reactive programming? | For many use cases, yes. They allow simple blocking code to scale like reactive, without the complexity. |
