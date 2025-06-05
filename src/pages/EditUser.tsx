import React, { useState, useEffect } from 'react';
import '../styles/EditUser.css';

interface UserProps {
  id?: string;
}

const EditUser: React.FC<UserProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    role: 'user',
    status: 'active',
    profileImage: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isNewPassword, setIsNewPassword] = useState(false);

  // Sayfa yüklendiğinde kullanıcı verilerini getir
  useEffect(() => {
    // Gerçek bir API'den veri çekilecek
    // Şimdilik örnek veri kullanıyoruz
    setTimeout(() => {
      const userId = id || window.location.hash.replace('#edituser/', '');
      
      // Örnek veri
      const userData = {
        username: 'admin123',
        name: 'Ahmet',
        surname: 'Yılmaz',
        email: 'ahmet@example.com',
        phoneNumber: '0532 123 4567',
        role: 'admin',
        status: 'active',
        profileImage: 'https://example.com/profile.jpg',
        password: '',
        confirmPassword: ''
      };
      
      setFormData(userData);
      setLoading(false);
    }, 500);
  }, [id]);

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
    
    if (isNewPassword) {
      if (!formData.password) newErrors.password = 'Şifre alanı zorunludur';
      else if (formData.password.length < 6) newErrors.password = 'Şifre en az 6 karakter olmalıdır';
      
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Şifre tekrarı zorunludur';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Burada API'ye gönderme işlemi yapılacak
      console.log('Kullanıcı güncelleniyor:', formData);
      setIsSubmitted(true);
      
      // Form başarıyla gönderildikten sonra bildirim göster
      setTimeout(() => {
        setIsSubmitted(false);
        window.history.back(); // Kullanıcılar sayfasına geri dön
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Kullanıcı bilgileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <div className="page-header">
        <h1>Kullanıcı Düzenle</h1>
        <p>Kullanıcı bilgilerini güncellemek için aşağıdaki formu kullanın.</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>✓ Kullanıcı bilgileri başarıyla güncellendi!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="user-form">
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

        <div className="form-section">
          <h3>Sistem Bilgileri</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Rol*</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="admin">Yönetici</option>
                <option value="manager">Müdür</option>
                <option value="supervisor">Denetçi</option>
                <option value="user">Kullanıcı</option>
              </select>
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
                <option value="inactive">İnaktif</option>
                <option value="suspended">Askıya Alınmış</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="password-header">
            <h3>Şifre</h3>
            <div className="password-toggle">
              <input
                type="checkbox"
                id="changePassword"
                checked={isNewPassword}
                onChange={() => setIsNewPassword(!isNewPassword)}
              />
              <label htmlFor="changePassword">Şifreyi Değiştir</label>
            </div>
          </div>
          
          {isNewPassword && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Yeni Şifre*</label>
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
          )}
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

export default EditUser;