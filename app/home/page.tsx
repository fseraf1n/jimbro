import { supabase } from "@/lib/initSupabase";
import React from "react";
import { getCurrentUserData } from "../util-functions";

export default async function Home() {
  const user = await getCurrentUserData();
  const {data: countryData, error } = await supabase.from('countries').select('*')
  const session = await supabase.auth.getSession()
  console.log(session)
  return (
    <div>
      {JSON.stringify(user)}
      {JSON.stringify(countryData, null, 2)}
    </div>
  );
}
