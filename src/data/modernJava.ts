import { ModernJavaTopic } from "./types";

export const modernJavaTopics: ModernJavaTopic[] = [
    {
        id: "virtual-threads",
        title: "Virtual Threads",
        javaVersion: "Java 21",
        description:
            "Lightweight threads managed by the JVM (Project Loom) for high-throughput concurrency. Unlike platform threads, virtual threads are cheap to create and block, enabling a thread-per-request model without the overhead of traditional thread pools.",
        keyPoints: [
            "Part of Project Loom — finalized in Java 21",
            "Managed by the JVM, not the OS",
            "Extremely lightweight — millions can run concurrently",
            "Enables thread-per-request model for I/O-bound workloads",
            "Uses Executors.newVirtualThreadPerTaskExecutor()",
            "Ideal for high-throughput servers and microservices",
        ],
    },
    {
        id: "records",
        title: "Records",
        javaVersion: "Java 16+",
        description:
            "Concise syntax for immutable data carriers, replacing verbose POJOs and Lombok-generated boilerplate. Records automatically generate constructor, getters, equals(), hashCode(), and toString().",
        keyPoints: [
            "Declared with record keyword: record Point(int x, int y) {}",
            "Immutable by design — all fields are final",
            "Auto-generates: canonical constructor, accessors, equals(), hashCode(), toString()",
            "Replaces Lombok @Data / @Value for simple data carriers",
            "Can implement interfaces but cannot extend classes",
            "Supports compact constructors for validation",
        ],
    },
    {
        id: "pattern-matching",
        title: "Pattern Matching",
        javaVersion: "Java 21",
        description:
            "Enhanced switch statements and instanceof checks that combine type testing and casting into a single operation, reducing boilerplate and potential ClassCastException errors.",
        keyPoints: [
            "Pattern matching for instanceof: if (obj instanceof String s) { use s; }",
            "Switch expressions with pattern matching and guarded patterns",
            "Sealed classes enable exhaustive switch without default",
            "Eliminates explicit casting after type checks",
            "Record patterns for deconstructing record values",
            "Significant reduction in boilerplate code",
        ],
    },
    {
        id: "stream-grouping",
        title: "Stream API Grouping & Partitioning",
        javaVersion: "Java 8+",
        description:
            "Advanced Stream API collectors for complex data aggregation. Grouping creates multi-valued maps by a classifier function, while partitioning splits data into two groups based on a predicate.",
        keyPoints: [
            "Collectors.groupingBy(Employee::getDepartment) → Map<Dept, List<Emp>>",
            "Collectors.partitioningBy(e -> e.getSalary() > 1000) → Map<Boolean, List<Emp>>",
            "Downstream collectors for nested aggregation (counting, summing, averaging)",
            "Can chain with mapping, filtering, and reducing collectors",
            "Essential syntax to produce fluently from memory in assessments",
            "Standard interview question for modern Java roles",
        ],
    },
    {
        id: "concurrency-pitfalls",
        title: "Concurrency Pitfalls",
        javaVersion: "Java 8+",
        description:
            "Critical concurrency issues that junior developers must understand and avoid: Deadlock (two threads waiting on each other's locks) and Race Conditions (shared mutable state accessed without synchronization).",
        keyPoints: [
            "Deadlock: Two threads each holding a lock the other needs",
            "Race Condition: count++ is NOT atomic (Read-Modify-Write)",
            "Use AtomicInteger for lock-free thread-safe counters",
            "volatile ensures visibility but NOT atomicity",
            "ConcurrentHashMap over synchronized HashMap for concurrent access",
            "Prefer ExecutorService over manual Thread management",
        ],
    },
];
