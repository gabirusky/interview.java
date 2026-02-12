/**
 * Content Registry
 *
 * Maps section/topic IDs to their markdown content.
 * To add or edit content, simply edit the corresponding .md file
 * in the src/content/ directory.
 *
 * Vite's `?raw` suffix imports the file as a plain string.
 */

// ── Syllabus Topics ──
import syllabusCoreLang from "./syllabus-core-language.md?raw";
import syllabusCollections from "./syllabus-collections.md?raw";
import syllabusConcurrency from "./syllabus-concurrency.md?raw";
import syllabusFunctional from "./syllabus-functional.md?raw";

// ── Collections Framework (Table section) ──
import collectionsFramework from "./collections-framework.md?raw";

// ── Core Problems (Big 5) ──
import coreProblems from "./core-problems.md?raw";

// ── Advanced Problems ──
import advancedProblems from "./advanced-problems.md?raw";

// ── Other Archetypes ──
import archetypesContent from "./archetypes.md?raw";

// ── Modern Java Topics ──
import modernVirtualThreads from "./modern-java-virtual-threads.md?raw";
import modernRecords from "./modern-java-records.md?raw";
import modernPatternMatching from "./modern-java-pattern-matching.md?raw";
import modernStreamGrouping from "./modern-java-stream-grouping.md?raw";
import modernConcurrencyPitfalls from "./modern-java-concurrency-pitfalls.md?raw";

/**
 * Master content map.
 * Key = section/topic id (same ids used in data files and component props)
 * Value = raw markdown string
 */
export const sectionContent: Record<string, string> = {
    // Syllabus cards
    "core-language": syllabusCoreLang,
    "collections": syllabusCollections,
    "concurrency": syllabusConcurrency,
    "functional": syllabusFunctional,

    // Collections table section
    "collections-framework": collectionsFramework,

    // Problems sections
    "core-problems": coreProblems,
    "advanced-problems": advancedProblems,
    "archetypes": archetypesContent,

    // Modern Java topics
    "virtual-threads": modernVirtualThreads,
    "records": modernRecords,
    "pattern-matching": modernPatternMatching,
    "stream-grouping": modernStreamGrouping,
    "concurrency-pitfalls": modernConcurrencyPitfalls,
};
