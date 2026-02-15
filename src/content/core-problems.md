# Core Problems — The "Big 5" TestDome Archetypes

> These five problems appear with **extremely high frequency** on TestDome, Codility,
> and similar assessment platforms. Each one tests a specific pillar of Java
> engineering: data structures, algorithms, OOP, and simulation logic.
> Master these, and you'll handle 80% of what entry-level assessments throw at you.

---

## Problem 1 · Train Composition

**Archetype:** Data Structures — Deque (Double-Ended Queue)

### 📋 Problem Statement

Design a data structure to manage a train where wagons can be **attached** or
**detached** from either the **left** (front) or the **right** (back). All
operations must run in **O(1)** time.

### 🧠 Concept

This is a classic **Deque** (Double-Ended Queue) scenario. The key insight is
recognizing which Java data structures support efficient operations at *both*
ends.

### ❌ Why Naive Approaches Fail

| Approach | Problem |
| :------- | :------ |
| `ArrayList` | `add(0, item)` is **O(n)** — shifts all elements right. Fails on 100K+ operations. |
| Singly `LinkedList` | No tail reference → `removeLast()` requires full traversal = **O(n)**. |
| Manual doubly-linked list | Works but is error-prone, slow to implement, and misses the point of the test. |

### ✅ Optimal Solution

Use Java's built-in `Deque` interface — implemented by `LinkedList` (doubly
linked) or `ArrayDeque` (circular array):

```java
import java.util.Deque;
import java.util.LinkedList;

public class TrainComposition {

    private Deque<Integer> wagons = new LinkedList<>();

    /** Attach a wagon to the LEFT (front) of the train. O(1) */
    public void attachWagonFromLeft(int wagonId) {
        wagons.addFirst(wagonId);
    }

    /** Attach a wagon to the RIGHT (back) of the train. O(1) */
    public void attachWagonFromRight(int wagonId) {
        wagons.addLast(wagonId);
    }

    /** Detach and return the leftmost wagon. O(1) */
    public int detachWagonFromLeft() {
        return wagons.removeFirst();
    }

    /** Detach and return the rightmost wagon. O(1) */
    public int detachWagonFromRight() {
        return wagons.removeLast();
    }
}
```

### 📊 Complexity

| Operation | Time | Space |
| :-------- | :--- | :---- |
| Attach (either end) | O(1) | O(1) per call |
| Detach (either end) | O(1) | O(1) per call |
| Overall | O(n) for n operations | O(n) total |

### ⚠️ Common Pitfalls

1. **Using `ArrayList`** — `add(0, item)` is O(n). This is the #1 reason for
   TLE (Time Limit Exceeded) on this problem.
2. **Building a custom linked list** — The test evaluates *engineering judgment*,
   not raw data-structure implementation. Use the standard library.
3. **Forgetting `ArrayDeque`** — For most use cases, `ArrayDeque` is actually
   faster than `LinkedList` due to cache locality. Both are valid answers.

---

## Problem 2 · Sorted Search

**Archetype:** Algorithmic Thinking — Binary Search

### 📋 Problem Statement

Given a **sorted** array of unique integers, count how many values are
**strictly less than** a given parameter `lessThan`.

### 🧠 Concept

The critical keyword is **"sorted"** — it signals that **Binary Search** (O(log n))
should replace a linear scan (O(n)). On arrays with 1M+ elements, a linear scan
will time out.

### ✅ Optimal Solution

```java
import java.util.Arrays;

public class SortedSearch {

    /**
     * Counts how many numbers in the sorted array are strictly < lessThan.
     *
     * Uses Arrays.binarySearch():
     *   - If found:     returns the index (which IS the count of smaller elements)
     *   - If not found: returns -(insertionPoint) - 1
     *                   → insertionPoint = -(result + 1)
     */
    public static int countNumbers(int[] sortedArray, int lessThan) {
        int index = Arrays.binarySearch(sortedArray, lessThan);

        if (index >= 0) {
            // Element exists at this index.
            // Since the array is 0-indexed, the index equals
            // the count of elements strictly smaller than it.
            return index;
        } else {
            // Element not found.
            // Convert the negative return value to the insertion point.
            return -(index + 1);
        }
    }
}
```

### 🔍 Understanding `Arrays.binarySearch()` Return Values

```
Array:   [1, 3, 5, 7, 9]    Index:  0  1  2  3  4

binarySearch(array, 5)  →  2        (found at index 2)
binarySearch(array, 6)  → -4        (not found; insertion point = 3)
                                     → -((-4) + 1) = 3
binarySearch(array, 0)  → -1        (not found; insertion point = 0)
                                     → -((-1) + 1) = 0
binarySearch(array, 10) → -6        (not found; insertion point = 5)
                                     → -((-6) + 1) = 5
```

### 📊 Complexity

| Approach | Time | Space |
| :------- | :--- | :---- |
| Linear scan | O(n) | O(1) |
| **Binary search** | **O(log n)** | **O(1)** |

### ⚠️ Common Pitfalls

1. **Linear search** — `for (int x : arr) if (x < lessThan) count++` is O(n).
   Fails on large inputs.
2. **Off-by-one errors** — Misinterpreting the negative return value of
   `binarySearch`. Remember: `insertionPoint = -(result + 1)`.
3. **Boundary conditions** — Target smaller than all elements (return 0),
   target larger than all elements (return `array.length`).

---

## Problem 3 · Song (Repeating Playlist)

**Archetype:** Linked List Cycle Detection — Floyd's Algorithm

### 📋 Problem Statement

A playlist is modeled as a chain of `Song` objects where each song points to the
next via `nextSong`. Determine if the playlist **repeats** (contains a cycle).

### 🧠 Concept

This is a direct application of **Floyd's Cycle-Finding Algorithm** (the
"Tortoise and Hare" technique):

```
No cycle:    A → B → C → D → null

Has cycle:   A → B → C → D
                  ↑         │
                  └─────────┘
```

- **Tortoise** 🐢 moves **1 step** at a time.
- **Hare** 🐇 moves **2 steps** at a time.
- If there's a cycle, the hare will eventually **lap** the tortoise — they'll
  meet at the same node.
- If there's no cycle, the hare reaches `null`.

### ✅ Optimal Solution

```java
public class Song {

    private String name;
    private Song nextSong;

    public Song(String name) {
        this.name = name;
    }

    public void setNextSong(Song nextSong) {
        this.nextSong = nextSong;
    }

    /**
     * Detects if this playlist contains a cycle using Floyd's Algorithm.
     * Time: O(n)   Space: O(1)
     */
    public boolean isRepeatingPlaylist() {
        Song slow = this;             // 🐢 Tortoise
        Song fast = this.nextSong;    // 🐇 Hare (starts 1 step ahead)

        while (fast != null && fast.nextSong != null) {
            if (slow == fast) {
                return true;          // 🔄 Cycle detected!
            }
            slow = slow.nextSong;             // 1 step
            fast = fast.nextSong.nextSong;    // 2 steps
        }

        return false;   // 🏁 Reached end — no cycle
    }
}
```

### 📊 Complexity

| Approach | Time | Space |
| :------- | :--- | :---- |
| `HashSet` of visited nodes | O(n) | **O(n)** |
| **Floyd's Algorithm** | **O(n)** | **O(1)** ✅ |

### ⚠️ Common Pitfalls

1. **Comparing names instead of references** — `name.equals(other.name)` checks
   *content*. Two songs can have the same title but be different nodes. Use `==`
   for reference identity.
2. **HashSet approach** — Works but uses O(n) extra memory. Floyd's is superior
   in memory-constrained environments.
3. **NullPointerException** — Must check both `fast != null` AND
   `fast.nextSong != null` before accessing `fast.nextSong.nextSong`.

---

## Problem 4 · User Input

**Archetype:** OOP — Inheritance, Polymorphism & Liskov Substitution

### 📋 Problem Statement

Implement a base class `TextInput` that stores characters, and a subclass
`NumericInput` that only accepts digit characters (`0-9`). Both must have an
`add(char c)` method and a `getValue()` method.

### 🧠 Concept

This tests three OOP principles:
1. **Inheritance** — `NumericInput extends TextInput`.
2. **Polymorphism** — `@Override` the `add` method.
3. **Liskov Substitution** — A `NumericInput` should work wherever a `TextInput`
   is expected (it adds behavior restrictions, not new contracts).

### ✅ Optimal Solution

```java
public class TextInput {

    /** StringBuilder is mutable and efficient for append operations */
    protected StringBuilder value = new StringBuilder();

    /** Accept any character */
    public void add(char c) {
        value.append(c);
    }

    /** Return the accumulated text */
    public String getValue() {
        return value.toString();
    }
}

public class NumericInput extends TextInput {

    /**
     * Override: only accept digit characters.
     * Delegates to parent via super.add(c) — no logic duplication.
     */
    @Override
    public void add(char c) {
        if (Character.isDigit(c)) {
            super.add(c);     // ✅ Reuse parent logic
        }
        // Non-digits are silently ignored
    }
}
```

### 🧪 Example Behavior

```java
TextInput text = new TextInput();
text.add('a');
text.add('1');
text.add('b');
text.add('2');
System.out.println(text.getValue());  // "a1b2"

NumericInput numeric = new NumericInput();
numeric.add('a');
numeric.add('1');
numeric.add('b');
numeric.add('2');
System.out.println(numeric.getValue());  // "12"
```

### ⚠️ Common Pitfalls

1. **Shadowing the `value` field** — Declaring a *new* `value` field in
   `NumericInput` instead of inheriting it. This causes `getValue()` (from
   `TextInput`) to return an empty string because data was stored in the wrong
   field.
2. **Duplicating logic** — Re-implementing `value.append(c)` instead of calling
   `super.add(c)`. This defeats the purpose of inheritance.
3. **Using `String +=`** — Creates a new object per append → O(n²) over many
   inputs. `StringBuilder` is the correct choice.

---

## Problem 5 · Game Platform

**Archetype:** Simulation — State Machine with Early Termination

### 📋 Problem Statement

Calculate the final speed of a character traversing terrain defined by an array
of inclinations. The rules:

- **Speed** starts at `initialSpeed` (a `double`).
- For each `incline` in the array: `speed = speed - incline`.
- If speed drops to **0 or below** at any point, the character **dies** →
  return **0** immediately.

### 🧠 Concept

This is a **simulation with early termination**. The key trap is that you
**cannot** simply sum all inclines and subtract from the initial speed — the
character might die *mid-way* even if the total sum would leave them alive.

```
Initial speed: 10

Inclinations: [2, 5, -3, 8]

Step 1: 10 - 2  =  8  ✓
Step 2:  8 - 5  =  3  ✓
Step 3:  3 -(-3) =  6  ✓  (downhill speeds up)
Step 4:  6 - 8  = -2  💀  → return 0

❌ Naive sum: 2 + 5 + (-3) + 8 = 12 → 10 - 12 = -2
   Same answer HERE, but fails when mid-step death matters:

Inclinations: [15, -20]
Step 1: 10 - 15 = -5  💀 → return 0
Naive sum: 15 + (-20) = -5 → 10 - (-5) = 15  ← WRONG!
```

### ✅ Optimal Solution

```java
public class GamePlatform {

    /**
     * Simulates character movement over terrain.
     * Returns final speed, or 0 if the character dies mid-way.
     */
    public static double calculateFinalSpeed(double initialSpeed, int[] inclinations) {
        double speed = initialSpeed;

        for (int incline : inclinations) {
            speed -= incline;

            if (speed <= 0) {
                return 0;    // 💀 Character died — immediate termination
            }
        }

        return speed;    // 🏁 Survived all terrain
    }
}
```

### 📊 Complexity

| Aspect | Value |
| :----- | :---- |
| Time | O(n) — single pass |
| Space | O(1) — constant |

### ⚠️ Common Pitfalls

1. **Summing all inclines first** — `speed = initial - sum(inclinations)`.
   This ignores mid-step deaths. The state **must be validated after every step**.
2. **Floating-point precision** — While `speed <= 0` works here, in stricter
   problems you may need an epsilon check: `speed <= 1e-9`.
3. **Confusing incline direction** — A *negative* incline means downhill
   (speed *increases*). The formula `speed -= incline` handles this naturally:
   subtracting a negative number adds to speed.
