//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCategory from './pages/CreateCategory';
import CreateUser from './pages/CreateUser';
import CreateBrand from './pages/CreateBrand';
import CreateProduct from './pages/CreateProduct';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/createcategory" element={<Layout><CreateCategory /></Layout>} />
        <Route path="/createuser" element={<Layout><CreateUser /></Layout>} />
        <Route path='/createbrand' element={<Layout><CreateBrand /></Layout>} />
        <Route path='/createproduct' element={<Layout><CreateProduct /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;
