import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { query, where, getDocs, getFirestore, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
function Frames2(props) {
    const navigate = useNavigate();
    const [primera_vez,setPrimera_vez]=useState(false);
    const [nombre, setNombre] = useState(false)
    const [progreso_fundamentos,setProgreso_fundamentos]=useState(0);
    const [email, setEmail]= useState(false);
    const obteniendo_nombre = async (email) => {
        const q = query(collection(getFirestore(), "Users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        //console.log('calix', querySnapshot)
        querySnapshot.forEach((doc) => {
            setNombre(doc.data().name)
            //console.log(doc.data().name)
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
        });
        const q2 = query(collection(getFirestore(), "fundamentos"), where("email", "==", email));
        const querySnapshot2 = await getDocs(q2);
        //console.log('calix', querySnapshot2)
        querySnapshot2.forEach((doc) => { 
            //console.log(doc.data().name)
            // doc.data() is never undefined for query doc snapshots
            let temas=doc.data().temas
            let porcentaje = Math.round((((Object.keys(temas).length)*100)/23));
            setProgreso_fundamentos(porcentaje)
            //console.log(progreso_fundamentos);
        });
    }
    const retomar =async()=>{
        const q2 = query(collection(getFirestore(), "fundamentos"), where("email", "==", email));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => { 
            let temas=doc.data().temas
            if(doc.data().temas[Object.keys(temas).length-1]=='Integraciones' ||doc.data().temas[Object.keys(temas).length-1]=='Agentes'||doc.data().temas[Object.keys(temas).length-1]=='Intenciones'){
                navigate('/todo_sobre')
            }
        });

    }
    useEffect(() => {
        let cont = document.getElementById("contenido");
        getAuth().onAuthStateChanged((usuarioFirebase) => {
            //console.log("ya tienes sesión iniciada con:", usuarioFirebase);
            if (usuarioFirebase == null) {
                navigate('/login')
            }
            else {
                cont.style.display = "block";
                setEmail(usuarioFirebase.email);
                if(primera_vez==false){
                    setPrimera_vez(true);
                    obteniendo_nombre(usuarioFirebase.email);
                    
                }
                if(primera_vez){
                    console.log('ya se cargo');
                }
                
                //console.log(usuarioFirebase.email);
            }
            props.setUsuario(usuarioFirebase);
        });

        //let cont = document.getElementById('contenido');

    },[]);
    const indice=()=>{
        navigate('/indice_fundamentos')
    }
    const diseño_primera_parte=()=>{
        navigate('/diseño_primera_parte')
    }

    return (
        <>
            <SFrames>
                <div id="contenido" className="hold">
                    {nombre ? <h1 className="nombre">Progreso de {nombre}</h1> : <h1></h1>}
                    <div className="card_fundamentos">
                        <div className="cont_superior">
                            <div className="imagen_lado"></div>
                            <div className="texto_superior_cont">
                                <p className="p_sup">Inicio</p>
                                <p className="p_infe">Fundamentos</p>
                            </div>
                            <div className="cont_botones">
                                <button className="button_ver" onClick={indice}>Ver</button>
                                <button  onClick={retomar} className="button_retomar">Retomar</button>
                            </div>
                        </div>
                        <hr />
                        <div className="cont_inferior">
                            <div className="descripcion">
                                <p>En esta sección están todas las partes que constituyen los fundamentos de DialogFlow para que así conozcas todo de esta herramienta.</p>
                            </div>
                            <div className="cont_progreso">
                                <div class="flex-wrapper">
                                    <div class="single-chart">
                                        <svg viewBox="0 0 36 36" class="circular-chart orange">
                                            <path class="circle-bg"
                                                d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path class="circle"
                                                stroke-dasharray={progreso_fundamentos+", 100"}
                                                d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                           />
                                            <text x="18" y="20.35" class="percentage">{progreso_fundamentos}%</text>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="card_fundamentos">
                        <div className="cont_superior">
                            <div id="imagen_temas_dos" className="imagen_lado"></div>
                            <div className="texto_superior_cont">
                                <p className="p_sup">Diseño</p>
                                <p className="p_infe">Primera Parte</p>
                            </div>
                            <div className="cont_botones">
                                <button className="button_ver" onClick={diseño_primera_parte}>Ver</button>
                                <button   className="button_retomar">Retomar</button>
                            </div>
                        </div>
                        <hr />
                        <div className="cont_inferior">
                            <div className="descripcion">
                                <p>Esta sección está diseñada para que de manera dinámica seas capaz de comprender cómo se diseña un chatbot con Dialogflow.</p>
                            </div>
                            <div className="cont_progreso">
                                <div class="flex-wrapper">
                                    <div class="single-chart">
                                        <svg viewBox="0 0 36 36" class="circular-chart orange">
                                            <path class="circle-bg"
                                                d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path class="circle"
                                                stroke-dasharray={progreso_fundamentos+", 100"}
                                                d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                           />
                                            <text x="18" y="20.35" class="percentage">{progreso_fundamentos}%</text>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SFrames>
        </>
    )
}
export default Frames2;
const SFrames = styled.nav`
.hold{
    width: 100vw;
    height: 100vh;
    text-align:center;
    display:none;
    background-color: #f9fafb;
    overflow:scroll;
}
`