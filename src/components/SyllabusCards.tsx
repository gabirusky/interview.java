import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BookOpen, Database, Cpu, Braces } from "lucide-react";
import { syllabus } from "@/data/syllabus";
import { FadeIn } from "@/components/FadeIn";

const icons = {
    BookOpen,
    Database,
    Cpu,
    Lambda: Braces,
};

import { useState } from "react";
import { SectionModal } from "@/components/SectionModal";


export function SyllabusCards() {
    const [selectedTopic, setSelectedTopic] = useState<{ id: string; title: string } | null>(null);

    return (
        <section id="syllabus" className="py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-12 text-center">
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        Technical Syllabus
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        The core competencies expected for modern Java roles.
                    </p>
                </FadeIn>

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {syllabus.map((topic, index) => {
                        const Icon = icons[topic.icon as keyof typeof icons] ?? BookOpen;

                        return (
                            <FadeIn
                                key={topic.id}
                                delay={index * 100}
                                className="h-full"
                            >
                                <Card
                                    onClick={() => setSelectedTopic({ id: topic.id, title: topic.title })}
                                    className="group relative h-full cursor-pointer overflow-hidden border-border/50 bg-card/50 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 active:scale-95"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    <CardHeader>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="font-display text-xl">
                                            {topic.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 text-sm text-muted-foreground">
                                            {topic.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {topic.keyPoints.slice(0, 3).map((point, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </FadeIn>
                        );
                    })}
                </div>

                <SectionModal
                    open={!!selectedTopic}
                    onOpenChange={(open) => !open && setSelectedTopic(null)}
                    title={selectedTopic?.title ?? ""}
                    contentId={selectedTopic?.id ?? null}
                />
            </div>
        </section>
    );
}
