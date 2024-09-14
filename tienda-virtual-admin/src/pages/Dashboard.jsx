import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex">
      <div className="flex-grow p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
