import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Gavel, Landmark, MapPin } from "lucide-react";
import type { Matter } from "@/data/mockMatters";

function Row({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}

export function MatterSummaryCard({ matter }: { matter: Matter }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Matter Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground/90">{matter.summary}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-border">
          <Row icon={Landmark} label="Case Type" value={matter.practiceArea} />
          <Row icon={MapPin} label="Jurisdiction" value={matter.jurisdiction} />
          <Row icon={Landmark} label="Court" value={matter.court} />
          <Row icon={Gavel} label="Judge" value={matter.judge} />
          <Row icon={CalendarDays} label="Date Opened" value={matter.dateOpened} />
          <Row icon={CalendarDays} label="Next Court Date" value={matter.nextCourtDate} />
        </div>
      </CardContent>
    </Card>
  );
}
