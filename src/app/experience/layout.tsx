import type { Metadata } from "next";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Jason Vincent | Experience",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
