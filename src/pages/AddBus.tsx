import React, { useState } from 'react';
import '../styles/AddBus.css';

const AddBus: React.FC = () => {
  const [formData, setFormData] = useState({
    plateNumber: '',
    brand: '',
    model: '',
    year: '',
    capacity: '',
    fuelType: 'diesel',
    status: 'active',
    lastMaintenance: '',
    nextMaintenance: '',
    photo: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.plateNumber) newErrors.plateNumber = 'Plaka numarası zorunludur';
    if (!formData.brand) newErrors.brand = 'Marka alanı zorunludur';
    if (!formData.model) newErrors.model = 'Model alanı zorunludur';
    if (!formData.year) newErrors.year = 'Yıl alanı zorunludur';
    if (!formData.capacity) newErrors.capacity = 'Kapasite alanı zorunludur';
    if (!formData.lastMaintenance) newErrors.lastMaintenance = 'Son bakım tarihi zorunludur';
    if (!formData.nextMaintenance) newErrors.nextMaintenance = 'Sonraki bakım tarihi zorunludur';
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Burada API'ye gönderme işlemi yapılacak
      console.log('Otobüs kaydediliyor:', formData);
      setIsSubmitted(true);
      
      // Form başarıyla gönderildikten sonra formu sıfırla
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          plateNumber: '',
          brand: '',
          model: '',
          year: '',
          capacity: '',
          fuelType: 'diesel',
          status: 'active',
          lastMaintenance: '',
          nextMaintenance: '',
          photo: ''
        });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="add-bus-container">
      <div className="page-header">
        <h1>Yeni Otobüs Ekle</h1>
        <p>Sisteme yeni bir otobüs eklemek için aşağıdaki formu doldurun.</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>✓ Otobüs başarıyla eklendi!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bus-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="plateNumber">Plaka Numarası*</label>
            <input
              type="text"
              id="plateNumber"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              placeholder="34 ABC 123"
              className={errors.plateNumber ? 'error' : ''}
            />
            {errors.plateNumber && <span className="error-text">{errors.plateNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Durum*</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Aktif</option>
              <option value="maintenance">Bakımda</option>
              <option value="outOfService">Servis Dışı</option>
              <option value="reserved">Rezerve</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="brand">Marka*</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={errors.brand ? 'error' : ''}
            />
            {errors.brand && <span className="error-text">{errors.brand}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="model">Model*</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className={errors.model ? 'error' : ''}
            />
            {errors.model && <span className="error-text">{errors.model}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Üretim Yılı*</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1990"
              max={new Date().getFullYear()}
              className={errors.year ? 'error' : ''}
            />
            {errors.year && <span className="error-text">{errors.year}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Yolcu Kapasitesi*</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              max="100"
              className={errors.capacity ? 'error' : ''}
            />
            {errors.capacity && <span className="error-text">{errors.capacity}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fuelType">Yakıt Türü*</label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="diesel">Dizel</option>
              <option value="gasoline">Benzin</option>
              <option value="electric">Elektrik</option>
              <option value="hybrid">Hibrit</option>
              <option value="cng">CNG</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="photo">Fotoğraf URL</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="lastMaintenance">Son Bakım Tarihi*</label>
            <input
              type="date"
              id="lastMaintenance"
              name="lastMaintenance"
              value={formData.lastMaintenance}
              onChange={handleChange}
              className={errors.lastMaintenance ? 'error' : ''}
            />
            {errors.lastMaintenance && <span className="error-text">{errors.lastMaintenance}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nextMaintenance">Sonraki Bakım Tarihi*</label>
            <input
              type="date"
              id="nextMaintenance"
              name="nextMaintenance"
              value={formData.nextMaintenance}
              onChange={handleChange}
              className={errors.nextMaintenance ? 'error' : ''}
            />
            {errors.nextMaintenance && <span className="error-text">{errors.nextMaintenance}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => window.history.back()}>
            İptal
          </button>
          <button type="submit" className="submit-button">
            Otobüs Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBus;