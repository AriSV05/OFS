
/*import { NextResponse } from 'next/server'
 


export async function POST( request: Request ) {
    
    const requestBodyText = await request.json();

    const lines = requestBodyText.split('\n');
    const codigo = lines.slice(2).join('\n');

    const newRes= {
        timestamp: new Date(),
        text: codigo
    }
    return NextResponse.json({ newRes })
}*/



import { NextResponse } from 'next/server';
import { writeToFile } from '@/bd/controller/BdController';

export const POST = async (request: Request) => {

    const requestBodyText: string = await request.json();
    const lines: string[] = requestBodyText.split('\n');
    const codigo: string = lines.slice(2).join('\n');

    const newRes = {
        timestamp: new Date(),
        text: codigo,
    };

    // Define la ruta del archivo
    const filePath: string = './data/ra_fake.txt';

    // Convierte el objeto newRes a una cadena JSON
    const jsonContent: string = JSON.stringify(newRes, null, 2);

    // Escribe la cadena JSON en el archivo
    await writeToFile(filePath, jsonContent);

    return NextResponse.json({ newRes });
}

