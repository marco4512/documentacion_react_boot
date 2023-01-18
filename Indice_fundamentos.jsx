import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { query, where, getDocs, getFirestore, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
function Indice_fundamentos(props) {
    const navigate = useNavigate();
    const [introduccion,setIntroduccion]=useState(false);
    const [estado,setEstado]=useState(false);
    const [dialog,setDialg]=useState(false);
    useEffect(() => {
        setIntroduccion(document.getElementById("introduccion"));
        setEstado(document.getElementById("Estado_del_arte"));
        setDialg(document.getElementById("Todo_sobre_dialog"));
        let cont = document.getElementById("contenido");
        getAuth().onAuthStateChanged((usuarioFirebase) => {
            //console.log("ya tienes sesión iniciada con desde indice:", usuarioFirebase);
            if (usuarioFirebase == null) {
                navigate('/login')
            }
            else {
                cont.style.display = "block";
            }
            props.setUsuario(usuarioFirebase);
        });
    
    }); 
    
    const Estado_del_arte=()=>{
        introduccion.style.display="none";
        estado.style.display="flex";
        dialog.style.display="none";

    }
    const a_intro=()=>{
        introduccion.style.display="flex";
        estado.style.display="none";
        dialog.style.display="none";

    }
    const a_dialog=()=>{
        introduccion.style.display="none";
        estado.style.display="none";
        dialog.style.display="flex";
        console.log("hola")

    }
    const quees=()=>{
        navigate('/introduccion')
    }
    const estado_del=()=>{
        navigate('/Estado_de_arte')
    }
    const todo_sobre=()=>{
        navigate('/todo_sobre')
    }
    return (

        <>
            <SFrames>
                <div id="contenido" className="hold">
                    <div className="contenido_principal">
                        <p className="title">Fundamentos</p>
                        <div className="sepador_superior"></div>
                        <div className="separador_inferior"></div>
                        <div className="texto_imagen">
                            <div className="imagen_uno"></div>
                            <div className="texto_uno">
                                <p>  En esta sección puedes encontrar los fundamentos necesarios para entender todo sobre como crear un chatbot desde 0.
                                    La intención de esta sección es dar a conocer tanto las estructuras de los chatbots como la
                                    forma en la que se relacionan con la comunicación humana.
                                </p>
                            </div>
                        </div>
                        <div className="galeria_menu">
                            <p>Indice</p>
                            <div className="sepador_superior"></div>
                            <div className="separador_inferior"></div>
                            <p className="des">Aquí puedes encontrar la lista de temas necesarios para tener los fundamentos de esta documentación. Y ver tu progreso</p>
                            <div id="introduccion" className="galery">
                                <div className="lista_indice">
                                    <div className="lista_cont">
                                        <ul className="list">
                                            <p>Introducción</p>
                                          <li><a href="/introduccion#bienvenida" className="temas">Bienvenida</a></li>
                                          <li><a href="#que" onClick={quees} className="temas">¿Qué es esta Pagína?</a></li>
                                          <li><a href="#como" onClick={quees} className="temas">¿Cómo se estructura la pagína?</a></li>
                                          <li><a href="#panorama" onClick={quees} className="temas">Panorama general y alcances esperados</a></li>
                                          <li><a href="#trabajos" onClick={quees} className="temas">Trabajos previos e investigaciones que aportan al proyecto</a></li>
                                        </ul>
                                    </div>
                                    <div className="boton_inf">
                                        <button id="estado_intro"  className="button_estado" onClick={Estado_del_arte}>Estado del arte</button>
                                    </div>
                                </div>
                                <div className="img_indice">
                                    <div className="imagen_ca">

                                    </div>
                                    <div className="boton_inferior">
                                    <button className="button_estado" onClick={Estado_del_arte}>Estado del arte</button>
                                   
                                    </div>
                                </div>
                            </div>
                            <div id="Estado_del_arte" className="galery">
                                <div className="lista_indice">
                                    <div className="lista_cont">
                                        <ul className="list">
                                            <p>Estado del arte de los chatbots en 2022</p>
                                          <li><a href="#que_es?" onClick={estado_del} className="temas">¿Qué es un chatbot?</a></li>
                                          <li><a href="#tipos_de" onClick={estado_del} className="temas">Tipos de chatbots</a></li>
                                          <li><a href="#como_funcionan" onClick={estado_del} className="temas">¿Cómo funciona un chatbot?</a></li>
                                          <li><a href="#caracteristicas" onClick={estado_del} className="temas">Características de los chatbots</a></li>
                                          <li><a href="#plataformas" onClick={estado_del} className="temas">Plataformas</a></li>
                                          <li><a href="#uso_de" onClick={estado_del} className="temas">Uso de los chatbots</a></li>
                                          <li><a href="#limitaciones" onClick={estado_del} className="temas">Limitaciones de los chatbots no code</a></li>
                                          <li><a href="#ejemplo_de" onClick={estado_del} className="temas">Ejemplos del uso de chatbots</a></li>
                                          <li><a href="#es_un_chatbot" onClick={estado_del} className="temas">¿Es un chatbot una solución a mi problema?</a></li>
                                        </ul>
                                    </div>
                                    <div className="boton_inf">
                                        <button id="intro_estado" className="button_estado" onClick={a_intro} >Introduccion</button>
                                        <button id="estado_intro" className="button_estado" onClick={a_dialog}>Todo Sobre Dialog</button>
                                    </div>
                                </div>
                                <div className="img_indice">
                                    <div id="imagen_estado" className="imagen_ca">
                                    </div>
                                    <div className="boton_inferior">
                                    
                                    <button className="button_estado" onClick={a_dialog} >Todo Sobre Dialog</button>
                                    </div>
                                </div>
                            </div>
                            <div id="Todo_sobre_dialog" className="galery">
                                <div className="lista_indice">
                                    <div className="lista_cont">
                                        <ul className="list">
                                            <p>Todo sobre Dialogflow</p>
                                          <li><a href="#dialog" onClick={todo_sobre}  className="temas">¿Qué es diálogo flow?</a></li>
                                          <li><a href="#como_se_conforma" className="temas"> ¿Cómo está conformado Dialog Flow?</a></li>
                                          <li><a href="#intenciones" onClick={todo_sobre} className="temas">Intenciones</a></li>
                                          <li><a href="#entidades" className="temas">Entidades</a></li>
                                          <li><a href="#contextos" onClick={todo_sobre} className="temas">Contextos</a></li>
                                          <li><a href="#agentes" onClick={todo_sobre} className="temas">Agentes</a></li>
                                          <li><a href="#full" onClick={todo_sobre} className="temas">Fulfilment</a></li>
                                          <li><a href="#integracion" onClick={todo_sobre} className="temas">Integraciones</a></li>
                                          <li><a href="#practicas" onClick={todo_sobre} className="temas">Prácticas recomendadas</a></li>
                                        </ul>
                                    </div>
                                    <div className="boton_inf">
                                        <button id="intro_estado" className="button_estado" onClick={Estado_del_arte}>Estado del arte</button>
                                        
                                    </div>
                                </div>
                                <div className="img_indice">
                                    <div id="imagen_estado" className="imagen_ca">
                                    </div>
                                    <div className="boton_inferior">
                                    
                                  
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="fondo"></div>
                    </div>
                </div>
            </SFrames>
        </>
    )
}
export default Indice_fundamentos;
const SFrames = styled.nav`
.hold{
    width: 100vw;
    height: 100vh;
    text-align:center;
    display:none;
    background-color: #f9fafb;
    min-width:fit-content;
}
`