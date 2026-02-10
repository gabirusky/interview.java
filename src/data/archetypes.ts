import { Problem } from "./types";

export const archetypes: Problem[] = [
    {
        id: "two-sum",
        title: "Two Sum",
        archetype: "Time-Space Trade-off",
        source: "LeetCode / HackerRank",
        concept:
            "Find two numbers in an array that add up to a target. The naive approach uses nested loops (for i... for j...) checking every pair with O(n²) complexity.",
        optimalApproach:
            "Use a HashMap. Iterate through the array. Calculate complement = target - current. Check if complement is in the map. If yes, return [map.get(complement), current_index]. If no, map.put(current, current_index). Complexity: O(n) time, O(n) space.",
        code: "",
        pitfalls: [
            {
                title: "Nested Loop Approach",
                description:
                    "Using O(n²) nested loops to check every pair. The HashMap approach achieves O(n) time by trading space for speed.",
            },
        ],
    },
    {
        id: "merge-names",
        title: "Merge Names (Set Usage)",
        archetype: "Set / Deduplication",
        source: "TestDome / HackerRank",
        concept:
            "Merge two arrays of strings and remove duplicates.",
        optimalApproach:
            "Use a HashSet (or LinkedHashSet if order matters). Add all elements from Array 1, then all elements from Array 2. Convert Set back to Array. The Set handles deduplication automatically in O(n) time.",
        code: "",
        pitfalls: [
            {
                title: "Manual Deduplication",
                description:
                    "Manually checking for duplicates using nested loops (O(n²)). Set handles this in O(n) with its internal hash-based structure.",
            },
        ],
    },
    {
        id: "stream-api-aggregations",
        title: "Stream API Aggregations",
        archetype: "Functional Programming / Collectors",
        source: "Modern Java Assessments",
        concept:
            "Given a list of Employees, group them by Department. This is a standard interview question for modern Java roles that tests fluency with the Stream API and Collectors utility.",
        optimalApproach:
            "Use the Stream API with Collectors.groupingBy() to produce a Map<Department, List<Employee>> in a single, declarative pipeline.",
        code: `Map<Department, List<Employee>> byDept = employees.stream()
   .collect(Collectors.groupingBy(Employee::getDepartment));`,
        pitfalls: [
            {
                title: "Syntax Recall",
                description:
                    "Being unable to write this syntax from memory. It is a standard interview question for modern Java roles — candidates are expected to produce it fluently.",
            },
        ],
    },
    {
        id: "thread-safe-counter",
        title: "Thread-Safe Counter",
        archetype: "Concurrency / Atomics",
        source: "Concurrency Assessments",
        concept:
            "Increment a shared counter from multiple threads safely. The anti-pattern count++ is not atomic (Read-Modify-Write) and causes race conditions. A synchronized method is safe but blocking — high contention reduces performance.",
        optimalApproach:
            "Use AtomicInteger, which leverages hardware-level CAS (Compare-And-Swap) operations. It is non-blocking and highly performant compared to synchronized approaches.",
        code: `AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();`,
        pitfalls: [
            {
                title: "Non-Atomic Increment",
                description:
                    "Using count++ on a shared variable. This is a Read-Modify-Write operation that is NOT atomic, causing race conditions when accessed by multiple threads.",
            },
        ],
    },
];
