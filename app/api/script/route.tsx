import { NextResponse } from 'next/server'
import { script, scriptFront, scriptUpdate } from '@/bd/interfaces/scripts'
import {getScripts, saveScript} from '@/bd/controller/BdController';



export const GET = async() => {

  const scripts = getScripts()

  return NextResponse.json(
    { scripts }
  )

}

export async function POST(
  request: Request
) {
  //Endpoint POST to save a new script
  const res: scriptFront = await request.json()
  saveScript(res)
  return NextResponse.json(
    {}
  )
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