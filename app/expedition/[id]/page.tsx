import { notFound } from "next/navigation";
import { ExpeditionPlayer } from "@/components/ExpeditionPlayer";
import { EXPEDITIONS, getExpedition } from "@/content/expeditions";

export function generateStaticParams() {
  return EXPEDITIONS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expedition = getExpedition(id);
  return {
    title: expedition?.title ?? "Chamber",
    description: expedition?.openingQuestion,
  };
}

export default async function ExpeditionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const expedition = getExpedition(id);
  if (!expedition) notFound();
  return <ExpeditionPlayer expedition={expedition} />;
}
