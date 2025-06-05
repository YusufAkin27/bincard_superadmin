import React from 'react';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  // İstatistikler için örnek veriler
  const stats = [
    { title: 'Toplam Otobüs', value: '32', icon: '🚌', color: '#4caf50' },
    { title: 'Aktif Şoför', value: '24', icon: '👨‍✈️', color: '#2196f3' },
    { title: 'Bugünkü Sefer', value: '128', icon: '🛣️', color: '#ff9800' },
    { title: 'Toplam Yolcu', value: '1,248', icon: '👥', color: '#9c27b0' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Süper Admin Paneli</h1>
        <p>Otobüs ve şoför yönetim sistemine hoş geldiniz</p>
      </div>

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index} style={{ borderTop: `4px solid ${stat.color}` }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
              <span>{stat.icon}</span>
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <h2>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Son Eklenen Otobüsler</h2>
            <a href="/buses" className="view-all">Tümünü Görüntüle →</a>
          </div>
          <div className="bus-list">
            <div className="bus-card">
              <div className="bus-info">
                <h3>Mercedes Travego</h3>
                <p>Plaka: 34 ABC 123</p>
                <p>Kapasite: 48 Kişi</p>
              </div>
              <div className="bus-status active">Aktif</div>
            </div>
            <div className="bus-card">
              <div className="bus-info">
                <h3>MAN Fortuna</h3>
                <p>Plaka: 34 XYZ 456</p>
                <p>Kapasite: 52 Kişi</p>
              </div>
              <div className="bus-status active">Aktif</div>
            </div>
            <div className="bus-card">
              <div className="bus-info">
                <h3>Neoplan Cityliner</h3>
                <p>Plaka: 34 DEF 789</p>
                <p>Kapasite: 46 Kişi</p>
              </div>
              <div className="bus-status maintenance">Bakımda</div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Son Eklenen Şoförler</h2>
            <a href="/drivers" className="view-all">Tümünü Görüntüle →</a>
          </div>
          <div className="driver-list">
            <div className="driver-card">
              <div className="driver-avatar">MS</div>
              <div className="driver-info">
                <h3>Mehmet Soylu</h3>
                <p>Tecrübe: 8 Yıl</p>
              </div>
              <div className="driver-status active">Aktif</div>
            </div>
            <div className="driver-card">
              <div className="driver-avatar">AY</div>
              <div className="driver-info">
                <h3>Ahmet Yılmaz</h3>
                <p>Tecrübe: 12 Yıl</p>
              </div>
              <div className="driver-status active">Aktif</div>
            </div>
            <div className="driver-card">
              <div className="driver-avatar">FK</div>
              <div className="driver-info">
                <h3>Fatma Kaya</h3>
                <p>Tecrübe: 5 Yıl</p>
              </div>
              <div className="driver-status inactive">İzinde</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 