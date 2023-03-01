import React from 'react'
import './HeroSection.css'

function Chevron(){

  function handleOnclick(){
    document.getElementById('features')?.scrollIntoView()
  }

  return(
    <div className="scroll-chevron-div">
      <div id="scroll-down" className="mx-auto">
        <div onClick={handleOnclick} href="#features">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>
      </div>
  </div>
  )
}

const HeroSection = () => {
  return (
    <div className='hero-section'>
      <div className='container h-100'>
        <div className='row h-100'>
          <div className='col-md-6 text-center text-light p-5 my-5'>
              <h3 className='display-4'>Fair<span>Split</span></h3>
              <h4>Sharing travel costs with <span>roommates, friends, your partner, or anyone else</span> will relieve some of the stress.</h4>
              <h4>Facing Problems in <span>managing expenses with your friends?</span></h4>
              <h4><span>FairSplit</span> brings solution to this major problem!</h4>
              <div>
                <h2>To Know How</h2>
                <h3>Kindly Scroll</h3>
              </div>
              <Chevron/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HeroSection