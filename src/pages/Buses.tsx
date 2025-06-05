import React, { useState } from 'react';
import '../styles/Buses.css';

interface Bus {
  id: number;
  model: string;
  plate: string;
  capacity: number;
  year: number;
  status: 'active' | 'maintenance' | 'inactive';
  lastMaintenance: string;
  driver: string;
}

const Buses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Örnek otobüs verileri
  const busesData: Bus[] = [
    { id: 1, model: 'Mercedes Travego', plate: '34 ABC 123', capacity: 48, year: 2018, status: 'active', lastMaintenance: '15.05.2025', driver: 'Mehmet Soylu' },
    { id: 2, model: 'MAN Fortuna', plate: '34 XYZ 456', capacity: 52, year: 2020, status: 'active', lastMaintenance: '01.06.2025', driver: 'Ahmet Yılmaz' },
    { id: 3, model: 'Neoplan Cityliner', plate: '34 DEF 789', capacity: 46, year: 2019, status: 'maintenance', lastMaintenance: '10.06.2025', driver: 'Henüz Atanmadı' },
    { id: 4, model: 'Setra S419', plate: '34 KLM 101', capacity: 50, year: 2021, status: 'active', lastMaintenance: '20.05.2025', driver: 'Fatma Kaya' },
    { id: 5, model: 'Temsa Maraton', plate: '34 OPR 202', capacity: 44, year: 2017, status: 'inactive', lastMaintenance: '05.04.2025', driver: 'Henüz Atanmadı' },
    { id: 6, model: 'Mercedes Tourismo', plate: '34 STU 303', capacity: 48, year: 2022, status: 'active', lastMaintenance: '25.05.2025', driver: 'Ayşe Demir' }
  ];

  // Filtreleme fonksiyonu
  const filteredBuses = busesData.filter(bus => {
    const matchesSearch = 
      bus.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
      bus.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || bus.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Durum bilgisine göre görsel etiket döndürme
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="status-badge active">Aktif</span>;
      case 'maintenance':
        return <span className="status-badge maintenance">Bakımda</span>;
      case 'inactive':
        return <span className="status-badge inactive">Devre Dışı</span>;
      default:
        return <span className="status-badge">Bilinmiyor</span>;
    }
  };

  return (
    <div className="buses-container">
      <div className="page-header">
        <h1>Otobüs Yönetimi</h1>
        <a href="#addbus" className="add-button">+ Yeni Otobüs Ekle</a>
      </div>

      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Otobüs adı, plaka veya şoför ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="status-filter">
          <label>Durum Filtresi:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tümü</option>
            <option value="active">Aktif</option>
            <option value="maintenance">Bakımda</option>
            <option value="inactive">Devre Dışı</option>
          </select>
        </div>
      </div>

      <div className="buses-table-container">
        <table className="buses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Plaka</th>
              <th>Kapasite</th>
              <th>Yıl</th>
              <th>Durum</th>
              <th>Son Bakım</th>
              <th>Şoför</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuses.length > 0 ? (
              filteredBuses.map(bus => (
                <tr key={bus.id}>
                  <td>{bus.id}</td>
                  <td>{bus.model}</td>
                  <td>{bus.plate}</td>
                  <td>{bus.capacity} Kişi</td>
                  <td>{bus.year}</td>
                  <td>{getStatusBadge(bus.status)}</td>
                  <td>{bus.lastMaintenance}</td>
                  <td>{bus.driver}</td>
                  <td className="actions-cell">
                    <button className="action-button edit">Düzenle</button>
                    <button className="action-button delete">Sil</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="no-results">
                  Aramanıza uygun otobüs bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buses; 