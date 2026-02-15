import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useCallback, type ComponentPropsWithoutRef } from "react";
import { Copy, Check } from "lucide-react";

/**
 * Premium Markdown Renderer
 *
 * Custom component overrides for react-markdown that provide syntax-highlighted
 * code blocks, styled tables, blockquotes, and consistent typography.
 */

/* ── Copy Button for Code Blocks ────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [text]);

    return (
        <button
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-muted-foreground opacity-0 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-foreground group-hover/code:opacity-100"
            aria-label={copied ? "Copied!" : "Copy code"}
        >
            {copied ? (
                <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
                <Copy className="h-3.5 w-3.5" />
            )}
        </button>
    );
}

/* ── Custom Component Overrides ─────────────────────────────────────────── */

const markdownComponents = {
    /* ── Code: Fenced blocks get syntax highlighting ── */
    code({ className, children, ...props }: ComponentPropsWithoutRef<"code">) {
        const match = /language-(\w+)/.exec(className || "");
        const codeString = String(children).replace(/\n$/, "");
        const isMultiLine = codeString.includes("\n");

        // Fenced code block WITH a language → full syntax highlighting
        if (match) {
            return (
                <div className="group/code relative my-4 overflow-hidden rounded-xl border border-border/50 bg-[hsl(222,47%,7%)]">
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-border/30 px-4 py-2">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
                                <div className="h-2.5 w-2.5 rounded-full bg-accent/50" />
                                <div className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                            </div>
                            <span className="ml-1.5 font-display text-[10px] uppercase tracking-wider text-muted-foreground/60">
                                {match[1]}
                            </span>
                        </div>
                    </div>

                    <CopyButton text={codeString} />

                    <div className="overflow-x-auto">
                        <SyntaxHighlighter
                            language={match[1]}
                            style={oneDark}
                            customStyle={{
                                margin: 0,
                                padding: "1rem 1.25rem",
                                background: "transparent",
                                fontSize: "0.8rem",
                                lineHeight: "1.7",
                            }}
                            codeTagProps={{
                                style: {
                                    fontFamily: "var(--font-display)",
                                },
                            }}
                        >
                            {codeString}
                        </SyntaxHighlighter>
                    </div>
                </div>
            );
        }

        // Fenced code block WITHOUT a language (flowcharts, ASCII diagrams, pseudocode)
        if (isMultiLine) {
            return (
                <div className="group/code relative my-4 overflow-hidden rounded-xl border border-border/50 bg-[hsl(222,47%,7%)]">
                    <CopyButton text={codeString} />
                    <div className="overflow-x-auto p-5">
                        <pre className="whitespace-pre font-display text-[0.8rem] leading-relaxed text-muted-foreground">
                            {codeString}
                        </pre>
                    </div>
                </div>
            );
        }

        // Inline code
        return (
            <code
                className="rounded-md bg-primary/10 px-1.5 py-0.5 font-display text-[0.8em] font-medium text-primary"
                {...props}
            >
                {children}
            </code>
        );
    },

    /* ── Pre: pass through since code handler already wraps blocks ── */
    pre({ children }: ComponentPropsWithoutRef<"pre">) {
        return <>{children}</>;
    },

    /* ── Headings ── */
    h1({ children }: ComponentPropsWithoutRef<"h1">) {
        return (
            <h1 className="mb-4 mt-0 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {children}
            </h1>
        );
    },
    h2({ children }: ComponentPropsWithoutRef<"h2">) {
        return (
            <h2 className="mb-3 mt-10 flex items-center gap-2 border-b border-border/30 pb-3 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl first:mt-0">
                {children}
            </h2>
        );
    },
    h3({ children }: ComponentPropsWithoutRef<"h3">) {
        return (
            <h3 className="mb-2 mt-6 font-display text-lg font-semibold tracking-tight text-foreground">
                {children}
            </h3>
        );
    },
    h4({ children }: ComponentPropsWithoutRef<"h4">) {
        return (
            <h4 className="mb-2 mt-4 font-display text-base font-semibold text-foreground">
                {children}
            </h4>
        );
    },

    /* ── Paragraphs ── */
    p({ children }: ComponentPropsWithoutRef<"p">) {
        return (
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                {children}
            </p>
        );
    },

    /* ── Links ── */
    a({ href, children }: ComponentPropsWithoutRef<"a">) {
        return (
            <a
                href={href}
                className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        );
    },

    /* ── Emphasis ── */
    strong({ children }: ComponentPropsWithoutRef<"strong">) {
        return <strong className="font-semibold text-foreground">{children}</strong>;
    },
    em({ children }: ComponentPropsWithoutRef<"em">) {
        return <em className="italic text-foreground/80">{children}</em>;
    },

    /* ── Lists ── */
    ul({ children }: ComponentPropsWithoutRef<"ul">) {
        return <ul className="mb-4 ml-1 space-y-1.5 text-sm text-muted-foreground sm:text-[0.9375rem]">{children}</ul>;
    },
    ol({ children }: ComponentPropsWithoutRef<"ol">) {
        return (
            <ol className="mb-4 ml-1 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground sm:text-[0.9375rem]">
                {children}
            </ol>
        );
    },
    li({ children }: ComponentPropsWithoutRef<"li">) {
        return (
            <li className="flex items-start gap-2 leading-relaxed">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                <span className="flex-1">{children}</span>
            </li>
        );
    },

    /* ── Blockquotes ── */
    blockquote({ children }: ComponentPropsWithoutRef<"blockquote">) {
        return (
            <blockquote className="my-5 rounded-r-lg border-l-4 border-primary/40 bg-primary/5 py-3 pl-4 pr-4 [&>p]:mb-1 [&>p]:text-sm [&>p]:text-muted-foreground/90 [&>p]:leading-relaxed [&>p:last-child]:mb-0">
                {children}
            </blockquote>
        );
    },

    /* ── Horizontal Rules ── */
    hr() {
        return <hr className="my-8 border-border/30" />;
    },

    /* ── Tables ── */
    table({ children }: ComponentPropsWithoutRef<"table">) {
        return (
            <div className="my-5 overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">{children}</table>
            </div>
        );
    },
    thead({ children }: ComponentPropsWithoutRef<"thead">) {
        return (
            <thead className="border-b border-border/50 bg-muted/50">
                {children}
            </thead>
        );
    },
    tbody({ children }: ComponentPropsWithoutRef<"tbody">) {
        return <tbody className="divide-y divide-border/30">{children}</tbody>;
    },
    tr({ children }: ComponentPropsWithoutRef<"tr">) {
        return (
            <tr className="transition-colors hover:bg-muted/30">{children}</tr>
        );
    },
    th({ children }: ComponentPropsWithoutRef<"th">) {
        return (
            <th className="whitespace-nowrap px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-foreground/80">
                {children}
            </th>
        );
    },
    td({ children }: ComponentPropsWithoutRef<"td">) {
        return (
            <td className="px-4 py-2.5 text-muted-foreground [&>code]:text-[0.75em]">
                {children}
            </td>
        );
    },
};

/* ── Main Component ─────────────────────────────────────────────────────── */

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <article className="markdown-body">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}
