import { NextResponse } from "next/server";
import { getWordsFire } from "@/Controller/Controller";

export const GET = async () => {
  const words = await getWordsFire();

  return NextResponse.json({ words });
};
