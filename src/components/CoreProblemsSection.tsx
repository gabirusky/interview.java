import { ProblemAccordion } from "@/components/ProblemAccordion";
import { coreProblems } from "@/data/coreProblems";
import { FadeIn } from "@/components/FadeIn";

export function CoreProblemsSection() {
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
                </FadeIn>

                <div className="space-y-4">
                    {coreProblems.map((problem, index) => (
                        <FadeIn key={problem.id} delay={index * 100}>
                            <ProblemAccordion problem={problem} index={index} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
