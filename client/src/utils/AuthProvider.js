import React, {useEffect, useState} from 'react'
import {varifyAuth} from '../serverApi/server'

const AuthContext = React.createContext()

export function AuthProvider({children}) {
    const [auth,setAuth]= useState(false)

    async function getAuth(){
        const condition =await varifyAuth()
        console.log("Error -----",condition)
        if(condition){
            setAuth(true)
        }
      }
      useEffect(()=>{
        getAuth()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

  return (
    <AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
