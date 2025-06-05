import React, { useState, useEffect } from 'react';
import '../styles/BusTracking.css';

interface BusData {
  id: string;
  plateNumber: string;
  routeName: string;
  driverName: string;
  status: string;
  lastLocation: {
    latitude: number;
    longitude: number;
    locationName: string;
    timestamp: string;
  };
  speed: number;
  fuelLevel: number;
  passengerCount: number;
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  nextStop: string;
  estimatedArrival: string;
}

const BusTracking: React.FC = () => {
  const [buses, setBuses] = useState<BusData[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sayfa yüklendiğinde otobüs verilerini getir
  useEffect(() => {
    // Gerçek bir API'den veri çekilecek
    // Şimdilik örnek veri kullanıyoruz
    setTimeout(() => {
      const mockBusData: BusData[] = [
        {
          id: '1',
          plateNumber: '34 ABC 123',
          routeName: 'Kadıköy - Taksim',
          driverName: 'Mehmet Soylu',
          status: 'active',
          lastLocation: {
            latitude: 41.0082,
            longitude: 28.9784,
            locationName: 'Beşiktaş',
            timestamp: '2023-06-15T14:32:00'
          },
          speed: 42,
          fuelLevel: 75,
          passengerCount: 28,
          revenue: {
            daily: 3250.50,
            weekly: 22450.75,
            monthly: 96500.00
          },
          nextStop: 'Kabataş',
          estimatedArrival: '14:45'
        },
        {
          id: '2',
          plateNumber: '34 XYZ 456',
          routeName: 'Üsküdar - Mecidiyeköy',
          driverName: 'Ali Yılmaz',
          status: 'active',
          lastLocation: {
            latitude: 41.0266,
            longitude: 29.0150,
            locationName: 'Altunizade',
            timestamp: '2023-06-15T14:30:00'
          },
          speed: 35,
          fuelLevel: 60,
          passengerCount: 32,
          revenue: {
            daily: 2980.00,
            weekly: 20150.25,
            monthly: 87300.50
          },
          nextStop: 'Acıbadem',
          estimatedArrival: '14:40'
        },
        {
          id: '3',
          plateNumber: '34 DEF 789',
          routeName: 'Bakırköy - Beylikdüzü',
          driverName: 'Ahmet Kaya',
          status: 'maintenance',
          lastLocation: {
            latitude: 40.9862,
            longitude: 28.8340,
            locationName: 'Avcılar',
            timestamp: '2023-06-15T13:45:00'
          },
          speed: 0,
          fuelLevel: 45,
          passengerCount: 0,
          revenue: {
            daily: 1850.75,
            weekly: 15200.00,
            monthly: 65800.25
          },
          nextStop: 'Servis dışı',
          estimatedArrival: 'N/A'
        }
      ];
      
      setBuses(mockBusData);
      if (mockBusData.length > 0) {
        setSelectedBus(mockBusData[0]);
      }
      setLoading(false);
    }, 1000);
  }, []);

  // Filtreleme işlemi
  const filteredBuses = buses.filter(bus => {
    const matchesFilter = filter === 'all' || bus.status === filter;
    const matchesSearch = bus.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bus.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Otobüs seçme işlemi
  const handleSelectBus = (bus: BusData) => {
    setSelectedBus(bus);
  };

  // Tarih formatını düzenle
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Otobüs verileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bus-tracking-container">
      <div className="page-header">
        <h1>Otobüs Takip ve İzleme</h1>
        <p>Filonuzdaki otobüslerin canlı durumunu ve performansını izleyin.</p>
      </div>

      <div className="filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Plaka, hat veya şoför ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tümü
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Aktif
          </button>
          <button 
            className={filter === 'maintenance' ? 'active' : ''}
            onClick={() => setFilter('maintenance')}
          >
            Bakımda
          </button>
        </div>
      </div>

      <div className="bus-tracking-content">
        <div className="bus-list">
          <h2>Otobüsler ({filteredBuses.length})</h2>
          
          {filteredBuses.length === 0 ? (
            <div className="no-buses-message">
              <p>Arama kriterlerinize uygun otobüs bulunamadı.</p>
            </div>
          ) : (
            filteredBuses.map(bus => (
              <div 
                key={bus.id} 
                className={`bus-item ${selectedBus?.id === bus.id ? 'selected' : ''} ${bus.status === 'maintenance' ? 'maintenance' : ''}`}
                onClick={() => handleSelectBus(bus)}
              >
                <div className="bus-item-header">
                  <h3>{bus.plateNumber}</h3>
                  <span className={`status-badge ${bus.status}`}>
                    {bus.status === 'active' ? 'Aktif' : 'Bakımda'}
                  </span>
                </div>
                <div className="bus-item-details">
                  <p><strong>Hat:</strong> {bus.routeName}</p>
                  <p><strong>Şoför:</strong> {bus.driverName}</p>
                  <p><strong>Konum:</strong> {bus.lastLocation.locationName}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bus-details">
          {selectedBus ? (
            <>
              <div className="bus-details-header">
                <h2>{selectedBus.plateNumber}</h2>
                <span className={`status-badge ${selectedBus.status}`}>
                  {selectedBus.status === 'active' ? 'Aktif' : 'Bakımda'}
                </span>
              </div>

              <div className="bus-details-content">
                <div className="bus-info-section">
                  <h3>Genel Bilgiler</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Hat</span>
                      <span className="info-value">{selectedBus.routeName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Şoför</span>
                      <span className="info-value">{selectedBus.driverName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Son Konum</span>
                      <span className="info-value">{selectedBus.lastLocation.locationName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Son Güncelleme</span>
                      <span className="info-value">{formatDate(selectedBus.lastLocation.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div className="bus-info-section">
                  <h3>Durum Bilgileri</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Hız</span>
                      <span className="info-value">{selectedBus.speed} km/s</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Yakıt Seviyesi</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${selectedBus.fuelLevel}%` }}
                        ></div>
                        <span className="progress-text">{selectedBus.fuelLevel}%</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Yolcu Sayısı</span>
                      <span className="info-value">{selectedBus.passengerCount}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Sonraki Durak</span>
                      <span className="info-value">{selectedBus.nextStop}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Tahmini Varış</span>
                      <span className="info-value">{selectedBus.estimatedArrival}</span>
                    </div>
                  </div>
                </div>

                <div className="bus-info-section">
                  <h3>Gelir Bilgileri</h3>
                  <div className="revenue-grid">
                    <div className="revenue-item">
                      <span className="revenue-label">Günlük Gelir</span>
                      <span className="revenue-value">{selectedBus.revenue.daily.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="revenue-item">
                      <span className="revenue-label">Haftalık Gelir</span>
                      <span className="revenue-value">{selectedBus.revenue.weekly.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="revenue-item">
                      <span className="revenue-label">Aylık Gelir</span>
                      <span className="revenue-value">{selectedBus.revenue.monthly.toLocaleString('tr-TR')} ₺</span>
                    </div>
                  </div>
                </div>

                <div className="map-placeholder">
                  <h3>Harita Görünümü</h3>
                  <div className="map-container">
                    <div className="map-overlay">
                      <p>Harita burada görüntülenecek</p>
                      <p>Konum: {selectedBus.lastLocation.latitude}, {selectedBus.lastLocation.longitude}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Detayları görüntülemek için bir otobüs seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusTracking; 