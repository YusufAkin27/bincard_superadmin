import React, { useState } from 'react';
import '../styles/Feedback.css';

interface Feedback {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  rating: number;
  status: 'new' | 'read' | 'responded' | 'closed';
  date: string;
  type: 'feedback' | 'complaint' | 'suggestion';
}

const Feedback: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  // Örnek geri bildirim verileri
  const feedbackData: Feedback[] = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet.yilmaz@example.com', subject: 'Otobüs Temizliği Hakkında', message: 'Son zamanlarda otobüslerin temizliği konusunda çok memnunum. Özellikle 101 numaralı hattaki otobüsler her zaman tertemiz. Teşekkürler!', rating: 5, status: 'new', date: '15.06.2025', type: 'feedback' },
    { id: 2, name: 'Mehmet Demir', email: 'mehmet.demir@example.com', subject: 'Şoför Davranışı Şikayeti', message: '202 numaralı hatta çalışan şoför çok agresif araç kullanıyor ve yolculara karşı kaba davranıyor. Bu konuda bir önlem alınmasını rica ediyorum.', rating: 1, status: 'read', date: '14.06.2025', type: 'complaint' },
    { id: 3, name: 'Ayşe Kaya', email: 'ayse.kaya@example.com', subject: 'Mobil Uygulama Önerisi', message: 'Mobil uygulamanıza otobüslerin anlık konumunu gösteren bir özellik eklerseniz çok faydalı olur. Böylece bekleme sürelerini daha iyi planlayabiliriz.', rating: 4, status: 'responded', date: '13.06.2025', type: 'suggestion' },
    { id: 4, name: 'Fatma Şahin', email: 'fatma.sahin@example.com', subject: 'Sefer Saatleri Hakkında', message: 'Sabah saatlerinde seferlerin daha sık olması gerekiyor. İşe gitmek için her gün en az 20 dakika otobüs bekliyorum.', rating: 2, status: 'new', date: '12.06.2025', type: 'complaint' },
    { id: 5, name: 'Ali Öztürk', email: 'ali.ozturk@example.com', subject: 'Yeni Güzergah Önerisi', message: 'Üniversite kampüsüne direkt ulaşım sağlayan bir hat açılırsa öğrenciler için çok faydalı olur. Şu anda aktarma yapmak zorunda kalıyoruz.', rating: 3, status: 'closed', date: '10.06.2025', type: 'suggestion' },
    { id: 6, name: 'Zeynep Aktaş', email: 'zeynep.aktas@example.com', subject: 'Teşekkür Mesajı', message: 'Geçen hafta otobüste unuttuğum çantamı bulan ve iade eden şoföre çok teşekkür ederim. Çok dürüst ve yardımsever bir davranış sergiledi.', rating: 5, status: 'responded', date: '08.06.2025', type: 'feedback' }
  ];

  // Filtreleme fonksiyonu
  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = 
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    const matchesType = typeFilter === 'all' || feedback.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Durum ve tür etiketleri için yardımcı fonksiyonlar
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new':
        return <span className="status-badge new">Yeni</span>;
      case 'read':
        return <span className="status-badge read">Okundu</span>;
      case 'responded':
        return <span className="status-badge responded">Yanıtlandı</span>;
      case 'closed':
        return <span className="status-badge closed">Kapatıldı</span>;
      default:
        return <span className="status-badge">Bilinmiyor</span>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'feedback':
        return <span className="type-badge feedback">Geri Bildirim</span>;
      case 'complaint':
        return <span className="type-badge complaint">Şikayet</span>;
      case 'suggestion':
        return <span className="type-badge suggestion">Öneri</span>;
      default:
        return <span className="type-badge">Bilinmiyor</span>;
    }
  };

  // Yıldız derecelendirmesi için yardımcı fonksiyon
  const renderStars = (rating: number) => {
    return (
      <div className="star-rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
        ))}
      </div>
    );
  };

  // Geri bildirim detaylarını gösterme
  const handleFeedbackClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
  };

  // Detay penceresini kapatma
  const closeFeedbackDetail = () => {
    setSelectedFeedback(null);
  };

  return (
    <div className="feedback-container">
      <div className="page-header">
        <h1>Geri Bildirimler ve Şikayetler</h1>
        <button className="export-button">
          <span className="export-icon">📊</span>
          Rapor İndir
        </button>
      </div>

      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Geri bildirim ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <div className="filter-item">
            <label>Durum:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tümü</option>
              <option value="new">Yeni</option>
              <option value="read">Okundu</option>
              <option value="responded">Yanıtlandı</option>
              <option value="closed">Kapatıldı</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Tür:</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">Tümü</option>
              <option value="feedback">Geri Bildirim</option>
              <option value="complaint">Şikayet</option>
              <option value="suggestion">Öneri</option>
            </select>
          </div>
        </div>
      </div>

      <div className="feedback-stats">
        <div className="stat-card">
          <div className="stat-icon new">📬</div>
          <div className="stat-info">
            <h3>Yeni</h3>
            <h2>{feedbackData.filter(f => f.status === 'new').length}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon complaint">⚠️</div>
          <div className="stat-info">
            <h3>Şikayetler</h3>
            <h2>{feedbackData.filter(f => f.type === 'complaint').length}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon suggestion">💡</div>
          <div className="stat-info">
            <h3>Öneriler</h3>
            <h2>{feedbackData.filter(f => f.type === 'suggestion').length}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon rating">⭐</div>
          <div className="stat-info">
            <h3>Ort. Puan</h3>
            <h2>{(feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length).toFixed(1)}</h2>
          </div>
        </div>
      </div>

      <div className="feedback-list">
        {filteredFeedback.length > 0 ? (
          filteredFeedback.map(feedback => (
            <div 
              key={feedback.id} 
              className={`feedback-card ${feedback.status === 'new' ? 'new' : ''}`}
              onClick={() => handleFeedbackClick(feedback)}
            >
              <div className="feedback-header">
                <div className="feedback-meta">
                  <h3>{feedback.subject}</h3>
                  <div className="feedback-badges">
                    {getTypeBadge(feedback.type)}
                    {getStatusBadge(feedback.status)}
                  </div>
                </div>
                <div className="feedback-rating">
                  {renderStars(feedback.rating)}
                </div>
              </div>
              
              <div className="feedback-preview">
                <p>{feedback.message.length > 150 ? `${feedback.message.substring(0, 150)}...` : feedback.message}</p>
              </div>
              
              <div className="feedback-footer">
                <div className="feedback-user">
                  <span className="user-name">{feedback.name}</span>
                  <span className="user-email">{feedback.email}</span>
                </div>
                <div className="feedback-date">{feedback.date}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            Aramanıza uygun geri bildirim bulunamadı.
          </div>
        )}
      </div>

      {selectedFeedback && (
        <div className="feedback-detail-overlay">
          <div className="feedback-detail-modal">
            <div className="modal-header">
              <h2>{selectedFeedback.subject}</h2>
              <button className="close-button" onClick={closeFeedbackDetail}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-meta">
                <div className="detail-user">
                  <strong>Gönderen:</strong> {selectedFeedback.name} ({selectedFeedback.email})
                </div>
                <div className="detail-date">
                  <strong>Tarih:</strong> {selectedFeedback.date}
                </div>
                <div className="detail-badges">
                  {getTypeBadge(selectedFeedback.type)}
                  {getStatusBadge(selectedFeedback.status)}
                </div>
                <div className="detail-rating">
                  <strong>Değerlendirme:</strong> {renderStars(selectedFeedback.rating)}
                </div>
              </div>
              
              <div className="detail-message">
                <p>{selectedFeedback.message}</p>
              </div>
              
              <div className="response-section">
                <h3>Yanıt</h3>
                <textarea 
                  placeholder="Geri bildirime yanıt yazın..."
                  rows={5}
                ></textarea>
              </div>
            </div>
            
            <div className="modal-footer">
              <select className="status-select">
                <option value="new">Yeni</option>
                <option value="read">Okundu</option>
                <option value="responded">Yanıtlandı</option>
                <option value="closed">Kapatıldı</option>
              </select>
              <div className="modal-actions">
                <button className="cancel-button">İptal</button>
                <button className="save-button">Kaydet ve Yanıtla</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback; 