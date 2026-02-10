import { ThemeToggle } from "@/components/ThemeToggle";
import { Code2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
    { id: "syllabus", label: "Syllabus" },
    { id: "collections", label: "Collections" },
    { id: "core-problems", label: "Problems" },
    { id: "modern-java", label: "Modern Java" },
    { id: "references", label: "References" },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Close mobile menu on Escape key
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileMenuOpen(false);
        };
        if (mobileMenuOpen) {
            document.addEventListener("keydown", onKeyDown);
            return () => document.removeEventListener("keydown", onKeyDown);
        }
    }, [mobileMenuOpen]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <Code2 className="h-4 w-4" />
                    </div>
                    <span className="font-display text-lg font-bold tracking-tight">
                        Java<span className="text-primary">Prep</span>
                    </span>
                </a>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Right side: theme toggle + mobile hamburger */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="h-10 w-10 md:hidden"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            <div
                className={cn(
                    "overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-out md:hidden",
                    mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-0"
                )}
            >
                <div className="mx-auto max-w-6xl px-4 py-3 space-y-1">
                    {navLinks.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className="flex w-full items-center rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground min-h-[44px]"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
