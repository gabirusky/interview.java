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
import { AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export function CollectionsTable() {
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
                </FadeIn>

                <FadeIn delay={200} className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
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
                </FadeIn>
            </div>
        </section>
    );
}
