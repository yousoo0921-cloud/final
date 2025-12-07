import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../util';

function Cart({ cart, removeFromCart }) {
  // 1. 페이지 제목 설정
  useEffect(() => {
    setPageTitle("USINSA - 장바구니");
  }, []);

  // 2. 총 금액 계산 (평가 항목: useMemo 활용)
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // 3. 빈 장바구니 처리
  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <div style={{ fontSize: '6rem' }}>🛒</div>
        <h2 style={{ marginTop: '20px' }}>장바구니가 텅 비었어요</h2>
        <p style={{ color: '#888', marginBottom: '30px' }}>원하는 상품을 담아보세요!</p>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 30px' }}>쇼핑하러 가기</Link>
      </div>
    );
  }

  return (
    <div className="container cart-container">
      <h2>🛒 내 장바구니</h2>

      <div style={{ marginTop: '20px', borderTop: '1px solid #eee' }}>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            
            {/* 상품 정보 (이름 길어지면 CSS 덕분에 ... 처리됨) */}
            <div className="cart-info">
              <h4 className="cart-prod-name">{item.name}</h4>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                {item.price.toLocaleString()}원 x {item.quantity}개
              </span>
            </div>

            {/* 가격 및 삭제 버튼 */}
            <div className="cart-actions">
              <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {(item.price * item.quantity).toLocaleString()}원
              </span>
              <button className="btn-delete" onClick={() => removeFromCart(item.id)}>
                삭제
              </button>
            </div>
            
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px 0', textAlign: 'right', borderTop: '2px solid #333' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          총 결제 금액: <span style={{ color: '#4f46e5', fontSize: '1.5rem' }}>{totalPrice.toLocaleString()}원</span>
        </span>
      </div>

      <Link 
        to="/order-form"
        state={{ cartItems: cart, totalPrice: totalPrice }}
        className="btn-order"
      >
        {totalPrice.toLocaleString()}원 주문하기
      </Link>
    </div>
  );
}

export default Cart;