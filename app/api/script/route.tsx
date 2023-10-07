import { NextResponse } from "next/server";
import { getAllScriptsFire } from "@/bd/controller/BdController";

export const GET = async () => {
  const scriptDB = await getAllScriptsFire();

  return NextResponse.json({ scriptDB });
};
