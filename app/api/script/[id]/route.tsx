import { scriptsInfo } from "@/data/scripts.json";
import { NextResponse } from "next/server";
import { getScriptByIdDB } from "@/bd/controller/BdController";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {

  const scriptInfo = await getScriptByIdDB(params.id);

  return NextResponse.json({ scriptInfo });
};
