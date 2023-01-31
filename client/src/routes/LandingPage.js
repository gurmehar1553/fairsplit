import React from 'react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import Footer from '../components/Footer'
import UseCases from '../components/UseCases'
import Team from '../components/Team'
import FeaturePoints from '../components/FeaturePoints'
import Landing from '../assets/images/Landing.png'


export default function LandingPage() {
  return (
    <div className='hero-section text-light' style={{backgroundImage:`url(${Landing})`}}>
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
