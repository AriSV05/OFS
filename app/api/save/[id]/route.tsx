
import { NextResponse } from 'next/server'
import { scriptUpdate } from '@/bd/interfaces/scripts'
import {updateScriptName} from '@/bd/controller/BdController';


export const POST = async (
    request: Request,
    { params }: { params: { id: string } }
) => {

    const scriptId = params.id
    //Endpoint PUT to save a new script
    const newScript: scriptUpdate = await request.json()

    const nameUpdated: boolean = updateScriptName(newScript, scriptId)

    if (!nameUpdated) {
        return NextResponse.json({ status: 500 })

    }

    return NextResponse.json({ status: 200 })
}