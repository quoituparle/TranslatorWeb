// frontend/src/app/page.tsx
import Translation from "@/src/components/TranslationView";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12 md:p-24">
        <Translation />
    </main>
  );
}