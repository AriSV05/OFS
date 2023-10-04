import { NextResponse } from "next/server";
import { getWords } from "@/bd/controller/BdController";

export const GET = async () => {
  try {
    const words = getWords();

    return NextResponse.json({ words });

  } catch {

    return NextResponse.json({ status: 500 });
    
  }
};
