
import { NextResponse } from 'next/server'



export const POST = async (request: Request) => {

    const newRes = {
        timestamp: new Date(),
        text: await request.json()
    }
    return NextResponse.json({ newRes })
}
