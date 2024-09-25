import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCategory from './pages/CreateCategory';
import EditCategory from './pages/EditCategory';
import CreateUser from './pages/CreateUser';
import ConfigureUser from './pages/ConfigureUser';
import CreateBrand from './pages/CreateBrand';
import EditBrand from './pages/EditBrand';
import CreateProduct from './pages/CreateProduct';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/createcategory" element={<Layout><CreateCategory /></Layout>} />
        <Route path="/editcategory/" element={<Layout><EditCategory /></Layout>} />
        <Route path="/createuser" element={<Layout><CreateUser /></Layout>} />
        <Route path="/configureuser" element={<Layout><ConfigureUser /></Layout>} />
        <Route path='/createbrand' element={<Layout><CreateBrand /></Layout>} />
        <Route path='/editbrand' element={<Layout><EditBrand /></Layout>} />
        <Route path='/createproduct' element={<Layout><CreateProduct /></Layout>} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
