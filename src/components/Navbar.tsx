import React from 'react';
import '../styles/Navbar.css';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Admin", "role": "Yönetici"}');

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Otobüs Yönetim Sistemi</h1>
      </div>
      <div className="navbar-right">
        <div className="navbar-user">
          <div className="user-avatar">
            {user.name.charAt(0)}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
        </div>
        <button className="logout-button" onClick={onLogout}>
          <span className="logout-icon">🚪</span>
          <span className="logout-text">Çıkış</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 