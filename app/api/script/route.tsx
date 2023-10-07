import { NextResponse } from "next/server";
import { scriptFront } from "@/bd/interfaces/scripts";
import { saveScript, getAllScriptsFire } from "@/bd/controller/BdController";

export const GET = async () => {
  const scriptDB = await getAllScriptsFire();

  return NextResponse.json({ scriptDB });
};

export async function POST(request: Request) {
  //UTILIDAD? TODO
  //Endpoint POST to save a new script
  const res: scriptFront = await request.json();
  saveScript(res);
  return NextResponse.json({});
}

// export async function PUT(
//   request: Request
// ) {

//   //Endpoint PUT to save a new script
//   const newScript: scriptUpdate = await request.json()

//   const nameUpdated:boolean=handlerBaseDatos.updateScriptName(newScript)

//   if(!nameUpdated){
//     return NextResponse.json({status:500})

//   }

//   return NextResponse.json({status:200})
// }
