export interface Pitfall {
    title: string;
    description: string;
}

export interface Problem {
    id: string;
    title: string;
    archetype: string;
    source: string;
    concept: string;
    optimalApproach: string;
    code: string;
    pitfalls: Pitfall[];
}

export interface SyllabusTopic {
    id: string;
    title: string;
    icon: string;
    keyPoints: string[];
    description: string;
}

export interface CollectionRow {
    interface: string;
    implementation: string;
    internalStructure: string;
    timeComplexity: string;
    bestUse: string;
    pitfall: string;
}

export interface Reference {
    id: number;
    title: string;
    url: string;
}

export interface ModernJavaTopic {
    id: string;
    title: string;
    javaVersion: string;
    keyPoints: string[];
    description: string;
}
