import React, { useState, useEffect } from 'react';
import './Orders.css';
import { useStateValue } from "./StateProvider";
import Order from './Order';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/orders/${user.id}`); // Replace user.id with the actual field for user ID
          const data = await response.json();

          // Sort orders by creation date in descending order
          const sortedOrders = data.orders.sort((a, b) => new Date(b.created) - new Date(a.created));
          setOrders(sortedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className='orders__order'>
        {orders?.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
