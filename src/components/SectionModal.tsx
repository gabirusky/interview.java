import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
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
            <DialogContent className="w-[96vw] sm:max-w-4xl lg:max-w-5xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden flex flex-col gap-0 border-border/60 bg-card/95 backdrop-blur-xl p-0 rounded-2xl">
                {/* Header */}
                <DialogHeader className="shrink-0 border-b border-border/40 px-6 sm:px-10 py-5 sm:py-6">
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
                <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8">
                    {markdown ? (
                        <MarkdownRenderer content={markdown} />
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
