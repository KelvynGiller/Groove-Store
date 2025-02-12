import { useCart } from "../context/CartContext";
import { getAuth } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const cart_id = uuidv4();
  console.log("Cart:", cart);
  console.log("Cart ID:", cart_id);
  const totalPrice = cart.reduce((total, item) => total + (Number(item.price) || 0), 0);

  const handleCheckout = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      alert("You need to be logged in");
      return;
    }
  
    const user_id = currentUser.uid;
  
    const cart_id = localStorage.getItem("cart_id");
  
    if (!cart_id) {
      console.error("Erro: cart_id está indefinido!");
      alert("Erro ao processar o carrinho. Tente novamente.");
      return;
    }
  
    console.log("Enviando pedido para backend:", { cart_id, user_id, total_price: totalPrice });
  
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_id: cart_id,
          user_id: user_id,
          total_price: totalPrice,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Order created:", data);
        navigate("/checkout");
      } else {
        console.log("Error:", data);
        alert("Error to place order. Try again");
      }
    } catch (error) {
      console.error("Error to send order:", error);
      alert("Error to send order. Try again.");
    }
  };

  return (
    <div className="mt-12 mb-4 bg-[#242629] p-6 rounded-2xl shadow-lg w-[1600px] text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <>
          <ul className="text-white">
            {cart.map((item, index) => (
              <li key={item.id || index} className="border border-gray-600 p-4 flex justify-between items-center rounded-lg bg-[#1E1E1E]">
                <div className="flex flex-col text-left">
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="text-gray-400 text-sm">by {item.artist}</p>
                  <p className="text-gray-500 text-xs">Category: {item.category}</p>
                  <p className="text-[#7F5AF0] font-semibold">${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-white text-lg font-bold">Total: ${totalPrice.toFixed(2)}</div>
          <button onClick={handleCheckout} className="mt-4 w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
