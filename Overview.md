Here is a structured overview of the Java technical interview syllabus, categorized by problem archetype. This breakdown includes the core concepts, optimal approaches, common pitfalls, and citation links to the research material.

### **1\. Core TestDome Archetypes (The "Big 5")**

These problems form the baseline for valid entry-level engineering judgment, focusing on data structure selection and object-oriented principles.

| Problem Name | Primary Concept | Optimal Approach | Common Pitfall | Source |
| :---- | :---- | :---- | :---- | :---- |
| **Train Composition** | Data Structures (Deque) | Use ArrayDeque or LinkedList (as Deque) for O(1) insertion/removal at both ends. | Using ArrayList (O(n) for head operations) causes timeouts on large datasets. |  |
| **Sorted Search** | Binary Search | Use Arrays.binarySearch. If not found, transform result (-insertion\_point \- 1\) to find the count of smaller elements. | Using linear search (O(n)) loops, which fail performance tests. |  |
| **Song** | Cycle Detection | **Floyd’s Cycle-Finding Algorithm** (Tortoise & Hare). Two pointers moving at different speeds. | Comparing song *names* (Strings) instead of object references; using O(n) memory with HashSet. |  |
| **User Input** | OOP (Inheritance) | Create NumericInput extends TextInput. Override add(char) to check Character.isDigit(c) before calling super.add(c). | Re-implementing the storage logic in the subclass (shadowing) instead of reusing the parent's StringBuilder. |  |
| **Game Platform** | Array Iteration & Simulation | Iterate through inclinations. Update speed. **Check speed \<= 0 immediately** inside the loop to return 0\. | Summing all inclines first; failing to check for death (0 speed) at *every* step of the iteration. |  |

### **2\. Advanced Algorithmic Challenges (Hard/Senior)**

These problems test specific domain knowledge (Graphs, XML, Recursion) and architectural patterns.

* **Boat Movements (Graph/Logic)**  
  * **Concept:** Grid traversal with restricted movement rules (1 step horizontal, 2 steps vertical).  
  * **Optimal Approach:** Validate toRow/toCol bounds. Check if destination is water (true). Crucially, if moving 2 steps vertically, check the **intermediate** tile for water as well.  
  * **Source:**

* **Folders (XML Parsing/Recursion)**  
  * **Concept:** Hierarchical data parsing.  
  * **Optimal Approach:** Use Java's DOM Parser (DocumentBuilder). Recursively iterate through childNodes. If a node is an ELEMENT\_NODE and the "name" attribute starts with the target letter, add it.  
  * **Pitfall:** Using Regex to parse XML (fragile); failing to handle whitespace nodes (\#text) in DOM.  
  * **Source:**

* **Route Planner (Graph/BFS)**  
  * **Concept:** Pathfinding in a grid.  
  * **Optimal Approach:** Breadth-First Search (BFS) using a Queue to find if a path exists. Mark visited nodes to prevent cycles.  
  * **Source:**

* **Alert Service (Refactoring/Architecture)**  
  * **Concept:** Dependency Injection (IoC) & SOLID Principles.  
  * **Optimal Approach:** Extract an interface AlertDAO. Refactor AlertService to accept AlertDAO in its constructor (Constructor Injection) rather than instantiating a concrete MapAlertDAO internally.  
  * **Source:**

### **3\. Codility & Mathematical Optimization Archetypes**

Common in screening for logical reasoning and bit-wise operations.

* **Binary Gap**  
  * **Concept:** Bit Manipulation.  
  * **Optimal Approach:** Iterate through bits using n & 1 and signed right shift \>\>. Track the maximum sequence of 0s between two 1s.  
  * **Pitfall:** Failing to handle trailing zeros (which are not bounded by a 1 and thus not a "gap").  
  * **Source:**,  
* **Odd Occurrences In Array**  
  * **Concept:** XOR Bitwise Operation.  
  * **Optimal Approach:** XOR all elements in the array. Since A ^ A \= 0 and A ^ 0 \= A, all pairs cancel out, leaving the single unique number. Time: O(N), Space: O(1).  
  * **Pitfall:** Using a HashMap or sorting, which uses O(N) space or O(N log N) time respectively.  
  * **Source:** \[\],

* **Cyclic Rotation**  
  * **Concept:** Array Indexing / Modulo.  
  * **Optimal Approach:** Calculate new position: newIndex \= (i \+ K) % N. Create a new array and place elements directly.  
  * **Source:**

### **4\. Modern Java & Theory (2025 Syllabus)**

Topics expected for "Modern" Java roles, moving beyond Java 8\.

* **Java 21 Features**  
  * **Virtual Threads:** Lightweight threads managed by the JVM (Project Loom) for high-throughput concurrency.  
  * **Records:** Concise syntax for immutable data carriers (replacing Lombok/POJOs).  
  * **Pattern Matching:** Enhanced switch statements and instanceof checks.  
* **Stream API (Grouping & Partitioning)**  
  * **Grouping:** Collectors.groupingBy(Employee::getDepartment) \-\> Returns Map\<Dept, List\<Emp\>\>.  
  * **Partitioning:** Collectors.partitioningBy(e \-\> e.getSalary() \> 1000\) \-\> Returns Map\<Boolean, List\<Emp\>\>.  
  * **Source:**,  
* **Concurrency Pitfalls**  
  * **Deadlock:** Two threads waiting on each other's locks.  
  * **Race Condition:** Shared mutable state accessed without synchronization (e.g., count++ is not atomic; use AtomicInteger).  
  * **Source:**  
