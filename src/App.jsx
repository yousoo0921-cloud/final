import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; 

/* 👇 [핵심] 이제 Navbar 부품을 가져와서 씁니다! */
import Navbar from './components/Navbar'; 
import Home from './components/Home'; 
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';

function App() {
  // 1. 상태 관리
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. 로컬 스토리지 저장
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 3. 장바구니 담기 함수
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // 4. 삭제 함수
  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // 5. 비우기 함수 (결제 후 사용)
  const clearCart = useCallback(() => {
    setCart([]); 
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        
        {/* 👇 [변경점] 직접 짜여있던 코드를 지우고, Navbar 컴포넌트를 끼워 넣었습니다! */}
        {/* 이제 주문서 페이지에 가면 이 Navbar가 알아서 사라집니다. */}
        <Navbar cartCount={cart.length} />

        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/order-form" element={<OrderForm clearCart={clearCart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;