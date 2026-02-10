import { useState, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
    code: string;
    fileName?: string;
    language?: string;
}

export function CodeBlock({ code, fileName, language = "java" }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for non-secure contexts
            const textarea = document.createElement("textarea");
            textarea.value = code;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [code]);

    return (
        <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-[hsl(222,47%,7%)]">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border/40 bg-card/50 px-4 py-2">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-destructive/60" />
                        <div className="h-3 w-3 rounded-full bg-accent/60" />
                        <div className="h-3 w-3 rounded-full bg-primary/60" />
                    </div>
                    {fileName && (
                        <span className="ml-2 font-display text-xs text-muted-foreground">
                            {fileName}
                        </span>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="h-9 w-9 min-h-[44px] min-w-[44px] text-muted-foreground opacity-70 sm:opacity-0 transition-all group-hover:opacity-100 hover:text-primary"
                    aria-label={copied ? "Copied!" : "Copy code"}
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        padding: "0.75rem 1rem",
                        background: "transparent",
                        fontSize: "0.75rem",
                        lineHeight: "1.7",
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: "var(--font-display)",
                        },
                    }}
                    aria-label={fileName ? `Code: ${fileName}` : "Java code block"}
                >
                    {code}
                </SyntaxHighlighter>
            </div>

            {/* Copied toast */}
            <div
                className={`absolute bottom-3 right-3 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg transition-all duration-300 ${copied
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0 pointer-events-none"
                    }`}
            >
                Copied!
            </div>
        </div>
    );
}
