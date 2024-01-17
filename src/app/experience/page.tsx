import Link from "next/link";
import React from "react";
import { Navigation } from "@/components/Navigation";

export default async function ExperiencePage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Experience
          </h1>
          <p className="mt-4 text-zinc-400">
            My related work and educational experience.
          </p>
        </div>
        <hr className="w-full bg-zinc-800" />
      </div>
    </div>
  );
}
