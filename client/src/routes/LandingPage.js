import React from 'react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import HowToUse from '../components/HowToUse'
import Footer from '../components/Footer'
import UseCases from '../components/UseCases'
import Team from '../components/Team'
import Features from '../components/Features'


export default function LandingPage() {
  return (
    <div className='text-light'>
      <Loader />
      <Header />
      <HeroSection />
      <Features />
      <UseCases />
      <HowToUse />
      <Team />
      <Footer />
    </div>
  )
}
