# Collections Framework — Quick Reference

> Use this table as a cheat-sheet when choosing which collection to use.
> The right choice depends on **access pattern**, **ordering needs**, and
> **thread-safety requirements**.

---

## At a Glance

| Interface | Implementation | Internal Structure | Access | Search | Insert | Remove |
| :-------- | :------------- | :----------------- | :----- | :----- | :----- | :----- |
| **List** | `ArrayList` | Dynamic Array | O(1) | O(n) | O(n)¹ | O(n) |
| **List** | `LinkedList` | Doubly Linked List | O(n) | O(n) | O(1)² | O(1)² |
| **Map** | `HashMap` | Buckets + LL/Tree | O(1) | O(1)³ | O(1)³ | O(1)³ |
| **Map** | `TreeMap` | Red-Black Tree | O(log n) | O(log n) | O(log n) | O(log n) |
| **Map** | `LinkedHashMap` | HashMap + DLL | O(1) | O(1)³ | O(1)³ | O(1)³ |
| **Set** | `HashSet` | HashMap (internal) | — | O(1)³ | O(1)³ | O(1)³ |
| **Set** | `TreeSet` | TreeMap (internal) | — | O(log n) | O(log n) | O(log n) |
| **Set** | `LinkedHashSet` | LinkedHashMap | — | O(1)³ | O(1)³ | O(1)³ |
| **Queue** | `PriorityQueue` | Binary Heap | O(1)⁴ | O(n) | O(log n) | O(log n) |
| **Deque** | `ArrayDeque` | Circular Array | O(1)⁵ | O(n) | O(1)⁵ | O(1)⁵ |

> ¹ O(1) amortized for append at end; O(n) for insert at arbitrary position  
> ² O(1) at head/tail when node reference is known  
> ³ Average case — worst case O(n), or O(log n) with Java 8+ treeification  
> ⁴ Peek only — accessing the min/max element  
> ⁵ At both ends (head and tail)

---

## Decision Flowchart

```
Need key-value pairs?
  ├── YES → Need sorted keys?
  │           ├── YES → TreeMap
  │           └── NO  → Need insertion order?
  │                       ├── YES → LinkedHashMap
  │                       └── NO  → HashMap
  │
  └── NO → Need unique elements only?
            ├── YES → Need sorted?
            │           ├── YES → TreeSet
            │           └── NO  → Need insertion order?
            │                       ├── YES → LinkedHashSet
            │                       └── NO  → HashSet
            │
            └── NO → Need FIFO / LIFO / priority?
                      ├── FIFO → ArrayDeque (as Queue)
                      ├── LIFO → ArrayDeque (as Stack)
                      ├── Priority → PriorityQueue
                      └── Random access? → ArrayList
```

---

## Best Use Cases

| Scenario | Best Choice | Why |
| :------- | :---------- | :-- |
| Read-heavy list, access by index | `ArrayList` | O(1) random access, cache-friendly |
| Queue / Deque operations | `ArrayDeque` | O(1) at both ends, no linked-list overhead |
| Fast lookup by key | `HashMap` | O(1) average lookup & insertion |
| Sorted dictionary | `TreeMap` | Maintains natural order, O(log n) |
| Remove duplicates | `HashSet` | O(1) contains check |
| LRU Cache | `LinkedHashMap` | Maintains insertion/access order + `removeEldestEntry()` |
| Thread-safe map | `ConcurrentHashMap` | Lock striping, high throughput |
| Priority processing | `PriorityQueue` | Min-heap, O(1) peek, O(log n) insert |

---

## Common Pitfalls

| Pitfall | Explanation |
| :------ | :---------- |
| Using `LinkedList` for random access | `get(i)` is O(n) — use `ArrayList` instead. |
| Mutable keys in `HashMap` | If a key's `hashCode()` changes after insertion, the entry is effectively **lost**. |
| Assuming `HashSet` preserves order | It doesn't. Use `LinkedHashSet` for insertion order, `TreeSet` for sorted order. |
| Using `Vector` or `Hashtable` | Legacy classes — use `ArrayList` + `Collections.synchronizedList()` or `ConcurrentHashMap`. |
| `TreeMap` with `null` keys | Throws `NullPointerException`. `HashMap` allows one `null` key. |
| `ArrayList.add(0, x)` in a loop | O(n) per operation → O(n²) total. Use `ArrayDeque.addFirst()` instead. |
