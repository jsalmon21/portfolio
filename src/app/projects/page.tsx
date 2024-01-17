import Link from "next/link";
import React from "react";
import { ArrowUpRightFromSquare } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export default async function ProjectsPage() {
  const projects = [
    {
      title: "jasonvincent.io",
      href: "https://github.com/jsalmon21/portfolio",
      description:
        "Custom Next.js portfolio website to showcase my work and experience.",
    },
  ];

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h1>
          <p className="mt-4 text-zinc-400">
            Some of the projects I&apos;ve been working on.
          </p>
        </div>
        <hr className="w-full bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {projects.map((pj) => {
            return (
              <Link
                key={JSON.stringify(pj)}
                href={pj.href}
                target="_blank"
                rel="nofollow"
              >
                <section className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 p-8">
                  <div className="flex justify-between">
                    <h2 className="mb-4">{pj.title}</h2>
                    <ArrowUpRightFromSquare />
                  </div>
                  <p>{pj.description}</p>
                </section>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
