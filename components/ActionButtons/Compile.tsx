import React from "react";

const Compile = ({
  EAState,
  ScriptId,
  setScripTAName,
  setAlertState,
  setAlertText,
  setTAState,
  ScriptName,
  setCountedTAWords,
  setCountedTALines,
}: {
  EAState: string;
  ScriptId:string
  setScripTAName: (text: string) => void;
  setAlertState: (show: boolean) => void;
  setAlertText: (text: string) => void;
  setTAState: (text: string) => void;
  ScriptName: string;
  setCountedTAWords: (value: number) => void;
  setCountedTALines: (value: number) => void;
}) => {
  const trimming = (texto: string) => {
    const words = texto.split(/\s+/);
    words.join("");
    return words;
  };

  const contador = (text: string) => {
    const words = text.split(/\s+|\n+/);
    const line = text.split("\n");

    setCountedTAWords(words.length - 1);
    setCountedTALines(line.length);
  };

  const compile = async () => {
    const data = {id:ScriptId,
      body:EAState,
    name:ScriptName};

    setScripTAName(`${ScriptName.replace('.ofs', '')}.js`);

    trimming(EAState);
    if (EAState.length == 0) {
      setAlertState(true);
      setAlertText("EA se encuentra vacio");
      setScripTAName(".js");
    } else {
      setAlertState(false);
      try {
        const response = await fetch("/api/compile", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          cache: 'no-store' 
        });

        if (response.status === 200) {
          const responseData: {
            newRes: { timestamp: string; text: {text:string} };
          } = await response.json();
          setTAState(
            "Time Stamp:" +
              responseData.newRes.timestamp +
              "\n\nimport {Stream} from generador.mjs"+
              "\n\n" +
              responseData.newRes.text.text
          );
          contador(responseData.newRes.text.text);

        } else {
          console.error("Error en la solicitud:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <>
      <button onClick={compile} className="button">
        Compile
      </button>
    </>
  );
};

export default Compile;
