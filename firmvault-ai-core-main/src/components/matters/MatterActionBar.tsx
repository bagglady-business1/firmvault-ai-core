import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUp, StickyNote, ListTodo, CalendarPlus, Sparkles } from "lucide-react";

export function MatterActionBar() {
  const actions = [
    { label: "Upload Document", icon: FileUp },
    { label: "Add Note", icon: StickyNote },
    { label: "New Task", icon: ListTodo },
    { label: "Add Deadline", icon: CalendarPlus },
    { label: "Run AI Review", icon: Sparkles, primary: true },
  ];
  return (
    <Card className="bg-card border-border p-3 flex flex-wrap items-center gap-2">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground px-2">
        Quick actions
      </span>
      <div className="ml-auto flex flex-wrap gap-2">
        {actions.map((a) => (
          <Button
            key={a.label}
            size="sm"
            variant={a.primary ? "default" : "outline"}
            className={a.primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
          >
            <a.icon className="h-4 w-4" />
            {a.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
