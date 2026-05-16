import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AISuggestedActionsProps {
  actions: string[];
  title?: string;
}

export function AISuggestedActions({
  actions,
  title = "Suggested next actions",
}: AISuggestedActionsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((a, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-3 rounded-lg border border-border/60 bg-muted/30 px-3 py-2"
          >
            <p className="text-sm leading-relaxed text-foreground/90">{a}</p>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 shrink-0 text-xs text-primary hover:text-primary"
            >
              Assign
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        ))}
        <p className="pt-1 text-[11px] text-muted-foreground">
          Suggestions require attorney confirmation before action.
        </p>
      </CardContent>
    </Card>
  );
}
