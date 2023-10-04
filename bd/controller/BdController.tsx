import { scriptsInfo } from "@/data/scripts.json";
import { aboutInfo } from "@/data/about.json";
import { wordsInfo } from "@/data/words.json";
import fs from "fs";
import { connexion } from "@/libs/mysql";
import { script, scriptFront, scriptUpdate } from "@/bd/interfaces/scripts";

export const aboutDB = async () => {
  const query = `
    SELECT integrantes, universidad, escuela, asignatura, proyecto, ciclo
    FROM ABOUT
  `;
  const result = await connexion.query<
    {
      integrantes: string;
      universidad: string;
      escuela: string;
      asignatura: string;
      proyecto: string;
      ciclo: string;
    }[]
  >(query);

  const aboutData = {
    integrantes: JSON.parse(result[0].integrantes),
    universidad: result[0].universidad,
    escuela: result[0].escuela,
    asignatura: result[0].asignatura,
    proyecto: result[0].proyecto,
    ciclo: result[0].ciclo,
  };

  return aboutData;
};

export const getScriptsDB = async () => {
  const query = `
  SELECT id, name, body
  FROM scripts
`;

  const result = await connexion.query<
    { id: number; name: string; body: string }[]
  >(query);

  const scriptsData = result.map((row) => ({
    id: row.id,
    name: row.name,
    body: row.body,
  }));

  return scriptsData;
};

export const getScriptByIdDB = async (idparam: string) => {
  const query = `
    SELECT id, name, body
    FROM scripts
    WHERE id = ?
  `;

  const result = await connexion.query<
    { id: string; name: string; body: string }[]
  >(query, [idparam]);

  const scriptData = {
    id: result[0].id,
    name: result[0].name,
    body: result[0].body,
  };

  return scriptData;
};

export const getScripts = () => {
  return scriptsInfo;
};

export const saveScript = (script: scriptFront): void => {
  const newScript: script = {
    id: (scriptsInfo.length + 1).toString(),
    name: script.name,
    body: script.body,
  };
  const newScriptsInfo = [...scriptsInfo, newScript];
  const scripts = {
    scriptsInfo: newScriptsInfo,
  };
  const newScriptsObj = JSON.stringify(scripts);

  //Ruta al archivo JSON

  fs.writeFileSync("./data/scripts.json", newScriptsObj);
};

export const updateScriptName = (script: scriptUpdate, id: string): boolean => {
  let updated: boolean = false;
  scriptsInfo.forEach((scriptElement) => {
    if (scriptElement.id === id) {
      scriptElement.name = script.name;
      updated = true;
    }
  });

  if (updated) {
    const scripts = {
      scriptsInfo: scriptsInfo,
    };

    const newScriptsObj = JSON.stringify(scripts);

    //Ruta al archivo JSON

    fs.writeFileSync("./data/scripts.json", newScriptsObj);
    return updated;
  }
  return updated;
};

// private modificarValorPorId = (id: string, nuevoValor: string) => (objeto: script) => {
//     if (objeto.id === id) {
//         objeto.name = nuevoValor
//         return objeto
//     } else {
//         return objeto
//     };
// }

export const getAbout = () => {
  return aboutInfo;
};

export const getWords = () => {
  return wordsInfo;
};

export async function writeToFile(
  filePath: string,
  data: string
): Promise<void> {
  try {
    // Escribe la cadena JSON en el archivo
    await fs.promises.appendFile(filePath, data + "\n");
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    throw error;
  }
}
