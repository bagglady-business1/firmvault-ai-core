import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Share2,
  Pencil,
  Plus,
  MoreHorizontal,
  MapPin,
  Hash,
  UserCircle2,
} from "lucide-react";
import type { Matter } from "@/data/mockMatters";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "./badges";

export function MatterHeader({ matter }: { matter: Matter }) {
  return (
    <div className="border-b border-border bg-card/40">
      <div className="px-6 pt-5">
        <Link
          to="/matters"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Matters
        </Link>
      </div>

      <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{matter.name}</h1>
            <StatusBadge status={matter.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {matter.practiceArea} · Client: {matter.client}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Hash className="h-3.5 w-3.5" />
              {matter.id}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {matter.jurisdiction}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserCircle2 className="h-3.5 w-3.5" />
              {matter.assignedAttorney}
            </span>
            <div className="flex -space-x-1.5">
              {matter.team.slice(0, 4).map((m) => (
                <span
                  key={m.name}
                  title={`${m.name} · ${m.role}`}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold ring-2 ring-card"
                >
                  {m.initials}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4" />
            Edit Matter
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            New
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>Duplicate matter</DropdownMenuItem>
              <DropdownMenuItem>Export PDF</DropdownMenuItem>
              <DropdownMenuItem>Print summary</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Close matter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
