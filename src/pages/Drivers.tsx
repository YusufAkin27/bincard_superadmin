import React, { useState } from 'react';
import '../styles/Drivers.css';

interface Driver {
  id: number;
  name: string;
  age: number;
  experience: number;
  licenseType: string;
  phoneNumber: string;
  status: 'active' | 'inactive' | 'vacation';
  assignedBus: string | null;
}

const Drivers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Örnek şoför verileri
  const driversData: Driver[] = [
    { id: 1, name: 'Mehmet Soylu', age: 42, experience: 8, licenseType: 'D', phoneNumber: '0532 123 4567', status: 'active', assignedBus: 'Mercedes Travego - 34 ABC 123' },
    { id: 2, name: 'Ahmet Yılmaz', age: 53, experience: 12, licenseType: 'D', phoneNumber: '0535 234 5678', status: 'active', assignedBus: 'MAN Fortuna - 34 XYZ 456' },
    { id: 3, name: 'Fatma Kaya', age: 38, experience: 5, licenseType: 'D', phoneNumber: '0541 345 6789', status: 'inactive', assignedBus: null },
    { id: 4, name: 'Ali Demir', age: 45, experience: 10, licenseType: 'D', phoneNumber: '0537 456 7890', status: 'active', assignedBus: null },
    { id: 5, name: 'Ayşe Demir', age: 36, experience: 7, licenseType: 'D', phoneNumber: '0538 567 8901', status: 'active', assignedBus: 'Mercedes Tourismo - 34 STU 303' },
    { id: 6, name: 'Hasan Korkmaz', age: 49, experience: 15, licenseType: 'D', phoneNumber: '0539 678 9012', status: 'vacation', assignedBus: null }
  ];

  // Filtreleme fonksiyonu
  const filteredDrivers = driversData.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (driver.assignedBus && driver.assignedBus.toLowerCase().includes(searchTerm.toLowerCase())) ||
      driver.phoneNumber.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Durum bilgisine göre görsel etiket döndürme
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="status-badge active">Aktif</span>;
      case 'inactive':
        return <span className="status-badge inactive">İnaktif</span>;
      case 'vacation':
        return <span className="status-badge vacation">İzinde</span>;
      default:
        return <span className="status-badge">Bilinmiyor</span>;
    }
  };

  return (
    <div className="drivers-container">
      <div className="page-header">
        <h1>Şoför Yönetimi</h1>
        <a href="#adddriver" className="add-button">+ Yeni Şoför Ekle</a>
      </div>

      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Şoför adı, telefon veya otobüs ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="status-filter">
          <label>Durum Filtresi:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tümü</option>
            <option value="active">Aktif</option>
            <option value="inactive">İnaktif</option>
            <option value="vacation">İzinde</option>
          </select>
        </div>
      </div>

      <div className="drivers-grid">
        {filteredDrivers.length > 0 ? (
          filteredDrivers.map(driver => (
            <div key={driver.id} className="driver-card">
              <div className="driver-header">
                <div className="driver-avatar">{driver.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="driver-name-status">
                  <h3>{driver.name}</h3>
                  {getStatusBadge(driver.status)}
                </div>
              </div>
              
              <div className="driver-details">
                <div className="detail-item">
                  <span className="detail-label">Yaş:</span>
                  <span className="detail-value">{driver.age}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tecrübe:</span>
                  <span className="detail-value">{driver.experience} Yıl</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ehliyet:</span>
                  <span className="detail-value">{driver.licenseType}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Telefon:</span>
                  <span className="detail-value">{driver.phoneNumber}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Atanan Otobüs:</span>
                  <span className="detail-value">
                    {driver.assignedBus ? driver.assignedBus : 'Atanmadı'}
                  </span>
                </div>
              </div>
              
              <div className="driver-actions">
                <button className="action-button edit">Düzenle</button>
                <button className="action-button assign">Otobüs Ata</button>
                <button className="action-button delete">Sil</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            Aramanıza uygun şoför bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default Drivers; 