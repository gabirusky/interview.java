import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { collections } from "@/data/collections";
import { AlertCircle, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useState } from "react";
import { SectionModal } from "@/components/SectionModal";
import { Button } from "@/components/ui/button";

export function CollectionsTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getComplexityColor = (complexity: string) => {
        if (complexity.includes("O(1)")) return "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20";
        if (complexity.includes("log")) return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20";
        return "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20";
    };

    return (
        <section id="collections" className="bg-muted/30 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-12 text-center">
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        Collections Framework
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Knowing when to use what is the hallmark of a senior engineer.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <BookOpen className="h-4 w-4" />
                            Read Full Guide
                        </Button>
                    </div>
                </FadeIn>

                <FadeIn delay={200} className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="w-[150px] whitespace-nowrap sticky left-0 z-20 bg-card shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]">Interface</TableHead>
                                    <TableHead className="w-[150px] whitespace-nowrap">Implementation</TableHead>
                                    <TableHead className="w-[200px]">Internal Structure</TableHead>
                                    <TableHead className="w-[150px]">Time Complexity</TableHead>
                                    <TableHead className="min-w-[200px]">Best Use Case</TableHead>
                                    <TableHead className="min-w-[200px]">Common Pitfall</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {collections.map((row) => (
                                    <TableRow key={row.implementation} className="group hover:bg-muted/50">
                                        <TableCell className="font-medium sticky left-0 z-10 bg-card group-hover:bg-muted/50 transition-colors shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]">{row.interface}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono text-xs">
                                                {row.implementation}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {row.internalStructure}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`font-mono text-xs ${getComplexityColor(
                                                    row.timeComplexity
                                                )}`}
                                            >
                                                {row.timeComplexity}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {row.bestUse}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive/70" />
                                                {row.pitfall}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden divide-y divide-border/50">
                        {collections.map((row) => (
                            <div key={row.implementation} className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{row.interface}</span>
                                        <span className="text-lg font-bold font-mono">{row.implementation}</span>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`font-mono text-[10px] ${getComplexityColor(
                                            row.timeComplexity
                                        )}`}
                                    >
                                        {row.timeComplexity}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    <div>
                                        <span className="text-muted-foreground font-medium block mb-0.5">Internal Structure</span>
                                        <p>{row.internalStructure}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground font-medium block mb-0.5">Best Use Case</span>
                                        <p>{row.bestUse}</p>
                                    </div>
                                    <div className="rounded-lg bg-destructive/5 p-3 border border-destructive/10">
                                        <span className="text-destructive font-medium flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wide">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            Common Pitfall
                                        </span>
                                        <p className="text-muted-foreground text-xs leading-relaxed">{row.pitfall}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <SectionModal
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    title="Collections Framework Guide"
                    contentId="collections-framework"
                />
            </div>
        </section>
    );
}
