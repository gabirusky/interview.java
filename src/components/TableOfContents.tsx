import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { List, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
    { id: "hero", label: "Top" },
    { id: "syllabus", label: "Syllabus" },
    { id: "collections", label: "Collections" },
    { id: "core-problems", label: "Core Problems" },
    { id: "advanced-problems", label: "Advanced" },
    { id: "archetypes", label: "Archetypes" },
    { id: "modern-java", label: "Modern Java" },
    { id: "references", label: "References" },
];

export function TableOfContents() {
    const [activeSection, setActiveSection] = useState("hero");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const scrollTimeout = useRef<NodeJS.Timeout | number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(false);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current as any);
            }
            scrollTimeout.current = setTimeout(() => {
                setIsVisible(true);
            }, 1000); // Show again 1s after scrolling stops
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current as any);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -35% 0px",
            }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setMobileOpen(false);
    };

    // Close mobile ToC on Escape key
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        if (mobileOpen) {
            document.addEventListener("keydown", onKeyDown);
            return () => document.removeEventListener("keydown", onKeyDown);
        }
    }, [mobileOpen]);

    return (
        <>
            {/* Desktop sidebar — visible on xl+ */}
            <nav
                aria-label="Table of Contents"
                className={cn(
                    "fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 rounded-xl border border-border/40 bg-background/80 p-4 backdrop-blur-md xl:flex transition-all duration-500 ease-in-out",
                    !isVisible && "translate-x-full opacity-0 pointer-events-none"
                )}
            >
                <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Contents
                </div>
                {sections.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={cn(
                            "group flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-all hover:bg-muted",
                            activeSection === id
                                ? "font-medium text-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        <div
                            className={cn(
                                "h-1.5 w-1.5 rounded-full transition-all group-hover:scale-125",
                                activeSection === id ? "bg-primary scale-125" : "bg-muted-foreground/30"
                            )}
                        />
                        {label}
                    </button>
                ))}
            </nav>

            {/* Mobile floating action button — visible below xl */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileOpen(true)}
                className={cn(
                    "fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full border-border/60 bg-card/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary xl:hidden",
                    mobileOpen && "opacity-0 pointer-events-none"
                )}
                aria-label="Open table of contents"
            >
                <List className="h-5 w-5" />
            </Button>

            {/* Mobile drawer overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm xl:hidden"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Mobile bottom sheet */}
            <nav
                aria-label="Table of Contents"
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-[70] rounded-t-2xl border-t border-border/40 bg-background p-6 pb-8 shadow-2xl transition-transform duration-300 ease-out xl:hidden",
                    mobileOpen ? "translate-y-0" : "translate-y-full"
                )}
            >
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Contents
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileOpen(false)}
                        className="h-11 w-11 rounded-full active:bg-muted"
                        aria-label="Close table of contents"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
                {/* Scrollable list with grab handle */}
                <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-muted-foreground/30" />
                <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                    {sections.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all min-h-[44px]",
                                activeSection === id
                                    ? "bg-primary/10 font-medium text-primary"
                                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <div
                                className={cn(
                                    "h-2 w-2 shrink-0 rounded-full transition-all",
                                    activeSection === id ? "bg-primary" : "bg-muted-foreground/30"
                                )}
                            />
                            {label}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}
