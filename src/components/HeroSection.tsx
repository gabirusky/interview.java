import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, BookOpen, Cpu, Database, Braces } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function HeroSection() {
    const scrollToContent = () => {
        document.getElementById("syllabus")?.scrollIntoView({ behavior: "smooth" });
    };

    const badgesRef = useScrollAnimation<HTMLDivElement>(0);
    const titleRef = useScrollAnimation<HTMLHeadingElement>(100);
    const subtitleRef = useScrollAnimation<HTMLParagraphElement>(200);
    const codeRef = useScrollAnimation<HTMLDivElement>(300);
    const btnRef = useScrollAnimation<HTMLDivElement>(400);

    return (
        <section
            id="hero"
            className="relative overflow-hidden py-16 sm:py-24 lg:py-40"
        >
            {/* Background decorative elements */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-24 right-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Badges */}
                    <div
                        ref={badgesRef}
                        className="mb-6 sm:mb-8 flex flex-wrap items-center justify-center gap-2 opacity-0"
                    >
                        <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
                            <BookOpen className="h-3 w-3" />
                            TestDome
                        </Badge>
                        <Badge variant="outline" className="gap-1 border-accent/30 text-accent">
                            <Cpu className="h-3 w-3" />
                            Codility
                        </Badge>
                        <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
                            <Database className="h-3 w-3" />
                            HackerRank
                        </Badge>
                        <Badge variant="outline" className="gap-1 border-accent/30 text-accent">
                            <Braces className="h-3 w-3" />
                            LeetCode
                        </Badge>
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl opacity-0"
                    >
                        Java Interview Prep
                        <br />
                    </h1>

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl opacity-0"
                    >
                        A comprehensive analysis of technical assessment archetypes for
                        intern and junior Java developer profiles. Master data structures,
                        algorithms, OOP, concurrency, and the modern Java ecosystem.
                    </p>

                    {/* Decorative code snippet */}
                    <div
                        ref={codeRef}
                        className="mt-8 rounded-xl border border-border/50 bg-card/60 px-4 py-3 font-display text-xs sm:text-sm text-muted-foreground backdrop-blur-sm opacity-0 max-w-full overflow-hidden"
                    >
                        <span className="text-primary">public interface</span>
                        {" InternJavaDev "}
                        <span className="text-accent">extends</span>
                        {" Collections, Algorithms, Concurrency {}"}
                    </div>

                    {/* CTA */}
                    <div ref={btnRef} className="opacity-0">
                        <Button
                            id="start-studying-btn"
                            onClick={scrollToContent}
                            size="lg"
                            className="mt-10 gap-2 bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                        >
                            Start Studying
                            <ArrowDown className="h-4 w-4 animate-bounce" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
