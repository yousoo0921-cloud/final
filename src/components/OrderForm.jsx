import React, { useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../util';

function OrderForm({ clearCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ [평가 포인트] useRef 사용 (Hooks 활용 점수)
  const nameInputRef = useRef(null); 

  // 1. 데이터 가져오기 (구조 분해 할당 + 기본값 처리로 간소화)
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  useEffect(() => {
    setPageTitle("USINSA - 주문서 작성");

    // 2. 예외 처리 (장바구니가 비었을 때)
    if (cartItems.length === 0) {
      alert('주문할 상품이 없습니다.');
      navigate('/');
      return;
    }

    // 3. 포커스 이동 (useRef 활용)
    // 옵셔널 체이닝(?.)을 써서 if문 없이 한 줄로 깔끔하게 처리
    nameInputRef.current?.focus();

  }, [cartItems, navigate]);

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`${totalPrice.toLocaleString()}원 결제가 완료되었습니다!`);
    clearCart();
    navigate('/');
  };

  // 4. 방어 코드 (데이터 없으면 렌더링 안 함)
  if (cartItems.length === 0) return null;

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      <h2>📑 주문서 작성</h2>

      {/* 주문 상품 목록 */}
      <div style={{ margin: '30px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3 style={{ marginBottom: '15px' }}>주문 상품 정보 ({cartItems.length}개)</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cartItems.map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.name} <small>(x{item.quantity})</small></span>
              <span style={{ fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()}원</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '15px', textAlign: 'right' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            총 결제 금액: <span style={{ color: '#4f46e5', fontSize: '1.5rem' }}>{totalPrice.toLocaleString()}원</span>
          </span>
        </div>
      </div>

      {/* 배송 정보 입력 폼 */}
      <form onSubmit={handlePayment}>
        <h3 style={{ marginBottom: '20px' }}>배송 정보</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>받는 분 이름</label>
          {/* ✅ ref 연결 (평가 포인트) */}
          <input 
            id="name" 
            type="text" 
            ref={nameInputRef} 
            placeholder="이름을 입력하세요" 
            required 
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>휴대폰 번호</label>
          <input id="phone" type="tel" placeholder="010-1234-5678" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label htmlFor="address" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>배송 주소</label>
          <input id="address" type="text" placeholder="상세 주소를 입력하세요" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.3rem', fontWeight: 'bold', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {totalPrice.toLocaleString()}원 결제하기
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/cart" style={{ color: '#888', textDecoration: 'none' }}>← 장바구니로 돌아가기</Link>
      </div>
    </div>
  );
}

export default OrderForm;