import React, {useEffect, useState} from 'react'
import {verifyAuth} from '../serverApi/server'

const AuthContext = React.createContext()

export function AuthProvider({children}) {
    const [auth,setAuth] = useState(false)
    const [currentUser,setUser] = useState(null)

    async function getAuth(){
        const {authStatus,user,err} =await verifyAuth()
        console.log(err? err:'No errors')
        if(authStatus){
            setAuth(true)
            setUser(user)
        }else{
          setUser(null)
        }
      }

      useEffect(()=>{
        getAuth()
      },[auth,setUser])

  return (
    <AuthContext.Provider value={{auth,setAuth,currentUser,setUser}}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
