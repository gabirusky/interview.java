import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sectionContent } from "@/content";
import { X } from "lucide-react";

interface SectionModalProps {
    /** The section/topic id matching a key in sectionContent */
    contentId: string | null;
    /** The display title for the dialog */
    title: string;
    /** Whether the modal is open */
    open: boolean;
    /** Callback when modal should close */
    onOpenChange: (open: boolean) => void;
}

export function SectionModal({
    contentId,
    title,
    open,
    onOpenChange,
}: SectionModalProps) {
    const markdown = contentId ? sectionContent[contentId] ?? "" : "";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] sm:max-w-3xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col gap-0 border-border/60 bg-card/95 backdrop-blur-xl p-0">
                {/* Header */}
                <DialogHeader className="shrink-0 border-b border-border/40 px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="font-display text-lg font-bold tracking-tight sm:text-2xl text-left">
                            {title}
                        </DialogTitle>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary h-10 w-10 flex items-center justify-center"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </DialogHeader>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
                    {markdown ? (
                        <article className="prose prose-sm prose-invert max-w-none
                            prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground
                            prose-h1:text-xl sm:prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-0
                            prose-h2:text-lg sm:prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-6
                            prose-h3:text-base sm:prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-4
                            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-3
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-foreground prose-strong:font-semibold
                            prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:font-display prose-code:text-primary
                            prose-pre:rounded-xl prose-pre:border prose-pre:border-border/50 prose-pre:bg-muted/50 prose-pre:p-4 prose-pre:overflow-x-auto
                            prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                            prose-li:text-muted-foreground prose-li:marker:text-primary/60
                            prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground prose-blockquote:italic
                            prose-table:text-xs sm:prose-table:text-sm prose-table:block prose-table:overflow-x-auto
                            prose-th:text-foreground prose-th:font-semibold prose-th:border-border
                            prose-td:border-border prose-td:text-muted-foreground
                            prose-hr:border-border/40
                            dark:prose-invert
                        ">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {markdown}
                            </ReactMarkdown>
                        </article>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="mb-4 h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center">
                                <span className="text-2xl">📝</span>
                            </div>
                            <p className="text-lg font-semibold text-foreground mb-1">
                                Content not yet added
                            </p>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                Edit the corresponding <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-display text-primary">.md</code> file in{" "}
                                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-display text-primary">src/content/</code>{" "}
                                to add content for this section.
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
