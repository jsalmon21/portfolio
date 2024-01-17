import React from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Jason Vincent | Contact",
};

export default async function ContactPage() {
  return (
    <div className="relative pb-16">
      <Navigation />
    </div>
  );
}
