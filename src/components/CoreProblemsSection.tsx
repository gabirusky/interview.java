import { ProblemAccordion } from "@/components/ProblemAccordion";
import { coreProblems } from "@/data/coreProblems";
import { FadeIn } from "@/components/FadeIn";
import { useState } from "react";
import { SectionModal } from "@/components/SectionModal";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export function CoreProblemsSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="core-problems" className="py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        Must Know
                    </div>
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        The "Big 5" Archetypes
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        These problems form the baseline for valid entry-level engineering judgment.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <Button
                            variant="outline"
                            className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <BookOpen className="h-4 w-4 text-primary" />
                            Core Problems Guide
                        </Button>
                    </div>
                </FadeIn>

                <div className="space-y-4">
                    {coreProblems.map((problem, index) => (
                        <FadeIn key={problem.id} delay={index * 100}>
                            <ProblemAccordion problem={problem} index={index} />
                        </FadeIn>
                    ))}
                </div>

                <SectionModal
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    title="Core Problems Deep Dive"
                    contentId="core-problems"
                />
            </div>
        </section>
    );
}
