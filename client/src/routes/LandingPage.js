import React from 'react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import Footer from '../components/Footer'
import UseCases from '../components/UseCases'
import Team from '../components/Team'
import FeaturePoints from '../components/FeaturePoints'

export default function LandingPage() {
  return (
    <div className='bg-success bg-opacity-25 shadow' style={{height:'90vh'}}>
        <Loader />
        <Header />
        <HeroSection />
        <FeaturePoints />
        <UseCases />
        <Features />
        <Team />
        <Footer />
    </div>
  )
}
