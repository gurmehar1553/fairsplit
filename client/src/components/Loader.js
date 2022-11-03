import React, {useEffect, useState} from 'react'

export default function Loader() {
    const [visible,setVisible] = useState(true)

    const styleDisplay = {
        display:visible? '':'none',
        overflow:"hidden"
    }

    useEffect(()=>{
        setTimeout(() => setVisible(!visible),3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
