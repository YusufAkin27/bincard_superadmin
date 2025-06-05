import React, { useState } from 'react';
import '../styles/Login.css';

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('5551234567');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Telefon numarası validasyonu
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Lütfen geçerli bir telefon numarası girin');
      return;
    }
    
    // Şifre validasyonu
    if (!password || password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }
    
    // Giriş işlemi buraya gelecek
    console.log('Giriş yapılıyor:', { phoneNumber, password });
    setError('');
    
    // Normalde API isteği yapılacak, şimdilik varsayılan değerlerle doğrulama yapıyoruz
    if (phoneNumber === '5551234567' && password === 'admin123') {
      if (onLogin) {
        onLogin();
      }
    } else {
      setError('Telefon numarası veya şifre hatalı');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Telefon Numarası</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="05XX XXX XX XX"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Giriş Yap
          </button>
        </form>
        
        <div className="login-footer">
          <p>Hesabınız yok mu? <a href="/register">Kaydol</a></p>
          <p><a href="/forgot-password">Şifremi Unuttum</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 