import React, { useState} from 'react'
import './notify.css'

const NotifyContext = React.createContext('');

export function Notify({children}) {

    const [message, setMessage] = useState()
    const [show, setShow] = useState(false)

    function notify(message){
        setMessage(message)
        setShow(true)
        setTimeout(() => {
            setShow(false)
            setMessage()
        },5000)
    }

    return (
        <NotifyContext.Provider value={{notify}}>
            {children}
            <div className={`notification ${show && 'popup'}`} >
                {message}
            </div>
        </NotifyContext.Provider>
    )
}

export default NotifyContext