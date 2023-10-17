import React, { useEffect, useState } from "react";

const PopUp = ({
  isOpen,
  onClose,
  selected,
  scriptName,
}: {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  selected: (id: string, script: string, words: number, lines: number) => void;
  scriptName: (name: string) => void;
}) => {
  const [SelectedOption, setSelectedOption] = useState("1");
  const [Options, setOptions] = useState({
    scriptDB: [
      {
        id: "",
        name: "",
        body: "",
      }
    ]
  });

  const SelectOption = () => {
    return (
      <>
        <select value={SelectedOption || ""} onChange={selectedOption}>
          <option value={"none"}>Select</option>
          {Options.scriptDB.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </>
    );
  };

  const getAllScripts = async () => {
    try {
      const response = await fetch("/api/script/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseData: {
          scriptDB: [
            {
              id: string;
              name: string;
              body: string;
            }
          ];
        } = await response.json();

        setOptions(responseData);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getScript = async () => {
    const data = SelectedOption;
    try {
      const response = await fetch("/api/script/" + data, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseData: {
          scriptInfo: {
            id: string;
            name: string;
            body: string;
          };
        } = await response.json();
        const body = responseData.scriptInfo.body;
        const name = responseData.scriptInfo.name;
        const id = responseData.scriptInfo.id;

        const formaterBody = body.replace(/;/g, ";\n").replace(/{/g, "{\n");

        const words = formaterBody.split(/\s+|\n+/);
        const line = formaterBody.split("\n");
        //funciones pasadas desde el padre. Se envia la informacion para que el padre se actualice
        selected(id, formaterBody, words.length - 1, line.length);
        scriptName(name);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const selectedOption = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(value);
  };

  const close = () => {
    onClose(false);
  };

  useEffect(() => {
    getAllScripts();
  }, []);

  return (
    <div>
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={close}></div>
      <div className={`popup-container-load ${isOpen ? "open" : ""}`}>
        <div>Elige un archivo</div>
        <div>
          <SelectOption />
        </div>

        <button className="popUp-button button" onClick={getScript}>
          Enviar
        </button>
        <button className="popUp-button button " onClick={close}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PopUp;
