import React, { ChangeEvent, useState } from "react";

const PopUpSave = ({
  isOpen,
  onClose,
  EAstate,
  id,
  scriptName,
}: {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  EAstate: string;
  id: string;
  scriptName: (name: string) => void;
}) => {
  const [name, setName] = useState("");

  const save = () => {
    //Trim del name
    if (id.length > 0) {
      saveAs();
    } else {
      saveNew();
    }
  };

  const saveNew = async () => {
    const data = {
      name: name,
      body: EAstate,
    };
    try {
      const response = await fetch("/api/script", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        window.confirm("Archivo Guardado");
        scriptName(name);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveAs = async () => {
    const data = {
      name: name,
      body: EAstate,
    };
    try {
      const response = await fetch("/api/save/" + id, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        window.confirm("Archivo Guardado");
        scriptName(name);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputText = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  const close = () => {
    onClose(false);
  };

  return (
    <div>
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={close}></div>
      <div className={`popup-container-save ${isOpen ? "open" : ""}`}>
        <input
          type="text"
          onChange={inputText}
          value={name}
          placeholder="Ingrese el nombre del archivo"
        />
        <button className="popUp-button button" onClick={save}>
          Enviar
        </button>
        <button className="popUp-button button " onClick={close}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PopUpSave;
