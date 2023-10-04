import React from "react";

const Compile = ({
  EAState,
  setScripTAName,
  setAlertState,
  setAlertText,
  setTAState,
  ScriptName,
  setCountedTAWords,
  setCountedTALines,
}: {
  EAState: string;
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
    const data = EAState;
    setScripTAName(`${ScriptName}.js`);

    trimming(data);
    if (data.length == 0) {
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
        });

        if (response.status === 200) {
          const responseData: {
            newRes: { timestamp: string; text: string };
          } = await response.json();
          setTAState(
            "Time Stamp:" +
              responseData.newRes.timestamp +
              "\n\n" +
              responseData.newRes.text
          );
          contador(responseData.newRes.text);

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
