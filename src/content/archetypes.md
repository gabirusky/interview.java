# Other Frequent Archetypes & Optimizations

> Beyond TestDome, candidates encountering **Codility**, **HackerRank**, or
> **LeetCode** must prepare for these classic archetypes. Each one teaches a
> transferable problem-solving pattern that appears across hundreds of variations.

---

## Archetype 1 · Two Sum

**Pattern:** HashMap for O(n) Complement Lookup

### 📋 Problem Statement

Given an array of integers and a target value, find **two numbers** that add up
to the target. Return their indices.

```
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]   (because nums[0] + nums[1] = 2 + 7 = 9)
```

### ❌ Naive Approach — O(n²)

```java
// Brute force: check every pair
for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
            return new int[]{i, j};
        }
    }
}
// Two nested loops → O(n²) — fails on large inputs
```

### ✅ Optimal Approach — O(n)

Use a **HashMap** to store seen values and look up complements in O(1):

```java
public int[] twoSum(int[] nums, int target) {
    // Map: value → index
    Map<Integer, Integer> seen = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];

        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};  // 🎯 Found it!
        }

        seen.put(nums[i], i);
    }

    throw new IllegalArgumentException("No two-sum solution");
}
```

### 🔍 Step-by-Step Walkthrough

```
nums = [2, 7, 11, 15], target = 9

i=0: num=2, complement=7, seen={}         → not found, add {2:0}
i=1: num=7, complement=2, seen={2:0}      → FOUND! Return [0, 1] ✅
```

### 📊 Complexity

| Approach | Time | Space |
| :------- | :--- | :---- |
| Brute force | O(n²) | O(1) |
| **HashMap** | **O(n)** | **O(n)** |

> **Key insight:** This is a **time-space trade-off** — you spend O(n) extra
> memory to reduce time from O(n²) to O(n). This pattern appears *everywhere*.

---

## Archetype 2 · Merge Names (Set Deduplication)

**Pattern:** HashSet for O(n) Deduplication

### 📋 Problem Statement

Merge two arrays of strings and return a single array with **no duplicates**.

```
Input:  ["Ava", "Emma", "Olivia"], ["Olivia", "Sophia", "Emma"]
Output: ["Ava", "Emma", "Olivia", "Sophia"]  (order may vary)
```

### ✅ Optimal Solution

```java
public static String[] mergeNames(String[] arr1, String[] arr2) {
    // LinkedHashSet preserves insertion order (bonus)
    Set<String> merged = new LinkedHashSet<>();

    // Add all names — duplicates are automatically ignored
    for (String name : arr1) merged.add(name);
    for (String name : arr2) merged.add(name);

    return merged.toArray(new String[0]);
}
```

### 🔍 Alternative: Java Stream API

```java
public static String[] mergeNames(String[] arr1, String[] arr2) {
    return Stream.concat(Arrays.stream(arr1), Arrays.stream(arr2))
                 .distinct()
                 .toArray(String[]::new);
}
```

### 📊 Complexity

| Approach | Time | Space |
| :------- | :--- | :---- |
| Nested loops (manual dedup) | O(n²) | O(n) |
| **HashSet** | **O(n)** | **O(n)** |

### ⚠️ Common Pitfall

Manually checking for duplicates with nested loops before adding:

```java
// ❌ O(n²) — checking every element before adding
for (String s : arr2) {
    boolean found = false;
    for (String existing : result) {
        if (s.equals(existing)) { found = true; break; }
    }
    if (!found) result.add(s);
}
```

Just use a `Set` — it handles uniqueness automatically in O(1) per operation.

---

## Archetype 3 · Stream API Aggregations

**Pattern:** `groupingBy` / `partitioningBy` Collectors

### 📋 Problem Statement

Given a list of `Employee` objects, group them by department.

### ✅ Optimal Solution

```java
// Group employees into a Map<Department, List<Employee>>
Map<Department, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));
```

### 🔍 Variations You Must Know

```java
// Count employees per department
Map<Department, Long> counts = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.counting()
    ));

// Average salary per department
Map<Department, Double> avgSalary = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.averagingDouble(Employee::getSalary)
    ));

// Partition: salary above/below threshold
Map<Boolean, List<Employee>> partitioned = employees.stream()
    .collect(Collectors.partitioningBy(
        e -> e.getSalary() > 50_000
    ));
// partitioned.get(true)  → high earners
// partitioned.get(false) → others

// Collect names as comma-separated string per department
Map<Department, String> names = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.mapping(
            Employee::getName,
            Collectors.joining(", ")
        )
    ));
```

### ⚠️ Common Pitfalls

| Pitfall | Explanation |
| :------ | :---------- |
| Can't write `groupingBy` from memory | This is a **standard** interview question. Practice until it's muscle memory. |
| Confusing `groupingBy` vs `partitioningBy` | `partitioningBy` takes a `Predicate` (boolean split). `groupingBy` takes a `Function` (arbitrary keys). |
| Assuming `groupingBy` returns a `TreeMap` | Default is `HashMap` (unordered). Use the 3-arg overload to specify `TreeMap::new` for sorted keys. |

---

## Archetype 4 · Thread-Safe Counter

**Pattern:** `AtomicInteger` for Lock-Free Concurrency

### 📋 Problem Statement

Increment a shared counter from multiple threads without race conditions.

### The Evolution of Thread-Safe Counting

#### ❌ Stage 1: The Anti-Pattern

```java
private int count = 0;

public void increment() {
    count++;  // NOT ATOMIC — Read → Modify → Write
}

// What actually happens:
// Thread A reads count (0)
// Thread B reads count (0)
// Thread A writes count (1)
// Thread B writes count (1)  ← Thread A's increment is LOST!
```

#### ⚠️ Stage 2: `synchronized` (Safe but Slow)

```java
private int count = 0;

public synchronized void increment() {
    count++;  // Only one thread at a time
}

// Problem: under high contention, threads queue up.
// Throughput drops significantly.
```

#### ✅ Stage 3: `AtomicInteger` (Fast & Safe)

```java
private AtomicInteger count = new AtomicInteger(0);

public void increment() {
    count.incrementAndGet();  // Hardware-level CAS — no locks!
}
```

### 🔍 How CAS (Compare-And-Swap) Works

```
1. Read current value (expected = 5)
2. Compute new value (new = 6)
3. Atomically: if current == expected, set to new
4. If another thread changed it → retry from step 1

This is non-blocking — no thread ever waits for a lock.
```

### 📊 Performance Comparison

| Approach | Thread Safety | Blocking? | Throughput |
| :------- | :------------ | :-------- | :--------- |
| `count++` | ❌ | No | Highest (but wrong!) |
| `synchronized` | ✅ | Yes | Low under contention |
| **`AtomicInteger`** | ✅ | **No** | **High** ✅ |

### Useful `AtomicInteger` Methods

```java
AtomicInteger counter = new AtomicInteger(0);

counter.incrementAndGet();       // ++counter (returns new value)
counter.getAndIncrement();       // counter++ (returns old value)
counter.addAndGet(5);            // counter += 5
counter.compareAndSet(10, 20);   // if counter == 10, set to 20
counter.get();                   // read current value
```

### ⚠️ Common Pitfalls

| Pitfall | Explanation |
| :------ | :---------- |
| Using `volatile int count` + `count++` | `volatile` ensures *visibility* but not *atomicity*. `count++` is still a compound operation (read-modify-write). |
| Over-synchronizing | Locking an entire method when only one field needs protection. Use block-level sync or `Atomic` classes. |
| Forgetting `ExecutorService.shutdown()` | The JVM won't exit if executor threads are still running. Always call `shutdown()` in a `finally` block or use try-with-resources (Java 19+). |
