import { Suspense } from "react";
import { RelicGallery } from "@/components/RelicGallery";

export default function RelicsPage() {
  return (
    <Suspense fallback={<p className="text-signal">Aligning map coordinates…</p>}>
      <RelicGallery />
    </Suspense>
  );
}
