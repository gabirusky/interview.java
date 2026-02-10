import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/CodeBlock";
import { PitfallAlert } from "@/components/PitfallAlert";
import type { Problem } from "@/data/types";
import { Lightbulb, AlertTriangle, Code2 } from "lucide-react";

interface ProblemAccordionProps {
    problem: Problem;
    index?: number;
}

export function ProblemAccordion({ problem, index }: ProblemAccordionProps) {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem
                value={problem.id}
                className="rounded-xl border border-border/60 bg-card/40 px-1 transition-colors data-[state=open]:bg-card/70"
            >
                <AccordionTrigger className="px-5 py-4 hover:no-underline [&[data-state=open]>div>.badge-wrap]:opacity-100">
                    <div className="flex flex-1 items-center gap-3 text-left">
                        {index !== undefined && (
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-display text-xs font-bold text-primary">
                                {index + 1}
                            </span>
                        )}
                        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-display text-base font-semibold">
                                {problem.title}
                            </span>
                            <div className="badge-wrap flex flex-wrap gap-1.5 opacity-80 transition-opacity">
                                <Badge
                                    variant="outline"
                                    className="border-primary/30 text-xs font-normal text-primary"
                                >
                                    {problem.archetype}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="border-accent/30 text-xs font-normal text-accent"
                                >
                                    {problem.source}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-6">
                    <div className="space-y-6">
                        {/* Concept */}
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                                <Lightbulb className="h-4 w-4 text-accent" />
                                Concept
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {problem.concept}
                            </p>
                        </div>

                        <Separator className="opacity-50" />

                        {/* Optimal Approach */}
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                                <Code2 className="h-4 w-4 text-primary" />
                                Optimal Approach
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {problem.optimalApproach}
                            </p>
                        </div>

                        {/* Code Block */}
                        {problem.code && (
                            <>
                                <Separator className="opacity-50" />
                                <CodeBlock
                                    code={problem.code}
                                    fileName={`${problem.title.replace(/\s+/g, "")}.java`}
                                />
                            </>
                        )}

                        {/* Pitfalls */}
                        {problem.pitfalls.length > 0 && (
                            <>
                                <Separator className="opacity-50" />
                                <div>
                                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <AlertTriangle className="h-4 w-4 text-destructive" />
                                        Common Pitfalls
                                    </div>
                                    <div className="space-y-3">
                                        {problem.pitfalls.map((pitfall, i) => (
                                            <PitfallAlert key={i} pitfall={pitfall} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
