import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import Buses from './pages/Buses';
import Routes from './pages/Routes';
import Layout from './components/Layout';
import AddDriver from './pages/AddDriver';
import AddBus from './pages/AddBus';
import AddRoute from './pages/AddRoute';
import EditBus from './pages/EditBus';
import EditDriver from './pages/EditDriver';
import EditRoute from './pages/EditRoute';
import EditUser from './pages/EditUser';
import AssignBus from './pages/AssignBus';
import BusTracking from './pages/BusTracking';
import AddAdmin from './pages/AddAdmin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        
        <Route path="/" element={isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/" />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="buses" element={<Buses />} />
          <Route path="routes" element={<Routes />} />
          <Route path="adddriver" element={<AddDriver />} />
          <Route path="addbus" element={<AddBus />} />
          <Route path="addroute" element={<AddRoute />} />
          <Route path="editbus/:id" element={<EditBus />} />
          <Route path="editdriver/:id" element={<EditDriver />} />
          <Route path="editroute/:id" element={<EditRoute />} />
          <Route path="edituser/:id" element={<EditUser />} />
          <Route path="assignbus/:id" element={<AssignBus />} />
          <Route path="bustracking" element={<BusTracking />} />
          <Route path="addadmin" element={<AddAdmin />} />
        </Route>
      </RouterRoutes>
    </Router>
  );
}

export default App;
