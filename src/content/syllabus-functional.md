# Functional Programming (Java 8+)

> **Why it matters:** Since Java 8, the Stream API and Lambda expressions have
> become first-class citizens in the language. Modern interviews **expect** you
> to write fluent, declarative data transformations — not imperative loops. If
> you can't write a `groupingBy` collector from memory, you're already behind.

---

## 1 · Lambda Expressions

A lambda is an anonymous function — a concise way to represent a single-method
interface (a **Functional Interface**).

```java
// Before Java 8 — anonymous inner class
Comparator<String> cmp = new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
};

// Java 8+ — lambda expression
Comparator<String> cmp = (a, b) -> a.length() - b.length();
```

### Lambda Syntax Variants

```java
// No params
Runnable r = () -> System.out.println("Hello");

// One param (parens optional)
Consumer<String> c = s -> System.out.println(s);

// Multiple params
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Multi-line body (requires braces + return)
Function<String, Integer> parse = s -> {
    s = s.trim();
    return Integer.parseInt(s);
};
```

---

## 2 · Core Functional Interfaces

Java provides these in `java.util.function`:

| Interface              | Method            | Signature                | Use Case                       |
| :--------------------- | :---------------- | :----------------------- | :----------------------------- |
| `Predicate<T>`         | `test(T)`         | `T → boolean`            | Filtering                      |
| `Function<T, R>`       | `apply(T)`        | `T → R`                  | Transformation / mapping       |
| `Consumer<T>`          | `accept(T)`       | `T → void`               | Side effects (print, save)     |
| `Supplier<T>`          | `get()`           | `() → T`                 | Lazy value generation          |
| `UnaryOperator<T>`     | `apply(T)`        | `T → T`                  | Same-type transformation       |
| `BinaryOperator<T>`    | `apply(T, T)`     | `(T, T) → T`             | Reduction (sum, max)           |
| `BiFunction<T, U, R>`  | `apply(T, U)`     | `(T, U) → R`             | Two-arg transformation         |

---

## 3 · Method References

Shorthand for lambdas that just call an existing method:

```java
// Static method reference
Function<String, Integer> parse = Integer::parseInt;

// Instance method reference (arbitrary object)
Function<String, String> upper = String::toUpperCase;

// Instance method reference (specific object)
Consumer<String> printer = System.out::println;

// Constructor reference
Supplier<ArrayList<String>> listFactory = ArrayList::new;
```

---

## 4 · The Stream API Pipeline

Streams provide a **declarative** pipeline for processing collections:

```
Source  →  Intermediate Ops (lazy)  →  Terminal Op (triggers execution)
```

### 4.1 Intermediate Operations (Lazy)

These return a new `Stream` and do **nothing** until a terminal operation is
invoked:

| Operation          | Description                             | Example                              |
| :----------------- | :-------------------------------------- | :----------------------------------- |
| `filter(pred)`     | Keep elements matching predicate        | `.filter(s -> s.length() > 3)`       |
| `map(func)`        | Transform each element                  | `.map(String::toUpperCase)`          |
| `flatMap(func)`    | Flatten nested collections              | `.flatMap(List::stream)`             |
| `distinct()`       | Remove duplicates (uses `equals()`)     | `.distinct()`                        |
| `sorted()`         | Natural order sort                      | `.sorted()`                          |
| `sorted(cmp)`      | Custom comparator sort                  | `.sorted(Comparator.reverseOrder())` |
| `peek(consumer)`   | Debug/inspect (side effect)             | `.peek(System.out::println)`         |
| `limit(n)`         | Take first n elements                   | `.limit(10)`                         |
| `skip(n)`          | Skip first n elements                   | `.skip(5)`                           |

### 4.2 Terminal Operations (Trigger Execution)

| Operation           | Returns         | Description                          |
| :------------------ | :-------------- | :----------------------------------- |
| `collect(collector)` | `R`            | Accumulate into a collection/map     |
| `forEach(consumer)` | `void`          | Execute action on each element       |
| `reduce(id, op)`    | `T`             | Combine all elements into one value  |
| `count()`           | `long`          | Count elements                       |
| `anyMatch(pred)`    | `boolean`       | True if any element matches          |
| `allMatch(pred)`    | `boolean`       | True if all elements match           |
| `noneMatch(pred)`   | `boolean`       | True if no element matches           |
| `findFirst()`       | `Optional<T>`   | First element (if any)               |
| `findAny()`         | `Optional<T>`   | Any element (useful in parallel)     |
| `toList()` 🆕       | `List<T>`       | Java 16+ — unmodifiable list         |

### 4.3 Practical Example

```java
List<String> topNames = employees.stream()
    .filter(e -> e.getSalary() > 50_000)       // keep high earners
    .map(Employee::getName)                     // extract names
    .distinct()                                 // remove duplicates
    .sorted()                                   // alphabetical order
    .limit(10)                                  // top 10
    .collect(Collectors.toList());              // collect to list
```

---

## 5 · Key Collectors

```java
import java.util.stream.Collectors;
```

| Collector                           | Result Type                   | Description                        |
| :---------------------------------- | :---------------------------- | :--------------------------------- |
| `toList()`                          | `List<T>`                     | Collect to a list                  |
| `toSet()`                           | `Set<T>`                      | Collect to a set (deduplicates)    |
| `toMap(keyFn, valFn)`               | `Map<K, V>`                   | Collect to a map                   |
| `joining(", ")`                     | `String`                      | Concatenate strings with delimiter |
| `groupingBy(classifier)`            | `Map<K, List<T>>`             | Group by a property                |
| `partitioningBy(predicate)`         | `Map<Boolean, List<T>>`       | Split into true/false groups       |
| `counting()`                        | `Long`                        | Count elements in group            |
| `summingInt(fn)`                    | `Integer`                     | Sum a numeric property             |
| `averagingDouble(fn)`               | `Double`                      | Average a numeric property         |

---

## 6 · `Optional<T>` — Null Safety

`Optional` is a container that may or may not hold a value. It replaces `null`
checks with a fluent API:

```java
// ❌ BAD — NullPointerException risk
String name = employee.getDepartment().getManager().getName();

// ✅ GOOD — safe chaining with Optional
String name = Optional.ofNullable(employee)
    .map(Employee::getDepartment)
    .map(Department::getManager)
    .map(Manager::getName)
    .orElse("Unknown");
```

| Method                | Description                                  |
| :-------------------- | :------------------------------------------- |
| `Optional.of(val)`    | Creates Optional (throws if null)            |
| `Optional.ofNullable` | Creates Optional (empty if null)             |
| `Optional.empty()`    | Empty Optional                               |
| `.isPresent()`        | True if value exists                         |
| `.ifPresent(action)`  | Execute action if value exists               |
| `.map(fn)`            | Transform value if present                   |
| `.flatMap(fn)`        | Transform + unwrap nested Optional           |
| `.orElse(default)`    | Return value or default                      |
| `.orElseThrow()`      | Return value or throw exception              |

---

## 7 · Common Interview Questions

| Question | Key Answer Points |
| :------- | :---------------- |
| What is a Functional Interface? | An interface with exactly one abstract method. Can be used as a lambda target. Annotated with `@FunctionalInterface`. |
| `map()` vs `flatMap()`? | `map()` transforms 1:1. `flatMap()` transforms and flattens nested structures (e.g., `Stream<List<T>>` → `Stream<T>`). |
| What does "lazy evaluation" mean? | Intermediate operations aren't executed until a terminal operation is called. Allows short-circuiting. |
| `reduce()` vs `collect()`? | `reduce()` combines into a single value. `collect()` accumulates into a mutable container (list, map, string). |
| Can streams be reused? | **No.** Once a terminal operation is called, the stream is consumed. Create a new stream for further operations. |
| Parallel streams? | `.parallelStream()` or `.parallel()`. Uses ForkJoinPool. Avoid for small datasets or shared mutable state. |
