import React, {useEffect, useState} from 'react'
import {verifyAuth} from '../serverApi/server'

const AuthContext = React.createContext()

export function AuthProvider({children}) {
    const [auth,setAuth] = useState(false)
    const [currentUser,setUser] = useState()

    async function getAuth(){
        const {authStatus,user} =await verifyAuth()
        if(authStatus){
            setAuth(true)
            setUser(user)
        }
      }
      useEffect(()=>{
        getAuth()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

  return (
    <AuthContext.Provider value={{auth,setAuth,currentUser}}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
