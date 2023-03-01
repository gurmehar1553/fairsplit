import React from 'react'
import features from "../assets/images/features.webp"
import './Features.css'

const Features = () => {
  return (
    <div>
        <div className='upperBorder'>
            <svg className='WaveSvg' viewBox="0 0 1440 320">
            <path d="M 0,400 C 0,400 0,200 0,200 C 129.7333333333333,162.26666666666665 259.4666666666666,124.53333333333333 432,126 C 604.5333333333334,127.46666666666667 819.8666666666666,168.13333333333333 995,187 C 1170.1333333333334,205.86666666666667 1305.0666666666666,202.93333333333334 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#2a251f" fillOpacity="1"></path>
                {/* <path fill="#2a251f" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,96C672,117,768,203,864,245.3C960,288,1056,288,1152,261.3C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path> */}
            </svg>
            {/* <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" className="WaveSvg transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 129.7333333333333,162.26666666666665 259.4666666666666,124.53333333333333 432,126 C 604.5333333333334,127.46666666666667 819.8666666666666,168.13333333333333 995,187 C 1170.1333333333334,205.86666666666667 1305.0666666666666,202.93333333333334 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#2a251f" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg> */}
        </div>
        <h1 className='display-1 text-center'>Features</h1>
        <div className='d-flex flex-wrap justify-content-center align-items-center'>
            <div className='col-10 col-md-6'>
                <img src={features} alt="" width="100%" />
            </div>
            <div className='col-10 col-md-6 pe-3'>
                <h3 className='p-3'>
                    Whether you're splitting the cost of a group vacation or simply trying to settle up after
                    a night out, FairSplit has you covered. With its intuitive
                    interface and easy-to-use tools, you can easily divide costs and settle debts in just a few clicks.
                </h3>
                <div className='bg-success bg-opacity-10 px-2 rounded'> 
                    <ul className="list-st p-3" style={{listStyleType:"square"}}>
                        <li><h5>Split your expenses among <span>friends,colleagues or family</span></h5></li>
                        <li><h5><span>Easy maintenance </span>of records of your expenses</h5></li>
                        <li><h5>Tracks <span>individual expenses</span> to whom you need to pay </h5></li>
                        <li><h5>Add friends, form groups and add expenses.</h5></li>
                        <li><h5><span>Easy to Use</span> and <span>lowers down the burden</span> and stress of expenses in your fun time.</h5></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Features