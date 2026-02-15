import { Code2, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-card/50">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-6 text-center">
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Code2 className="h-4 w-4" />
                        </div>
                        <span className="font-display text-lg font-bold tracking-tight">
                            Java<span className="text-primary">Prep</span>
                        </span>
                    </a>

                    <p className="max-w-md text-sm text-muted-foreground">
                        Comprehensive Java technical interview preparation guide for
                        intern and junior developer positions. Based on analysis of
                        2025/2026 assessment platforms.
                    </p>

                    <Separator className="max-w-xs" />

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                        <a
                            href="https://github.com/gabirusky/interview.java"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 p-2 -m-2 rounded-md hover:bg-muted/50 transition-colors hover:text-primary active:bg-muted min-h-[44px]"
                        >
                            Source Code
                            <ExternalLink className="h-3 w-3" />
                        </a>
                        <span className="text-border">·</span>
                        <span>Built with React + shadcn/ui</span>
                        <span className="text-border">·</span>
                        <span>© {new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
