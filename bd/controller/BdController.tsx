import { scriptsInfo } from "@/data/scripts.json";
import { aboutInfo } from "@/data/about.json";
import { wordsInfo } from "@/data/words.json";
import fs from "fs";
import { connexion } from "@/libs/mysql";
import { script, scriptFront, scriptUpdate } from "@/bd/interfaces/scripts";

export const selectNow = async() => {
  const result = await connexion.query<{ NOW: string }[]>("SELECT NOW() AS NOW");
  console.log(result[0].NOW)
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
