
import { NextResponse } from 'next/server'
import { getAbout,selectNow } from '@/bd/controller/BdController';

export const GET = async () => {

  const about = getAbout()
  console.log(selectNow())
  return NextResponse.json(
    
    { about }
  )
}