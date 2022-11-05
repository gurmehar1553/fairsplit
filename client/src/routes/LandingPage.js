import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'

export default function LandingPage() {
  return (
    <div className='bg-success bg-opacity-25 shadow' style={{height:'90vh'}}>
        <Header />
        <HeroSection />
        <Features />
    </div>
  )
}
