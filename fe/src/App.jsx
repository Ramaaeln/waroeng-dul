import React, { useState } from 'react';
import Card from './components/Elements/Card';
import Cart from './components/Elements/Cart';
import Header from './components/Elements/Header';
import Checkout from './components/Elements/Checkout';

const App = () => {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState([]);

  const addToCart = (item) => {
    setCart((prevItems) => {
      const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex === -1) {
        return [...prevItems, { ...item, qty: 1 }];
      } else {
        const updatedCart = prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
        return updatedCart;
      }
    });
  };

  const addToCheckout = (item) => {
    setCheckout((prevItems) => {
      const itemIndex = prevItems.findIndex((checkoutItem) => checkoutItem.id === item.id);
      if (itemIndex === -1) {
        return [...prevItems, { ...item, qty: 1 }];
      } else {
        const updatedCheckout = prevItems.map((checkoutItem) =>
          checkoutItem.id === item.id
            ? { ...checkoutItem, qty: checkoutItem.qty + 1 }
            : checkoutItem
        );
        return updatedCheckout;
      }
    });
  };

  return (
    <div>
      <Header setSearch={setSearch}>
        <div className='flex gap-10'>
          <Cart cart={cart} setCart={setCart} addToCheckout={addToCheckout} checkout={checkout}>
            <i className="ri-shopping-cart-fill "></i>
          </Cart>
              <Checkout checkout={checkout} setCheckout={setCheckout} />
        </div>
      </Header>
      <Card search={search} addToCart={addToCart} cart={cart} />
    </div>
  );
};

export default App;
