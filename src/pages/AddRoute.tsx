import React, { useState } from 'react';
import '../styles/AddRoute.css';

const AddRoute: React.FC = () => {
  const [formData, setFormData] = useState({
    routeNumber: '',
    routeName: '',
    startPoint: '',
    endPoint: '',
    distance: '',
    estimatedTime: '',
    stops: '',
    busCount: '',
    isActive: true,
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({
      ...formData,
      [name]: val
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.routeNumber) newErrors.routeNumber = 'Hat numarası zorunludur';
    if (!formData.routeName) newErrors.routeName = 'Hat adı zorunludur';
    if (!formData.startPoint) newErrors.startPoint = 'Başlangıç noktası zorunludur';
    if (!formData.endPoint) newErrors.endPoint = 'Bitiş noktası zorunludur';
    if (!formData.distance) newErrors.distance = 'Mesafe zorunludur';
    if (!formData.estimatedTime) newErrors.estimatedTime = 'Tahmini süre zorunludur';
    if (!formData.stops) newErrors.stops = 'Duraklar zorunludur';
    if (!formData.busCount) newErrors.busCount = 'Otobüs sayısı zorunludur';
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Burada API'ye gönderme işlemi yapılacak
      console.log('Hat kaydediliyor:', formData);
      setIsSubmitted(true);
      
      // Form başarıyla gönderildikten sonra formu sıfırla
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          routeNumber: '',
          routeName: '',
          startPoint: '',
          endPoint: '',
          distance: '',
          estimatedTime: '',
          stops: '',
          busCount: '',
          isActive: true,
          description: ''
        });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="add-route-container">
      <div className="page-header">
        <h1>Yeni Hat Ekle</h1>
        <p>Sisteme yeni bir otobüs hattı eklemek için aşağıdaki formu doldurun.</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>✓ Hat başarıyla eklendi!</p>
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
            <label htmlFor="routeName">Hat Adı*</label>
            <input
              type="text"
              id="routeName"
              name="routeName"
              value={formData.routeName}
              onChange={handleChange}
              className={errors.routeName ? 'error' : ''}
            />
            {errors.routeName && <span className="error-text">{errors.routeName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startPoint">Başlangıç Noktası*</label>
            <input
              type="text"
              id="startPoint"
              name="startPoint"
              value={formData.startPoint}
              onChange={handleChange}
              className={errors.startPoint ? 'error' : ''}
            />
            {errors.startPoint && <span className="error-text">{errors.startPoint}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endPoint">Bitiş Noktası*</label>
            <input
              type="text"
              id="endPoint"
              name="endPoint"
              value={formData.endPoint}
              onChange={handleChange}
              className={errors.endPoint ? 'error' : ''}
            />
            {errors.endPoint && <span className="error-text">{errors.endPoint}</span>}
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
            <label htmlFor="estimatedTime">Tahmini Süre (dakika)*</label>
            <input
              type="number"
              id="estimatedTime"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              min="0"
              className={errors.estimatedTime ? 'error' : ''}
            />
            {errors.estimatedTime && <span className="error-text">{errors.estimatedTime}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stops">Durak Sayısı*</label>
            <input
              type="number"
              id="stops"
              name="stops"
              value={formData.stops}
              onChange={handleChange}
              min="2"
              className={errors.stops ? 'error' : ''}
            />
            {errors.stops && <span className="error-text">{errors.stops}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="busCount">Otobüs Sayısı*</label>
            <input
              type="number"
              id="busCount"
              name="busCount"
              value={formData.busCount}
              onChange={handleChange}
              min="1"
              className={errors.busCount ? 'error' : ''}
            />
            {errors.busCount && <span className="error-text">{errors.busCount}</span>}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Hat Açıklaması</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          ></textarea>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive as boolean}
              onChange={handleChange}
            />
            <span className="checkbox-text">Hat Aktif</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => window.history.back()}>
            İptal
          </button>
          <button type="submit" className="submit-button">
            Hat Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoute; 