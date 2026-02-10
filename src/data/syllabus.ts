import { SyllabusTopic } from "./types";

export const syllabus: SyllabusTopic[] = [
    {
        id: "core-language",
        title: "Core Language Mechanics & Memory Models",
        icon: "BookOpen",
        description:
            "Master the syntax and core mechanics of Java: primitive vs. reference types, autoboxing/unboxing, String immutability, StringBuilder, and the Stack vs. Heap memory model.",
        keyPoints: [
            "Primitive vs. Reference types & autoboxing/unboxing performance implications",
            "String immutability — loop concatenation is O(n²); use StringBuilder for O(n)",
            "== (reference comparison) vs .equals() (content comparison)",
            "Stack Memory: primitives & references (LIFO, method execution)",
            "Heap Memory: objects & JRE classes (managed by Garbage Collector)",
            "Understanding StackOverflowError and OutOfMemoryError",
        ],
    },
    {
        id: "collections",
        title: "Collections Framework",
        icon: "Database",
        description:
            "The most critical component of the technical syllabus. Understand underlying data structures, internal mechanics, and make smart trade-offs between implementations.",
        keyPoints: [
            "ArrayList vs. LinkedList — cache locality vs. O(1) end insertions",
            "HashMap internals: buckets, collisions, Red-Black Tree (Java 8+, threshold 8)",
            "hashCode() and equals() contract — equal objects must share hash codes",
            "TreeMap: O(log n) sorted key-value storage via Red-Black Tree",
            "HashSet backed by HashMap — O(1) uniqueness checks",
            "Choosing the right collection based on access patterns",
        ],
    },
    {
        id: "concurrency",
        title: "Concurrency & Multithreading",
        icon: "Cpu",
        description:
            "While interns need conceptual understanding, junior developers must write thread-safe code. Covers thread creation, synchronization, visibility, and high-level utilities.",
        keyPoints: [
            "Runnable / Callable interfaces vs. extending Thread",
            "synchronized keyword (method or block level) to prevent race conditions",
            "volatile: visibility guarantee without atomicity",
            "ExecutorService for thread pooling (no manual lifecycle management)",
            "ConcurrentHashMap: thread-safe without blocking entire collection",
            "AtomicInteger & CAS (Compare-And-Swap) for lock-free counters",
        ],
    },
    {
        id: "functional",
        title: "Functional Programming (Java 8+)",
        icon: "Lambda",
        description:
            "Modern Java assessments heavily emphasize the Stream API and Lambda expressions. Candidates must be fluent in intermediate/terminal operations and complex collectors.",
        keyPoints: [
            "Intermediate operations: map, filter, distinct, sorted (lazy evaluation)",
            "Terminal operations: collect, reduce, forEach, count",
            "Collectors.groupingBy() → Map<Key, List<Value>>",
            "Collectors.partitioningBy() → Map<Boolean, List<Value>>",
            "Lambda expressions and method references",
            "Writing Stream pipelines from memory in assessments",
        ],
    },
];
