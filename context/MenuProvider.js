import React, { createContext, useState,useEffect } from 'react'
import { db } from "../firebase/Config";
import { collection, getDocs, query } from "firebase/firestore";
//import clienteAxios from '../../config/axios';
export const Menu = createContext()
import { GetRecetas as GetRecetasAPI } from '../controller/RecetaController';
const MenuProvider = ({children}) => {
  
  const [recetas, setRecetas] = useState([])
  const [usuario, setUsuario] = useState({})
  const [enabled, setEnabled] = useState(false)
  const [recetaGuardada, setRecetaGuardada] = useState({"id":''})

  const handleSubmit = async (event) =>{
 
    let getRecetas = await GetRecetasAPI();
    setRecetas(getRecetas.data.recetas)
    console.log(getRecetas)

}
const cargarUsuario=(user)=>{
  setUsuario(user)
}

  useEffect(()=> {

    if(enabled){
      handleSubmit();
    }
  }, [enabled])
  // useEffect(()=> {

   
  //     handleSubmit();
    
  // }, [])
  
  return (
    <Menu.Provider value={{ 
      recetas, usuario, enabled,recetaGuardada, setUsuario,setEnabled,setRecetas,cargarUsuario,setRecetaGuardada
    }}>
      {children}
    </Menu.Provider>
  )
}

export default MenuProvider