import { NextResponse } from "next/server";
import { saveScriptFire } from "@/bd/controller/BdController";

export const POST = async (request: Request) => {
  saveScriptFire(await request.json());
  return NextResponse.json({});
};
