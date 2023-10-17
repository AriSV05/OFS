import { NextResponse } from "next/server";
import { saveScriptFire } from "@/Controller/Controller";

export const POST = async (request: Request) => {
  saveScriptFire(await request.json());
  return NextResponse.json({});
};
