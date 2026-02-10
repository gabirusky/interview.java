import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { modernJavaTopics } from "@/data/modernJava";
import { Sparkles, Layers, Box, FileCode, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const icons: Record<string, typeof Sparkles> = {
    "virtual-threads": Sparkles,
    "records": Box,
    "pattern-matching": FileCode,
    "stream-grouping": Layers,
    "concurrency-pitfalls": CheckCircle2,
};

export function ModernJavaSection() {
    return (
        <section id="modern-java" className="bg-muted/30 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-500">
                        Current Syllabus
                    </div>
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        Modern Java & Theory
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Topics expected for "Modern" Java roles (Java 17, 21+).
                    </p>
                </FadeIn>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {modernJavaTopics.map((topic, index) => {
                        const Icon = icons[topic.id] ?? Sparkles;

                        return (
                            <FadeIn
                                key={topic.id}
                                as={Card}
                                delay={index * 100}
                                className="group border-border/50 bg-card/60 transition-colors hover:border-primary/40 hover:bg-card/80"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <Badge variant="outline" className="font-mono text-xs">
                                            {topic.javaVersion}
                                        </Badge>
                                    </div>
                                    <CardTitle className="mt-4 font-display text-xl">
                                        {topic.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        {topic.description}
                                    </p>
                                    <ul className="space-y-1.5">
                                        {topic.keyPoints.slice(0, 3).map((point, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
