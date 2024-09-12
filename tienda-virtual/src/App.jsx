import React from 'react'
import './App.css'
import NavBar from './components/Navbar'
import HeroSection from './pages/HeroSection'
import AboutSection from './pages/AboutSection'
import ProductsSection from './pages/ProductsSection'
import Footer from './pages/Footer'

function App() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <HeroSection />
        <AboutSection />
        <ProductsSection />
      </div>
      <Footer />
    </>
  )
}

export default App
