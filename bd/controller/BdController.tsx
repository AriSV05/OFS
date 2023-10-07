import { scriptsInfo } from "@/data/scripts.json";
import { aboutInfo } from "@/data/about.json";
import { wordsInfo } from "@/data/words.json";
import fs from "fs";
import { db } from "@/libs/firebase";
import { script, scriptFront, scriptUpdate } from "@/bd/interfaces/scripts";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  DocumentData,
  setDoc,
  doc,
} from "firebase/firestore";

export const aboutFire = async () => {
  const querySnapshot = await getDocs(collection(db, "about"));

  if (!querySnapshot.empty) {
    const aboutData: {
      data: DocumentData;
    } = {
      data: querySnapshot.docs[0].data(),
    };

    return aboutData;
  } else {
    return {}; // La colección está vacía, retornamos un objeto vacío
  }
};

export const getAllScriptsFire = async () => {
  // Realizar una consulta para obtener todos los documentos en la colección
  const querySnapshot = await getDocs(collection(db, "scripts"));

  // Transformar los datos de Firestore en un formato similar a MySQL
  const scriptsData = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      body: data.body,
    };
  });

  return scriptsData;
};

export const getScriptByIdFire = async (idparam: string) => {
  const docRef = doc(db, "scripts", idparam);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const scriptData = docSnapshot.data();
    return {
      id: docSnapshot.id,
      name: scriptData.name,
      body: scriptData.body,
    };
  } else {
    console.error("El script no existe");
    return null; // O puedes lanzar un error aquí si prefieres manejarlo de esa manera
  }
    
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
