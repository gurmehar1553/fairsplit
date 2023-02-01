import React from 'react'

const HeroSection = () => {
  return (
    <div className='container my-3 hero-section'>
          <div className='row'>
            <div className='col-md-6 text-center text-light p-5 my-5'>
                <h1>Fair<span>Split</span></h1>
                <h4>Sharing travel costs with <span>roommates, friends, your partner, or anyone else</span> will relieve some of the stress.</h4>
                <h4>Facing Problems in <span>managing expenses with your friends?</span></h4>
                <h4><span>FairSplit</span> brings solution to this major problem!</h4>

                <h2>Want to know how</h2>
                <h4>Kindly Scroll</h4>

            </div>
            <div className='col-md-6'>
              {/* <img src={heroImg} width='100%' alt="notFound"/> */}
            </div>
          </div>
          <div className="scroll-chevron-div">
          <div id="scroll-down" className="mx-auto">
            <a href="#features">
              <div className="chevron"></div>
              <div className="chevron"></div>
              <div className="chevron"></div>
            </a>
          </div>
        </div>
    </div>
  )
}
export default HeroSection