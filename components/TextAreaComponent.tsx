import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import RecommendedComponent from "./RecommendedComponent";

export const EAComponent = ({
  EAstate,
  setEAstate,
  contador,
}: {
  EAstate: string;
  setEAstate: (text: string) => void;
  contador: (text: string) => void;
}) => {
  const [ReservedWords, setReservedWords] = useState(Array<string>);
  const [RecommendedWords, setRecommendedWords] = useState(Array<string>);
  const TextareaRef = useRef<HTMLTextAreaElement>(null);

  const change = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    const eaTextarea = value;
    setEAstate(eaTextarea);
    contador(eaTextarea);
    recomendedWords(eaTextarea);
  };

  const trimming = (texto: string) => {
    const words = texto.split(/\s+/);
    words.join("");
    return words;
  };

  const recomendedWords = (texto: string) => {
    const trimText = trimming(texto);
    const lastWord: Array<string> = [trimText[trimText.length - 1]];
    const matchWords: Array<string> = [];

    lastWord.map((actual) => {
      if (
        ReservedWords.some((e) => {
          if (e.includes(actual)) {
            matchWords.push(e);
          }
        })
      ) {
      }
    });

    setRecommendedWords(matchWords);
  };

  const selectRecomended = (text: string) => {
    const currentSelection = TextareaRef.current!;
    const start = currentSelection.selectionStart;
    const end = currentSelection.selectionEnd;
    const newEA = EAstate.substring(0, start) + text + EAstate.substring(end);

    setEAstate(newEA);
  };

  const reservedWords = async () => {

    try {
      const response = await fetch("/api/keywords", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: 'no-store' 
      });

      if (response.status === 200) {
        const responseData: {
          words: Array<string>;
        } = await response.json();
        setReservedWords(responseData.words);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    reservedWords();
  }, []);


  return (
    <>
      <textarea
        className="EA"
        cols={20}
        ref={TextareaRef}
        onChange={change}
        value={EAstate}
      ></textarea>

        <RecommendedComponent
          selectedRecWord={selectRecomended}
          recommend={RecommendedWords}
        />

    </>
  );
};

export const TAComponent = ({ TAstate }: { TAstate: string }) => {
  return (
    <textarea className="TA" cols={20} readOnly value={TAstate}></textarea>
  );
};

export const RAComponent = ({ RAstate }: { RAstate: string }) => {
  return (
    <textarea className="RA" cols={50} readOnly value={RAstate}></textarea>
  );
};
