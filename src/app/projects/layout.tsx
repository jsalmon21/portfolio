import type { Metadata } from "next";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Jason Vincent | Projects",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
