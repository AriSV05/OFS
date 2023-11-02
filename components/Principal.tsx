"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import TextAreaContainer from "./TextAreaContainer";
import PopUpLoad from "./PopUps/PopUpLoad";
import PopUpSave from "./PopUps/PopUpSave";
import Alert from "./Alert";
import { Save, Load } from "./ActionButtons/SaveLoadButtons";
import Compile from "./ActionButtons/Compile";
import Eval from "./ActionButtons/Eval";
import Clear from "./ActionButtons/Clear";

const Principal = () => {
  const [TAState, setTAState] = useState("");
  const [EAState, setEAState] = useState("");
  const [RAState, setRAState] = useState("");

  const [ScriptName, setScriptName] = useState("");
  const [ScriptTAName, setScripTAName] = useState("");
  const [ScriptId, setScriptId] = useState("");

  const [CountedEAWords, setCountedEAWords] = useState(Number);
  const [CountedEALines, setCountedEALines] = useState(Number);
  const [CountedTAWords, setCountedTAWords] = useState(Number);
  const [CountedTALines, setCountedTALines] = useState(Number);


  const [AlertText, setAlertText] = useState("");
  const [AlertState, setAlertState] = useState(false);

  const [LoadOpen, setLoadOpen] = useState(false);
  const [SaveOpen, setSaveOpen] = useState(false);

  const selectedScript = (
    id: string,
    script: string,
    words: number,
    lines: number
  ) => {
    // Esta funcion se pasa al componente hijo PopUp. Se actualizara el EA
    setEAState(script);
    setCountedEALines(lines);
    setCountedEAWords(words);
    setScriptId(id);
  };

  return (
    <div className="principal">
      <div className="principal-buttons">
        <div className="left-buttons">
          <Save setSaveOpen={setSaveOpen} />
          <Load setLoadOpen={setLoadOpen} />
        </div>
        <div className="right-buttons">
          <Clear
            setEAState={setEAState}
            setTAState={setTAState}
            setRAState={setRAState}
            setScriptId={setScriptId}
            setAlertState={setAlertState}
            setScripTAName={setScripTAName}
            setScriptName={setScriptName}
            setCountedEAWords={setCountedEAWords}
            setCountedEALines={setCountedEALines}
            setCountedTAWords={setCountedTAWords}
            setCountedTALines={setCountedTALines}
          />

          <Compile
            EAState={EAState}
            ScriptId = {ScriptId}
            setScripTAName={setScripTAName}
            setAlertState={setAlertState}
            setAlertText={setAlertText}
            setTAState={setTAState}
            ScriptName={ScriptName}
            setCountedTAWords={setCountedTAWords}
            setCountedTALines={setCountedTALines}
          />

          <Eval
            TAState={TAState}
            setAlertState={setAlertState}
            setAlertText={setAlertText}
            setRAState={setRAState}
          />
        </div>
      </div>
      {SaveOpen && (
        <PopUpSave
          isOpen={SaveOpen}
          onClose={setSaveOpen}
          EAstate={EAState}
          id={ScriptId}
          scriptName={setScriptName}
        />
      )}

      {LoadOpen && (
        <PopUpLoad
          isOpen={LoadOpen}
          onClose={setLoadOpen}
          selected={selectedScript}
          scriptName={setScriptName}
        />
      )}

      <TextAreaContainer
        scriptName={ScriptName}
        ScriptTAName={ScriptTAName}
        EAstate={EAState}
        TAstate={TAState}
        RAstate={RAState}
        setEAState={setEAState}
        setCountedEAWords={setCountedEAWords}
        setCountedEALines={setCountedEALines}
        CountedEALines={CountedEALines}
        CountedEAWords={CountedEAWords}
        CountedTALines={CountedTALines}
        CountedTAWords={CountedTAWords}
      />
        {AlertState ? <Alert descripcion={AlertText} /> : ""}
    </div>
  );
};

export default Principal;
