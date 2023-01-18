import React, { useEffect, useState, useCallback } from "react";
import styled from 'styled-components';
import Barra_progreso from './Barra_progreso';
import { getAuth } from "firebase/auth";
import { query, where, getDocs, getDoc, getFirestore, collection, setDoc, doc, update, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
function Introduccion(props) {
    const [temas,setTemas]=useState(false);
    const navigate = useNavigate();
    const [id_doc, setId_doc] = useState(false);
    const [email, setEmail] = useState(false);
    const [primera_vez,setPrimera_vez]=useState(false);
    const db = getFirestore();
    const obteniendo_ref = async (email) => {
        const q = query(collection(db, "fundamentos"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setId_doc(doc.id);
        });
    }
    useEffect(() => {
        let cont = document.getElementById("contenedor");
        cont.style.display = "none";
        getAuth().onAuthStateChanged((usuarioFirebase) => {
            //console.log("ya tienes sesión iniciada con desde indice:", usuarioFirebase);
            if (usuarioFirebase == null) {
                navigate('/login')
            } else {
                cont.style.display = "block";
                setEmail(usuarioFirebase.email)
                if(primera_vez==false){
                    setPrimera_vez(true);
                    obteniendo_ref(usuarioFirebase.email)
                }
                if(primera_vez){
                    console.log('ya se cargo');
                }
                
            }
            props.setUsuario(usuarioFirebase);
        });

    });
    const update2 = async () => {
        const id = 'fundamentos/' + id_doc
        const docRef = doc(db, id);
        const docSnap = await getDoc(docRef);
        const q2 = query(collection(db, "fundamentos"), where("email", "==", email));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
            if((Object.keys(doc.data().temas).length) < 5){
                 updateDoc(docRef, "temas", ['Bienvenida',
                '¿Qué es esta Pagína?',
                '¿Cómo se estructura la pagína?',
                'Panorama general y alcances esperados',
                'Trabajos previos e investigaciones que aportan al proyecto']);
            }
        });
        navigate('/Estado_de_arte')
    }
    const to_todas = () => {
        navigate('/dos');
    }

    return (
        <>
            <SFrames>
                <div id="contenedor" className="hold">
                    <br />
                    <p className="titulo_sub"><strong>Introducción</strong></p>
                    <div className="contenedor_secundario">
                        <br />
                        <a name="bienvenida"></a>
                        <p className="titulo_sub"><strong>¡Bienvenida!</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p>¡Hola! bienvenid@ a la documentación técnica
                                    de la creación e implementación de un chatbot
                                    con IA enfocado en el seguimiento de tickets
                                    de soporte para la resolución de problemas.
                                    La función principal de la documentación de
                                    este proyecto es evitar tropiezos al momento
                                    de trabajar e implementar este tipo de
                                    tecnologías, además de brindar algunas
                                    herramientas que facilitan el trabajo
                                    de cualquier desarrollador enfocado en el área.
                                    Es importante recalcar que esta documentación no solo permitirá la creación de este chatbot en particular, sino que también puede ser utilizada para la creación de cualquier tipo chatbot que el desarrollador necesite. La información y links a todos los recursos utilizados durante el desarrollo de este proyecto estarán en esta documentación.
                                    Sin más que agregar siéntete libre de navegar por este lugar.</p>
                            </div>
                            <a id="que"></a>
                        </div>

                        <p className="titulo_sub"><strong>¿Qué es esta Pagína?</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p> En general, esta Pagína pretende ser una herramienta útil al momento de desarrollar e implementar un sistema de chatbot en algún tipo de servicio (web,social,etc). para poder lograr eso, es necesario investigar en diferentes fuentes, cual es la forma correcta de hacerlo, o en algunos casos investigar cómo es que se solucionan estos problemas. Es por ello que en esta pagína se ha recopilado toda la información base necesaria para que cualquier desarrollador pueda implementar de manera eficaz un proyecto de este estilo. Puedes tomar este documento como una guía que será muy útil para no tropezar con los mismos errores que el creador de este.</p>
                            </div>

                            <div id="imagen_2" className="imagen"></div>
                        </div>
                        <a id="como"></a>
                        <p className="titulo_sub"><strong>¿Cómo se estructura la pagína?</strong></p>
                        <hr />

                        <div className="texto_imagen_dos">
                            <div id="imagen_3" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p> Esta página se compone de muchas partes ya que hacer una documentación completa para un proyecto grande como este, es casi imposible de resumir u omitir algunos detalles que podrían sacarnos de un apuro en el futuro.
                                    Para ello este documento se estructuró con algunos <strong><a href="/dos" target="_blank">links directos</a></strong> que te redirigen a páginas específicas de la documentación evitando que busques página por página o que tengas que leer todo de nuevo.
                                    Por ejemplo si en alguna parte de la lectura se te hace referencia a un repositorio de git cuyo enlace se encuentra en este documento podría hacerlo de la siguiente manera:
                                    <i>“Puedes consultar la información de este repositorio en la sección de <strong><a href="#" target="_blank">Anexos</a></strong> o ir directamente a él dando <strong><a href="https://github.com/marco4512/PaginaDocumentacion" target="_blank">click aqui</a></strong>”
                                    </i>
                                    <br />
                                    De esta forma no importa en qué parte de la lectura estés, siempre y cuando existan este tipo de enlaces, ahorrarán tiempo y esfuerzo a los desarrolladores.</p>
                            </div>
                        </div>
                        <a id="panorama"></a>
                        <p className="titulo_sub"><strong>Panorama general y alcances esperados</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p> En palabras más específicas lo que se pretende con este proyecto es <strong>desarrollar y diseñar un chatbot operacional</strong> cada vez más inteligente que sea capaz de entender y manejar consultas de seguimiento cada vez más complejas para dar soporte a los tickets que generan los clientes.
                                    Cualquier compañía que siga manejando únicamente el correo electrónico o el teléfono corre el riesgo de quedarse obsoleta.
                                    Muchas compañías apuestan por <strong>chatbots </strong> para usarlos con propósitos conversaciones o de información, pero es el momento de ir más allá y aprovecharse de las ventajas de la IA, construyendo un chatbot operacional basado en el lenguaje natural y aprendizaje automático, que sea capaz de entender y manejar consultas cada vez más complejas de nuestros clientes; proporcionándoles una respuesta inmediata y cómoda a su consulta. A su vez, que nos brinde datos detallados y procesables de momentos problemáticos de nuestros clientes, ofreciendo una mejor experiencia para los clientes que requieren información y/o seguimiento con sus tickets de soporte.</p>
                            </div>
                            <div id="imagen_4" className="imagen"></div>
                        </div>
                        <a id="trabajos"></a>
                        <p className="titulo_sub"><strong>Trabajos previos e investigaciones que aportan al proyecto</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p> Algunos de los trabajos e investigaciones realizadas por mi (creador de la documentación) , se pueden encontrar en mi repositorio de <strong><a href="https://github.com/marco4512" target="_blank"> github</a> </strong>  pero en resumen,algunas de las investigaciones o trabajos que pueden aportar al proyecto (sin embargo no son indispensables) son :
                                    <li  >Investigaciones sobre el <strong><a href="https://www.google.com/url?q=https://www.sas.com/es_ar/insights/analytics/what-is-natural-language-processing-nlp.html&sa=D&source=docs&ust=1665967421993415&usg=AOvVaw1GbhlJUEvYX5fue9eT4WLg" target="_blank">procesamiento del lenguaje natural</a></strong></li>
                                    <li  >Manejo básico de entornos de desarrollo como <strong> <a href="https://nodejs.org/es/about/" target="_blank">node</a></strong></li>
                                    <li  >Estructura y Organización de  <strong><a href="https://repositorio.une.edu.pe/handle/20.500.14039/5113" target="_blank">datos</a></strong></li>
                                    <li  > <strong><a href="https://ayudaleyprotecciondatos.es/bases-de-datos/diferencias-datos-estructurados-no-estructurados/" target="_blank">Bases de datos </a></strong>estructuradas y no estructuradas</li>
                                    <li  >Investigaciones de redes neuronales y <strong> <a href="https://www.researchgate.net/publication/299508184_REDES_NEURONALES_PARA_EL_ANALISIS_SENTIMENTAL_DE_TEXTOS_DIVULGACION_CIENTIFICA_DSA_SOLUCIONESR_Ciudad_de_Mexico"> análisis de sentimientos.</a></strong></li></p>
                            </div>
                            <div id="imagen_5" className="imagen"></div>
                        </div>

                        <p className="titulo_sub"><strong>Autoevaluación</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p> En esta sección encontrarás algunas preguntas que te permitirán saber si lo que leíste anteriormente quedó claro del todo. Si no es el caso puedes ingresar a la pregunta para saber donde se resuelve esta misma.
                                    <ol className="lista_preguntas_auto">
                                        <li className="lista_preguntas_auto"> <a href="#que" >¿Cuál es el objetivo de la página?</a></li>
                                        <li className="lista_preguntas_auto"> <a href="#como" >¿Cómo se navega a través de ella?</a></li>
                                        <li className="lista_preguntas_auto"> <a href="#trabajos" >¿Qué se necesita para realizar un chatbot?</a></li>
                                        <li className="lista_preguntas_auto"> <a href="#panorama" >¿Son los chatbots una apuesta de las empresas en el 2022?</a></li>
                                        <li className="lista_preguntas_auto"> <a href="#bienvenida" >¿Cuál es la función del chatbot que vamos a crear?</a></li>
                                    </ol></p>
                            </div>
                            <div id="imagen_6" className="imagen"></div>
                        </div>
                        <hr />
                        <div className="Controler_fondo_botn">
                            <button id="Todas" onClick={to_todas}>Todas las partes</button>
                            <button id="estado_arte" onClick={update2}>Estado del arte</button>
                        </div>
                    </div>
                    <div className="fondo"></div>
                </div>
            </SFrames>
        </>
    )
}
export default Introduccion;
const SFrames = styled.nav`
.hold{
    width: 100vw;
    height: 100vh;
    overflow: scroll;
}


`