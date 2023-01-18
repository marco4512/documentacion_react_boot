import React,{useState} from "react";
import styled from 'styled-components';
import logo from '../img/logo-apisec.png'
import Burger from "./Burger";
import { useNavigate } from 'react-router-dom';
function Nav(){
    const navigate = useNavigate();
    const [cliked,setClick]=useState(false);
    const handleClick=()=>{
        setClick(!cliked)
    }
    const allPath=()=>{
        navigate('/dos')
    }
    const login=()=>{
        navigate('/login')
    }
    const register =()=>{
        navigate('/register')
    }
    return(
        <>
        <SNav>
        <div className="Barra_nav">
        <div className="contenedor_menu">
            <div className="Imagen_banner">
                <a href="/"><img className="imagen_de_logo" src={logo} alt="logo-apisec"></img></a>
            </div>
            <div className={`hamburgesa`}>
                <Burger cliked={cliked} handleClick={handleClick} ></Burger>
            </div>
            <div className="menu">
                <ul>
                    <li className="opciones_menu"><a className="texto_opciones_menu" id="todas_las_pag" href="#" onClick={allPath} >Todas las partes |</a></li>
                    <li className="opciones_menu"><a className="texto_opciones_menu" href="#" onClick={login} >Login |</a></li>
                    <li className="opciones_menu"><a className="texto_opciones_menu" href="#" onClick={register}>Registrate |</a></li>
                    <li className="opciones_menu"><a className="texto_opciones_menu" href="#">Foro |</a></li>
                </ul>
            </div>
         
        </div>
    </div>
    <div className={`${cliked ? 'completo':'si_no'}`}>
                
                <ul className="formato_lista">
                    <br />
                    <li><a className="elementos" href="dos" >Todas las partes</a></li>
                    <li><a className="elementos" href="login" >Login </a></li>
                    <li><a className="elementos" href="#">Registrate </a></li>
                    <li><a className="elementos" href="#">Foro </a></li>
                </ul>

    </div>
        </SNav>
        </>
    )
}
export default Nav;
const SNav = styled.nav`
.si_no{
    display:none;
}
.formato_lista{
    list-style: none;
    color: white;
    font-size: 20px;
    text-align: center;
    background-color: #2a6cad;
  }
.elementos{
    color: white;
    font-size: 40px;
    text-decoration: none;
    padding: 10px;
    align-items: center;
}
.completo{
    width: 100vw;
    height: 100vh;
    background-color: #2a6cad;
    z-index: 11;
    position: fixed;
    top:0;
    animation-duration: 1s;
    animation-name:circle-in-top-right;
}
.hamburgesa{
    width: 33%;
    background-color: #2a6cad;
    display:none
}
.salida{
    transition: all;
    animation-duration: 1s;
    animation-name:circle-out-top-right;
}
h1{
    font-weight:400;
}
.Barra_nav{
    background-color: #f9fafb;
    z-index: 10;
    width:100%
}
.contenedor_menu{
    margin-top: 20px;
    width: 100%;
    height: 50px;
    display:flex;
    text-aling:center;
 }
.Imagen_banner{
    margin-left:50px ;
}
.menu{
    margin: 10px;
    float: right;
    text-align:right;
}
.opciones_menu{
    display: inline-block;
}
.texto_opciones_menu{
    text-decoration: none;
    text-align: center;
    margin: 10px;
    font-size: large;
    color: black;
}
@keyframes circle-in-top-right {
    from {
      clip-path: circle(0% at top right);
    }
    to {
      clip-path: circle(150% at top right);
    }
  }
  
  [transition-style="in:circle:top-right"] {
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) circle-in-top-right both;
  }

  @keyframes circle-out-top-right {
    from {
      clip-path: circle(125%);
    }
    to {
      clip-path: circle(0% at top right);
    }
  }
  
  [transition-style="out:circle:top-right"] {
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) circle-out-top-right both;
  }
@media screen and (max-width:679px){
    .hamburgesa{
        width: 90px;
        height: 80px;
        background-color: ##2a6cad;
        display:block;
        border-radius: 0% 0% 0% 90%;
    }
    .contenedor_menu{
    width: 100%;
    margin:0;
    }
    .menu{
        display:none;
    }
    .Imagen_banner{
        margin:0 auto;
    }
    .imagen_de_logo{
        margin:0 auto;
    }
}
`