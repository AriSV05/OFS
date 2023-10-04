import React from "react";

const Clear = ({
  setEAState,
  setTAState,
  setRAState,
  setScriptId,
  setAlertState,
  setScripTAName,
  setScriptName,
  setCountedEAWords,
  setCountedEALines,
  setCountedTAWords,
  setCountedTALines,
}: {
  setEAState: (vacio: string) => void;
  setTAState: (vacio: string) => void;
  setRAState: (vacio: string) => void;
  setScriptId: (vacio: string) => void;
  setAlertState: (show: boolean) => void;
  setScripTAName: (vacio: string) => void;
  setScriptName: (vacio: string) => void;
  setCountedEAWords: (vacio: number) => void;
  setCountedEALines: (vacio: number) => void;
  setCountedTAWords: (vacio: number) => void;
  setCountedTALines: (vacio: number) => void;
}) => {
  const clear = () => {
    setEAState("");
    setTAState("");
    setRAState("");
    setScriptId("");
    setAlertState(false);
    setScripTAName("");
    setScriptName("");
    setCountedEAWords(0);
    setCountedEALines(0);
    setCountedTAWords(0);
    setCountedTALines(0);
  };

  return (
    <>
      <button className="button" onClick={clear}>
        Clear
      </button>
    </>
  );
};

export default Clear;
