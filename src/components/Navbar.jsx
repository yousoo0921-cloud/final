import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ cartCount }) {
  const location = useLocation();

  // 1. 주문서 페이지에서는 네비게이션 숨김
  if (location.pathname === '/order-form') return null;

  // 2. 뱃지 스타일 (가독성을 위해 분리)
  const badgeStyle = {
    marginLeft: '5px',
    backgroundColor: '#ff3b30',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 8px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };

  return (
    <nav className="navbar">
      {/* 로고 */}
      <Link to="/" className="logo">USINSA</Link>
      
      {/* 장바구니 아이콘 */}
      <div className="nav-links">
        <Link to="/cart" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          🛒 
          {/* 수량이 있을 때만 뱃지 표시 */}
          {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;