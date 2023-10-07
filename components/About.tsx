"use client";
import React, { useState, useEffect } from "react";

const About = () => {
  const [AboutText, setAboutText] = useState({
    integrantes: [""],
    universidad: "",
    escuela: "",
    asignatura: "",
    proyecto: "",
    ciclo: "",
  });

  const AboutInfo = () => {
    return (
      <>
        <ul>
          <li>{AboutText.universidad}</li>
          <li>{AboutText.escuela}</li>
          <li>{AboutText.asignatura}</li>
          <li>{AboutText.ciclo}</li>
          <li>{AboutText.proyecto}</li>
          <ul>
            {AboutText.integrantes.map((e, num) => (
              <li key={num}>{e}</li>
            ))}
          </ul>
        </ul>
      </>
    );
  };

  const readAbout = async () => {
    try {
      const response = await fetch("/api/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseData: {
          aboutInfo: {
            data: {
              integrantes: [""];
              universidad: string;
              escuela: string;
              asignatura: string;
              proyecto: string;
              ciclo: string;
            };
          };
        } = await response.json();
        setAboutText(responseData.aboutInfo.data);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    readAbout();
  }, []);

  return (
    <div className="about-container">
      <AboutInfo />
    </div>
  );
};

export default About;
