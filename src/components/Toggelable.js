import React, {useState} from 'react'

export default function Toggelable(props) {
    const [visible,setVisible] = useState(false)

    const showStyle = {display: visible? 'none':''}
    const hideStyle = {display: visible? '':'none'}

    function handleToggleViz(){
        setVisible(!visible)
    }
    return (
    <div className='text-center'>
        <div style={hideStyle}>
            <button className='btn btn-primary my-3 w-75' onClick={handleToggleViz} style={hideStyle}>{props.hide}</button>
            {props.children}
        </div>
        <button className='btn btn-primary my-3 w-75' onClick={handleToggleViz} style={showStyle}>{props.show}</button>
    </div>
  )
}
