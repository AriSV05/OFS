import { scriptsInfo } from '@/data/scripts.json'
import { NextResponse } from 'next/server'


export const POST = async (
    request: Request,
    { params }: { params: { id: string } }
) => {
    const scriptId = params.id

    const selectedScript = scriptsInfo.find((script) => script.id == scriptId)


    return NextResponse.json(
        { selectedScript }
    )

}


