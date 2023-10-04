
const WordLineCounter = ({
  lines,
  words,
  scriptName,
}: {
  lines: string;
  words: string;
  scriptName: string;
}) => {

  return (
    <div className="contador">
      Linea: {lines} &nbsp;&nbsp; Palabras: {words} Nombre: {scriptName}
    </div>
  );
};

export default WordLineCounter;
