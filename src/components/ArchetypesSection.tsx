import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";
import { Separator } from "@/components/ui/separator";
import { archetypes } from "@/data/archetypes";
import { Lightbulb, Code2, AlertTriangle, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useState } from "react";
import { SectionModal } from "@/components/SectionModal";
import { Button } from "@/components/ui/button";

export function ArchetypesSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="archetypes" className="py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-12 text-center">
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        Other Frequent Archetypes
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Common patterns in screening for logical reasoning and optimization.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <BookOpen className="h-4 w-4" />
                            Archetypes Guide
                        </Button>
                    </div>
                </FadeIn>

                <div className="grid gap-6 md:grid-cols-2">
                    {archetypes.map((archetype, index) => (
                        <FadeIn
                            key={archetype.id}
                            as={Card}
                            delay={index * 100}
                            className="border-border/50 bg-card/40"
                        >
                            <CardHeader>
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <CardTitle className="font-display text-xl">
                                            {archetype.title}
                                        </CardTitle>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="secondary" className="text-xs font-normal">
                                                {archetype.archetype}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                                                {archetype.source}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Concept */}
                                <div className="text-sm">
                                    <div className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                                        <Lightbulb className="h-3.5 w-3.5 text-accent" />
                                        Concept
                                    </div>
                                    <p className="text-muted-foreground">{archetype.concept}</p>
                                </div>

                                <Separator className="opacity-50" />

                                {/* Optimal Approach */}
                                <div className="text-sm">
                                    <div className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                                        <Code2 className="h-3.5 w-3.5 text-primary" />
                                        Optimal Approach
                                    </div>
                                    <p className="text-muted-foreground">{archetype.optimalApproach}</p>
                                </div>

                                {/* Code Block if present */}
                                {archetype.code && (
                                    <div className="mt-2">
                                        <CodeBlock
                                            code={archetype.code}
                                            language="java"
                                        />
                                    </div>
                                )}

                                {/* Pitfalls if present */}
                                {archetype.pitfalls.length > 0 && (
                                    <>
                                        <Separator className="opacity-50" />
                                        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                                            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-destructive">
                                                <AlertTriangle className="h-3.5 w-3.5" />
                                                Pitfall: {archetype.pitfalls[0].title}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {archetype.pitfalls[0].description}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </FadeIn>
                    ))}
                </div>

                <SectionModal
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    title="Common Archetypes Analysis"
                    contentId="archetypes"
                />
            </div>
        </section>
    );
}
