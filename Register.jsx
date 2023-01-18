import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc,getFirestore,addDoc,collection} from "firebase/firestore";

function Register(props) {
    const navigate = useNavigate();
     const desplegar_register=()=>{
        let banner_login = document.getElementById("banner_login");
        let banner_register =  document.getElementById("banner_register");
        let login = document.getElementById("login");
        let register = document.getElementById("register");
        banner_register.style.display="none";
        banner_login.style.display="block";
        login.style.display="none";
        register.style.display="block";
    }
    const desplegar_login=()=>{
        let banner_login = document.getElementById("banner_login");
        let banner_register =  document.getElementById("banner_register");
        let login = document.getElementById("login");
        let register = document.getElementById("register");
        banner_register.style.display="block";
        banner_login.style.display="none";
        login.style.display="block";
        register.style.display="none";

    }
    const inputs_iniciales_registro={
        name:'',
        email:'',
        password:''
    }
    const inputs_iniciales_login={
        email2:'',
        password2:''
    }
    const [values_registro,setValues_registro]=useState(inputs_iniciales_registro);
    const [values_login,setValues_login]=useState(inputs_iniciales_login)
    const Onchange= e=>{
        const{name,value} = e.target;
        setValues_registro({...values_registro,[name]:value})
    }
    const Onchange2 =e =>{
        const{name,value} = e.target;
        //console.log(name,value)
        setValues_login({...values_login,[name]:value})
    }

    const Registrar=async(e)=>{
        e.preventDefault();
        //console.log(values_registro)
        await createUserWithEmailAndPassword(getAuth(),values_registro.email,values_registro.password)
            .then((usuarioFirebase) => {
            //console.log("usuario creado:", usuarioFirebase);
            props.setUsuario(usuarioFirebase);
          });
        const docRef = await addDoc(collection(getFirestore(), "Users"), {
            name: values_registro.name,
            email: values_registro.email.toLowerCase()
          });
        const docRef2 = await addDoc(collection(getFirestore(), "fundamentos"), {
            email: values_registro.email.toLowerCase(),
            temas:[]
          });
          const docRef3 = await addDoc(collection(getFirestore(), "Diseño_parte_uno"), {
            email: values_registro.email.toLowerCase(),
            url:[]
          });
        navigate('/dos');
    }
    const Login=async(e)=>{
        e.preventDefault();
        //console.log(values_login)
        await signInWithEmailAndPassword(getAuth(),values_login.email2.toLowerCase(),values_login.password2)
            .then((usuarioFirebase) => {
            console.log("usuario logeado:", usuarioFirebase);
            props.setUsuario(usuarioFirebase);
          });
        navigate('/dos');
    }
    const todo_bien=e=>{
        navigate('/')
    }
    return (
        <>
            <SFrames>
                <div className="conenido_general">
                    <br />
                    <div className="cont_formulario">
                        <div id="banner_register" className="cont_lado" >
                            <div className="contenido_de_lado">
                                <p>¿Aun no Tienes Cuenta?</p>
                                <p>¡¡ Crea una aqui !!</p>
                                <br className="salto" />
                                <button className="button" onClick={desplegar_register}>Registrarse</button>
                            </div>
                        </div>
                        <div id="banner_login" className="cont_lado" >
                            <div className="contenido_de_lado">
                                <p>¿ Tienes una cuenta ?</p>
                                <p>¡¡ Ingresa aqui !!</p>
                                <br className="salto" />
                                <button className="button" onClick={desplegar_login}>Login</button>
                            </div>
                        </div>
                        <div id="login" className="cont_form">
                            <div className="cont_form_form">
                                <br />
                                <div className="img_login"></div>
                                <form className="formulario" action="">
                                    <br />
                                    <input name="email2"  onChange={Onchange2} className="email_format" type="email" required="" placeholder="email"/>
                                    <br />
                                    <input onChange={Onchange2} name="password2" className="pass_word_format" type="password" placeholder="password" />
                                    <br />
                                    <input className="boton_enviar" type="submit" onClick={Login} value="Login"></input>
                                </form>
                            </div>
                        </div>
                        <div id="register" className="cont_form_register">
                            <div className="cont_form_form">
                                <br />
                                <div className="img_login"></div>
                                <form className="formulario" action="" method="POST">
                                <br />
                                    <input name="name"   onChange={Onchange} className="email_format" type="text" required="" placeholder="name"/>
                                    <br />
                                    <input name="email" onChange={Onchange} className="email_format" type="email" required="" placeholder="email"/>
                                    <br />
                                    <input name="password"  onChange={Onchange} className="pass_word_format" type="password" placeholder="password" />
                                    <br />
                                    <input className="boton_enviar" onClick={Registrar} type="submit" value="Registrarse"></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </SFrames>
        </>
    )
}
export default Register;
const SFrames = styled.nav`
#banner_register{
    display:none;
}
#banner_login{
    display:block;
}
.conenido_general{
    width: 100vw;
    height: 100vh;
}
.button{
    margin: 0 auto;
}
#login{
    display:none;
}
#register{
    display:block;
}

.cont_formulario{
  margin: 0  auto;
  width: 80vw;
  height: 80vh;
  background-color: #2a6cad;
  border-radius: 10px;
  display: flex;    
}

@media screen and (max-width:740px){
    .salto{
        display:none;
    }
    .cont_formulario{
      margin: 0  auto;
      width: 95vw;
      height: 95vh;
      display: block;
    }
    .cont_lado{
        width: 100%;
        height: 40%;
        border-radius: 10px 10px 0px 0px;

    }
    .cont_form{
        width: 100%;
        height: 60%;
        border-radius: 0px 0px 10px 10px;
    }
    .contenido_de_lado{
        padding: 5% 5% 5% 5%;
        font-size:20px;
      }
    .contenido_de_lado p {
        font-size:20px;
        margin: 10px;
      }
    
}
/*Animaciones*/
@keyframes square-in-top-left {
    from {
      clip-path: inset(100% 0 0 100%);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
  
  [transition-style="in:square:top-left"] {
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) square-in-top-left both;
  }
@keyframes wipe-in-right {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
  
  [transition-style="in:wipe:right"] {
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) wipe-in-right both;
  }
  @keyframes wipe-out-left {
    from {
      clip-path: inset(0 0 0 0);
    }
    to {
      clip-path: inset(0 100% 0 0);
    }
  }
  [transition-style="out:wipe:left"] {
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) wipe-out-left both;
  }
  @keyframes wipe-in-left {
    from {
      clip-path: inset(0 0 0 100%);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
  
  [transition-style="in:wipe:left"] {
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) wipe-in-left both;
  }

`