
import { NextResponse } from 'next/server';
import dns from 'node:dns';

export const POST = async (request: Request) => {

  const data = await request.json();
  const numericId = parseInt(data.id);
  const requestData = { id: numericId, body: data.body, name: data.name};

  dns.setDefaultResultOrder('ipv4first');
  const response = await fetch("http://localhost:8000/transpilador", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData)
  });


  const prologData = await response.json(); // Parsea la respuesta del servidor Prolog si es necesario

  const timestamp = `Generated by Prolog OFS 2 transpiler ${new Date()}`;

  const newRes = {
    timestamp: timestamp,
    text: prologData
  }
  //console.log(newRes)
  return NextResponse.json({ newRes });

};
