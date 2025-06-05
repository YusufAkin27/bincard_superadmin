import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>SuperAdmin</h2>
          <button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? '◄' : '►'}
          </button>
        </div>
        <div className="sidebar-content">
          <ul className="menu">
            <li>
              <Link to="/dashboard">
                <span className="icon">📊</span>
                <span className="text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/drivers">
                <span className="icon">👤</span>
                <span className="text">Şoförler</span>
              </Link>
            </li>
            <li>
              <Link to="/buses">
                <span className="icon">🚌</span>
                <span className="text">Otobüsler</span>
              </Link>
            </li>
            <li>
              <Link to="/routes">
                <span className="icon">🛣️</span>
                <span className="text">Hatlar</span>
              </Link>
            </li>
            <li>
              <Link to="/bustracking">
                <span className="icon">📍</span>
                <span className="text">Canlı Takip</span>
              </Link>
            </li>
            <li className="submenu-header">Yönetim</li>
            <li>
              <Link to="/adddriver">
                <span className="icon">➕</span>
                <span className="text">Şoför Ekle</span>
              </Link>
            </li>
            <li>
              <Link to="/addbus">
                <span className="icon">➕</span>
                <span className="text">Otobüs Ekle</span>
              </Link>
            </li>
            <li>
              <Link to="/addroute">
                <span className="icon">➕</span>
                <span className="text">Hat Ekle</span>
              </Link>
            </li>
            <li>
              <Link to="/addadmin">
                <span className="icon">👑</span>
                <span className="text">Yönetici Ekle</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="icon">🚪</span>
            <span className="text">Çıkış Yap</span>
          </button>
        </div>
      </div>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={toggleSidebar}></div>
    </>
  );
};

export default Sidebar; 