import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Topbar() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-light bg-transparent  mb-5">
      <div className="ms-lg-5 ms-2 mt-3">
      <div className='d-flex justify-content-between ms-lg-5'>
      <Link className="navbar-brand me-lg-5" to="/dashboard"><h5 className='text-white'>Home</h5></Link>
      <Link className="navbar-brand me-lg-5" to="/employeelist"><h5 className='text-white'>Empolyee List</h5></Link>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
       
        
      </div>
      </div>
    </nav>
  );
}

export default Topbar;
