import { NextResponse } from "next/server";
import { getScriptByIdFire } from "@/bd/controller/BdController";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {

  const scriptInfo = await getScriptByIdFire(params.id);

  return NextResponse.json({ scriptInfo });
};
