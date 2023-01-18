import React, { useEffect, useState, useCallback } from "react";
import styled from 'styled-components';
import Barra_progreso from './Barra_progreso';
import { getAuth } from "firebase/auth";
import { query, where, getDocs, getDoc, getFirestore, collection, setDoc, doc, update, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { async } from "@firebase/util";


function Diseño_parte_uno(props) {
    const navigate = useNavigate();
    const [cargar_primera_vez,setCargar_primera_vez]=useState(false)
    const [links, setlinks] = useState([]);
    const [numero_video, setNumero_video] = useState(0);
    const [button_1, setButton_1] = useState(false);
    const [button_2, setButton_2] = useState(false);
    const [check_1, setCheck_1] = useState(false);
    const [check_2, setCheck_2] = useState(false);
    const [check_3, setCheck_3] = useState(false);
    const [check_4, setCheck_4] = useState(false);
    const [check_5, setCheck_5] = useState(false);
    const [check_6, setCheck_6] = useState(false);
    const [email, setEmail] = useState(false);
    const [numero_actual,setNumero_actual]=useState(0);
    const db = getFirestore();
    const [id_doc, setId_doc] = useState(false);
    const cargar_check_1 = async () => {
        const id = 'Diseño_parte_uno/' + id_doc
        const docRef = doc(db, id);
        const docSnap = await getDoc(docRef);
        await updateDoc(docRef, "url", ['itsworkks']);
    }
    const cargar_videos = async () => {
        const docRef = doc(db, "Diseño", "Primera_parte");
        const docSnap = await getDoc(docRef);
        setlinks(docSnap.data().url);
    }
    const obteniendo_ref = async (email) => {
        const q = query(collection(db, "Diseño_parte_uno"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let url=doc.data().url;
            setId_doc(doc.id);
            setNumero_actual(Object.keys(url).length-1);
            
        });
       
    }
    const actualizar_checks=()=>{
        let id_check_1 = document.getElementById("id_check_1");
        let id_check_1_fill = document.getElementById("id_check_1_fill");
        let id_check_2 = document.getElementById("id_check_2");
        let id_check_2_fill = document.getElementById("id_check_2_fill");
        let id_check_3 = document.getElementById("id_check_3");
        let id_check_3_fill = document.getElementById("id_check_3_fill");
        console.log('antes de ingresar a el if',numero_video)
        if(numero_actual==0){
            id_check_1.style.display = "none";
            id_check_1_fill.style.display = "block";
            setNumero_video(0);
            setCheck_1(true);
            setCheck_2(true);
        }
        if(numero_actual==1){
            id_check_1.style.display = "none";
            id_check_1_fill.style.display = "block";
            id_check_2.style.display = "none";
            id_check_2_fill.style.display = "block";
            setNumero_video(1);
            setCheck_1(true);
            setCheck_2(true);
        }
        if(numero_actual==2){
            id_check_1.style.display = "none";
            id_check_1_fill.style.display = "block";
            id_check_2.style.display = "none";
            id_check_2_fill.style.display = "block";
            id_check_3.style.display = "none";
            id_check_3_fill.style.display = "block";
            setNumero_video(2);
            setCheck_1(true);
            setCheck_2(true);
            setCheck_3(true);
        }
        if(numero_actual==3){
            id_check_1.style.display = "none";
            id_check_1_fill.style.display = "block";
            id_check_2.style.display = "none";
            id_check_2_fill.style.display = "block";
            id_check_3.style.display = "none";
            id_check_3_fill.style.display = "block";
            setNumero_video(3);
            setCheck_1(true);
            setCheck_2(true);
            setCheck_3(true);
        }
    }

    useEffect(() => {
        let cont = document.getElementById("contenido");
        getAuth().onAuthStateChanged((usuarioFirebase) => {
            if (usuarioFirebase == null) {
                navigate('/login')
            }
            else {
                setEmail(usuarioFirebase.email)
                if(cargar_primera_vez){
                    console.log("ya se cargo")
                }else{
                    obteniendo_ref(usuarioFirebase.email);
                    setCargar_primera_vez(true);
                    cargar_videos(); 
                }
                cont.style.display = "block";
            }
            props.setUsuario(usuarioFirebase);
        });
        actualizar_checks();
    });

    const sumar = () => {
        let total = Object.keys(links).length - 1;
        if (numero_video < total) {
            console.log(total);
            setNumero_video(numero_video + 1);
            setNumero_actual(numero_video+1);
            console.log(numero_video);
        }

    }

    const restar = () => {
        console.log(numero_video)
        if (numero_video === 0) {
            console.log('limite');
        }
        if (numero_video > 0) {
            setNumero_video(numero_video - 1);
            setNumero_actual(numero_video-1);
            console.log(numero_video);
        }

    }
    const checkbox_change1 = () => {
        let id_check_1 = document.getElementById("id_check_1");
        let id_check_1_fill = document.getElementById("id_check_1_fill");
        if (check_1) {
            id_check_1.style.display = "none";
            id_check_1_fill.style.display = "block";
        } else {
            id_check_1.style.display = "none";
            id_check_1_fill.style.display = "block";
            setCheck_1(true);
            cargar_check_1();
        }
    }
    const checkbox_change2 = () => {
        let id_check_2 = document.getElementById("id_check_2");
        let id_check_2_fill = document.getElementById("id_check_2_fill");
        if (check_2) {
            id_check_2.style.display = "none";
            id_check_2_fill.style.display = "block";
        } else {
            id_check_2.style.display = "none";
            id_check_2_fill.style.display = "block";
            setCheck_2(true);
        }
    }
    const checkbox_change3 = () => {
        let id_check_3 = document.getElementById("id_check_3");
        let id_check_3_fill = document.getElementById("id_check_3_fill");
        if (check_3) {
            id_check_3.style.display = "none";
            id_check_3_fill.style.display = "block";
        } else {
            id_check_3.style.display = "none";
            id_check_3_fill.style.display = "block";
            setCheck_3(true);
        }
    }

    const desplegar_tema1 = () => {
        let subtemas_uno = document.getElementById("subtemas_uno");
        let arrow_abajo = document.getElementById("arrow_abajo");
        let arrow_arriba = document.getElementById("arrow_arriba");
        if (button_1) {
            subtemas_uno.style.display = "none";
            arrow_abajo.style.display = "block";
            arrow_arriba.style.display = "none";
            setButton_1(false);
        } else {
            subtemas_uno.style.display = "block";
            arrow_abajo.style.display = "none";
            arrow_arriba.style.display = "block";
            setButton_1(true);
        }
    }
    const desplegar_tema2 = () => {
        let subtemas_uno = document.getElementById("subtemas_dos");
        let arrow_abajo = document.getElementById("arrow_abajo2");
        let arrow_arriba = document.getElementById("arrow_arriba2");
        if (button_1) {
            subtemas_uno.style.display = "none";
            arrow_abajo.style.display = "block";
            arrow_arriba.style.display = "none";
            setButton_1(false);
        } else {
            subtemas_uno.style.display = "block";
            arrow_abajo.style.display = "none";
            arrow_arriba.style.display = "block";
            setButton_1(true);
        }
    }
    return (
        <>
            <SFrames>
                <div id="contenido" className="hold">
                    <div className="contenedor_video">
                        <div className="video">
                            <iframe className="video_iframe" src={links[numero_video]} title="Soldado de 200 de IQ se Convirtió En La Pesadilla De Los Nazis en la 2da GM ( Resumen De Peliculas )" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            <div className="controler_videos">
                                <button onClick={restar} >
                                    Anterior
                                </button>
                                <div id="separador_de_button"></div>
                                <button onClick={sumar}>
                                    Siguiente
                                </button>
                            </div>
                        </div>
                        <div className="contenido_videos">
                            <div className="primera_celda">
                                <lord-icon className="incono_cerrar"
                                    src="https://cdn.lordicon.com/jfhbogmw.json"
                                    colors="primary:#ffffff"
                                    trigger="hover">
                                </lord-icon>
                                <div className="texto_celda">
                                    <p>Contenido parte uno</p>
                                </div>
                            </div>
                            <div className="contenedor_temas_completos">
                                <div className="primera_celda">
                                    <button onClick={desplegar_tema1}>
                                        <lord-icon id="arrow_abajo"
                                            src="https://cdn.lordicon.com/albqovim.json"
                                            trigger="hover"
                                            colors="primary:#ffffff">
                                        </lord-icon>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/xdakhdsq.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            id="arrow_arriba">
                                        </lord-icon>
                                    </button>
                                    <div className="texto_celda">
                                        <p>Basicos de Dialog</p>
                                        <div id="subtemas_uno" className="contenedor_sub_temas_total">
                                            <div className="tema_uno_lista">
                                                <div className="sub_tema">
                                                    <p>Entorno de trabajo</p>
                                                </div>
                                                <button onClick={checkbox_change1}>
                                                    <lord-icon id="id_check_1"
                                                        src="https://cdn.lordicon.com/egiwmiit.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff">
                                                    </lord-icon>
                                                    <lord-icon
                                                        id="id_check_1_fill"
                                                        src="https://cdn.lordicon.com/yqzmiobz.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff">
                                                    </lord-icon>
                                                </button>
                                            </div>
                                            <div className="tema_uno_lista">
                                                <div className="sub_tema">
                                                    <p>Subtema_2</p>
                                                </div>
                                                <button onClick={checkbox_change2}>
                                                    <lord-icon id="id_check_2"
                                                        src="https://cdn.lordicon.com/egiwmiit.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff">
                                                    </lord-icon>
                                                    <lord-icon
                                                        id="id_check_2_fill"
                                                        src="https://cdn.lordicon.com/yqzmiobz.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff">
                                                    </lord-icon>
                                                </button>

                                            </div>
                                            <div className="tema_uno_lista">
                                                <div className="sub_tema">
                                                    <p>Subtema_3</p>
                                                </div>
                                                <button onClick={checkbox_change3}>
                                                    <lord-icon id="id_check_3"
                                                        src="https://cdn.lordicon.com/egiwmiit.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff">
                                                    </lord-icon>
                                                    <lord-icon
                                                        id="id_check_3_fill"
                                                        src="https://cdn.lordicon.com/yqzmiobz.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff">
                                                    </lord-icon>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="primera_celda">
                                    <button onClick={desplegar_tema2}>
                                        <lord-icon id="arrow_abajo2"
                                            src="https://cdn.lordicon.com/albqovim.json"
                                            trigger="hover"
                                            colors="primary:#ffffff">
                                        </lord-icon>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/xdakhdsq.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            id="arrow_arriba2">
                                        </lord-icon>
                                    </button>
                                    <div className="texto_celda">
                                        <p>Tema 2</p>
                                        <div id="subtemas_dos" className="contenedor_sub_temas_total">
                                            <div className="tema_uno_lista">
                                                <div className="sub_tema">
                                                    <p>Subtema_1</p>
                                                </div>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/egiwmiit.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff">
                                                </lord-icon>
                                            </div>
                                            <div className="tema_uno_lista">
                                                <div className="sub_tema">
                                                    <p>Subtema_2</p>
                                                </div>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/egiwmiit.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff">
                                                </lord-icon>
                                            </div>
                                            <div className="tema_uno_lista">
                                                <div className="sub_tema">
                                                    <p>Subtema_3</p>
                                                </div>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/egiwmiit.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
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
export default Diseño_parte_uno;
const SFrames = styled.nav`
.hold{
    width: 100vw;
    height: 100vh;

}
`