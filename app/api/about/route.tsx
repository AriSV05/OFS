import { NextResponse } from "next/server";
import { aboutFire } from "@/bd/controller/BdController";

export const GET = async () => {


  const aboutInfo = await aboutFire();
  return NextResponse.json({ aboutInfo });
};
