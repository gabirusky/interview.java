# Core Language Mechanics & Memory Models

> **Why it matters:** Every Java interview starts here. Before algorithms or
> frameworks, interviewers validate that you *think* in Java — that you
> understand how the JVM allocates memory, why `String` behaves the way it does,
> and when a subtle autoboxing bug can tank production performance.

---

## 1 · Primitive vs. Reference Types

Java has **8 primitive types** — they live on the stack, hold their value
directly, and have no object overhead:

| Type      | Size    | Default | Wrapper     |
| :-------- | :------ | :------ | :---------- |
| `byte`    | 1 byte  | `0`     | `Byte`      |
| `short`   | 2 bytes | `0`     | `Short`     |
| `int`     | 4 bytes | `0`     | `Integer`   |
| `long`    | 8 bytes | `0L`    | `Long`      |
| `float`   | 4 bytes | `0.0f`  | `Float`     |
| `double`  | 8 bytes | `0.0d`  | `Double`    |
| `char`    | 2 bytes | `'\u0000'` | `Character` |
| `boolean` | ~1 bit  | `false` | `Boolean`   |

**Reference types** (objects, arrays, enums) store a *pointer* on the stack that
refers to data on the **heap**.

### Autoboxing & Unboxing

The compiler silently converts between primitives and wrappers:

```java
// Autoboxing — int → Integer
Integer wrapped = 42;

// Unboxing — Integer → int
int raw = wrapped;
```

#### ⚠️ Performance Trap

Inside tight loops, autoboxing creates **thousands of temporary objects**,
increasing Garbage Collection (GC) pressure:

```java
// ❌ BAD — creates ~1 million Integer objects
Long sum = 0L;
for (long i = 0; i < 1_000_000; i++) {
    sum += i;   // unbox → add → re-box on every iteration
}

// ✅ GOOD — zero object allocations
long sum = 0L;
for (long i = 0; i < 1_000_000; i++) {
    sum += i;
}
```

#### ⚠️ The Integer Cache Gotcha

Java caches `Integer` values from **-128 to 127**. Outside that range,
`==` compares *references*, not values:

```java
Integer a = 127;
Integer b = 127;
System.out.println(a == b);   // true  (cached)

Integer x = 128;
Integer y = 128;
System.out.println(x == y);   // false (different objects!)
System.out.println(x.equals(y)); // true  ✅ always use .equals()
```

---

## 2 · String Immutability

Strings in Java are **immutable** — every "modification" creates a brand-new
`String` object. This is a deliberate design choice for thread safety, security,
and hash-code caching.

### Why It Matters: The O(n²) Concatenation Trap

```java
// ❌ BAD — O(n²) time, creates n intermediate String objects
String result = "";
for (int i = 0; i < 10_000; i++) {
    result += i;   // new String allocated every iteration
}

// ✅ GOOD — O(n) time, single mutable buffer
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10_000; i++) {
    sb.append(i);
}
String result = sb.toString();
```

| Class           | Mutable? | Thread-Safe? | Use When                         |
| :-------------- | :------- | :----------- | :------------------------------- |
| `String`        | ❌       | ✅ (immutable) | Small, fixed text                |
| `StringBuilder` | ✅       | ❌           | Single-threaded concatenation    |
| `StringBuffer`  | ✅       | ✅           | Multi-threaded concatenation     |

### The String Pool

Java maintains an internal **String Pool** (in the heap's Metaspace). String
literals are automatically interned:

```java
String a = "hello";       // goes into the pool
String b = "hello";       // reuses the SAME reference
String c = new String("hello"); // forces a NEW object on the heap

System.out.println(a == b);   // true  (same pool reference)
System.out.println(a == c);   // false (different objects)
System.out.println(a.equals(c)); // true  ✅
```

> **Interview Rule:** Always use `.equals()` for content comparison.
> Reserve `==` for reference identity checks (e.g., `null` checks or singletons).

---

## 3 · The Java Memory Model: Stack vs. Heap

Understanding memory layout is essential for debugging `StackOverflowError`,
`OutOfMemoryError`, and reasoning about object lifecycles.

```
┌──────────────────────────────────────────────────┐
│                    JVM MEMORY                     │
│                                                   │
│  ┌─────────────┐          ┌────────────────────┐ │
│  │   STACK      │          │       HEAP          │ │
│  │  (per thread)│          │   (shared across    │ │
│  │              │          │    all threads)      │ │
│  │  • primitives│  ref ──▶ │  • Objects          │ │
│  │  • references│          │  • Arrays           │ │
│  │  • method    │          │  • String Pool      │ │
│  │    frames    │          │  • Class metadata    │ │
│  │              │          │                      │ │
│  │  LIFO order  │          │  Managed by GC       │ │
│  │  Auto-freed  │          │                      │ │
│  └─────────────┘          └────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Stack Memory

- **One stack per thread** — stores local primitives, object references, and
  method call frames.
- **Automatically managed** via LIFO — when a method returns, its frame is
  popped.
- **Fast** but **limited** in size (typically 512 KB – 1 MB per thread).
- **Overflow:** Deep or infinite recursion causes `StackOverflowError`.

### Heap Memory

- **Shared** across all threads — stores all objects and arrays.
- **Managed by the Garbage Collector** — objects without references are
  eventually collected.
- **Overflow:** Creating too many objects or holding references too long causes
  `OutOfMemoryError: Java heap space`.

### Quick Comparison

| Aspect         | Stack                        | Heap                        |
| :------------- | :--------------------------- | :-------------------------- |
| **Scope**      | Per thread                   | Global (shared)             |
| **Stores**     | Primitives, references       | Objects, arrays             |
| **Speed**      | Very fast (LIFO)             | Slower (GC overhead)        |
| **Size**       | Small (512 KB – 1 MB)        | Large (configurable via `-Xmx`) |
| **Error**      | `StackOverflowError`         | `OutOfMemoryError`          |
| **Management** | Automatic (method exit)      | Garbage Collector           |

---

## 4 · Garbage Collection Essentials

While you won't implement a GC in an interview, you **must** understand the
basics:

- **Eligibility:** An object becomes eligible for GC when no *reachable*
  reference points to it.
- **`System.gc()`** is a *suggestion*, not a command — the JVM may ignore it.
- **Generational GC:** Objects are allocated in **Young Generation** (Eden →
  Survivor spaces). Long-lived objects are promoted to **Old Generation**.
- **GC Roots:** Static fields, local variables on the stack, and active threads
  serve as GC roots.

```java
// Object becomes eligible for GC after this line
Object temp = new Object();
temp = null;   // no more references → eligible for GC
```

---

## 5 · Common Interview Questions

| Question | Key Answer Points |
| :------- | :---------------- |
| Why is `String` immutable? | Thread safety, security (class loading, network params), hash-code caching for `HashMap` keys. |
| `==` vs `.equals()` for Strings? | `==` compares references; `.equals()` compares content. Always use `.equals()`. |
| What is autoboxing? | Automatic conversion between primitives and wrappers by the compiler. |
| Stack vs. Heap? | Stack = per-thread, primitives + refs, LIFO. Heap = shared, objects, GC-managed. |
| When does `StackOverflowError` occur? | Excessive recursion depth exhausts the thread's stack space. |
| `StringBuilder` vs `StringBuffer`? | Both mutable; `StringBuffer` is synchronized (thread-safe), `StringBuilder` is not (faster). |
