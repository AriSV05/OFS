import React, { useState } from "react";

const RecommendedComponent = ({
  recommend,
  selectedRecWord,
}: {
  recommend: Array<string>;
  selectedRecWord: (text: string) => void;
}) => {
  const [selectedWord, setselectedWord] = useState("");

  const selectedOption = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    selectedRecWord(value);
  };
  return (
    <div className="select-word">
      <select value={selectedWord || ""} onChange={selectedOption}>
        <option value={"none"}>Select</option>
        {recommend.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RecommendedComponent;
