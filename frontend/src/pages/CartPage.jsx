import React from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
    const cartItems = [];

    return (
        <div>
            <h1>Your Cart</h1>
            <Cart cartItems={cartItems}/>
        </div>
    );
};

export default CartPage;