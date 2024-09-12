import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import HeroSection from './pages/HeroSection';
import AboutSection from './pages/AboutSection';
import ProductsSection from './pages/ProductsSection';
import Footer from './pages/Footer';
import AdminLogin from './admin/AdminLogin'; 
import Dashboard from './admin/pages/Dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />

        <Route path="/admin/" element={<AdminLogin />} />
        <Route path="/admin/pages/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
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
  );
}

export default App;
