# The Collections Framework: Internals & Trade-offs

> **Why it matters:** The Collections Framework is the #1 most-tested topic in
> Java interviews. Interviewers don't just want you to *use* `ArrayList` or
> `HashMap` — they want you to explain *how they work internally* and *when to
> pick one over another*.

---

## 1 · The Collections Hierarchy

```
                     Iterable<T>
                         │
                    Collection<T>
                   ╱      │       ╲
              List<T>   Set<T>   Queue<T>
               │         │         │
          ArrayList   HashSet    PriorityQueue
          LinkedList  TreeSet    ArrayDeque
          Vector      LinkedHS   LinkedList
                                        
          Map<K,V>  (separate hierarchy)
            │
        HashMap
        TreeMap
        LinkedHashMap
        ConcurrentHashMap
```

---

## 2 · ArrayList — Deep Dive

### Internal Structure

`ArrayList` is backed by a **resizable array** (`Object[] elementData`).

```
Index:   [0]  [1]  [2]  [3]  [4]  [5]  [6]  [7]  ...
Data:    "A"  "B"  "C"  "D"   ·    ·    ·    ·
                                ↑
                            size = 4, capacity = 8
```

### Resizing Strategy

When the internal array is full, `ArrayList` creates a new array **1.5× the old
capacity** and copies all elements over (`Arrays.copyOf`). This is an **O(n)**
operation, but it happens infrequently — giving an **amortized O(1)** append.

### Complexity Breakdown

| Operation                   | Complexity | Notes                                         |
| :-------------------------- | :--------- | :--------------------------------------------- |
| `get(index)`                | **O(1)**   | Direct array access                            |
| `add(element)` (append)     | **O(1)**   | Amortized — occasional O(n) resize            |
| `add(0, element)` (prepend) | **O(n)**   | Must shift all elements right                  |
| `remove(index)`             | **O(n)**   | Must shift elements left                       |
| `contains(element)`         | **O(n)**   | Linear search                                  |
| `size()`                    | **O(1)**   | Maintained as a field                           |

### When to Use

✅ **Read-heavy** workloads — random access by index is constant time.  
✅ **Appending** at the end — amortized O(1).  
❌ **Frequent insertions/deletions** at the start or middle — O(n) shifting.

---

## 3 · LinkedList — Deep Dive

### Internal Structure

`LinkedList` is a **doubly linked list** — each node holds a reference to the
previous and next node:

```
null ← [A] ⇄ [B] ⇄ [C] ⇄ [D] → null
        ↑                    ↑
       head                 tail
```

### Complexity Breakdown

| Operation                   | Complexity | Notes                                         |
| :-------------------------- | :--------- | :--------------------------------------------- |
| `get(index)`                | **O(n)**   | Must traverse from head or tail                |
| `addFirst(element)`         | **O(1)**   | Update head pointer                            |
| `addLast(element)`          | **O(1)**   | Update tail pointer                            |
| `removeFirst()`             | **O(1)**   | Update head pointer                            |
| `removeLast()`              | **O(1)**   | Update tail pointer                            |
| `remove(Object)`            | **O(n)**   | Must search first                              |

### When to Use

✅ **Queue/Deque** behavior — O(1) insertions at both ends.  
✅ **Iterator-based removal** — no element shifting needed.  
❌ **Random access** — `get(i)` traverses up to n/2 nodes.

### ⚡ Cache Locality: The Hidden Factor

On modern CPUs, `ArrayList` often outperforms `LinkedList` even for
insertions because array elements sit in **contiguous memory** (cache-friendly),
while linked list nodes are scattered across the heap (cache-unfriendly).

> **Interview tip:** "In practice, `ArrayList` is almost always preferred. The
> only time `LinkedList` wins is when you need a true Deque with O(1) operations
> at both ends and never access by index."

---

## 4 · HashMap — Deep Dive

### Internal Structure (Java 8+)

`HashMap` uses an **array of buckets** (`Node<K,V>[] table`). Each bucket starts
as a linked list and converts to a **Red-Black Tree** when the bucket length
exceeds **8** (treeify threshold).

```
Buckets (array):
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ 0  │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │
└─┬──┴────┴─┬──┴────┴────┴─┬──┴────┴────┘
  │         │              │
  ▼         ▼              ▼
[K:V]    [K:V]          [K:V]
  │      (single)          │
  ▼                        ▼
[K:V]                   [K:V]  ← collision chain
  │                        │
  ▼                        ▼
[K:V]                  (if len > 8 → Red-Black Tree)
```

### The `hashCode()` / `equals()` Contract

This is one of the **most critical** concepts in Java interviews:

1. **If `a.equals(b)` is `true`** → `a.hashCode() == b.hashCode()` **must** be true.
2. **If `a.hashCode() == b.hashCode()`** → `a.equals(b)` is **not** necessarily true (hash collision).
3. **If `a.equals(b)` is `false`** → hash codes **may** still be equal.

```java
// ❌ BROKEN — violates the contract
class Person {
    String name;
    
    @Override
    public boolean equals(Object o) {
        return this.name.equals(((Person) o).name);
    }
    // Missing hashCode()! HashMap lookups will FAIL.
}

// ✅ CORRECT — consistent contract
class Person {
    String name;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person p)) return false;
        return Objects.equals(name, p.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
```

### Complexity

| Operation      | Average    | Worst (pre-Java 8) | Worst (Java 8+)  |
| :------------- | :--------- | :------------------ | :---------------- |
| `put(key, val)` | **O(1)** | O(n)                | **O(log n)**      |
| `get(key)`     | **O(1)**   | O(n)                | **O(log n)**      |
| `containsKey`  | **O(1)**   | O(n)                | **O(log n)**      |

### Load Factor & Rehashing

- **Default capacity:** 16 buckets.
- **Load factor:** 0.75 — when 75% of buckets are occupied, the table **doubles**
  in size and all entries are rehashed.
- **Rehashing is O(n)** but infrequent (amortized cost).

---

## 5 · TreeMap & Other Implementations

| Implementation      | Ordering          | Null Keys? | Thread-Safe? | Notes                        |
| :------------------ | :---------------- | :--------- | :----------- | :--------------------------- |
| `HashMap`           | None              | 1 allowed  | ❌           | Best general-purpose map     |
| `LinkedHashMap`     | Insertion order   | 1 allowed  | ❌           | Good for LRU caches          |
| `TreeMap`           | Natural/Comparator | ❌        | ❌           | O(log n) — Red-Black tree   |
| `ConcurrentHashMap` | None              | ❌         | ✅           | Lock striping, no full lock  |
| `Hashtable`         | None              | ❌         | ✅ (legacy)  | Deprecated — use CHM instead |

---

## 6 · Common Interview Questions

| Question | Key Answer Points |
| :------- | :---------------- |
| ArrayList vs LinkedList? | ArrayList: O(1) access, O(n) insert. LinkedList: O(n) access, O(1) ends. ArrayList wins on cache locality. |
| How does HashMap work? | Array of buckets → linked list → Red-Black tree (Java 8+). Uses `hashCode()` for bucket, `equals()` for match. |
| What happens if you override `equals()` but not `hashCode()`? | HashMap/HashSet **break** — equal objects land in different buckets. |
| HashMap vs TreeMap? | HashMap O(1) avg, no order. TreeMap O(log n), sorted keys. |
| How to make a collection thread-safe? | `Collections.synchronizedList()`, `CopyOnWriteArrayList`, or `ConcurrentHashMap`. |
| What is the load factor? | Threshold (default 0.75) that triggers rehashing. Lower = more memory, fewer collisions. Higher = less memory, more collisions. |
