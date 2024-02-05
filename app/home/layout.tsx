import MainNav from "@/components/shared/main-nav";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainNav>{children}</MainNav>;
}
