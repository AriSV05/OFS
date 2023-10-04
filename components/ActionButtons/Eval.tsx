import React from "react";

const Eval = ({
  TAState,
  setAlertState,
  setAlertText,
  setRAState,
}: {
  TAState: string;
  setAlertState: (show: boolean) => void;
  setAlertText: (text: string) => void;
  setRAState: (text: string) => void;
}) => {
  const trimming = (texto: string) => {
    const words = texto.split(/\s+/);
    words.join("");
    return words;
  };

  const evalTA = async () => {
    const data = TAState;
    trimming(data);
    if (data.length == 0) {
      setAlertState(true);
      setAlertText("TA se encuentra vacio");
    } else {
      setAlertState(false);
      try {
        const response = await fetch("/api/eval", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const responseData: { newRes: { timestamp: string; text: string } } =
            await response.json();
          setRAState(
            "Time Stamp:" +
              responseData.newRes.timestamp +
              "\n\n" +
              responseData.newRes.text
          );
        } else {
          console.error("Error en la solicitud:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
        setAlertState(true);
        setAlertText("EA se encuentra vacio");
      }
    }
  };
  return (
    <>
      <button onClick={evalTA} className="button">
        Eval
      </button>
    </>
  );
};

export default Eval;
