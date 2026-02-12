import { ProblemAccordion } from "@/components/ProblemAccordion";
import { advancedProblems } from "@/data/advancedProblems";
import { FadeIn } from "@/components/FadeIn";
import { useState } from "react";
import { SectionModal } from "@/components/SectionModal";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export function AdvancedProblemsSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="advanced-problems" className="bg-muted/30 py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                        Hard / Senior
                    </div>
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        Advanced Challenges
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Problems testing specific domain knowledge (Graphs, XML) and architectural patterns.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <Button
                            variant="outline"
                            className="gap-2 border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <BookOpen className="h-4 w-4 text-destructive" />
                            Advanced Guide
                        </Button>
                    </div>
                </FadeIn>

                <div className="space-y-4">
                    {advancedProblems.map((problem, index) => (
                        <FadeIn key={problem.id} delay={index * 100}>
                            <ProblemAccordion problem={problem} />
                        </FadeIn>
                    ))}
                </div>

                <SectionModal
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    title="Advanced Challenges Deep Dive"
                    contentId="advanced-problems"
                />
            </div>
        </section>
    );
}
