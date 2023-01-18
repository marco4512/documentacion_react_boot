import React, { useEffect, useState, useCallback } from "react";
import styled from 'styled-components';
import Barra_progreso from './Barra_progreso';
import { getAuth } from "firebase/auth";
import { query, where, getDocs, getDoc, getFirestore, collection, setDoc, doc, update, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Estado_del_arte(props) {
    const navigate = useNavigate();
    const [id_doc, setId_doc] = useState(false);
    const [email, setEmail] = useState(false);
    const [primera_vez,setPrimera_vez]=useState(false);
    const db = getFirestore();

    const update2 = async () => {

        const id = 'fundamentos/' + id_doc
        const docRef = doc(db, id);
        const docSnap = await getDoc(docRef);
        const q2 = query(collection(getFirestore(), "fundamentos"), where("email", "==", email));
        const querySnapshot2 = await getDocs(q2);
        //console.log('calix', querySnapshot2)
        querySnapshot2.forEach((doc) => { 
            let temas=doc.data().temas
            if(Object.keys(temas).length>=13){
                navigate('/todo_sobre')
            } else{
                 updateDoc(docRef, "temas", ['Bienvenida', 
                '¿Qué es esta Pagína?',
                '¿Cómo se estructura la pagína?',
                'Panorama general y alcances esperados',
                'Trabajos previos e investigaciones que aportan al proyecto',
                '¿Qué es un chatbot?',
                'Tipos de chatbots',
                '¿Cómo funciona un chatbot?',
                'Características de los chatbots',
                'Plataformas',
                'Uso de los chatbots',
                'Limitaciones de los chatbots no code',
                'Ejemplos del uso de chatbots',
                '¿Es un chatbot una solución a mi problema?']);
            }
            
        });
       
        navigate('/todo_sobre')
    }
    const a_intro = ()=>{
        navigate('/introduccion')
    }

    const obteniendo_ref = async (email) => {
        const q = query(collection(db, "fundamentos"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
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

    return (
        <>
            <SFrames>
                <div id="contenedor" className="hold">
                    <br />
                    <p className="titulo_sub"><strong>Estado del arte de los chatbots en 2022 </strong></p>
                    <div className="contenedor_secundario">
                        <p className="titulo_sub"><strong>¿Qué es el estado del arte?</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div id="imagen_6" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p> El estado del arte se puede interpretar como una forma de tener conocimiento de la posición actual de un tema en particular. Es importante definir cómo es que los chatbots funcionan y cómo se componen en el mercado actual, a continuación podrás encontrar algunas preguntas frecuentes que ayudan a tener un contexto de este tema.</p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <a id="que_es?"></a>
                        <p className="titulo_sub"><strong>¿Qué es un chatbot?</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p>
                                    En niveles básicos de funcionamiento, podemos definir a un chatbot como un programa que pretende simular y procesar conversaciones humanas,permitiendo algún tipo de interacción (escrita o hablada) para poder alimentar este mismo. La finalidad de un chatbot es dar la impresión de estar comunicándose con un humano.
                                </p>
                            </div>
                            <div id="imagen_7" className="imagen"></div>
                            <a id="que"></a>
                        </div>
                        <a id="tipos_de"></a>
                        <p className="titulo_sub"><strong>Tipos de chatbots</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div id="imagen_8" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p>
                                    Existen muchos niveles de complejidad en los chatbots, ya que estos pueden ser tan sencillos como aquellos que responden a preguntas en particular, hasta los chatbots que pueden interpretar contexto y mantener conversaciones al hilo con una persona.
                                    Sin importar el tipo de chatbot que se pretenda utilizar es importante tener en cuenta siempre algunos conceptos sobre estos, así como tener presente múltiples formas de crearlos.
                                </p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>Chatbots orientados a tareas</strong></p>
                                <p>
                                    Podríamos decir que la gran parte de los chatbots que existen son de este tipo ya que su función principal es la de realizar tareas o generar respuestas automatizadas pero conversacionales, ya que usan un poco de NPL. La mayor parte de este tipo de bots son utilizados para soporte y servicio al cliente.
                                </p>
                            </div>
                            <div id="imagen_9" className="imagen"></div>

                        </div>
                        <div className="texto_imagen_dos">
                            <div id="imagen_10" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>Chatbots basados en datos y predictivos</strong></p>
                                <p>
                                    Este otro tipo de bots son algo a lo que denominamos asistentes virtuales, son mucho más avanzados e interactivos con los usuarios. Estos además de estar conscientes del contexto pueden aprender del comportamiento sobre la marcha.
                                </p>
                            </div>
                        </div>
                        <a id="como_funcionan"></a>
                        <p className="titulo_sub"><strong>¿Cómo funciona un chatbot?</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div id="completo" className="texto_de_la_imagen">
                                <p>
                                    Los chatbots tienen características que los hacen manejar el lenguaje humano de una manera digital siguiendo algunos principios que tiene el lenguaje natural:
                                </p>
                            </div>
                        </div>

                        <div className="texto_imagen_dos">
                            <div id="imagen_11" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>Natural Language Processing</strong></p>
                                <p>
                                    Utilizando el procesamiento natural del lenguaje se puede distinguir preguntas de frases, dividiéndolas en oraciones y palabras clave. Este procesamiento permite el manejo de mayúsculas y minúsculas. Tratando de suponer el sentimiento del mensaje.
                                </p>
                            </div>
                        </div>
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>Natural Language Compression</strong></p>
                                <p>
                                    La comprensión del lenguaje natural le permite a un bot extraer el significado o contexto de lo que el usuario ha comunicado para tratar de comprenderlo o procesarlo.
                                </p>
                            </div>
                            <div id="imagen_12" className="imagen"></div>
                        </div>
                        <div className="texto_imagen_dos">
                            <div id="imagen_13" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>Natural Language Generation</strong></p>
                                <p>
                                    La generación del lenguaje natural permite que nuestro bot pueda contestar al usuario con frases que no parecen predeterminadas, si no que este es capaz de hacer que las fases se adapten a la conversación.
                                </p>
                            </div>
                        </div>
                        <a id="caracteristicas"></a>
                        <p className="titulo_sub"><strong>Características de los chatbots</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div id="completo" className="texto_de_la_imagen">
                                <p>
                                    Si nos enfocamos en cuales son las características que tienen todos los chatbots en el mercado podemos enumerar algunas como las siguientes:
                                </p>
                            </div>
                        </div>
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <ol>
                                    <li>Debe ser capaz de conversar.</li>
                                    <li>Ser útil.</li>
                                    <li>Fácil de interpretar.</li>
                                    <li>Personalizable.</li>
                                    <li>Brindar seguimiento.</li>
                                </ol>
                            </div>
                            <div id="imagen_14" className="imagen"></div>
                        </div>
                        <div className="texto_imagen_dos">
                            <div id="completo" className="texto_de_la_imagen">
                                <p>
                                    Es importante tomar en cuenta estas características al momento de desarrollar nuestro chatbot.
                                </p>
                            </div>
                        </div>
                        <a id="plataformas"></a>
                        <p className="titulo_sub"><strong>Plataformas que ayudan con la creación de bots</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div id="completo" className="texto_de_la_imagen">
                                <p >
                                    En esta sección se presenta una tabla con 10 plataformas más populares para la creación de chatbots, nosotros utilizaremos<strong> Dialog Flow </strong>pero puedes consultar algunas otras plataformas.
                                </p>
                            </div>
                        </div>
                        <div className="contenedor_sub_temas">
                            <div className="texto_aun_lado">
                                <ol className="lista_de_plataformas">
                                    <li><a href="#zendeck">Zendesk</a></li>
                                    <li><a href="#Live">Live chat</a></li>
                                    <li><a href="#orlak">Orlak</a></li>
                                    <li><a href="#dift">Dift</a></li>
                                    <li><a href="#chat">Chat Fuel</a></li>
                                    <li><a href="#Botsify">Botsify</a></li>
                                    <li><a href="#PandoraBots">PandoraBots</a></li>
                                    <li><a href="#Intercom">Intercom</a></li>
                                    <li><a href="#Freschat">Freschat</a></li>
                                    <li><a href="#Oct8ne">Oct8ne</a></li>
                                </ol>
                            </div>
                            <div className="contenedor_tema">
                                <a id="zendeck"></a>
                                <div className="contenedor_de_plata">
                                    <p>Zendesk</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Buena administración de clientes.</li>
                                                <li>Temas predeterminados.</li>
                                                <li>Historial de interacciones.</li>
                                                <li>Seguimiento de casos.</li>
                                                <li>APIS disponibles.</li>
                                                <li>Disparadores de eventos específicos.</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Se establece costo por agente.</li>
                                                <li>No se pueden exportar datos a archivos tipo csv.</li>
                                                <li>interfaz de creación poco amigable.</li>
                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Paga del 100% en cualquier tipo de plan.</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <a id="Live"></a>
                                <div className="contenedor_de_plata">
                                    <hr />
                                    <p>Live chat</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Acceso rápido para los clientes.</li>
                                                <li>Ahorra tiempo a los empleados.</li>
                                                <li>Es perfecto para negocios.</li>
                                                <li>Genera un gran branding.</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>No da la impresión de ser personalizado.</li>
                                                <li>No trabaja con todas las plataformas móviles.</li>
                                                <li>Problemas con las zonas horarias.</li>
                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Cuenta con una prueba gratuita, pero sus planes tienen costo.</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <a id="orlak"></a>
                                <div className="contenedor_de_plata">
                                    <hr />
                                    <p>Orlak</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Precios razonables.</li>
                                                <li>Exportar chats.</li>
                                                <li>Flexible para empresas pequeñas.</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>No está indicado para largo mantenimiento.</li>
                                                <li>Limitaciones de desarrollo.</li>
                                                <li>Automatización manual.</li>
                                                <li>No existen herramientas de machine learning aquí.</li>

                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Los paquetes que maneja esta plataforma son de pago por entidad generada.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor_de_plata">
                                    <a id="dift"></a>
                                    <hr />
                                    <p>Dift</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Tiene herramientas especializadas en marketing.</li>
                                                <li>Contiene tablas con reportes de las conversaciones del boot.</li>
                                                <li>Es fácil de usar.</li>
                                                <li>Es fácil de integrar.</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Precio elevado</li>
                                                <li>Paquetes limitados</li>
                                                <li>Multiples bugs</li>
                                                <li>Pro plan muy caro</li>
                                                <li>No está hecho para solucionar problemas, solo dar marketing. </li>

                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Tiene muchos paquetes limitados por el precio, así que las funciones mas importantes están en paquetes con más costo.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor_de_plata">
                                    <a id="chat"></a>
                                    <hr />
                                    <p>Chat Fuel</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Interfaz amigable</li>
                                                <li>Funciones avanzadas</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Opciones gratuitas limitadas</li>
                                                <li>Pocas plantillas</li>

                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Chat Fuel tiene múltiples paquetes con limitación entre uno y otro, pero también cuenta con opciones gratuitas.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor_de_plata">
                                    <a id="Botsify"></a>
                                    <hr />
                                    <p>Botsify</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Contiene muchos medios de migración</li>
                                                <li>Muchas plantillas</li>
                                                <li>ML básico </li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Falta de actualización</li>
                                                <li>No contiene muchas herramientas de live chat</li>
                                                <li>No contiene analiticas nativas</li>
                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Como muchos de los casos anteriores, este tiene paquetes gratuitos pero que contienen opciones limitadas</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor_de_plata">
                                    <a id="PandoraBots"></a>
                                    <hr />
                                    <p>PandoraBots</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Tiene sistema de aprendizaje de lenguaje</li>
                                                <li>Código abierto</li>
                                                <li>Bibliotecas predefinidas </li>
                                                <li>Migración a múltiples plataformas.</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Se tiene que definir bien las entradas del boot</li>
                                                <li>No es de los mejores para negocios</li>
                                                <li>No se tiene host de este</li>
                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Pandora tiene paquetes de paga y uno gratuito pero con funciones más limitadas.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor_de_plata">
                                    <a id="Intercom"></a>
                                    <hr />
                                    <p>Intercom</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Amigable con el usuario.</li>
                                                <li>Soporte del bot así como múltiples servicios.</li>
                                                <li>Personalización de chatbots</li>
                                                <li>API robusta</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Precio sobrevalorado</li>
                                                <li>Se limita solo a páginas web</li>
                                                <li>Integrarlo a un esquema CRM es complicado</li>
                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>En este caso en particular no existen paquetes gratuitos para ser usados</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor_de_plata">
                                    <a id="Freschat"></a>
                                    <hr />
                                    <p>Freschat</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Soporte de la plataforma</li>
                                                <li>Migración a múltiples canales</li>
                                                <li>Contextualización de la conversación</li>
                                                <li>Herramientas de colaboración en equipo</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>No es tan flexible</li>
                                                <li>Número limitado de integraciones</li>

                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Cuenta con paquetes de opción gratuita, pero con algunas limitaciones, así como paquetes premium</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor_de_plata">
                                    <a id="Oct8ne"></a>
                                    <hr />
                                    <p>Oct8ne</p>
                                    <hr />
                                    <div className="contenedor_ventajas_desventajas">
                                        <div className="ventajas">
                                            <p>Ventajas</p>
                                            <hr />
                                            <ul>
                                                <li>Canales de Sms </li>
                                                <li>Perfecto para ecommerce</li>
                                                <li>Interfaz amigable</li>
                                                <li>Contiene analiticas</li>
                                            </ul>
                                        </div>
                                        <div className="desventajas">
                                            <p>Desventajas</p>
                                            <hr />
                                            <ul>
                                                <li>No recomendable para live chats</li>
                                                <li>No disponible para aplicaciones móviles</li>
                                                <li>No contiene API</li>
                                            </ul>
                                        </div>
                                        <div className="costos">
                                            <p>Costos</p>
                                            <hr />
                                            <ul>
                                                <li>Este bot en particular cuenta solo con paquetes de pago, sin opciones de prueba ni gratuitos</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <a id="uso_de"></a>
                        <p className="titulo_sub"><strong>Uso de los chatbots</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p>Si llegaste hasta este punto de la documentación podrás haber notado que muchas empresas usan chatbots para tener un contacto más personalizado con sus clientes o posibles compradores. Esto es gracias a la gran practicidad que este tipo de herramientas brindan a sectores usualmente ocupados por empleados humanos.</p>
                            </div>
                            <div id="imagen_15" className="imagen"></div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div id="imagen_16" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p>
                                    Los chatbots no pretenden reemplazar la comunicación e interacción humana que un agente de ventas o un empleado de soporte puede aportar a la experiencia de un cliente.
                                    Este tipo de herramientas están diseñadas para ahorrar tiempo a estos empleados, así como dar un servicio más rápido y de calidad a cualquier cliente que se acerque a una empresa o una página.
                                </p>
                            </div>
                        </div>
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p>Podríamos ver a cualquier chatbot como un medio de comunicación profesional intermediaria entre empleados o agentes de ventas (en el caso de comercios electrónicos o empresas) que sirve para agilizar procesos monótonos o en ocasiones muy simples. </p>
                            </div>
                            <div id="imagen_17" className="imagen"></div>
                        </div>
                        <div className="texto_imagen_dos">
                            <div id="completo" className="texto_de_la_imagen">
                                <p> Estas herramientas llegaron para quedarse en el mundo digital, aprovechar al máximo sus beneficios y aplicarlas en nuestros proyectos puede ayudarnos a dar una mejor experiencia de navegación a cualquier persona que visite o conozca de nosotros.</p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <a id="limitaciones"></a>
                        <p className="titulo_sub"><strong>Limitaciones de los chatbots no code</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p>Hablaremos un poco de las limitaciones o desventajas que los chatbots no code pueden presentar. Cuando en la creación de un chatbot nos limitan o no tenemos acceso a la codificación del mismo, podemos dejar de lado muchas funcionalidades para las cuales no estaba principalmente diseñado.</p>
                            </div>
                            <div id="imagen_18" className="imagen"></div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div id="imagen_19" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p> Ya que estarás limitado a lo que la plataforma ofrezca y tendrás que adaptar tus necesidades a las herramientas con las que cuentas. Por ello conocer y usar alguna plataforma que permita en cierta medida codificar por tu cuenta alguna de las funcionalidades de tu chatbot puede dar ese plus que tu problema necesita.</p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p>  Siempre estarás limitado a la tecnología con la que desarrolles tu chatbot sin embargo, puedes romper esos límites si investigas un poco más sobre la estructura del código de aquello que manejas.En esta documentación usaremos códigos para creación de este tipo de herramientas. Estar familiarizado con estos ambientes te ayudará a comprender un poco más sobre lo que se está trabajando.</p>
                            </div>
                            <div id="imagen_20" className="imagen"></div>
                            <a id="que"></a>
                        </div>
                        <a id="ejemplo_de"></a>
                        <p className="titulo_sub"><strong>Ejemplos del uso de chatbots</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div id="completo" className="texto_de_la_imagen">
                                <p>
                                    Veamos algunos ejemplos de chatbots y sus usos en servicios, páginas o por simple entretenimiento. Mostrarte ejemplos de chatbots en accion podria darte un poco de inspiración al momento de desarrollar tu proyecto (depende de la fecha en la que veas esto, las páginas pueden estar o no visibles):
                                </p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <ul id="plataformas">
                                    <li><a target="_blank" href="https://aunoa.ai/cuales-son-las-limitaciones-de-crear-chatbots-con-plataformas-no-code/">Benefit</a></li>
                                    <li><a target="_blank" href="https://supermercado.eroski.es/en/">Eroski </a></li>
                                    <li><a target="_blank" href="https://www.schlage.com/en/home.html">Schlage</a></li>
                                    <li><a target="_blank" href="https://dkv.es/particulares">Dkv</a></li>
                                    <li><a target="_blank" href="https://www.correos.es/es/es/atencion-al-cliente">Correos</a></li>
                                </ul>
                            </div>
                            <div id="imagen_21" className="imagen"></div>
                            <a id="que"></a>
                        </div>
                        <a id="es_un_chatbot"></a>
                        <p className="titulo_sub"><strong>¿Es un chatbot una solución a mi problema?</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div id="completo" className="texto_de_la_imagen">
                                <p>
                                    Antes de comenzar a trabajar sobre lo que nos interesa y una vez contextualizados en todos los aspectos de los chatbots, es importante preguntarnos si realmente nuestro problema se soluciona implementando un chatbot, para ello podemos revisar algunas de las siguientes preguntas, que nos ayudaran a saber si este tipo de proyectos aplican o no para nuestro problema en particular.
                                </p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div id="imagen_22" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>1.- ¿Cuál es la comunicación con nuestro usuario final (cliente)?</strong></p>
                                <p>
                                    Si la mayor parte de nuestra comunicación con el usuario final se tiene que realizar de manera personalizada y detallada con los requerimientos de este, entonces un chatbot suena como una buena opción.
                                </p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>2.-¿Qué interacciones puede tener un usuario con nosotros ?</strong></p>
                                <p>
                                    Puede que la interacción de nuestros usuarios sean más complejas que solo pagar por un servicio o visitar nuestra página, por lo que podría ser de ayuda un chatbot para ello.
                                </p>
                            </div>
                            <div id="imagen_23" className="imagen"></div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div id="imagen_24" className="imagen"></div>
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>3.- ¿Implementar un chatbots nos ahorra tiempo y costos ?</strong></p>
                                <p>
                                    Los negocios se resumen en costos y ganancias, tal vez la implementación de un chatbot puede ser más costosa que el beneficio de este, por lo que verificar su viabilidad antes de implementarlo sería lo óptimo.
                                </p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p className="titulo_sub"><strong>4.- ¿Porque sería una buena solución un chatbot ?</strong></p>
                                <p>
                                    Puede que la interacción de nuestros usuarios sean más complejas que solo pagar por un servicio o visitar nuestra página, por lo que podría ser de ayuda un chatbot para ello.
                                </p>
                            </div>
                            <div id="imagen_25" className="imagen"></div>
                            <a id="que"></a>
                        </div>
                        <div className="texto_imagen_dos">
                            <div id="completo" className="texto_de_la_imagen">
                                <p>
                                    Ahora que todo está contextualizado y que sabes un poco más sobre los chatbots y todo lo que los rodea, puedes avanzar sin tropiezos en la creación de uno de estos.
                                </p>
                            </div>
                            <a id="que"></a>
                        </div>
                        <p className="titulo_sub"><strong>Autoevaluación</strong></p>
                        <hr />
                        <div className="texto_imagen_dos">
                            <div className="texto_de_la_imagen">
                                <p> En esta sección encontrarás algunas preguntas que te permitirán saber si lo que leíste anteriormente quedó claro del todo. Si no es el caso puedes ingresar a la pregunta para saber donde se resuelve esta misma.
                                    <ol className="lista_preguntas_auto">
                                        <li> <a href="#que" >¿Qué es un chatbot?</a></li>
                                        <li> <a href="#tipos_de" >¿Cuáles son los tipos de chatbots?</a></li>
                                        <li> <a href="#uso_de" >¿Cuál es el uso que se les da a estos ? </a></li>
                                        <li> <a href="#plataformas" >¿Qué plataformas ayudan a crearlos?</a></li>
                                        <li> <a href="#caracteristicas" >¿Cuál es la principal característica de los chatbots ?</a></li>
                                    </ol></p>
                            </div>
                            <div id="imagen_26" className="imagen"></div>
                        </div>
                        <hr />
                        <div className="Controler_fondo_botn">
                            <button onClick={a_intro} id="Todas" >Introducion</button>
                        <button onClick={update2} id="estado_arte" >Todo sobre Dialog</button>
                        </div>
                    </div>
                    <div className="fondo"></div>
                </div>
            </SFrames>
        </>
    )
}
export default Estado_del_arte;
const SFrames = styled.nav`
.hold{
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
}
`