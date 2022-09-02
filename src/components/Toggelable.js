import React, {useState} from 'react'

export default function Toggelable(props) {
    const [visible,setVisible] = useState(false)

    const showStyle = {display: visible? 'none':''}
    const hideStyle = {display: visible? '':'none'}

    function handleToggleViz(){
        setVisible(!visible)
    }
    return (
    <div>
        <div style={hideStyle}>
            <button className='btn btn-primary m-3' onClick={handleToggleViz} style={hideStyle}>Hide</button>
                {props.children}
        </div>
        <button className='btn btn-primary m-3' onClick={handleToggleViz} style={showStyle}>Show</button>
    </div>
  )
}
