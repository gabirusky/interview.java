# Pattern Matching (Java 21)

> **Why it matters:** Pattern matching is Java's answer to the verbosity of
> type checking and casting. It makes polymorphic code cleaner, safer, and more
> expressive. Combined with sealed classes and records, it enables a **modern
> algebraic data type** style that interviewers increasingly expect.

---

## 1 · Pattern Matching for `instanceof`

### Before Java 16: Cast After Check

```java
// ❌ Verbose — the compiler KNOWS obj is String, but you must cast manually
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.toUpperCase());
}
```

### Java 16+: Binding Variable

```java
// ✅ Clean — the variable `s` is automatically bound and scoped
if (obj instanceof String s) {
    System.out.println(s.toUpperCase());
}

// Also works with negation
if (!(obj instanceof String s)) {
    return;   // early exit
}
// s is in scope here — "flow scoping"
System.out.println(s.toUpperCase());
```

### Combining with Logical Operators

```java
// Pattern variable + condition in one expression
if (obj instanceof String s && s.length() > 5) {
    System.out.println("Long string: " + s);
}

// ⚠️ Cannot use || — the variable might not be bound on both branches
// if (obj instanceof String s || s.length() > 5)  ← COMPILE ERROR
```

---

## 2 · Switch with Pattern Matching (Java 21)

### Traditional Switch (Limited)

```java
// Old switch only works with: int, String, Enum
String type;
if (obj instanceof Integer) type = "Integer";
else if (obj instanceof String) type = "String";
else if (obj instanceof List) type = "List";
else type = "Unknown";
```

### Modern Pattern Switch

```java
// ✅ Java 21 — type-based switch with pattern matching
String type = switch (obj) {
    case Integer i  -> "Integer: " + i;
    case String s   -> "String of length " + s.length();
    case List<?> l  -> "List with " + l.size() + " elements";
    case null       -> "null value";
    default         -> "Unknown: " + obj.getClass().getSimpleName();
};
```

### Guarded Patterns (`when` clause)

```java
// Add conditions to pattern matches
String category = switch (obj) {
    case Integer i when i < 0   -> "Negative integer";
    case Integer i when i == 0  -> "Zero";
    case Integer i              -> "Positive integer: " + i;
    case String s when s.isBlank() -> "Blank string";
    case String s               -> "String: " + s;
    default                     -> "Other";
};
```

> **Note:** The `when` clause replaces the preview `&&` syntax from earlier
> Java versions. It's the **final, stable** syntax in Java 21.

---

## 3 · Sealed Classes + Exhaustive Switch

### Defining a Sealed Hierarchy

```java
// Only the listed classes can extend Shape
public sealed interface Shape
    permits Circle, Rectangle, Triangle {}

public record Circle(double radius) implements Shape {}
public record Rectangle(double width, double height) implements Shape {}
public record Triangle(double base, double height) implements Shape {}
```

### Exhaustive Switch (No `default` Needed!)

```java
// The compiler GUARANTEES all subtypes are covered
double area = switch (shape) {
    case Circle c    -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.width() * r.height();
    case Triangle t  -> 0.5 * t.base() * t.height();
    // No default needed — sealed hierarchy is exhaustive!
};
```

### Why This Matters

| Benefit | Explanation |
| :------ | :---------- |
| **Compile-time safety** | If you add a new `Shape` subclass (e.g., `Pentagon`), the compiler **forces** you to update every switch. |
| **No silent fallthrough** | Unlike `if-else` chains, you can't accidentally forget a case. |
| **Self-documenting** | The `permits` clause explicitly lists all variants. |

> **Interview tip:** Sealed classes + pattern matching = Java's version of
> Kotlin's `when` + `sealed class`, or Rust's `match` + `enum`. This shows
> modern language awareness.

---

## 4 · Record Patterns (Deconstruction)

### Basic Record Deconstruction

```java
record Point(int x, int y) {}

// ❌ Old way — access components manually
if (obj instanceof Point p) {
    System.out.println("x=" + p.x() + ", y=" + p.y());
}

// ✅ Java 21 — deconstruct directly in the pattern
if (obj instanceof Point(int x, int y)) {
    System.out.println("x=" + x + ", y=" + y);
}
```

### Nested Record Patterns

```java
record Point(int x, int y) {}
record Line(Point start, Point end) {}

// Deconstruct TWO levels deep in one pattern!
static String describeLine(Object obj) {
    return switch (obj) {
        case Line(Point(int x1, int y1), Point(int x2, int y2))
            -> "Line from (%d,%d) to (%d,%d)".formatted(x1, y1, x2, y2);
        default
            -> "Not a line";
    };
}
```

### In Switch Expressions

```java
sealed interface Shape permits Circle, Rectangle {}
record Circle(Point center, double radius) implements Shape {}
record Rectangle(Point topLeft, Point bottomRight) implements Shape {}
record Point(double x, double y) {}

String description = switch (shape) {
    case Circle(Point(double cx, double cy), double r)
        -> "Circle centered at (%.1f, %.1f) with radius %.1f".formatted(cx, cy, r);
    case Rectangle(Point(double x1, double y1), Point(double x2, double y2))
        -> "Rectangle from (%.1f,%.1f) to (%.1f,%.1f)".formatted(x1, y1, x2, y2);
};
```

---

## 5 · Putting It All Together

Here's a complete example combining sealed interfaces, records, pattern
matching, and exhaustive switch:

```java
// Domain model
sealed interface Expression permits Num, Add, Mul {}
record Num(double value) implements Expression {}
record Add(Expression left, Expression right) implements Expression {}
record Mul(Expression left, Expression right) implements Expression {}

// Recursive evaluator — no Visitor pattern needed!
static double evaluate(Expression expr) {
    return switch (expr) {
        case Num(double v)                  -> v;
        case Add(Expression l, Expression r) -> evaluate(l) + evaluate(r);
        case Mul(Expression l, Expression r) -> evaluate(l) * evaluate(r);
    };
}

// Usage
Expression expr = new Add(new Num(3), new Mul(new Num(4), new Num(5)));
System.out.println(evaluate(expr));  // 23.0
```

---

## 6 · Common Interview Questions

| Question | Key Answer Points |
| :------- | :---------------- |
| What is pattern matching for `instanceof`? | Combines type check + cast + variable binding in one expression. Java 16+. |
| What is a guarded pattern? | A pattern with a `when` clause that adds a boolean condition: `case String s when s.length() > 5`. |
| What are sealed classes? | Classes/interfaces that restrict which types can extend them. Enables exhaustive switch. |
| What are record patterns? | Deconstruction of record components directly in `instanceof` or `switch` patterns. Java 21. |
| How does this replace the Visitor pattern? | Sealed types + pattern switch let you handle all variants in one place, without implementing `accept()`/`visit()` methods. |
| Can you nest patterns? | Yes — record patterns can be nested to deconstruct multiple levels (e.g., `Line(Point(x1,y1), Point(x2,y2))`). |
