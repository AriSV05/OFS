import { scriptUpdate } from '@/bd/interfaces/scripts'
import { scriptsInfo } from '@/data/scripts.json'
import { NextResponse } from 'next/server'


export const POST = async (
    request: Request,
    { params }: { params: { id: string } }
) => {

    //save post with id
    const scriptId = params.id
    const res: scriptUpdate = await request.json()

    const selectedScript = scriptsInfo.find((script) => script.id == scriptId)


    return NextResponse.json(
        { selectedScript }
    )

}