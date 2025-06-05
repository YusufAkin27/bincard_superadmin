import React, { useState } from 'react';
import '../styles/Routes.css';

interface BusRoute {
  id: number;
  routeNumber: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  duration: number;
  assignedBuses: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdated: string;
}

const Routes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Örnek otobüs hatları verileri
  const routesData: BusRoute[] = [
    { id: 1, routeNumber: '101', startLocation: 'Kadıköy', endLocation: 'Taksim', distance: 12.5, duration: 45, assignedBuses: 8, status: 'active', lastUpdated: '15.06.2025' },
    { id: 2, routeNumber: '202', startLocation: 'Üsküdar', endLocation: 'Beşiktaş', distance: 10.2, duration: 35, assignedBuses: 6, status: 'active', lastUpdated: '14.06.2025' },
    { id: 3, routeNumber: '303', startLocation: 'Bakırköy', endLocation: 'Beylikdüzü', distance: 22.7, duration: 60, assignedBuses: 10, status: 'active', lastUpdated: '13.06.2025' },
    { id: 4, routeNumber: '404', startLocation: 'Eminönü', endLocation: 'Eyüp', distance: 8.3, duration: 30, assignedBuses: 5, status: 'maintenance', lastUpdated: '10.06.2025' },
    { id: 5, routeNumber: '505', startLocation: 'Beyoğlu', endLocation: 'Şişli', distance: 5.7, duration: 25, assignedBuses: 7, status: 'active', lastUpdated: '12.06.2025' },
    { id: 6, routeNumber: '606', startLocation: 'Pendik', endLocation: 'Kartal', distance: 7.8, duration: 20, assignedBuses: 4, status: 'inactive', lastUpdated: '08.06.2025' }
  ];

  // Filtreleme fonksiyonu
  const filteredRoutes = routesData.filter(route => {
    const matchesSearch = 
      route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
      route.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.endLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || route.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Durum bilgisine göre görsel etiket döndürme
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="status-badge active">Aktif</span>;
      case 'inactive':
        return <span className="status-badge inactive">Devre Dışı</span>;
      case 'maintenance':
        return <span className="status-badge maintenance">Bakımda</span>;
      default:
        return <span className="status-badge">Bilinmiyor</span>;
    }
  };

  return (
    <div className="routes-container">
      <div className="page-header">
        <h1>Hat Yönetimi</h1>
        <a href="#addroute" className="add-button">+ Yeni Hat Ekle</a>
      </div>

      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Hat numarası veya durak ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="status-filter">
          <label>Durum Filtresi:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tümü</option>
            <option value="active">Aktif</option>
            <option value="inactive">Devre Dışı</option>
            <option value="maintenance">Bakımda</option>
          </select>
        </div>
      </div>

      <div className="routes-grid">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map(route => (
            <div key={route.id} className="route-card">
              <div className="route-header">
                <div className="route-number">{route.routeNumber}</div>
                <div>{getStatusBadge(route.status)}</div>
              </div>
              
              <div className="route-details">
                <div className="route-path">
                  <div className="route-start">{route.startLocation}</div>
                  <div className="route-line">
                    <span className="route-arrow">→</span>
                  </div>
                  <div className="route-end">{route.endLocation}</div>
                </div>
                
                <div className="route-info">
                  <div className="info-item">
                    <span className="info-label">Mesafe:</span>
                    <span className="info-value">{route.distance} km</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Süre:</span>
                    <span className="info-value">{route.duration} dk</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Atanan Otobüs:</span>
                    <span className="info-value">{route.assignedBuses}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Son Güncelleme:</span>
                    <span className="info-value">{route.lastUpdated}</span>
                  </div>
                </div>
              </div>
              
              <div className="route-actions">
                <button className="action-button view">Detaylar</button>
                <button className="action-button edit">Düzenle</button>
                <button className="action-button delete">Sil</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            Aramanıza uygun hat bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default Routes; 