
import { NextResponse } from 'next/server';
import { appendToFile, overwriteFile } from '@/Controller/Controller';

export const POST = async (request: Request) => {

    const requestBodyText: string = await request.json();
    const lines: string[] = requestBodyText.split('\n');
    const codigo: string = lines.slice(2).join('\n');

    let filePath: string = './data/script.js';
    await overwriteFile(filePath, codigo);

    const salida = await executeScript();

    
    const newRes = {
        timestamp: new Date(),
        text: salida
    };

    // Convierte el objeto newRes a una cadena JSON
    const jsonContent: string = JSON.stringify(newRes, null, 2);

    // Escribe la cadena JSON en el archivo
    await appendToFile(filePath, jsonContent);

    return NextResponse.json({ newRes });
}


import exec from 'child_process';
const executeScript = async() : Promise<string> => {
    return new Promise((resolve, reject) => {
      exec.exec(`node data/script.js`, (error, stdout) => {
        if (error) {
          reject(`Error al ejecutar el código: ${error.message}`);
        } else {
          resolve(stdout);
        }
      });
    });
  }