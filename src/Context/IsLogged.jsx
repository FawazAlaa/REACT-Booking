import { useContext, useState } from "react";
import { createContext } from "react";

const LoggedStore=createContext();

import React from 'react'

export default function IsLogged({children}) {
    const[logged,setLogged]=useState(false)
     const [user, setUser] = useState(null);
  return (
    <LoggedStore.Provider value={{logged,setLogged, user, setUser }}>
        {children}
    </LoggedStore.Provider>
  )
}

 export const useLogged = () => {
    return useContext(LoggedStore)
  }
  