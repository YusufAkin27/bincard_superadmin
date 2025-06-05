import React, { useState, useEffect } from 'react';
import '../styles/AssignBus.css';

interface AssignBusProps {
  driverId?: string;
}

const AssignBus: React.FC<AssignBusProps> = ({ driverId }) => {
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [availableBuses, setAvailableBuses] = useState<any[]>([]);
  const [selectedBusId, setSelectedBusId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Sayfa yüklendiğinde şoför ve otobüs verilerini getir
  useEffect(() => {
    // Gerçek bir API'den veri çekilecek
    // Şimdilik örnek veri kullanıyoruz
    setTimeout(() => {
      const id = driverId || window.location.hash.replace('#assignbus/', '');
      
      // Örnek şoför verisi
      const driver = {
        id: '1',
        name: 'Mehmet Soylu',
        licenseType: 'D',
        experience: 8,
        status: 'active',
        currentBus: null
      };
      
      // Örnek otobüs verileri
      const buses = [
        { id: '1', plateNumber: '34 ABC 123', model: 'Mercedes Travego', status: 'active', currentDriver: null },
        { id: '2', plateNumber: '34 XYZ 456', model: 'MAN Fortuna', status: 'active', currentDriver: null },
        { id: '3', plateNumber: '34 DEF 789', model: 'Neoplan Cityliner', status: 'active', currentDriver: null },
        { id: '4', plateNumber: '34 KLM 101', model: 'Setra S419', status: 'maintenance', currentDriver: null },
        { id: '5', plateNumber: '34 OPR 202', model: 'Temsa Maraton', status: 'active', currentDriver: 'Ahmet Yılmaz' },
      ];
      
      // Sadece kullanılabilir otobüsleri filtrele (bakımda olmayanlar ve şoförü olmayanlar)
      const available = buses.filter(bus => 
        bus.status === 'active' && bus.currentDriver === null
      );
      
      setSelectedDriver(driver);
      setAvailableBuses(available);
      setLoading(false);
    }, 500);
  }, [driverId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBusId) {
      setError('Lütfen bir otobüs seçin');
      return;
    }
    
    // Burada API'ye gönderme işlemi yapılacak
    console.log('Otobüs atanıyor:', { 
      driverId: selectedDriver.id, 
      busId: selectedBusId 
    });
    
    setIsSubmitted(true);
    setError('');
    
    // Form başarıyla gönderildikten sonra bildirim göster
    setTimeout(() => {
      setIsSubmitted(false);
      window.history.back(); // Şoförler sayfasına geri dön
    }, 2000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Bilgiler yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="assign-bus-container">
      <div className="page-header">
        <h1>Otobüs Ata</h1>
        <p>Şoföre atamak için bir otobüs seçin.</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>✓ Otobüs başarıyla atandı!</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="assign-form-container">
        <div className="driver-info">
          <h2>Şoför Bilgileri</h2>
          <div className="info-card">
            <div className="driver-avatar">
              {selectedDriver.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="driver-details">
              <h3>{selectedDriver.name}</h3>
              <p><strong>Ehliyet Sınıfı:</strong> {selectedDriver.licenseType}</p>
              <p><strong>Deneyim:</strong> {selectedDriver.experience} yıl</p>
              <p><strong>Durum:</strong> {selectedDriver.status === 'active' ? 'Aktif' : 'İnaktif'}</p>
              <p><strong>Mevcut Otobüs:</strong> {selectedDriver.currentBus || 'Atanmamış'}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="assign-form">
          <h2>Otobüs Seç</h2>
          
          {availableBuses.length > 0 ? (
            <div className="bus-selection">
              {availableBuses.map(bus => (
                <div 
                  key={bus.id} 
                  className={`bus-option ${selectedBusId === bus.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBusId(bus.id)}
                >
                  <div className="bus-icon">🚌</div>
                  <div className="bus-details">
                    <h4>{bus.model}</h4>
                    <p className="plate-number">{bus.plateNumber}</p>
                  </div>
                  <div className="selection-indicator">
                    {selectedBusId === bus.id && <span>✓</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-buses-message">
              <p>Atanabilecek uygun otobüs bulunmamaktadır.</p>
              <p>Lütfen daha sonra tekrar deneyin veya yeni bir otobüs ekleyin.</p>
            </div>
          )}
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => window.history.back()}>
              İptal
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={!selectedBusId || availableBuses.length === 0}
            >
              Otobüs Ata
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignBus;