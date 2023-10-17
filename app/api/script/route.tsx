import { NextResponse } from "next/server";
import { getAllScriptsFire } from "@/Controller/Controller";

export const GET = async () => {
  const scriptDB = await getAllScriptsFire();

  return NextResponse.json({ scriptDB });
};
