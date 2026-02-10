# **Comprehensive Analysis of Java Technical Assessment Archetypes for Intern and Junior Profiles (2025-2026)**

## **1\. Executive Summary**

The landscape of technical recruitment for Java developers, particularly at the intern and junior levels, has undergone a significant transformation. As indicated by hiring trends and assessment platform data from 2024 and 2025, the focus has shifted from simple syntax verification to a rigorous assessment of algorithmic thinking, engineering judgment, and familiarity with the Java standard library's internal mechanics.1 Platforms like TestDome, Codility, and HackerRank have standardized a set of problem archetypes designed to filter candidates based on their ability to write code that is not only functionally correct but also performant, memory-efficient, and maintainable.  
This report provides an exhaustive analysis of the technical syllabus expected of Junior Java Developers in the current hiring cycle. It deconstructs specific, high-frequency coding challenges found on assessment platforms, offering optimal solutions, complexity analyses, and detailed examinations of common pitfalls. The report expands beyond initial examples to cover the broader spectrum of algorithmic challenges—ranging from graph traversal to dynamic programming—that define the modern technical interview. The analysis reveals a critical "hidden" requirement in these tests: the need for O(log n) search efficiencies, memory-conscious data structure selection (e.g., distinguishing between LinkedList and ArrayList based on access patterns), and robust object-oriented design that adheres to SOLID principles. Furthermore, it explores the increasing importance of the Java Stream API and concurrency utilities in entry-level assessments, reflecting the industry's demand for developers capable of handling modern, data-intensive applications.

## **2\. The Java Technical Syllabus: From Syntax to Engineering Judgment**

To understand the context of specific coding problems, one must first establish the competency baseline for early-career Java professionals. The distinction between an "Intern" and a "Junior" developer often lies in the depth of understanding regarding the Java Virtual Machine (JVM), the ability to reason about trade-offs, and the capacity to write production-ready code under constraints.

### **2.1 Core Language Mechanics and Memory Models**

At the foundational level, candidates are expected to master the syntax and core mechanics of the Java language. However, the assessment goes beyond writing a main method; it probes the candidate's understanding of how Java manages memory and executes code.

#### **2.1.1 Primitive vs. Reference Types & String Immutability**

A recurring theme in interviews involves the distinction between primitive types (int, double, boolean) and reference types (Integer, Double, Boolean). Candidates must understand **autoboxing and unboxing**, and the performance implications of using wrapper classes in computationally intensive loops. A common pitfall identified in assessments is the inadvertent creation of excessive objects due to unnecessary autoboxing, leading to increased Garbage Collection (GC) pressure.3  
String manipulation remains a cornerstone of entry-level assessments. The immutability of the String class is a critical concept. Operations that appear to modify a string actually create new String objects. In scenarios involving loop-based concatenation, this leads to quadratic time complexity O(n^2). The syllabus mandates proficiency with **StringBuilder** or **StringBuffer** (for thread-safe contexts) to achieve linear time complexity O(n).4 Furthermore, the distinction between string equality using \== (reference comparison) and .equals() (content comparison) is a frequent source of bugs in junior-level code.5

#### **2.1.2 The Java Memory Model: Stack vs. Heap**

Understanding where variables are stored is essential for debugging StackOverflowError and OutOfMemoryError.

* **Stack Memory:** Stores primitive variables and references to objects. It is managed automatically via LIFO (Last-In-First-Out) logic during method execution.  
* **Heap Memory:** Stores the actual objects and JRE classes. It is managed by the Garbage Collector. Competent junior developers must demonstrate awareness of how object lifecycles affect heap usage, particularly in long-running applications or recursive algorithms where stack depth becomes a limiting factor.3

### **2.2 The Collections Framework: Internals and Trade-offs**

The Java Collections Framework is arguably the most critical component of the technical syllabus. Interviewers test the understanding of underlying data structures and the ability to make smart trade-offs between them.1

| Collection Interface | Implementation | Internal Structure | Time Complexity (Access/Search/Insert) | Best Use Case | Common Pitfall |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **List** | ArrayList | Dynamic Array | O(1) / O(n) / O(n) (shifting) | Fast random access; read-heavy workloads. | Using for frequent insertions/deletions at the *start* or *middle*. |
| **List** | LinkedList | Doubly Linked List | O(n) / O(n) / O(1) (at ends) | Frequent insertions/deletions at ends (Queue/Deque). | Using for random access (get(i) is O(n)). |
| **Map** | HashMap | Array of Buckets \+ Linked Lists/Trees | O(1) (avg) / O(n) (worst) | Key-Value association; caching. | Mutable keys causing hash code changes; poor hash distribution. |
| **Map** | TreeMap | Red-Black Tree | O(log n) | Sorted Key-Value storage. | assuming O(1) performance; null keys are not allowed. |
| **Set** | HashSet | HashMap (internal) | O(1) (avg) | Uniqueness checks; deduplication. | Relying on insertion order (use LinkedHashSet). |

#### **2.2.1 ArrayList vs. LinkedList**

A classic interview archetype asks candidates to choose between ArrayList and LinkedList. The ArrayList uses a backing array that resizes dynamically (usually growing by 50% when full). Random access (get(index)) is constant time O(1). However, inserting or removing elements from the middle or beginning requires shifting subsequent elements, resulting in O(n) complexity. Conversely, LinkedList allows O(1) insertion/removal if the node reference is known, but finding a specific index requires traversing the list (O(n)). In modern hardware, ArrayList is often preferred due to **cache locality**, whereas LinkedList nodes are scattered in memory, causing cache misses.1

#### **2.2.2 HashMap Internals**

Candidates must explain how HashMap handles collisions. In Java 8 and later, if a bucket contains too many items (threshold of 8), the internal Linked List transforms into a **Red-Black Tree**, improving worst-case search complexity from O(n) to O(log n). Understanding hashCode() and equals() contracts is vital here: if two objects are equal, they must have the same hash code. Violating this breaks the map's retrieval logic.1

### **2.3 Concurrency and Multithreading**

While interns may only need a conceptual grasp of threading, junior developers are expected to write thread-safe code.

* **Thread Creation:** Implementing Runnable or Callable interfaces vs. extending Thread.  
* **Synchronization:** Using the synchronized keyword (method or block level) to prevent race conditions.  
* **Visibility:** The volatile keyword ensures that changes to a variable are immediately visible to other threads, preventing CPU caching issues, though it does not guarantee atomicity.7  
* **High-Level Utilities:** Using ExecutorService for thread pooling instead of manually managing thread lifecycles, and ConcurrentHashMap for thread-safe maps without blocking the entire collection.1

### **2.4 Functional Programming (Java 8+)**

The modern syllabus heavily emphasizes the Stream API and Lambda expressions. Candidates must be comfortable with:

* **Intermediate Operations:** map, filter, distinct, sorted (lazy evaluation).  
* **Terminal Operations:** collect, reduce, forEach, count.  
* **Collectors:** Using groupingBy and partitioningBy for complex data aggregation.10

## **3\. TestDome Core Archetypes: Deep Dive Analysis**

This section provides a granular analysis of specific problems cited in the query, widely used in TestDome assessments. Each analysis includes the conceptual underpinning, the optimal approach, and the specific traps candidates fall into.

### **3.1. Problem: Train Composition**

**Archetype:** Data Structures (Deque / Doubly Linked List) **Source:** 12  
**Concept:**  
The problem requires designing a data structure to manage a train where wagons can be attached or detached from either the left (front) or the right (back). This is a classic "Double-Ended Queue" (Deque) scenario. The operations must be efficient, ideally O(1).  
**Optimal Approach:**  
The naive approach of using a standard ArrayList or a singly LinkedList fails performance tests due to O(n) complexity for operations at one of the ends.

* **ArrayList:** Adding/Removing at index 0 requires shifting all elements.  
* **Singly LinkedList:** Accessing the "tail" is expensive without a specific tail pointer, and removing the tail requires traversing to the second-to-last node.

The optimal solution utilizes Java's built-in **Deque** interface, implemented by LinkedList (which is a doubly linked list) or ArrayDeque.

Java

import java.util.Deque;  
import java.util.LinkedList;

public class TrainComposition {  
    // Deque provides efficient insertion/removal from both ends  
    private Deque\<Integer\> wagons \= new LinkedList\<\>();

    public void attachWagonFromLeft(int wagonId) {  
        wagons.addFirst(wagonId); // O(1)  
    }

    public void attachWagonFromRight(int wagonId) {  
        wagons.addLast(wagonId);  // O(1)  
    }

    public int detachWagonFromLeft() {  
        if (wagons.isEmpty()) return 0; // Handle empty case conceptually  
        return wagons.removeFirst(); // O(1)  
    }

    public int detachWagonFromRight() {  
        if (wagons.isEmpty()) return 0;  
        return wagons.removeLast();  // O(1)  
    }  
}

**Common Pitfalls:**

1. **Using ArrayList:** Candidates frequently use ArrayList. While add(item) (append) is O(1), add(0, item) (prepend) is O(n). For a large number of operations (e.g., 100,000), this leads to a Time Limit Exceeded (TLE) error.  
2. **Custom Implementation:** Attempting to implement a doubly linked list from scratch (Node class with prev and next). While demonstrating knowledge, it is error-prone and slower to write than using the standard library Deque, which is the expected "engineering" solution.

### **3.2. Problem: Sorted Search**

**Archetype:** Algorithmic Thinking (Binary Search) **Source:** 15  
**Concept:**  
The task is to count how many integers in a *sorted* array are strictly less than a given parameter lessThan. The array contains unique integers.  
**Optimal Approach:**  
A linear scan (for loop) checking every element is O(n). While functionally correct, it fails on large datasets (e.g., 1 million elements) due to time constraints. The presence of a *sorted* array is the critical hint to use **Binary Search**, which operates in O(log n) time.  
The goal is to find the index of the first number that is greater than or equal to lessThan. Because the array is sorted and 0-indexed, this index represents the count of numbers smaller than the target.  
Java's Arrays.binarySearch utility is powerful here, but its return value behavior must be understood:

* **Found:** Returns the index of the element.  
* **Not Found:** Returns (-(insertion point) \- 1). The "insertion point" is the index where the key would be inserted to maintain order.

Java

import java.util.Arrays;

public class SortedSearch {  
    public static int countNumbers(int sortedArray, int lessThan) {  
        // O(log n) complexity  
        int index \= Arrays.binarySearch(sortedArray, lessThan);  
          
        if (index \>= 0\) {  
            // Element found. Since array is unique, the index is the count   
            // of elements strictly smaller than it.  
            return index;  
        } else {  
            // Element not found. Arrays.binarySearch returns (-(insertion point) \- 1).  
            // We need the insertion point.  
            // Formula: insertionPoint \= \-(index \+ 1\)  
            return \-(index \+ 1);  
        }  
    }  
}

**Common Pitfalls:**

1. **Linear Search:** Implementing a simple loop (for (int i : sortedArray) if (i \< lessThan) count++;). This is the most common failure reason due to performance timeouts.17  
2. **Off-by-One Errors:** Misinterpreting the negative return value of binarySearch. Failing to convert (-(insertion point) \- 1\) correctly back to the insertion point leads to incorrect counts.  
3. **Boundary Conditions:** Failing to handle cases where the target is smaller than the first element (returns 0\) or larger than the last element (returns array.length).

### **3.3. Problem: Song**

**Archetype:** Linked List Cycle Detection **Source:** 12  
**Concept:**  
A playlist is defined as a chain of Song objects, where each song points to the next. The goal is to detect if the playlist repeats (i.e., contains a cycle).  
**Optimal Approach:**  
This is a direct application of **Floyd’s Cycle-Finding Algorithm** (often called the "Tortoise and Hare" algorithm). This approach detects cycles with O(n) time complexity and O(1) space complexity.

* **Tortoise (slow):** Moves 1 step at a time.  
* **Hare (fast):** Moves 2 steps at a time.  
* **Logic:** If there is a cycle, the fast pointer will eventually enter the cycle and "lap" the slow pointer, causing them to point to the same object. If there is no cycle, the fast pointer will reach null (the end of the list).

Java

public class Song {  
    private String name;  
    private Song nextSong;

    public Song(String name) {  
        this.name \= name;  
    }

    public void setNextSong(Song nextSong) {  
        this.nextSong \= nextSong;  
    }

    public boolean isRepeatingPlaylist() {  
        Song slow \= this;  
        Song fast \= this.nextSong; // Start fast one step ahead to facilitate loop check

        while (fast\!= null && fast.nextSong\!= null) {  
            if (slow \== fast) {  
                return true; // Cycle detected  
            }  
            slow \= slow.nextSong;          // Move 1 step  
            fast \= fast.nextSong.nextSong; // Move 2 steps  
        }  
        return false; // Reached end of list  
    }  
}

**Common Pitfalls:**

1. **Checking Names:** Comparing song *names* (this.name.equals(other.name)) instead of object references (this \== other). Two distinct song objects might have the same title but represent different nodes in the list. The problem asks about the *structure* of the playlist, not the content.18  
2. **HashSet approach (Sub-optimal):** Using a HashSet\<Song\> to track visited nodes. While this works (O(n) time), it uses O(n) memory. In strict memory-constrained environments, Floyd's algorithm is superior.  
3. **Null Pointer Exceptions:** Failing to check if fast or fast.nextSong is null before accessing fast.nextSong.nextSong.

### **3.4. Problem: User Input**

**Archetype:** OOP Inheritance & Polymorphism **Source:** 19  
**Concept:**  
The candidate must implement a base class TextInput and a subclass NumericInput. NumericInput should inherit functionality but override the add method to filter out non-digit characters. This tests the **Liskov Substitution Principle** and code reuse.  
**Optimal Approach:**

* **TextInput:** Contains a storage mechanism (e.g., StringBuilder) and methods to add characters and retrieve the value.  
* **NumericInput:** Extends TextInput. Overrides add(char c). Checks if the character is a digit (Character.isDigit(c)). If valid, it delegates the actual addition to the parent class using super.add(c).

Java

public class TextInput {  
    // StringBuilder is mutable and efficient for append operations  
    protected StringBuilder value \= new StringBuilder();

    public void add(char c) {  
        value.append(c);  
    }

    public String getValue() {  
        return value.toString();  
    }  
}

public class NumericInput extends TextInput {  
    @Override  
    public void add(char c) {  
        // Only accept digits  
        if (Character.isDigit(c)) {  
            // Reuse parent logic to store data  
            super.add(c);  
        }  
        // Non-digits are simply ignored (no exception thrown)  
    }  
}

**Common Pitfalls:**

1. **Redundant Storage:** Declaring a separate value field in NumericInput. This "shadows" the storage in TextInput, leading to a situation where getValue() (inherited from TextInput) returns an empty string because the data was stored in NumericInput's private field.  
2. **Logic Duplication:** Re-implementing the append logic inside NumericInput instead of calling super.add(c). This defeats the purpose of inheritance.  
3. **String Concatenation:** Using String and \+= for storage. As discussed in the syllabus, this is inefficient O(n^2) for many updates. StringBuilder is the correct engineering choice.

### **3.5. Problem: Game Platform**

**Archetype:** Simulation / Arrays / Floating Point Logic **Source:** 12  
**Concept:**  
Calculate the final speed of a character moving over terrain defined by an array of inclinations. Speed changes based on the incline.

* **Initial Speed:** double  
* **Incline:** int (degrees)  
* **Rule:** Speed \= Speed \- Incline.  
* **Constraint:** If speed drops to 0 or less at any point, the character dies, and the final result must be 0\.

**Optimal Approach:**  
Iterate through the array, updating the state (speed) at each step, and check the termination condition immediately.

Java

public class GamePlatform {  
    public static double calculateFinalSpeed(double initialSpeed, int inclinations) {  
        double currentSpeed \= initialSpeed;

        for (int incline : inclinations) {  
            currentSpeed \-= incline;  
              
            // Critical check: Immediate termination  
            if (currentSpeed \<= 0\) {  
                return 0;  
            }  
        }  
        return currentSpeed;  
    }  
}

**Common Pitfalls:**

1. **Ignoring Immediate Termination:** Calculating the net change of all inclines first (summing the array) and then applying it to the speed. This fails because a massive incline in the *middle* of the track could kill the character, even if subsequent declines would theoretically speed them up again. The state must be validated *after every step*.  
2. **Floating Point Comparison:** While currentSpeed \<= 0 works for this problem, candidates should be aware of floating-point inaccuracies. In stricter contexts, checking currentSpeed \<= 0.0001 (epsilon) might be safer, though usually not required here.

## **4\. Advanced TestDome & Algorithmic Challenges (Expanded Scope)**

Beyond the core five, modern assessments introduce more complex problems involving recursion, graph theory, and advanced design patterns. These problems distinguish top-tier candidates.

### **4.1. Problem: Boat Movements**

**Archetype:** Grid Traversal / Logic Verification / Graph Theory **Source:** 20  
**Concept:**  
A boat moves on a grid (boolean where true=water, false=land). The boat has specific movement capabilities:

1. Move 1 tile horizontally (left/right).  
2. Move 1 tile vertically (up/down).  
3. Move 2 tiles vertically (jump).  
   The function canTravelTo(fromRow, fromCol, toRow, toCol) usually asks if a *single* step is valid, not if a path exists (though variations exist).

**Optimal Approach (Single Step Check):**  
Instead of BFS, verify the move against the allowed rules.

* **Bounds Check:** Is destination inside the array?  
* **Terrain Check:** Is destination water (true)?  
* **Movement Logic:**  
  * **Horizontal:** row matches, |col1 \- col2| \== 1\.  
  * **Vertical (1 step):** col matches, |row1 \- row2| \== 1\.  
  * **Vertical (2 steps):** col matches, |row1 \- row2| \== 2\. **Crucial:** The intermediate tile (row1 \+ row2) / 2 must *also* be water. You cannot jump over land.

**Common Pitfall:**  
The "Jump Over Land" error. Candidates often check the destination tile but forget to check the tile in between for the 2-step move. The problem states the boat moves *through* water, implying the path must be clear.

### **4.2. Problem: Folders**

**Archetype:** Recursion / XML Parsing **Source:** 19  
**Concept:**  
Parse an XML string representing a folder structure and return all folder names starting with a specific letter.  
Example: \<folder name="users"\>\<folder name="admin" /\>\</folder\>  
**Optimal Approach:**  
Since the nesting depth is arbitrary, **Recursion** is the standard solution. Java's XML DOM parser (DocumentBuilder) is ideal here.

Java

import org.w3c.dom.\*;  
import javax.xml.parsers.\*;  
import org.xml.sax.InputSource;  
import java.io.StringReader;  
import java.util.\*;

public class Folders {  
    public static Collection\<String\> folderNames(String xml, char startingLetter) throws Exception {  
        DocumentBuilderFactory factory \= DocumentBuilderFactory.newInstance();  
        DocumentBuilder builder \= factory.newDocumentBuilder();  
        Document doc \= builder.parse(new InputSource(new StringReader(xml)));  
          
        List\<String\> result \= new ArrayList\<\>();  
        findFolders(doc.getDocumentElement(), startingLetter, result);  
        return result;  
    }

    private static void findFolders(Node node, char letter, List\<String\> result) {  
        // Check if current node is an Element (Folder)  
        if (node.getNodeType() \== Node.ELEMENT\_NODE) {  
            String name \= ((Element) node).getAttribute("name");  
            if (name\!= null &&\!name.isEmpty() && name.charAt(0) \== letter) {  
                result.add(name);  
            }  
        }

        // Recursively search children  
        NodeList children \= node.getChildNodes();  
        for (int i \= 0; i \< children.getLength(); i++) {  
            findFolders(children.item(i), letter, result);  
        }  
    }  
}

**Common Pitfalls:**

1. **Regex Parsing:** Attempting to use Regular Expressions (e.g., \<folder name="(\[^"\]\*)"\>). Regex is not suitable for parsing recursive/nested structures (HTML/XML) and often fails on edge cases or commented-out sections.25  
2. **Parsing Whitespace:** The DOM parser interprets newlines between tags as \#text nodes. A robust solution must explicitly check node.getNodeType() \== Node.ELEMENT\_NODE to avoid casting exceptions.

### **4.3. Problem: Alert Service**

**Archetype:** Architecture / Refactoring / Dependency Injection (IoC) **Source:** 12  
**Concept:**  
A class AlertService is tightly coupled to a MapAlertDAO. The task is to refactor it to use an interface AlertDAO, allowing for dependency injection. This is a test of architectural principles (DIP \- Dependency Inversion Principle).  
**Optimal Approach:**

1. **Create Interface:** Extract AlertDAO interface with methods addAlert and getAlert.  
2. **Implement:** Ensure MapAlertDAO implements AlertDAO.  
3. **Inject:** Modify AlertService to accept AlertDAO in its constructor.  
4. **Delegate:** Replace the internal new MapAlertDAO() with the injected instance.

**Common Pitfalls:**

1. **Visibility Modifiers:** The prompt often specifies "package-private" for the interface. Candidates habitually make it public, violating the requirements.  
2. **Partial Refactoring:** Adding the constructor but forgetting to remove the hardcoded instantiation inside the field declaration (private final AlertDAO storage \= new MapAlertDAO(); needs to become just private final AlertDAO storage;).

### **4.4. Problem: Mega Store**

**Archetype:** Business Logic / Enums / Strategy Pattern **Source:** 12  
**Concept:**  
Implement a discount calculator based on a DiscountType Enum (Standard, Seasonal, Weight). The logic for "Weight" discount is complex (e.g., depends on cart weight).  
**Optimal Approach:**  
Use a switch statement or the **Strategy Pattern** (if allowed/complex enough) on the Enum.

* **Standard:** Fixed %.  
* **Seasonal:** Fixed %.  
* **Weight:** If weight \<= 10, Discount X; else Discount Y.

**Common Pitfalls:**

1. **Hardcoding Values:** Using magic numbers (e.g., 0.06) without comments or constants.  
2. **Logic Errors:** Misinterpreting the "Weight" threshold (e.g., applying the discount to the *unit* price instead of *total* price, or getting the \< vs \<= condition wrong on the weight limit).

## **5\. Other Frequent Archetypes and Optimizations**

Beyond TestDome, candidates encountering platforms like Codility, HackerRank, or LeetCode must prepare for these common archetypes.

### **5.1. The "Two Sum" Archetype**

**Problem:** Find two numbers in an array that add up to a target.28 **Concept:** Time-Space Trade-off.

* **Naive Approach:** Nested loops (for i... for j...) check every pair. Complexity: O(n^2).  
* **Optimal Approach:** Use a **HashMap**.  
  * Iterate through the array.  
  * Calculate complement \= target \- current.  
  * Check if complement is in the map.  
  * If yes, return \[map.get(complement), current\_index\].  
  * If no, map.put(current, current\_index).  
  * **Complexity:** O(n) time, O(n) space.

### **5.2. Merge Names (Set Usage)**

**Problem:** Merge two arrays of strings and remove duplicates.  
**Optimal Approach:** Use a HashSet (or LinkedHashSet if order matters).

* Add all elements from Array 1\.  
* Add all elements from Array 2\.  
* Convert Set back to Array.  
* **Pitfall:** Manually checking for duplicates using nested loops (O(n^2)). Set handles this in O(n).

### **5.3. Stream API Aggregations**

**Problem:** Given a list of Employees, group them by Department.  
**Optimal Approach:**

Java

Map\<Department, List\<Employee\>\> byDept \= employees.stream()  
   .collect(Collectors.groupingBy(Employee::getDepartment));

**Pitfall:** Being unable to write this syntax from memory. It is a standard interview question for modern Java roles.10

### **5.4. Concurrency: Thread-Safe Counter**

**Problem:** Increment a shared counter from multiple threads.  
**Approaches:**

1. **Anti-Pattern:** count++. This is not atomic (Read-Modify-Write). It causes race conditions.  
2. **Sub-Optimal:** synchronized method. Safe, but blocking. High contention reduces performance.  
3. **Optimal:** **AtomicInteger**. Uses hardware-level CAS (Compare-And-Swap) operations. Non-blocking and highly performant.  
   Java  
   AtomicInteger count \= new AtomicInteger(0);  
   count.incrementAndGet();

## **6\. Conclusion**

The 2025/2026 technical assessment syllabus for Java Interns and Juniors demands a balanced mastery of theoretical computer science and practical Java engineering. Success requires more than syntax memorization; it necessitates an internalized understanding of data structure complexity (e.g., why Deque outperforms ArrayList for train composition), memory models (e.g., why recursion depth matters in XML parsing), and architectural decoupling (e.g., the importance of the Alert Service refactoring).  
Candidates must approach these problems with "Engineering Judgment"—the ability to explain *why* a solution is optimal, not just *how* it works. By mastering the archetypes detailed in this report—from the binary search logic of Sorted Search to the cycle detection in Songs—candidates can demonstrate the technical maturity required to contribute effectively to enterprise-grade Java systems.

## **7\. Citation Index**

* **TestDome Problems:** 12  
* **Algorithms & Logic:** 10  
* **Syllabus & Trends:** 1  
* **Concurrency & JVM:** 1

#### **Referências citadas**

1. Java Coding Interview Questions (2025): Collections, Streams ..., acessado em fevereiro 10, 2026, [https://www.shadecoder.com/blogs/java-coding-interview-questions](https://www.shadecoder.com/blogs/java-coding-interview-questions)  
2. Java Developer Roadmap 2025 | PDF \- Scribd, acessado em fevereiro 10, 2026, [https://www.scribd.com/document/856743505/Java-Developer-Roadmap-2025](https://www.scribd.com/document/856743505/Java-Developer-Roadmap-2025)  
3. Do This Before Your Java Interview : Nail These 25 Interview Questions \- YouTube, acessado em fevereiro 10, 2026, [https://www.youtube.com/watch?v=oIGUSXCjE2I](https://www.youtube.com/watch?v=oIGUSXCjE2I)  
4. Coding interview with Java — Top 3 things to focus on | by Arvind Telharkar \- Medium, acessado em fevereiro 10, 2026, [https://medium.com/effective-java/coding-interview-with-java-top-3-things-to-focus-on-71d5ebaeb3c](https://medium.com/effective-java/coding-interview-with-java-top-3-things-to-focus-on-71d5ebaeb3c)  
5. Java Coding Interview Questions \+ Answers (With Code Examples ..., acessado em fevereiro 10, 2026, [https://zerotomastery.io/blog/java-coding-interview-questions/](https://zerotomastery.io/blog/java-coding-interview-questions/)  
6. 29 Java Interview Questions and Answers to Know | Built In, acessado em fevereiro 10, 2026, [https://builtin.com/software-engineering-perspectives/java-interview-questions](https://builtin.com/software-engineering-perspectives/java-interview-questions)  
7. Java Concurrency Interview Questions (+ Answers) \- Baeldung, acessado em fevereiro 10, 2026, [https://www.baeldung.com/java-concurrency-interview-questions](https://www.baeldung.com/java-concurrency-interview-questions)  
8. Common Concurrency Pitfalls in Java \- Baeldung, acessado em fevereiro 10, 2026, [https://www.baeldung.com/java-common-concurrency-pitfalls](https://www.baeldung.com/java-common-concurrency-pitfalls)  
9. Java Technical Interview Preparation Guide: Questions & Answers for 2025 \- Hackajob, acessado em fevereiro 10, 2026, [https://hackajob.com/talent/technical-assessment/java-technical-interview-preparation-guide](https://hackajob.com/talent/technical-assessment/java-technical-interview-preparation-guide)  
10. Java 8 Streams \- Grouping, Partitioning… \- Medium, acessado em fevereiro 10, 2026, [https://medium.com/@techproceed/java-8-streams-9d0204700522](https://medium.com/@techproceed/java-8-streams-9d0204700522)  
11. Grouping and Sorting a Collection with Java 8 Streams \- Stack Overflow, acessado em fevereiro 10, 2026, [https://stackoverflow.com/questions/40577012/grouping-and-sorting-a-collection-with-java-8-streams](https://stackoverflow.com/questions/40577012/grouping-and-sorting-a-collection-with-java-8-streams)  
12. Java Online Test | TestDome, acessado em fevereiro 10, 2026, [https://www.testdome.com/tests/java-online-test/24](https://www.testdome.com/tests/java-online-test/24)  
13. jdegand/testdome-java-questions: My solutions to Test ... \- GitHub, acessado em fevereiro 10, 2026, [https://github.com/jdegand/testdome-java-questions](https://github.com/jdegand/testdome-java-questions)  
14. How to make improve performance on my implement of this LinkedList? \- Stack Overflow, acessado em fevereiro 10, 2026, [https://stackoverflow.com/questions/45643556/how-to-make-improve-performance-on-my-implement-of-this-linkedlist](https://stackoverflow.com/questions/45643556/how-to-make-improve-performance-on-my-implement-of-this-linkedlist)  
15. Java Spring Online Test | TestDome, acessado em fevereiro 10, 2026, [https://www.testdome.com/tests/java-spring-online-test/97](https://www.testdome.com/tests/java-spring-online-test/97)  
16. java \- Sorted Search, count numbers less than target value \- Stack ..., acessado em fevereiro 10, 2026, [https://stackoverflow.com/questions/61398053/sorted-search-count-numbers-less-than-target-value](https://stackoverflow.com/questions/61398053/sorted-search-count-numbers-less-than-target-value)  
17. c\# \- sorted search increase performance \- Stack Overflow, acessado em fevereiro 10, 2026, [https://stackoverflow.com/questions/46376441/sorted-search-increase-performance](https://stackoverflow.com/questions/46376441/sorted-search-increase-performance)  
18. c\# \- How do i find if its a repeating playlist? \- Stack Overflow, acessado em fevereiro 10, 2026, [https://stackoverflow.com/questions/57217114/how-do-i-find-if-its-a-repeating-playlist](https://stackoverflow.com/questions/57217114/how-do-i-find-if-its-a-repeating-playlist)  
19. Android and Java Online Test \- TestDome, acessado em fevereiro 10, 2026, [https://www.testdome.com/tests/java-android-online-test/51](https://www.testdome.com/tests/java-android-online-test/51)  
20. Java Spring Boot Online Test | TestDome, acessado em fevereiro 10, 2026, [https://www.testdome.com/tests/java-spring-boot-online-test/187](https://www.testdome.com/tests/java-spring-boot-online-test/187)  
21. Game Platform | Java \- TestDome, acessado em fevereiro 10, 2026, [https://www.testdome.com/questions/java/game-platform/117604](https://www.testdome.com/questions/java/game-platform/117604)  
22. Boat Movements | Java \- TestDome, acessado em fevereiro 10, 2026, [https://www.testdome.com/questions/java/boat-movements/113622](https://www.testdome.com/questions/java/boat-movements/113622)  
23. python \- How to solve boat movements using Graph algorithm ..., acessado em fevereiro 10, 2026, [https://stackoverflow.com/questions/78144507/how-to-solve-boat-movements-using-graph-algorithm](https://stackoverflow.com/questions/78144507/how-to-solve-boat-movements-using-graph-algorithm)  
24. TestDome \- Read XML \- Folders · GitHub, acessado em fevereiro 10, 2026, [https://gist.github.com/c06663c98d519f5bb400914732ad76bd](https://gist.github.com/c06663c98d519f5bb400914732ad76bd)  
25. testdome-Java/Folders.java at master \- GitHub, acessado em fevereiro 10, 2026, [https://github.com/luhan2016/testdome-Java/blob/master/Folders.java](https://github.com/luhan2016/testdome-Java/blob/master/Folders.java)  
26. Alert Service (Refactor the AlertService and MapAlertDAO classes) \- Stack Overflow, acessado em fevereiro 10, 2026, [https://stackoverflow.com/questions/52886604/alert-service-refactor-the-alertservice-and-mapalertdao-classes](https://stackoverflow.com/questions/52886604/alert-service-refactor-the-alertservice-and-mapalertdao-classes)  
27. acessado em dezembro 31, 1969, [https://github.com/jdegand/testdome-java-questions/blob/main/Java/AlertService.java](https://github.com/jdegand/testdome-java-questions/blob/main/Java/AlertService.java)  
28. Solving the 'Two Sum Problem' on LeetCode — Java Solutions Walkthrough \- Medium, acessado em fevereiro 10, 2026, [https://medium.com/@AlexanderObregon/solving-the-two-sum-problem-on-leetcode-a-java-walkthrough-3388ce0186e4](https://medium.com/@AlexanderObregon/solving-the-two-sum-problem-on-leetcode-a-java-walkthrough-3388ce0186e4)  
29. The Two Sum Problem in JavaScript \- DEV Community, acessado em fevereiro 10, 2026, [https://dev.to/eidorianavi/the-two-sum-problem-in-javascript-2gm7](https://dev.to/eidorianavi/the-two-sum-problem-in-javascript-2gm7)  
30. Top Java Coding Interview Questions (With Answers) \- DigitalOcean, acessado em fevereiro 10, 2026, [https://www.digitalocean.com/community/tutorials/java-programming-interview-questions](https://www.digitalocean.com/community/tutorials/java-programming-interview-questions)  
31. The Difference Between an Intern and A Junior Developer \- Alabian Solutions, acessado em fevereiro 10, 2026, [https://alabiansolutions.com/blog/the-difference-between-an-intern-and-a-junior-developer-2/](https://alabiansolutions.com/blog/the-difference-between-an-intern-and-a-junior-developer-2/)  
32. What to expect from a Java Intern or Jr. Java developer : r/developersIndia \- Reddit, acessado em fevereiro 10, 2026, [https://www.reddit.com/r/developersIndia/comments/1j0yqdd/what\_to\_expect\_from\_a\_java\_intern\_or\_jr\_java/](https://www.reddit.com/r/developersIndia/comments/1j0yqdd/what_to_expect_from_a_java_intern_or_jr_java/)  
33. Learn to become a modern Java developer, acessado em fevereiro 10, 2026, [https://roadmap.sh/java](https://roadmap.sh/java)