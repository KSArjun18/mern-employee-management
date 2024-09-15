// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeeDashboard from './components/EmployeeDashboard';

function App() {
  const [employees, setEmployees] = useState([]);
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employeelist" element={<EmployeeDashboard employees={employees} setEmployees={setEmployees} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
