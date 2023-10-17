import { NextResponse } from "next/server";
import { aboutFire } from "@/Controller/Controller";

export const GET = async () => {


  const aboutInfo = await aboutFire();
  return NextResponse.json({ aboutInfo });
};
