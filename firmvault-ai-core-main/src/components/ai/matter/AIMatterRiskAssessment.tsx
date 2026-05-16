import { Scale, Banknote, AlertTriangle, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIRiskFlagCard } from "../AIRiskFlagCard";
import type { MatterReview } from "@/data/mockAIReviews";

interface AIMatterRiskAssessmentProps {
  matter: MatterReview;
}

export function AIMatterRiskAssessment({ matter }: AIMatterRiskAssessmentProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Scale className="h-4 w-4 text-primary" />
            Liability assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Possible liability exposure
            </span>
            <AIRiskFlagCard risk={matter.liability} />
          </div>
          <div className="flex items-center justify-between rounded-md border border-border/60 bg-muted/30 px-3 py-2">
            <span className="flex items-center gap-2 text-sm text-foreground/90">
              <Banknote className="h-4 w-4 text-primary" />
              Damages range (illustrative)
            </span>
            <span className="text-sm font-medium">{matter.damagesRange}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            Key risk factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {matter.keyRiskFactors.map((r, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-100/90"
              >
                <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                {r}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
