import React, { useState } from 'react';
import '../styles/AddDriver.css';

const AddDriver: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    licenseNumber: '',
    licenseType: 'D',
    birthDate: '',
    startDate: '',
    address: '',
    experience: '',
    photo: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'İsim alanı zorunludur';
    if (!formData.surname) newErrors.surname = 'Soyisim alanı zorunludur';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Telefon numarası zorunludur';
    if (!formData.licenseNumber) newErrors.licenseNumber = 'Ehliyet numarası zorunludur';
    if (!formData.birthDate) newErrors.birthDate = 'Doğum tarihi zorunludur';
    if (!formData.startDate) newErrors.startDate = 'İşe başlama tarihi zorunludur';
    if (!formData.address) newErrors.address = 'Adres alanı zorunludur';
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Burada API'ye gönderme işlemi yapılacak
      console.log('Şoför kaydediliyor:', formData);
      setIsSubmitted(true);
      
      // Form başarıyla gönderildikten sonra formu sıfırla
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          surname: '',
          phoneNumber: '',
          licenseNumber: '',
          licenseType: 'D',
          birthDate: '',
          startDate: '',
          address: '',
          experience: '',
          photo: ''
        });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="add-driver-container">
      <div className="page-header">
        <h1>Yeni Şoför Ekle</h1>
        <p>Sisteme yeni bir şoför eklemek için aşağıdaki formu doldurun.</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>✓ Şoför başarıyla eklendi!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="driver-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">İsim*</label>
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

          <div className="form-group">
            <label htmlFor="surname">Soyisim*</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className={errors.surname ? 'error' : ''}
            />
            {errors.surname && <span className="error-text">{errors.surname}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phoneNumber">Telefon Numarası*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="05XX XXX XX XX"
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="licenseNumber">Ehliyet Numarası*</label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className={errors.licenseNumber ? 'error' : ''}
            />
            {errors.licenseNumber && <span className="error-text">{errors.licenseNumber}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="licenseType">Ehliyet Sınıfı*</label>
            <select
              id="licenseType"
              name="licenseType"
              value={formData.licenseType}
              onChange={handleChange}
            >
              <option value="B">B Sınıfı</option>
              <option value="C">C Sınıfı</option>
              <option value="D">D Sınıfı</option>
              <option value="E">E Sınıfı</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Deneyim (Yıl)</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              max="50"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="birthDate">Doğum Tarihi*</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={errors.birthDate ? 'error' : ''}
            />
            {errors.birthDate && <span className="error-text">{errors.birthDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="startDate">İşe Başlama Tarihi*</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={errors.startDate ? 'error' : ''}
            />
            {errors.startDate && <span className="error-text">{errors.startDate}</span>}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="address">Adres*</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={errors.address ? 'error' : ''}
          ></textarea>
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>

        <div className="form-group full-width">
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

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => window.history.back()}>
            İptal
          </button>
          <button type="submit" className="submit-button">
            Şoför Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver; 