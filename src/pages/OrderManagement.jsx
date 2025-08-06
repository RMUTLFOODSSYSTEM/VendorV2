import { useState, useEffect, useMemo } from 'react';
import './OrderManagement.css';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // เพื่อแสดงสถานะกำลังโหลด

  // Mock data สำหรับคำสั่งซื้อ
  const mockOrders = useMemo(() => [
  {
    id: 'KF5ZKUrtxn3HEX2xLiwG',
    orderDate: '2025-03-15T14:35:49.174Z',
    status: 'กำลังทำอาหาร',
    items: [
      {
        name: 'ข้าวกะเพราหมู',
        nameaddon: 'ไข่ดาว',
        quantity: 1,
        price: 42,
      },
      {
        name: 'ข้าวผัดหมู',
        nameaddon: 'พิเศษ',
        quantity: 1,
        price: 35,
      },
    ],
  },
  {
    id: 'XJ9JKSlaZs4KfD5GjKyT',
    orderDate: '2025-03-15T15:45:10.128Z',
    status: 'เสร็จสิ้น',
    items: [
      {
        name: 'ข้าวผัดกะเพราหมูกรอบ',
        nameaddon: '',
        quantity: 2,
        price: 80,
      },
    ],
  },
], []);


  useEffect(() => {
  setLoading(false);
  setOrders(mockOrders);
}, [mockOrders]);



  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Order Management</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div>
              <strong>Order ID:</strong> {order.id}
            </div>
            <div>
              <strong>วันที่สั่ง:</strong> {new Date(order.orderDate).toLocaleString()}
            </div>
            <div>
              <strong>เมนูที่สั่ง:</strong>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} ({item.quantity} จาน) - {item.price} บาท
                    {item.nameaddon && (
                      <span> - {item.nameaddon}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>สถานะ:</strong> {order.status}
            </div>
            <div className="button-container">
              <button
                className="received"
                onClick={() => updateOrderStatus(order.id, 'รับคำสั่งซื้อแล้ว')}
              >
                รับคำสั่งซื้อแล้ว
              </button>

              <button
                className="cooking"
                onClick={() => updateOrderStatus(order.id, 'กำลังทำอาหาร')}
              >
                กำลังทำอาหาร
              </button>

              <button
                className="completed"
                onClick={() => updateOrderStatus(order.id, 'เสร็จสิ้น')}
              >
                เสร็จสิ้น
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
