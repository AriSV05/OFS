"use client"
import React, { useState, useEffect } from "react";


const About = () => {
  const [inputText, setInputText] = useState([{
    asignatura: '',
    ciclo: '',
    escuela: '',
    integrantes: ['', '', '', ''],
    proyecto: '',
    universidad: '',
  }]);


  const AboutInfo = () => {

    return (
      <>
        {inputText.map((info, index) => (
          <div key={index}>
            <ul>
              <li>{info.universidad}</li>
              <li>{info.escuela}</li>
              <li>{info.asignatura}</li>
              <li>{info.ciclo}</li>
              <li>{info.proyecto}</li>
              <ul>
                {info.integrantes.map((e, num) => (
                  <li key={num}>{e}</li>
                ))}
              </ul>
            </ul>
          </div>
        ))}
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
          about: Array<{
            asignatura: string,
            ciclo: string,
            escuela: string,
            integrantes: string[],
            proyecto: string,
            universidad: string
          }>

        } = await response.json();
        setInputText(responseData.about);
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
