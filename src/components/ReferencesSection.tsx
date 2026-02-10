import { references } from "@/data/references";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export function ReferencesSection() {
    return (
        <section id="references" className="py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <h2 className="mb-8 font-display text-2xl font-bold tracking-tight">
                        References & Citations
                    </h2>
                </FadeIn>

                <div className="grid gap-2 text-sm text-muted-foreground">
                    <ol className="list-decimal space-y-3 pl-5">
                        {references.map((ref, index) => (
                            <FadeIn key={ref.id} as="li" delay={index * 20} className="pl-2">
                                <a
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary hover:underline underline-offset-4"
                                >
                                    {ref.title}
                                    <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                                </a>
                            </FadeIn>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
