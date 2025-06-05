import React, { useState } from 'react';
import '../styles/AddAdmin.css';

const AddAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    role: 'admin',
    password: '',
    confirmPassword: '',
    profileImage: ''
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
    
    if (!formData.username) newErrors.username = 'Kullanıcı adı zorunludur';
    if (!formData.name) newErrors.name = 'İsim alanı zorunludur';
    if (!formData.surname) newErrors.surname = 'Soyisim alanı zorunludur';
    if (!formData.email) newErrors.email = 'E-posta alanı zorunludur';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    
    if (!formData.password) newErrors.password = 'Şifre alanı zorunludur';
    else if (formData.password.length < 6) newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Şifre tekrarı zorunludur';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Burada API'ye gönderme işlemi yapılacak
      console.log('Yönetici ekleniyor:', formData);
      setIsSubmitted(true);
      
      // Form başarıyla gönderildikten sonra formu sıfırla
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          username: '',
          name: '',
          surname: '',
          email: '',
          phoneNumber: '',
          role: 'admin',
          password: '',
          confirmPassword: '',
          profileImage: ''
        });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="add-admin-container">
      <div className="page-header">
        <h1>Yönetici Ekle</h1>
        <p>Sisteme yeni bir yönetici eklemek için aşağıdaki formu doldurun.</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>✓ Yönetici başarıyla eklendi!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-section">
          <h3>Temel Bilgiler</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Kullanıcı Adı*</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-posta*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

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
              <label htmlFor="phoneNumber">Telefon Numarası</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="05XX XXX XX XX"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Rol*</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="admin">Yönetici</option>
                <option value="superadmin">Süper Yönetici</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Güvenlik</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Şifre*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Şifre Tekrarı*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Profil</h3>
          
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="profileImage">Profil Resmi URL</label>
              <input
                type="text"
                id="profileImage"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/profile.jpg"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => window.history.back()}>
            İptal
          </button>
          <button type="submit" className="submit-button">
            Yönetici Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin; 