import MainNav from "@/components/shared/main-nav";
import React from "react";

export default function WorkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainNav>{children}</MainNav>;
}
