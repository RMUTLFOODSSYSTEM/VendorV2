import React from 'react';
import './Notification.css'; // ใส่การจัดรูปแบบในไฟล์นี้

function Notification() {
  // Mock data สำหรับคำสั่งซื้อ
  const mockOrder = {
    id: 'KF5ZKUrtxn3HEX2xLiwG',
    orderDate: '2025-03-15T14:35:49.174Z',
    items: [
      {
        name: 'ข้าวกะเพราหมู',
        quantity: 1,
        price: 42,
        addon: 'ไข่ดาว', // เพิ่ม add-on
      },
      {
        name: 'ข้าวผัดหมู',
        quantity: 1,
        price: 35,
        addon: 'พิเศษ', // เพิ่ม add-on
      },
    ],
  };

  return (
    <div className="notification-container">
      <h2>Notification</h2>
      <div className="order-details">
        <div><strong>Order ID:</strong> {mockOrder.id}</div>
        <div><strong>วันที่สั่ง:</strong> {new Date(mockOrder.orderDate).toLocaleString()}</div>
        <div><strong>เมนูที่สั่ง:</strong></div>
        <ul>
          {mockOrder.items.map((item, index) => (
            <li key={index}>
              {item.name} ({item.quantity} จาน) - {item.price} บาท
              {item.addon && (
                <div>
                  <strong>Add-on:</strong> {item.addon}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notification;
