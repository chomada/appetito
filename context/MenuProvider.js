import React, { createContext, useState,useEffect } from 'react'
import { db } from "../firebase/Config";
import { collection, getDocs, query } from "firebase/firestore";
import clienteAxios from '../config/axios';

export const Menu = createContext()

const MenuProvider = ({children}) => {
  
  const [recetas, setRecetas] = useState([])
  

  useEffect(()=> {
    (async () =>{
      try{
          const pruebaFetch = await fetch('http://app-appetito.herokuapp.com/api/useurs');
          const data = await pruebaFetch.json();
          console.log("resultado consulta fetch",data)

          const pruebaAxios = await clienteAxios.get('/api/ussers');
          console.log("resultado consulta axios",pruebaAxios.data)
       
  
      }catch(error){
        
        console.log("el error es",error.response.status)
      
      }

  })()
      // (async ()=>{
      //     const queryCollectionRecetas = query(collection(db, "recetas"))

      //     const querySnapshot = await getDocs(queryCollectionRecetas);
      //     const recetas = []
      //     querySnapshot.forEach((doc)=> {
      //         const receta = {id: doc.id, ...doc.data()}
      //         recetas.push(receta)
      //     })
          
      //     setRecetas([...recetas])
          
      // })()

  }, [])
  
  return (
    <Menu.Provider value={{ 
      recetas
    }}>
      {children}
    </Menu.Provider>
  )
}

export default MenuProvider