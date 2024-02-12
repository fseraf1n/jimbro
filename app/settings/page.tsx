"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/initSupabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SettingsPage() {
  const router = useRouter();
  const handleSignOut = async () => {
    const response = await fetch("/auth/signout", {
      method: "POST",
    });
    if (response.status == 302) {
      localStorage.clear();
      router.replace("/");
    }
  };
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <h1 className="p-3">settings</h1>
      <Button className="w-32 self-center" variant={"destructive"} onClick={() => handleSignOut()}>sign out</Button>
    </div>
  );
}
