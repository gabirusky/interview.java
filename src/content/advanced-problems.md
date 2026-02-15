# Advanced Problems — Beyond the Core Five

> These problems appear on TestDome, Codility, and HackerRank assessments
> targeting candidates who go **beyond the basics**. They test recursion, grid
> traversal, architectural patterns, and business logic modeling. Mastering
> these separates solid candidates from the pack.

---

## Problem 1 · Boat Movements

**Archetype:** Grid Traversal / Logic Verification

### 📋 Problem Statement

A boat moves on a 2D grid (`boolean[][]` where `true` = water, `false` = land).
Given starting and destination coordinates, determine if the boat can travel
there in a **single move**. The boat's movement rules are:

1. Move **1 tile horizontally** (left or right).
2. Move **1 tile vertically** (up or down).
3. Move **2 tiles vertically** (jump) — but the intermediate tile must also be water.

### 🧠 Concept

This is **not** a pathfinding problem (no BFS/DFS needed). It's a **rule
validation** problem — check if a *single move* from A to B is legal.

### ✅ Optimal Approach

Validate the move in three stages:

```
1. BOUNDS CHECK    →  Is (toRow, toCol) inside the grid?
2. TERRAIN CHECK   →  Is grid[toRow][toCol] == true (water)?
3. MOVEMENT RULES  →  Does the displacement match an allowed move?
```

```java
public class BoatMovements {

    public static boolean canTravelTo(
            boolean[][] grid,
            int fromRow, int fromCol,
            int toRow, int toCol) {

        // 1. Bounds check
        if (toRow < 0 || toRow >= grid.length ||
            toCol < 0 || toCol >= grid[0].length) {
            return false;
        }

        // 2. Destination must be water
        if (!grid[toRow][toCol]) {
            return false;
        }

        int rowDiff = Math.abs(fromRow - toRow);
        int colDiff = Math.abs(fromCol - toCol);

        // 3a. Horizontal move: same row, 1 column apart
        if (rowDiff == 0 && colDiff == 1) {
            return true;
        }

        // 3b. Vertical move (1 step): same column, 1 row apart
        if (colDiff == 0 && rowDiff == 1) {
            return true;
        }

        // 3c. Vertical jump (2 steps): same column, 2 rows apart
        //     ⚠️ The intermediate tile MUST be water
        if (colDiff == 0 && rowDiff == 2) {
            int midRow = (fromRow + toRow) / 2;
            return grid[midRow][toCol];    // Check the tile in between!
        }

        // Any other move is illegal
        return false;
    }
}
```

### ⚠️ Critical Pitfall: The "Jump Over Land" Error

```
Grid:
  [water] [water] [water]
  [water] [LAND ] [water]    ← land blocks the jump
  [water] [water] [water]

Move: (0,1) → (2,1)  — 2-step vertical jump.

❌ Only checking destination → returns true (destination is water)
✅ Also checking intermediate tile (1,1) → returns false (it's land!)
```

Most candidates check the destination but **forget the intermediate tile**.
This is the #1 failure point.

---

## Problem 2 · Folders (XML Parsing)

**Archetype:** Recursion / DOM Parsing

### 📋 Problem Statement

Parse an XML string representing nested folders. Return all folder names that
start with a given letter.

```xml
<folder name="users">
    <folder name="admin">
        <folder name="archives" />
    </folder>
    <folder name="guests" />
</folder>
```

For `startingLetter = 'a'` → return `["admin", "archives"]`.

### 🧠 Concept

The nesting depth is **arbitrary** → this requires **recursion**. Java's DOM
parser (`DocumentBuilder`) handles the XML parsing, and you recurse through the
tree to find matching folder names.

### ✅ Optimal Solution

```java
import org.w3c.dom.*;
import javax.xml.parsers.*;
import org.xml.sax.InputSource;
import java.io.StringReader;
import java.util.*;

public class Folders {

    public static Collection<String> folderNames(
            String xml, char startingLetter) throws Exception {

        // Parse XML string into a DOM tree
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse(new InputSource(new StringReader(xml)));

        List<String> result = new ArrayList<>();
        findFolders(doc.getDocumentElement(), startingLetter, result);
        return result;
    }

    /**
     * Recursively traverses the DOM tree.
     * Checks each Element node's "name" attribute.
     */
    private static void findFolders(Node node, char letter, List<String> result) {

        // Only process Element nodes (skip #text, #comment, etc.)
        if (node.getNodeType() == Node.ELEMENT_NODE) {
            String name = ((Element) node).getAttribute("name");
            if (name != null && !name.isEmpty()
                    && Character.toLowerCase(name.charAt(0)) == Character.toLowerCase(letter)) {
                result.add(name);
            }
        }

        // Recurse into all child nodes
        NodeList children = node.getChildNodes();
        for (int i = 0; i < children.getLength(); i++) {
            findFolders(children.item(i), letter, result);
        }
    }
}
```

### ⚠️ Common Pitfalls

| Pitfall | Why It Fails |
| :------ | :----------- |
| **Regex parsing** (`<folder name="([^"]*)"`) | Regex cannot reliably parse nested/recursive structures. Fails on edge cases, comments, CDATA sections. |
| **Not checking `getNodeType()`** | The DOM parser creates `#text` nodes for whitespace between tags. Casting these to `Element` throws `ClassCastException`. |
| **Forgetting case sensitivity** | Depending on the test, `'a'` might need to match `"Admin"`. Always clarify or handle both cases. |

---

## Problem 3 · Alert Service (Dependency Injection)

**Archetype:** Architecture / Refactoring / SOLID Principles

### 📋 Problem Statement

Refactor an `AlertService` class that is tightly coupled to a `MapAlertDAO`.
Extract an `AlertDAO` interface and inject it via the constructor (Dependency
Inversion Principle).

### 🧠 Concept: Before & After

```
BEFORE (tight coupling):
┌──────────────────┐      ┌──────────────────┐
│  AlertService    │────▶ │  MapAlertDAO     │
│                  │ new  │ (concrete class) │
└──────────────────┘      └──────────────────┘

AFTER (dependency injection):
┌──────────────────┐      ┌──────────────────┐
│  AlertService    │────▶ │  «interface»     │
│  (receives DAO   │      │   AlertDAO       │
│   via constructor│      └───────┬──────────┘
└──────────────────┘              │ implements
                           ┌─────┴────────────┐
                           │  MapAlertDAO      │
                           │  (or any other    │
                           │   implementation) │
                           └──────────────────┘
```

### ✅ Optimal Solution

```java
// Step 1: Define the interface
interface AlertDAO {
    void addAlert(Alert alert);
    Alert getAlert(UUID id);
}

// Step 2: Implement the interface
class MapAlertDAO implements AlertDAO {
    private final Map<UUID, Alert> alerts = new HashMap<>();

    @Override
    public void addAlert(Alert alert) {
        alerts.put(alert.getId(), alert);
    }

    @Override
    public Alert getAlert(UUID id) {
        return alerts.get(id);
    }
}

// Step 3: Inject via constructor
class AlertService {
    private final AlertDAO storage;    // Depends on INTERFACE, not concrete class

    public AlertService(AlertDAO storage) {
        this.storage = storage;        // Injected — no "new" here
    }

    public void raiseAlert(Alert alert) {
        storage.addAlert(alert);
    }

    public Alert getAlertForDate(UUID id) {
        return storage.getAlert(id);
    }
}
```

### 🎯 Why This Matters

- **Testability** — In unit tests, inject a mock `AlertDAO` instead of a real database.
- **Flexibility** — Swap `MapAlertDAO` for `DatabaseAlertDAO` without changing
  `AlertService`.
- **SOLID** — Follows the **Dependency Inversion Principle** (D in SOLID):
  *"Depend on abstractions, not concretions."*

### ⚠️ Common Pitfalls

| Pitfall | Why It Fails |
| :------ | :----------- |
| **Making the interface `public`** | The prompt often specifies *package-private*. Candidates habitually add `public`. |
| **Keeping `new MapAlertDAO()` in the field** | Adding the constructor but forgetting to remove the hardcoded instantiation: `private final AlertDAO storage = new MapAlertDAO();` |
| **Not using the interface type** | Declaring `private final MapAlertDAO storage` instead of `private final AlertDAO storage` defeats the purpose. |

---

## Problem 4 · Mega Store (Discount Calculator)

**Archetype:** Business Logic / Enums / Strategy Pattern

### 📋 Problem Statement

Implement a discount calculator. The discount type is defined by an Enum:

| Discount Type | Rule |
| :------------ | :--- |
| `STANDARD` | Fixed 6% discount |
| `SEASONAL` | Fixed 12% discount |
| `WEIGHT` | If total weight ≤ 10 kg → 6% discount. If > 10 kg → 18% discount. |

### ✅ Optimal Solution

```java
public enum DiscountType {
    STANDARD,
    SEASONAL,
    WEIGHT
}

public class MegaStore {

    public static double getDiscountedPrice(
            double price, DiscountType type, double weight) {

        double discountRate = switch (type) {
            case STANDARD -> 0.06;
            case SEASONAL -> 0.12;
            case WEIGHT   -> weight <= 10 ? 0.06 : 0.18;
        };

        return price * (1.0 - discountRate);
    }
}
```

### 🧪 Example Walkthrough

```
Price: $100.00, Type: WEIGHT, Weight: 15 kg

1. type == WEIGHT → check weight: 15 > 10 → discountRate = 0.18
2. discountedPrice = 100 * (1.0 - 0.18) = $82.00
```

### ⚠️ Common Pitfalls

| Pitfall | Why It Fails |
| :------ | :----------- |
| **Magic numbers** | Using `0.06` without documentation → hard to maintain, easy to mistype. |
| **Wrong threshold operator** | Using `< 10` instead of `<= 10` (or vice versa). Read the spec carefully. |
| **Applying discount to unit price instead of total** | Some variants multiply price × quantity first, then apply discount. |
| **Forgetting to return the discounted price** | Some candidates return the *discount amount* instead of the *final price*. |
