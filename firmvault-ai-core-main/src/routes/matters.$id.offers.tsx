import { createFileRoute } from "@tanstack/react-router";
import { MatterOffersPage } from "@/pages/matters/MatterOffersPage";
export const Route = createFileRoute("/matters/$id/offers")({ component: MatterOffersPage });
