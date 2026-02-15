# Stream API — Grouping & Partitioning

> **Why it matters:** `Collectors.groupingBy()` and `partitioningBy()` are among
> the **most frequently tested** Stream API features on interviews. You're
> expected to write these from memory — fluently, correctly, and without
> hesitation.

---

## 1 · `groupingBy` — Group by Any Property

### Basic Grouping

```java
record Employee(String name, String dept, double salary) {}

List<Employee> team = List.of(
    new Employee("Ana",   "Engineering", 95000),
    new Employee("Bob",   "Engineering", 87000),
    new Employee("Carol", "Sales",       72000),
    new Employee("Dan",   "Sales",       68000),
    new Employee("Eve",   "Marketing",   78000)
);

// Group employees by department
Map<String, List<Employee>> byDept = team.stream()
    .collect(Collectors.groupingBy(Employee::dept));
```

**Result:**

```
{
  "Engineering": [Ana, Bob],
  "Sales":       [Carol, Dan],
  "Marketing":   [Eve]
}
```

---

## 2 · Downstream Collectors — Chain Aggregations

The real power of `groupingBy` is the **second argument** — a downstream
collector that processes each group:

### Count per Group

```java
Map<String, Long> headcount = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.counting()
    ));
// { Engineering: 2, Sales: 2, Marketing: 1 }
```

### Sum per Group

```java
Map<String, Double> totalSalary = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.summingDouble(Employee::salary)
    ));
// { Engineering: 182000.0, Sales: 140000.0, Marketing: 78000.0 }
```

### Average per Group

```java
Map<String, Double> avgSalary = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.averagingDouble(Employee::salary)
    ));
// { Engineering: 91000.0, Sales: 70000.0, Marketing: 78000.0 }
```

### Max / Min per Group

```java
Map<String, Optional<Employee>> topEarner = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.maxBy(Comparator.comparingDouble(Employee::salary))
    ));
// { Engineering: Optional[Ana], Sales: Optional[Carol], ... }
```

### Collect Names per Group

```java
Map<String, String> memberNames = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.mapping(
            Employee::name,
            Collectors.joining(", ")
        )
    ));
// { Engineering: "Ana, Bob", Sales: "Carol, Dan", Marketing: "Eve" }
```

### Collect to Downstream Set (Deduplicate)

```java
Map<String, Set<String>> uniqueNames = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.mapping(
            Employee::name,
            Collectors.toSet()
        )
    ));
```

---

## 3 · Controlling the Map Type

By default, `groupingBy` returns a `HashMap` (unordered). Use the **3-argument
overload** to specify a different map implementation:

```java
// Sorted keys — TreeMap
Map<String, List<Employee>> sorted = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        TreeMap::new,              // ← Map factory
        Collectors.toList()
    ));
// Keys will be: Engineering, Marketing, Sales (alphabetical)

// Preserve insertion order — LinkedHashMap
Map<String, List<Employee>> ordered = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        LinkedHashMap::new,
        Collectors.toList()
    ));
```

---

## 4 · `partitioningBy` — Boolean Split

`partitioningBy` is a specialized `groupingBy` that splits a collection into
**exactly two groups** using a `Predicate`:

```java
Map<Boolean, List<Employee>> partitioned = team.stream()
    .collect(Collectors.partitioningBy(
        e -> e.salary() > 80_000
    ));

List<Employee> highEarners = partitioned.get(true);   // [Ana, Bob]
List<Employee> others      = partitioned.get(false);   // [Carol, Dan, Eve]
```

### With Downstream Collector

```java
Map<Boolean, Long> counts = team.stream()
    .collect(Collectors.partitioningBy(
        e -> e.salary() > 80_000,
        Collectors.counting()
    ));
// { true: 2, false: 3 }
```

---

## 5 · Multi-Level Grouping

Group by department, then by salary bracket:

```java
Map<String, Map<String, List<Employee>>> nested = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.groupingBy(
            e -> e.salary() > 80_000 ? "Senior" : "Junior"
        )
    ));

// {
//   "Engineering": { "Senior": [Ana, Bob] },
//   "Sales":       { "Junior": [Carol, Dan] },
//   "Marketing":   { "Junior": [Eve] }
// }
```

---

## 6 · Quick Reference: All Downstream Collectors

| Collector | Output Type | Description |
| :-------- | :---------- | :---------- |
| `toList()` | `List<T>` | Collect group elements to a list |
| `toSet()` | `Set<T>` | Collect to set (deduplicates) |
| `counting()` | `Long` | Count elements in group |
| `summingInt/Long/Double(fn)` | `Integer/Long/Double` | Sum a numeric property |
| `averagingInt/Long/Double(fn)` | `Double` | Average a numeric property |
| `maxBy(comparator)` | `Optional<T>` | Maximum element |
| `minBy(comparator)` | `Optional<T>` | Minimum element |
| `mapping(fn, downstream)` | Varies | Transform then collect |
| `flatMapping(fn, downstream)` | Varies | Flatten then collect (Java 9+) |
| `filtering(pred, downstream)` | Varies | Filter then collect (Java 9+) |
| `joining(delimiter)` | `String` | Concatenate strings |
| `toUnmodifiableList()` | `List<T>` | Immutable list (Java 10+) |

---

## 7 · Common Interview Pitfalls

| Pitfall | How to Avoid |
| :------ | :----------- |
| Can't write `groupingBy` from memory | **Practice daily.** This is muscle memory, like SQL's `GROUP BY`. |
| Confusing `groupingBy` with `partitioningBy` | `partitioningBy` = boolean predicate (2 groups). `groupingBy` = arbitrary classifier (N groups). |
| Assuming sorted output | `groupingBy` uses `HashMap` by default. Use `TreeMap::new` for sorted keys. |
| Forgetting that `maxBy`/`minBy` return `Optional` | Wrap with `Collectors.collectingAndThen(maxBy(...), Optional::get)` if you're sure the group is non-empty. |
| Not knowing downstream collectors | Memorize at least: `counting()`, `summingDouble()`, `mapping()`, `joining()`. |
