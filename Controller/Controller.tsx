import { db } from "@/libs/firebase";
import fs from 'fs'
import {
  collection,
  getDocs,
  getDoc,
  DocumentData,
  setDoc,
  doc,
  updateDoc,
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

export const getWordsFire = async () => {
  const querySnapshot = await getDocs(collection(db, "words"));

  const wordsData: {
    data: DocumentData;
  } = {
    data: querySnapshot.docs[0].data(),
  };

  return wordsData.data.words;
};

export const saveScriptFire = async (script: {
  name: string;
  body: string;
}) => {
  const querySnapshot = await getDocs(collection(db, "scripts"));
  const totalScripts = querySnapshot.size;

  // Calcula el nuevo ID sumando 1 al total de scripts
  const newScriptId = (totalScripts + 1).toString();

  // Crea un nuevo documento en la colección con el nuevo ID y datos del script
  await setDoc(doc(collection(db, "scripts"), newScriptId), {
    name: script.name+".ofs",
    body: script.body,
  });
};

export const updateScriptFire = async (
  script: { name: string; body: string },
  idparam: string
) => {
  const scriptDocRef = doc(collection(db, "scripts"), idparam);

  // El documento ya existe, así que lo actualizamos
  await updateDoc(scriptDocRef, {
    name: script.name,
    body: script.body,
  });
};

export async function appendToFile(
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


export async function overwriteFile(
  filePath: string,
  data: string
): Promise<void> {
  try {
    // Escribe la cadena JSON en el archivo
    await fs.promises.writeFile(filePath, data + "\n");
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    throw error;
  }
}

