import React from "react";

const OrderHistory = ({ orders }) => {
    return (
      <div className="bg-[#242629] p-6 rounded-2xl shadow-lg w-[600px] mx-auto text-center mt-20">
        <h2 className="text-white text-2xl font-bold mb-4">Your Order History</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-[#333] p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold">Order #{order.id}</h3>
              <p className="text-gray-300">Total: ${order.total_price}</p>
              <p className="text-gray-300">Status: {order.status}</p>
              
              <div className="mt-4">
                <h4 className="text-white text-lg font-semibold">Order Details:</h4>
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  <ul className="space-y-2 mt-2">
                    {order.items.map((item) => (
                      <li key={item.product_id} className="text-gray-300">
                        <p>{item.product_name}</p>
                        <p>Artist: {item.artist}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No items found for this order.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300">No orders found.</p>
        )}
      </div>
    );
  };
  
  export default OrderHistory;