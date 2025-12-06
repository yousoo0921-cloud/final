import React, { useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../util'; // 👈 util 불러오기

function OrderForm({ clearCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const nameInputRef = useRef(null); 

  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  useEffect(() => {
    // ⭐️ 제목 변경 코드 추가
    setPageTitle("USINSA - 주문서 작성");

    if (!location.state || cartItems.length === 0) {
      alert('잘못된 접근이거나 주문할 상품이 없습니다.');
      navigate('/'); 
      return;
    }
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [location.state, cartItems, navigate]);

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`${totalPrice.toLocaleString()}원 결제가 완료되었습니다!`);
    if (clearCart) clearCart(); 
    navigate('/'); 
  };

  if (!location.state || cartItems.length === 0) return null;

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      <h2>📑 주문서 작성</h2>
      {/* ... (나머지 코드는 기존과 완벽히 동일하므로 생략하지 않고 그대로 둡니다) ... */}
      <div style={{ margin: '30px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3 style={{ marginBottom: '15px' }}>주문 상품 정보 ({cartItems.length}개)</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cartItems.map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
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

      <form onSubmit={handlePayment}>
        <h3 style={{ marginBottom: '20px' }}>배송 정보</h3>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>받는 분 이름</label>
          <input id="name" type="text" ref={nameInputRef} placeholder="이름을 입력하세요" required style={{ width: '100%', boxSizing: 'border-box', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>휴대폰 번호</label>
          <input id="phone" type="tel" placeholder="010-1234-5678" required style={{ width: '100%', boxSizing: 'border-box', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label htmlFor="address" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>배송 주소</label>
          <input id="address" type="text" placeholder="상세 주소를 입력하세요" required style={{ width: '100%', boxSizing: 'border-box', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', boxSizing: 'border-box', padding: '15px', fontSize: '1.3rem', fontWeight: 'bold', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
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