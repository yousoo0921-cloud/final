import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ cartCount }) {
  const location = useLocation(); // 현재 페이지 주소를 알아내는 훅

  // 만약 현재 페이지가 '주문서(/order-form)'라면 네비게이션바를 숨김
  if (location.pathname === '/order-form') {
    return null;
  }

  return (
    <nav className="navbar">
      {/* 1. 왼쪽 로고 */}
      <Link to="/" className="logo">USINSA</Link>
      
      {/* 2. 오른쪽 메뉴 (검색창 없애고 장바구니만 남김) */}
      <div className="nav-links">
        {/* 홈 아이콘 대신 로고가 있으니 여기선 생략해도 되지만 원하면 남겨둠 */}
        {/* <Link to="/">🏠 홈</Link> */}
        
        <Link to="/cart" style={{ textDecoration: 'none', color: 'black', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
          🛒 
          {/* 장바구니에 담긴 게 있을 때만 빨간 숫자 배지 표시 */}
          {cartCount > 0 && (
            <span className="cart-badge" style={{ marginLeft: '5px', backgroundColor: '#ff3b30', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;