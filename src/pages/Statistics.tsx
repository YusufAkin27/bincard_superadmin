import React from 'react';
import '../styles/Statistics.css';

const Statistics: React.FC = () => {
  // Örnek istatistik verileri
  const monthlyData = [
    { month: 'Ocak', passengers: 14500, trips: 320, revenue: 450000 },
    { month: 'Şubat', passengers: 15200, trips: 340, revenue: 475000 },
    { month: 'Mart', passengers: 16800, trips: 380, revenue: 510000 },
    { month: 'Nisan', passengers: 18200, trips: 420, revenue: 545000 },
    { month: 'Mayıs', passengers: 19500, trips: 450, revenue: 580000 },
    { month: 'Haziran', passengers: 22000, trips: 510, revenue: 650000 }
  ];

  const busUtilization = [
    { model: 'Mercedes Travego', trips: 120, utilization: 85 },
    { model: 'MAN Fortuna', trips: 110, utilization: 82 },
    { model: 'Neoplan Cityliner', trips: 90, utilization: 75 },
    { model: 'Setra S419', trips: 130, utilization: 88 },
    { model: 'Temsa Maraton', trips: 80, utilization: 68 }
  ];

  const driverPerformance = [
    { name: 'Mehmet Soylu', trips: 42, rating: 4.8 },
    { name: 'Ahmet Yılmaz', trips: 38, rating: 4.9 },
    { name: 'Fatma Kaya', trips: 25, rating: 4.6 },
    { name: 'Ali Demir', trips: 35, rating: 4.7 },
    { name: 'Ayşe Demir', trips: 40, rating: 4.5 }
  ];

  // Toplam değerlerin hesaplanması
  const totalPassengers = monthlyData.reduce((sum, item) => sum + item.passengers, 0);
  const totalTrips = monthlyData.reduce((sum, item) => sum + item.trips, 0);
  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const averagePassengersPerTrip = Math.round(totalPassengers / totalTrips);

  return (
    <div className="statistics-container">
      <div className="page-header">
        <h1>İstatistikler ve Raporlar</h1>
        <div className="header-actions">
          <button className="report-button">PDF Raporu İndir</button>
          <select className="period-select">
            <option value="6">Son 6 Ay</option>
            <option value="12">Son 12 Ay</option>
            <option value="24">Son 24 Ay</option>
          </select>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon passengers">👥</div>
          <div className="summary-info">
            <h3>Toplam Yolcu</h3>
            <h2>{totalPassengers.toLocaleString()}</h2>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon trips">🚌</div>
          <div className="summary-info">
            <h3>Toplam Sefer</h3>
            <h2>{totalTrips.toLocaleString()}</h2>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon revenue">💰</div>
          <div className="summary-info">
            <h3>Toplam Gelir</h3>
            <h2>{totalRevenue.toLocaleString()} ₺</h2>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon average">📊</div>
          <div className="summary-info">
            <h3>Ortalama Yolcu/Sefer</h3>
            <h2>{averagePassengersPerTrip}</h2>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card monthly-trend">
          <h3>Aylık Yolcu ve Sefer Trendi</h3>
          <div className="table-responsive">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Ay</th>
                  <th>Yolcu Sayısı</th>
                  <th>Sefer Sayısı</th>
                  <th>Gelir (₺)</th>
                  <th>Ort. Yolcu/Sefer</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((month, idx) => (
                  <tr key={idx}>
                    <td>{month.month}</td>
                    <td>{month.passengers.toLocaleString()}</td>
                    <td>{month.trips}</td>
                    <td>{month.revenue.toLocaleString()} ₺</td>
                    <td>{Math.round(month.passengers / month.trips)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stats-card bus-utilization">
          <h3>Otobüs Kullanım Oranları</h3>
          <div className="utilization-bars">
            {busUtilization.map((bus, idx) => (
              <div className="util-item" key={idx}>
                <div className="util-info">
                  <span className="util-label">{bus.model}</span>
                  <span className="util-value">{bus.utilization}%</span>
                </div>
                <div className="util-bar-bg">
                  <div 
                    className="util-bar-fill" 
                    style={{ width: `${bus.utilization}%`, backgroundColor: getUtilizationColor(bus.utilization) }}
                  ></div>
                </div>
                <div className="util-trips">{bus.trips} Sefer</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card driver-performance">
          <h3>Şoför Performansı</h3>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Şoför</th>
                <th>Sefer Sayısı</th>
                <th>Ortalama Puan</th>
                <th>Performans</th>
              </tr>
            </thead>
            <tbody>
              {driverPerformance.map((driver, idx) => (
                <tr key={idx}>
                  <td>{driver.name}</td>
                  <td>{driver.trips}</td>
                  <td>{driver.rating} / 5.0</td>
                  <td>
                    <div className="star-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(driver.rating) ? "star filled" : "star"}>★</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Kullanım oranına göre renk döndüren fonksiyon
const getUtilizationColor = (utilization: number): string => {
  if (utilization >= 85) return '#4caf50';  // Yeşil
  if (utilization >= 70) return '#2196f3';  // Mavi
  if (utilization >= 50) return '#ff9800';  // Turuncu
  return '#f44336';  // Kırmızı
};

export default Statistics; 