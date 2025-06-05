import React, { useState } from 'react';
import '../styles/Users.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  status: 'active' | 'inactive';
  lastLogin: string;
  registrationDate: string;
}

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Örnek kullanıcı verileri
  const usersData: User[] = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet.yilmaz@example.com', role: 'admin', status: 'active', lastLogin: '15.06.2025 13:45', registrationDate: '10.01.2024' },
    { id: 2, name: 'Mehmet Demir', email: 'mehmet.demir@example.com', role: 'manager', status: 'active', lastLogin: '14.06.2025 09:30', registrationDate: '15.02.2024' },
    { id: 3, name: 'Ayşe Kaya', email: 'ayse.kaya@example.com', role: 'operator', status: 'active', lastLogin: '13.06.2025 16:20', registrationDate: '05.03.2024' },
    { id: 4, name: 'Fatma Şahin', email: 'fatma.sahin@example.com', role: 'operator', status: 'inactive', lastLogin: '10.06.2025 11:15', registrationDate: '20.03.2024' },
    { id: 5, name: 'Ali Öztürk', email: 'ali.ozturk@example.com', role: 'manager', status: 'active', lastLogin: '15.06.2025 08:40', registrationDate: '12.04.2024' },
    { id: 6, name: 'Zeynep Aktaş', email: 'zeynep.aktas@example.com', role: 'operator', status: 'inactive', lastLogin: '08.06.2025 14:25', registrationDate: '18.05.2024' }
  ];

  // Filtreleme fonksiyonu
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Rol ve durum etiketleri için yardımcı fonksiyonlar
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <span className="role-badge admin">Admin</span>;
      case 'manager':
        return <span className="role-badge manager">Yönetici</span>;
      case 'operator':
        return <span className="role-badge operator">Operatör</span>;
      default:
        return <span className="role-badge">Bilinmiyor</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="status-badge active">Aktif</span>;
      case 'inactive':
        return <span className="status-badge inactive">Pasif</span>;
      default:
        return <span className="status-badge">Bilinmiyor</span>;
    }
  };

  return (
    <div className="users-container">
      <div className="page-header">
        <h1>Kullanıcı Yönetimi</h1>
        <button className="add-button">+ Yeni Kullanıcı Ekle</button>
      </div>

      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Kullanıcı adı veya e-posta ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <div className="filter-item">
            <label>Rol:</label>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">Tümü</option>
              <option value="admin">Admin</option>
              <option value="manager">Yönetici</option>
              <option value="operator">Operatör</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Durum:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tümü</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad Soyad</th>
              <th>E-posta</th>
              <th>Rol</th>
              <th>Durum</th>
              <th>Son Giriş</th>
              <th>Kayıt Tarihi</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>{user.lastLogin}</td>
                  <td>{user.registrationDate}</td>
                  <td className="actions-cell">
                    <button className="action-button edit">Düzenle</button>
                    <button className="action-button delete">Sil</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-results">
                  Aramanıza uygun kullanıcı bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users; 