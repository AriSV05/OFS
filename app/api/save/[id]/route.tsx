import { NextResponse } from "next/server";
import { updateScriptFire } from "@/Controller/Controller";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  updateScriptFire(await request.json(), params.id);

  return NextResponse.json({});
};
