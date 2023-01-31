import React from 'react'
import features from "../assets/images/features.png"

const FeaturePoints = () => {
  return (
    <>
        <div className='m-5 p-5 d-flex justify-content-around'>
            <div className='mx-auto my-5 col-md-6'>
                <h1 className='mx-5'>Features</h1>
                <h5 className='p-3'>
                Whether you're splitting the cost of a group vacation or simply trying to settle up after a night out, FairSplit has you covered. With its intuitive interface and easy-to-use tools, you can easily divide costs and settle debts in just a few clicks.

                </h5>
                <div className='bg-success bg-opacity-10 p-5'> 
                    <ul className="list-st" style={{listStyleType:"square"}}>
                        <li><h5>Split your expenses among <span>friends,colleagues or family</span></h5></li>
                        <li><h5><span>Easy maintenance </span>of records of your expenses</h5></li>
                        <li><h5>Tracks <span>individual expenses</span> to whom you need to pay </h5></li>
                        <li><h5>Add friends, form groups and add expenses.</h5></li>
                        <li><h5><span>Easy to Use</span> and <span>lowers down the burden</span> and stress of expenses in your fun time.</h5></li>
                    </ul>
                </div>
            </div>
            <div className='col-md-6'>
                <img src={features} alt="" width="100%" />
            </div>
        </div>
    </>
  )
}
export default FeaturePoints