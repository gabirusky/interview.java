# Records (Java 16+)

> **Why it matters:** Records eliminate 90% of the boilerplate associated with
> data-carrying classes. They're not just syntactic sugar — they enforce
> immutability by design, which connects to deep interview topics like thread
> safety, the `equals`/`hashCode` contract, and value-based programming.

---

## 1 · The Problem Records Solve

### Traditional Java Data Class: ~50 Lines of Boilerplate

```java
public class Employee {
    private final String name;
    private final String department;
    private final double salary;

    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public String getName()       { return name; }
    public String getDepartment() { return department; }
    public double getSalary()     { return salary; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee e)) return false;
        return Double.compare(e.salary, salary) == 0
            && Objects.equals(name, e.name)
            && Objects.equals(department, e.department);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, department, salary);
    }

    @Override
    public String toString() {
        return "Employee[name=" + name
             + ", department=" + department
             + ", salary=" + salary + "]";
    }
}
```

### Record: 1 Line

```java
public record Employee(String name, String department, double salary) {}
```

**That's it.** The compiler auto-generates:
- ✅ `final` fields for each component
- ✅ Canonical constructor
- ✅ Accessor methods (e.g., `name()`, `department()`, `salary()`)
- ✅ `equals()` — based on all components
- ✅ `hashCode()` — based on all components
- ✅ `toString()` — `Employee[name=Ana, department=Engineering, salary=85000.0]`

---

## 2 · Record Rules & Restrictions

| Rule | Explanation |
| :--- | :---------- |
| Components are `final` | Records are **immutable** — no setters, ever. |
| Cannot extend classes | Records implicitly extend `java.lang.Record`. |
| Can implement interfaces | `public record Point(int x, int y) implements Serializable {}` |
| Cannot declare instance fields | Only the components declared in the header. |
| Can have static fields & methods | `public record Config(String env) { static final Config DEFAULT = new Config("prod"); }` |
| Can have instance methods | Add behavior methods — just can't add mutable state. |

---

## 3 · Compact Constructors (Validation)

Records support a special **compact constructor** syntax for validation and
normalization — no parameter list needed:

```java
public record Email(String address) {

    // Compact constructor — parameters are implicit
    public Email {
        if (address == null || !address.contains("@")) {
            throw new IllegalArgumentException("Invalid email: " + address);
        }
        // Normalization
        address = address.toLowerCase().trim();
    }
}

// Usage
var email = new Email("User@Example.com");
System.out.println(email.address());  // "user@example.com"
```

### Custom Canonical Constructor (Full Control)

```java
public record Range(int min, int max) {

    // Full canonical constructor
    public Range(int min, int max) {
        if (min > max) {
            throw new IllegalArgumentException("min > max");
        }
        this.min = min;   // explicit assignment required
        this.max = max;
    }
}
```

---

## 4 · Records with Interfaces

```java
public interface Printable {
    String toPrettyString();
}

public record Product(String name, double price) implements Printable {

    @Override
    public String toPrettyString() {
        return String.format("📦 %s — $%.2f", name, price);
    }
}
```

---

## 5 · Records in Practice

### With Stream API

```java
record Employee(String name, String dept, double salary) {}

List<Employee> team = List.of(
    new Employee("Ana",   "Eng",   95000),
    new Employee("Bob",   "Eng",   87000),
    new Employee("Carol", "Sales", 72000),
    new Employee("Dan",   "Sales", 68000)
);

// Group by department
Map<String, List<Employee>> byDept = team.stream()
    .collect(Collectors.groupingBy(Employee::dept));

// Average salary per department
Map<String, Double> avgSalary = team.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.averagingDouble(Employee::salary)
    ));
```

### As Map Keys (Safe by Default)

Because records auto-generate correct `equals()` and `hashCode()`, they're
**safe to use as HashMap/HashSet keys** — unlike regular classes where
forgetting `hashCode()` breaks everything:

```java
record Coordinate(int x, int y) {}

Map<Coordinate, String> labels = new HashMap<>();
labels.put(new Coordinate(0, 0), "Origin");
labels.put(new Coordinate(1, 1), "Diagonal");

// This works correctly because equals/hashCode are auto-generated
System.out.println(labels.get(new Coordinate(0, 0)));  // "Origin" ✅
```

### With Pattern Matching (Java 21)

```java
record Point(int x, int y) {}
record Circle(Point center, int radius) {}

static String describe(Object shape) {
    return switch (shape) {
        case Circle(Point(int x, int y), int r)
            -> "Circle at (%d,%d) with radius %d".formatted(x, y, r);
        default
            -> "Unknown shape";
    };
}
```

---

## 6 · Records vs. Alternatives

| Feature | Record | Lombok `@Value` | Traditional Class |
| :------ | :----- | :--------------- | :---------------- |
| Boilerplate | ✅ None | ✅ None (annotation) | ❌ Lots |
| Immutability | ✅ Enforced | ✅ Enforced | Manual |
| `equals`/`hashCode` | ✅ Auto | ✅ Auto | Manual |
| External dependency | ✅ None | ❌ Requires Lombok | ✅ None |
| Inheritance | ❌ Cannot extend | ❌ Cannot extend | ✅ Full |
| Mutable fields | ❌ Not possible | ❌ Not possible | ✅ Possible |

---

## 7 · Common Interview Questions

| Question | Key Answer Points |
| :------- | :---------------- |
| What are records? | Immutable data carriers introduced in Java 16. Auto-generate constructor, accessors, `equals()`, `hashCode()`, `toString()`. |
| Can records have methods? | Yes — instance methods and static methods. But no mutable instance fields. |
| Can records extend a class? | No — they implicitly extend `java.lang.Record`. But they CAN implement interfaces. |
| Records vs. Lombok? | Records are built into the language (no dependency). Lombok is more flexible but requires a library. |
| Are records thread-safe? | Yes — their fields are `final` (immutable). They can be shared across threads without synchronization. |
| What is a compact constructor? | A constructor without a parameter list. Used for validation/normalization. Parameters are implicitly available. |
