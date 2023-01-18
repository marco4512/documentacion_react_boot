
import './App.css';
import React, { useState, useEffect } from "react";
import Frames from './componentes/Frames';
import Nav from './componentes/Nav';
import Login from './componentes/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Frames2 from './componentes/Frames2';
import { getAuth } from "firebase/auth";
import Indice_fundamentos from './componentes/Indice_fundamentos';
import Register from './componentes/Register';
import Introduccion from './componentes/Introduccion';
import Barra_progreso from './componentes/Barra_progreso';
import Estado_del_arte from './componentes/Estado_del_arte';
import TodoSobre from './componentes/TodoSobre';
import Diseño_parte_uno from './componentes/Diseño_parte_uno';


function App() {
  const [usuario, setUsuario] = useState(null);
  //console.log(usuario)
  return (
    <>
      <BrowserRouter>
        <Nav></Nav>
        <br></br>
        <Routes>
          <Route path='/dos' element={<Frames2 setUsuario={setUsuario} />} />
          <Route path='/login' element={<Login setUsuario={setUsuario} />} />
          <Route path='/' element={usuario?<Frames2/>:<Login setUsuario={setUsuario}/>} />
          <Route path='/register' element={<Register setUsuario={setUsuario}/>} />
          <Route path='/indice_fundamentos' element={<Indice_fundamentos setUsuario={setUsuario}/>}/>
          <Route path='/introduccion' element={<Introduccion setUsuario={setUsuario}></Introduccion>}/>
          <Route path='/Estado_de_arte' element={<Estado_del_arte setUsuario={setUsuario}></Estado_del_arte>}/>
          <Route path='/todo_sobre' element={<TodoSobre setUsuario={setUsuario}></TodoSobre>} />
          <Route path='/diseño_primera_parte' element={<Diseño_parte_uno setUsuario={setUsuario}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;