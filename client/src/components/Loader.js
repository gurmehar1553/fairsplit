/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'

export default function Loader() {
    const [visible,setVisible] = useState(true)

    const styleDisplay = {
        display:visible? '':'none',
        overflow:"hidden"
    }

    useEffect(()=>{
        setTimeout(() => setVisible(!visible),3000)
    },[])

  return (
    <div style={styleDisplay} className="outerWrapper">
        <div className="wrapper">
            <div className="innerWrapper">
                <div className="fair word animate">
                    <div>Fair</div>
                    <div className="slash"></div>
                </div>
                <div className="split word animate">
                    <div className="slash"></div>
                    <div>Split</div>
                </div>
            </div>
        </div>
    </div>
  )
}
