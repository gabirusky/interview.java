import { Problem } from "./types";

export const coreProblems: Problem[] = [
    {
        id: "train-composition",
        title: "Train Composition",
        archetype: "Data Structures (Deque)",
        source: "TestDome",
        concept:
            "The problem requires designing a data structure to manage a train where wagons can be attached or detached from either the left (front) or the right (back). This is a classic \"Double-Ended Queue\" (Deque) scenario. The operations must be efficient, ideally O(1). The naive approach of using a standard ArrayList or a singly LinkedList fails performance tests due to O(n) complexity for operations at one of the ends. ArrayList: Adding/Removing at index 0 requires shifting all elements. Singly LinkedList: Accessing the \"tail\" is expensive without a specific tail pointer, and removing the tail requires traversing to the second-to-last node.",
        optimalApproach:
            "Use Java's built-in Deque interface, implemented by LinkedList (which is a doubly linked list) or ArrayDeque. All operations — addFirst, addLast, removeFirst, removeLast — are O(1).",
        code: `import java.util.Deque;
import java.util.LinkedList;

public class TrainComposition {
    // Deque provides efficient insertion/removal from both ends
    private Deque<Integer> wagons = new ArrayDeque<>();

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
}`,
        pitfalls: [
            {
                title: "Using ArrayList",
                description:
                    "Candidates frequently use ArrayList. While add(item) (append) is O(1), add(0, item) (prepend) is O(n). For a large number of operations (e.g., 100,000), this leads to a Time Limit Exceeded (TLE) error.",
            },
            {
                title: "Custom Implementation",
                description:
                    "Attempting to implement a doubly linked list from scratch (Node class with prev and next). While demonstrating knowledge, it is error-prone and slower to write than using the standard library Deque, which is the expected \"engineering\" solution.",
            },
        ],
    },
    {
        id: "sorted-search",
        title: "Sorted Search",
        archetype: "Algorithmic Thinking (Binary Search)",
        source: "TestDome",
        concept:
            "The task is to count how many integers in a sorted array are strictly less than a given parameter lessThan. The array contains unique integers. A linear scan (for loop) checking every element is O(n). While functionally correct, it fails on large datasets (e.g., 1 million elements) due to time constraints. The presence of a sorted array is the critical hint to use Binary Search, which operates in O(log n) time. The goal is to find the index of the first number that is greater than or equal to lessThan. Because the array is sorted and 0-indexed, this index represents the count of numbers smaller than the target.",
        optimalApproach:
            "Use Java's Arrays.binarySearch utility. If found, the index IS the count of smaller elements. If not found, it returns (-(insertion point) - 1); transform this back to get the insertion point, which equals the count.",
        code: `import java.util.Arrays;

public class SortedSearch {
    public static int countNumbers(int sortedArray, int lessThan) {
        // O(log n) complexity
        int index = Arrays.binarySearch(sortedArray, lessThan);

        if (index >= 0) {
            // Element found. Since array is unique, the index is the count
            // of elements strictly smaller than it.
            return index;
        } else {
            // Element not found. Arrays.binarySearch returns (-(insertion point) - 1).
            // We need the insertion point.
            // Formula: insertionPoint = -(index + 1)
            return -(index + 1);
        }
    }
}`,
        pitfalls: [
            {
                title: "Linear Search",
                description:
                    "Implementing a simple loop (for (int i : sortedArray) if (i < lessThan) count++;). This is the most common failure reason due to performance timeouts.",
            },
            {
                title: "Off-by-One Errors",
                description:
                    "Misinterpreting the negative return value of binarySearch. Failing to convert (-(insertion point) - 1) correctly back to the insertion point leads to incorrect counts.",
            },
            {
                title: "Boundary Conditions",
                description:
                    "Failing to handle cases where the target is smaller than the first element (returns 0) or larger than the last element (returns array.length).",
            },
        ],
    },
    {
        id: "song-cycle",
        title: "Song (Cycle Detection)",
        archetype: "Linked List Cycle Detection",
        source: "TestDome",
        concept:
            "A playlist is defined as a chain of Song objects, where each song points to the next. The goal is to detect if the playlist repeats (i.e., contains a cycle). This is a direct application of Floyd's Cycle-Finding Algorithm (often called the \"Tortoise and Hare\" algorithm). This approach detects cycles with O(n) time complexity and O(1) space complexity. Tortoise (slow): Moves 1 step at a time. Hare (fast): Moves 2 steps at a time. Logic: If there is a cycle, the fast pointer will eventually enter the cycle and \"lap\" the slow pointer, causing them to point to the same object. If there is no cycle, the fast pointer will reach null (the end of the list).",
        optimalApproach:
            "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare). Two pointers moving at different speeds — if they meet, a cycle exists. O(n) time, O(1) space.",
        code: `public class Song {
    private String name;
    private Song nextSong;

    public Song(String name) {
        this.name = name;
    }

    public void setNextSong(Song nextSong) {
        this.nextSong = nextSong;
    }

    public boolean isRepeatingPlaylist() {
        Song slow = this;
        Song fast = this.nextSong; // Start fast one step ahead

        while (fast != null && fast.nextSong != null) {
            if (slow == fast) {
                return true; // Cycle detected
            }
            slow = slow.nextSong;          // Move 1 step
            fast = fast.nextSong.nextSong; // Move 2 steps
        }
        return false; // Reached end of list
    }
}`,
        pitfalls: [
            {
                title: "Checking Names Instead of References",
                description:
                    "Comparing song names (this.name.equals(other.name)) instead of object references (this == other). Two distinct song objects might have the same title but represent different nodes in the list. The problem asks about the structure of the playlist, not the content.",
            },
            {
                title: "HashSet Approach (Sub-optimal)",
                description:
                    "Using a HashSet<Song> to track visited nodes. While this works (O(n) time), it uses O(n) memory. In strict memory-constrained environments, Floyd's algorithm is superior.",
            },
            {
                title: "Null Pointer Exceptions",
                description:
                    "Failing to check if fast or fast.nextSong is null before accessing fast.nextSong.nextSong.",
            },
        ],
    },
    {
        id: "user-input",
        title: "User Input (OOP Inheritance)",
        archetype: "OOP Inheritance & Polymorphism",
        source: "TestDome",
        concept:
            "The candidate must implement a base class TextInput and a subclass NumericInput. NumericInput should inherit functionality but override the add method to filter out non-digit characters. This tests the Liskov Substitution Principle and code reuse. TextInput: Contains a storage mechanism (e.g., StringBuilder) and methods to add characters and retrieve the value. NumericInput: Extends TextInput. Overrides add(char c). Checks if the character is a digit (Character.isDigit(c)). If valid, it delegates the actual addition to the parent class using super.add(c).",
        optimalApproach:
            "Create TextInput with StringBuilder storage. NumericInput extends TextInput and overrides add(char c) to filter with Character.isDigit(c), then delegates to super.add(c) for storage.",
        code: `public class TextInput {
    // StringBuilder is mutable and efficient for append operations
    protected StringBuilder value = new StringBuilder();

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
}`,
        pitfalls: [
            {
                title: "Redundant Storage (Shadowing)",
                description:
                    "Declaring a separate value field in NumericInput. This \"shadows\" the storage in TextInput, leading to a situation where getValue() (inherited from TextInput) returns an empty string because the data was stored in NumericInput's private field.",
            },
            {
                title: "Logic Duplication",
                description:
                    "Re-implementing the append logic inside NumericInput instead of calling super.add(c). This defeats the purpose of inheritance.",
            },
            {
                title: "String Concatenation",
                description:
                    "Using String and += for storage. This is inefficient O(n²) for many updates. StringBuilder is the correct engineering choice.",
            },
        ],
    },
    {
        id: "game-platform",
        title: "Game Platform",
        archetype: "Simulation / Arrays / Floating Point Logic",
        source: "TestDome",
        concept:
            "Calculate the final speed of a character moving over terrain defined by an array of inclinations. Speed changes based on the incline. Initial Speed: double. Incline: int (degrees). Rule: Speed = Speed - Incline. Constraint: If speed drops to 0 or less at any point, the character dies, and the final result must be 0.",
        optimalApproach:
            "Iterate through the array, updating the state (speed) at each step, and check the termination condition immediately after each update. If speed <= 0 at any point, return 0 right away.",
        code: `public class GamePlatform {
    public static double calculateFinalSpeed(double initialSpeed, int inclinations) {
        double currentSpeed = initialSpeed;

        for (int incline : inclinations) {
            currentSpeed -= incline;

            // Critical check: Immediate termination
            if (currentSpeed <= 0) {
                return 0;
            }
        }
        return currentSpeed;
    }
}`,
        pitfalls: [
            {
                title: "Ignoring Immediate Termination",
                description:
                    "Calculating the net change of all inclines first (summing the array) and then applying it to the speed. This fails because a massive incline in the middle of the track could kill the character, even if subsequent declines would theoretically speed them up again. The state must be validated after every step.",
            },
            {
                title: "Floating Point Comparison",
                description:
                    "While currentSpeed <= 0 works for this problem, candidates should be aware of floating-point inaccuracies. In stricter contexts, checking currentSpeed <= 0.0001 (epsilon) might be safer, though usually not required here.",
            },
        ],
    },
];
