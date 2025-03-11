// src/pages/OrderManagement.js
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database'; // เพิ่มการใช้งาน Firebase Realtime Database
import { getAuth } from 'firebase/auth';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // เพื่อแสดงสถานะกำลังโหลด

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const ordersRef = ref(db, 'orders'); // กำหนดตำแหน่งในการดึงข้อมูลคำสั่งซื้อ
      onValue(ordersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ordersList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setOrders(ordersList);
        } else {
          setOrders([]); // กรณีที่ไม่มีข้อมูล
        }
        setLoading(false); // ปิดสถานะกำลังโหลด
      });
    }
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const db = getDatabase();
    const orderRef = ref(db, `orders/${orderId}`);
    orderRef.update({ status: newStatus }); // อัพเดตstatusคำสั่งซื้อในฐานข้อมูล
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Management</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.customerName} - {order.status}
            <button onClick={() => updateOrderStatus(order.id, 'กำลังทำอาหาร')}>กำลังทำอาหาร</button>
            <button onClick={() => updateOrderStatus(order.id, 'เสร็จสิ้น')}>เสร็จสิ้น</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
