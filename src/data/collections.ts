import { CollectionRow } from "./types";

export const collections: CollectionRow[] = [
    {
        interface: "List",
        implementation: "ArrayList",
        internalStructure: "Dynamic Array",
        timeComplexity: "O(1) / O(n) / O(n)",
        bestUse: "Fast random access; read-heavy workloads.",
        pitfall:
            "Using for frequent insertions/deletions at the start or middle.",
    },
    {
        interface: "List",
        implementation: "LinkedList",
        internalStructure: "Doubly Linked List",
        timeComplexity: "O(n) / O(n) / O(1)",
        bestUse: "Frequent insertions/deletions at ends (Queue/Deque).",
        pitfall: "Using for random access (get(i) is O(n)).",
    },
    {
        interface: "Map",
        implementation: "HashMap",
        internalStructure: "Array of Buckets + Linked Lists/Trees",
        timeComplexity: "O(1) avg / O(n) worst",
        bestUse: "Key-Value association; caching.",
        pitfall:
            "Mutable keys causing hash code changes; poor hash distribution.",
    },
    {
        interface: "Map",
        implementation: "TreeMap",
        internalStructure: "Red-Black Tree",
        timeComplexity: "O(log n)",
        bestUse: "Sorted Key-Value storage.",
        pitfall: "Assuming O(1) performance; null keys are not allowed.",
    },
    {
        interface: "Set",
        implementation: "HashSet",
        internalStructure: "HashMap (internal)",
        timeComplexity: "O(1) avg",
        bestUse: "Uniqueness checks; deduplication.",
        pitfall:
            "Relying on insertion order (use LinkedHashSet).",
    },
];
