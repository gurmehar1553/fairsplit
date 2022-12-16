import React from 'react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import Footer from '../components/Footer'
import UseCases from '../components/UseCases'
import Team from '../components/Team'

export default function LandingPage() {
  return (
    <div className='bg-success bg-opacity-25 shadow' style={{height:'90vh'}}>
        <Loader />
        <Header />
        <HeroSection />
        <UseCases />
        <Features />
        <Team />
        <Footer />
    </div>
  )
}
