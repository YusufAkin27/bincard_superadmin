import React, { useState, useEffect } from 'react';
import '../styles/EditRoute.css';

interface RouteProps {
  id?: string;
}

const EditRoute: React.FC<RouteProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    routeNumber: '',
    name: '',
    startLocation: '',
    endLocation: '',
    distance: '',
    duration: '',
    stops: [''],
    status: 'active',
    fareAmount: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sayfa yüklendiğinde hat verilerini getir
  useEffect(() => {
    // Gerçek bir API'den veri çekilecek
    // Şimdilik örnek veri kullanıyoruz
    setTimeout(() => {
      const routeId = id || window.location.hash.replace('#editroute/', '');
      
      // Örnek veri
      const routeData = {
        routeNumber: '101',
        name: 'Kadıköy - Taksim',
        startLocation: 'Kadıköy',
        endLocation: 'Taksim',
        distance: '12',
        duration: '45',
        stops: ['Üsküdar', 'Beşiktaş', 'Kabataş'],
        status: 'active',
        fareAmount: '15.50'
      };
      
      setFormData(routeData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStopChange = (index: number, value: string) => {
    const updatedStops = [...formData.stops];
    updatedStops[index] = value;
    setFormData({
      ...formData,
      stops: updatedStops
    });
  };

  const addStop = () => {
    setFormData({
      ...formData,
      stops: [...formData.stops, '']
    });
  };

  const removeStop = (index: number) => {
    const updatedStops = [...formData.stops];
    updatedStops.splice(index, 1);
    setFormData({
      ...formData,
      stops: updatedStops
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.routeNumber) newErrors.routeNumber = 'Hat numarası zorunludur';
    if (!formData.name) newErrors.name = 'Hat adı zorunludur';
    if (!formData.startLocation) newErrors.startLocation = 'Başlangıç konumu zorunludur';
    if (!formData.endLocation) newErrors.endLocation = 'Bitiş konumu zorunludur';
    if (!formData.distance) newErrors.distance = 'Mesafe zorunludur';
    if (!formData.duration) newErrors.duration = 'Süre zorunludur';
    if (!formData.fareAmount) newErrors.fareAmount = 'Ücret zorunludur';
    
    // Durakların boş olup olmadığını kontrol et
    const emptyStopIndex = formData.stops.findIndex(stop => !stop.trim());
    if (emptyStopIndex !== -1) {
      newErrors[`stop-${emptyStopIndex}`] = 'Durak adı boş olamaz';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Burada API'ye gönderme işlemi yapılacak
      console.log('Hat güncelleniyor:', formData);
      setIsSubmitted(true);
      
      // Form başarıyla gönderildikten sonra bildirim göster
      setTimeout(() => {
        setIsSubmitted(false);
        window.history.back(); // Hatlar sayfasına geri dön
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Hat bilgileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="edit-route-container">
      <div className="page-header">
        <h1>Hat Düzenle</h1>
        <p>Hat bilgilerini güncellemek için aşağıdaki formu kullanın.</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>✓ Hat bilgileri başarıyla güncellendi!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="route-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="routeNumber">Hat Numarası*</label>
            <input
              type="text"
              id="routeNumber"
              name="routeNumber"
              value={formData.routeNumber}
              onChange={handleChange}
              className={errors.routeNumber ? 'error' : ''}
            />
            {errors.routeNumber && <span className="error-text">{errors.routeNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Hat Adı*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startLocation">Başlangıç Konumu*</label>
            <input
              type="text"
              id="startLocation"
              name="startLocation"
              value={formData.startLocation}
              onChange={handleChange}
              className={errors.startLocation ? 'error' : ''}
            />
            {errors.startLocation && <span className="error-text">{errors.startLocation}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endLocation">Bitiş Konumu*</label>
            <input
              type="text"
              id="endLocation"
              name="endLocation"
              value={formData.endLocation}
              onChange={handleChange}
              className={errors.endLocation ? 'error' : ''}
            />
            {errors.endLocation && <span className="error-text">{errors.endLocation}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="distance">Mesafe (km)*</label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              min="0"
              step="0.1"
              className={errors.distance ? 'error' : ''}
            />
            {errors.distance && <span className="error-text">{errors.distance}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="duration">Süre (dakika)*</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="0"
              className={errors.duration ? 'error' : ''}
            />
            {errors.duration && <span className="error-text">{errors.duration}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Durum*</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Aktif</option>
              <option value="inactive">İnaktif</option>
              <option value="maintenance">Bakımda</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fareAmount">Ücret (TL)*</label>
            <input
              type="number"
              id="fareAmount"
              name="fareAmount"
              value={formData.fareAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={errors.fareAmount ? 'error' : ''}
            />
            {errors.fareAmount && <span className="error-text">{errors.fareAmount}</span>}
          </div>
        </div>

        <div className="stops-section">
          <div className="stops-header">
            <h3>Duraklar</h3>
            <button type="button" className="add-stop-button" onClick={addStop}>
              + Durak Ekle
            </button>
          </div>

          {formData.stops.map((stop, index) => (
            <div key={index} className="stop-item">
              <div className="stop-number">{index + 1}</div>
              <div className="stop-input-container">
                <input
                  type="text"
                  value={stop}
                  onChange={(e) => handleStopChange(index, e.target.value)}
                  placeholder="Durak adı"
                  className={errors[`stop-${index}`] ? 'error' : ''}
                />
                {errors[`stop-${index}`] && <span className="error-text">{errors[`stop-${index}`]}</span>}
              </div>
              {formData.stops.length > 1 && (
                <button 
                  type="button" 
                  className="remove-stop-button"
                  onClick={() => removeStop(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => window.history.back()}>
            İptal
          </button>
          <button type="submit" className="submit-button">
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoute; 