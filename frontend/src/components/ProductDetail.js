import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/CartSlice';
import { auth } from '../utils/firebase';

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    if (!product || !product.id || !product.price || isNaN(product.price)) {
      console.error('Invalid product data:', product);
      alert('Invalid product data');
      return;
    }

    try {
      const token = await user.getIdToken();

      await dispatch(
        addToCart({
          userId: user.uid,
          product_id: product.id,
          name: product.name,
          price: parseFloat(product.price).toFixed(2),
          quantity: 1,
          token,
        })
      ).unwrap();

      console.log('Product added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (!product) {
    return <div className="text-white p-8">Loading product details...</div>;
  }

  const price = isNaN(product.price) ? 0 : parseFloat(product.price).toFixed(2);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#16161A]">
      <div className="bg-[#242629] p-8 rounded-2xl shadow-lg w-[400px] text-center">
        <h2 className="text-white text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-400 text-lg mb-6">By {product.artist}</p>
        <p className="text-[#7F5AF0] text-xl font-semibold mb-6">${price}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;