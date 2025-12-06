import React, { useMemo, useEffect } from 'react'; // 👈 useEffect 추가
import { Link } from 'react-router-dom';
import { setPageTitle } from '../util'; // 👈 util 불러오기

function Cart({ cart, removeFromCart }) {
  // ⭐️ 화면 켜지자마자 제목 변경
  useEffect(() => {
    setPageTitle("USINSA - 장바구니");
  }, []);

  // 총 금액 계산
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // (아래 코드는 기존과 동일합니다. 그대로 두세요)
  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '150px' }}> 
        <div style={{ fontSize: '8rem' }}>🛒</div>
        <h2 style={{ fontSize: '2rem', marginTop: '20px' }}>장바구니가 텅 비었어요</h2>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>원하는 상품을 담아보세요!</p>
        
        <Link to="/" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '15px 40px', marginTop: '30px', textDecoration: 'none', fontSize: '1.1rem' }}>
          쇼핑하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="container"> 
      <h2>🛒 내 장바구니</h2>
      
      <div style={{ marginTop: '20px', borderTop: '1px solid #eee' }}>
        {cart.map((item) => (
          <div 
            key={item.id} 
            className="cart-item" 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}
          >
            <div style={{ flexGrow: 1, marginRight: '20px' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                {item.price.toLocaleString()}원 x {item.quantity}개
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px', minWidth: '150px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {(item.price * item.quantity).toLocaleString()}원
              </span>
              <button 
                className="btn-danger" 
                onClick={() => removeFromCart(item.id)}
                style={{ background: '#ff3b30', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '30px', padding: '20px 0', fontSize: '1.2rem', fontWeight: '600', borderTop: '2px solid #333' }}>
        총 결제 금액: <span style={{ color: '#4f46e5', fontSize: '1.4rem', marginLeft: '10px' }}>{totalPrice.toLocaleString()}원</span>
      </div>
      
      <div style={{ padding: '20px 0', textAlign: 'center' }}>
        <Link 
          to="/order-form"
          state={{ cartItems: cart, totalPrice: totalPrice }} 
          className="btn-primary" 
          style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: '15px', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#4f46e5', color: 'white', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' }}
        >
          {totalPrice.toLocaleString()}원 주문하기
        </Link>
      </div>
    </div>
  );
}

export default Cart;