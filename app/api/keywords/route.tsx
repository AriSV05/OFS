import { NextResponse } from "next/server";
import { getWordsFire } from "@/bd/controller/BdController";

export const GET = async () => {
  const words = await getWordsFire();

  return NextResponse.json({ words });
};
