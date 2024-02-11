"use client";
import { supabase } from "@/lib/initSupabase";
import React from "react";
import Image from "next/image";
import { getCurrentUserData } from "../util-functions";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  return (
    <div>
      {/* {JSON.stringify(user)}
      {JSON.stringify(countryData, null, 2)} */}
      <h1>home</h1>
      <img
        src="https://pyxis.nymag.com/v1/imgs/de9/98f/270f604ba6bcc9df5dc6b2d01e0a6fb2d4-barbie-ken.1x.rsquare.w1400.jpg"
        alt={"the goat"}
      />
      <h2>home page coming soon</h2>
      <h3>stay tuned</h3>
      
    </div>
  );
}
