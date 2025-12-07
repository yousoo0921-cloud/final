import React, { useState, useEffect } from 'react';
import { products } from '../data/mockData';
import { setPageTitle } from '../util';

function Home({ addToCart }) {
  // 1. 상태 관리
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 2. 페이지 제목 설정 (마운트 시 1회)
  useEffect(() => {
    setPageTitle("USINSA - 홈");
  }, []);

  // 3. 데이터 필터링 로직
  const categories = ["전체", "상의", "하의", "아우터", "신발", "모자"];
  const filteredProducts = selectedCategory === "전체" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // 4. 배너 스타일 (가독성을 위해 JSX 외부로 분리)
  const bannerStyle = {
    background: 'linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)',
    color: 'white',
    padding: '40px 20px',
    borderRadius: '12px',
    textAlign: 'center',
    margin: '20px 0',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
  };

  return (
    <div className="home-container">
      {/* 카테고리 탭 */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button 
            key={cat} 
            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 메인 배너 */}
      <div className="main-bg" style={bannerStyle}>
        <div className="content">
          <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>GRAND OPENING</h3>
          <p style={{ fontSize: '1.1rem', margin: '5px 0' }}>복잡한 가입 없이,</p>
          <p style={{ fontSize: '1.1rem', margin: '5px 0' }}>모든 상품 <strong style={{color: '#ffdd59'}}>즉시 할인</strong> 적용 중!</p>
        </div>
      </div>

      {/* 상품 리스트 영역 */}
      <div className="section-title" style={{ marginTop: '30px', marginBottom: '15px' }}>
        <h3>🔥 실시간 랭킹</h3>
      </div>

      <div className="product-grid">
        {filteredProducts.map((p, index) => {
          // 할인율 계산
          const discount = p.originalPrice > p.price 
            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) 
            : 0;

          return (
            <div key={p.id} className="product-card">
              <div className="img-wrapper">
                <img src={p.imageUrl} alt={p.name} />
                <div className="rank-badge">{index + 1}</div>
                <button className="cart-btn-overlay" onClick={() => addToCart(p)}>담기</button>
              </div>
              
              <div className="product-info">
                <span className="store-name">{p.store}</span>
                <h3 className="product-name">{p.name}</h3>
                <div className="price-area">
                  {discount > 0 && <span className="discount">{discount}%</span>}
                  <span className="price">{p.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;