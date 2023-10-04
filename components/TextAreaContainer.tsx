"use client";
import { EAComponent, TAComponent, RAComponent } from "./TextAreaComponent";
import WordLineCounter from "./WordLineCounter";

const TextAreaContainer = ({
  scriptName,
  ScriptTAName,
  EAstate,
  TAstate,
  RAstate,
  setEAState,
  setCountedEALines,
  setCountedEAWords,
  CountedEAWords,
  CountedEALines,
  CountedTAWords,
  CountedTALines,
}: {
  setEAState: (text: string) => void;

  scriptName: string;
  ScriptTAName: string;
  EAstate: string;
  TAstate: string;
  RAstate: string;
  CountedEAWords: Number;
  CountedEALines: Number;
  CountedTAWords: Number;
  CountedTALines: Number;
  setCountedEALines: (lines: number) => void;
  setCountedEAWords: (words: number) => void;
}) => {
  const contador = (text: string) => {
    const words = text.split(/\s+|\n+/);
    const line = text.split("\n");

    setCountedEAWords(words.length - 1);
    setCountedEALines(line.length);
  };

  return (
    <div className="text-container">
      <div className="EA-container">
        <EAComponent
          EAstate={EAstate}
          setEAstate={setEAState}
          contador={contador}
        />
        <WordLineCounter
          lines={CountedEALines.toString()}
          words={CountedEAWords.toString()}
          scriptName={scriptName}
        />
      </div>
      <div className="TA-container">
        <TAComponent TAstate={TAstate} />
        <WordLineCounter
          lines={CountedTALines.toString()}
          words={CountedTAWords.toString()}
          scriptName={ScriptTAName}
        />
      </div>
      <div className="RA-container">
        <RAComponent RAstate={RAstate} />
      </div>
    </div>
  );
};

export default TextAreaContainer;
