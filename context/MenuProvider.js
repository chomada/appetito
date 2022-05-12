import React, { createContext, useState,useEffect } from 'react'
import { db } from "../firebase/Config";
import { collection, getDocs, query } from "firebase/firestore";

export const Menu = createContext()

const MenuProvider = ({children}) => {
  
  const [recetas, setRecetas] = useState([])
  

  useEffect(()=> {

      (async ()=>{
          const queryCollectionRecetas = query(collection(db, "recetas"))

          const querySnapshot = await getDocs(queryCollectionRecetas);
          const recetas = []
          querySnapshot.forEach((doc)=> {
              const receta = {id: doc.id, ...doc.data()}
              recetas.push(receta)
          })
          
          setRecetas([...recetas])
          
      })()

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