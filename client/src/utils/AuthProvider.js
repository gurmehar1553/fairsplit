import React, {useEffect, useState} from 'react'
import {verifyAuth} from '../serverApi/server'

const AuthContext = React.createContext()

export function AuthProvider({children}) {
    const [auth,setAuth] = useState(false)
    const [currentUser,setUser] = useState(null)

    async function getAuth(){
        const {authStatus,user} =await verifyAuth()
        console.log('verifying Auth...')
        if(authStatus){
            setAuth(true)
            setUser(user)
        }else{
          setUser(null)
        }
      }

      console.log("This is auth",auth)
      console.log("This is currentUser",currentUser)

      useEffect(()=>{
        getAuth()
      },[auth])

  return (
    <AuthContext.Provider value={{auth,setAuth,currentUser,setUser}}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
