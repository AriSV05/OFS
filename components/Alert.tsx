import React from "react";

const Alert = ({ descripcion }: { descripcion: string }) => {
  return <div className="alert">Alerta: {descripcion}!!</div>;
};

export default Alert;
