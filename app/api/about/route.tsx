import { NextResponse } from "next/server";
import { getAbout, aboutDB } from "@/bd/controller/BdController";

export const GET = async () => {
  const about = getAbout(); //TODO

  const aboutInfo = await aboutDB();

  return NextResponse.json({ aboutInfo });
};
