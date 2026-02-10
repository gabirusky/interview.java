import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Pitfall } from "@/data/types";

interface PitfallAlertProps {
    pitfall: Pitfall;
}

export function PitfallAlert({ pitfall }: PitfallAlertProps) {
    return (
        <Alert className="border-destructive/30 bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <div className="ml-2">
                <p className="font-display text-sm font-semibold text-destructive">
                    {pitfall.title}
                </p>
                <AlertDescription className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {pitfall.description}
                </AlertDescription>
            </div>
        </Alert>
    );
}
