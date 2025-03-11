// src/pages/Notification.js
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import './Notification.css'; // Import CSS

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // สถานะการโหลด

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const ordersRef = ref(db, 'orders'); // ดึงข้อมูลคำสั่งซื้อจาก Firebase

      // ฟังก์ชันรับข้อมูลคำสั่งซื้อใหม่
      const handleNewOrder = (snapshot) => {
        const orderData = snapshot.val();
        if (orderData) {
          const newNotification = {
            id: snapshot.key,
            message: `คำสั่งซื้อ #${snapshot.key} ได้รับการอัปเดต: ${orderData.status}`,
            time: new Date().toLocaleTimeString(),
          };
          setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
        }
      };

      // ฟังก์ชันรับการอัปเดตคำสั่งซื้อ
      const handleOrderStatusChange = (snapshot) => {
        const orderData = snapshot.val();
        if (orderData) {
          const updatedNotification = {
            id: snapshot.key,
            message: `คำสั่งซื้อ #${snapshot.key} อัปเดตสถานะเป็น: ${orderData.status}`,
            time: new Date().toLocaleTimeString(),
          };
          setNotifications((prevNotifications) => [updatedNotification, ...prevNotifications]);
        }
      };

      // รับข้อมูลคำสั่งซื้อใหม่ (เมื่อมีคำสั่งซื้อเพิ่ม)
      onValue(ordersRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          handleNewOrder(childSnapshot);
        });
      });

      // รับการอัปเดตสถานะคำสั่งซื้อ (เมื่อคำสั่งซื้อมีการเปลี่ยนแปลง)
      onValue(ordersRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          handleOrderStatusChange(childSnapshot);
        });
      });

      setLoading(false); // ปิดสถานะกำลังโหลดเมื่อข้อมูลพร้อม

      return () => {
        // Unsubscribe เมื่อคอมโพเนนต์ถูกทำลาย
        off(ordersRef); // ใช้ off ในการยกเลิกการสมัครรับข้อมูล
      };
    }
  }, []);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id} className={`notification-item ${notification.new ? 'new' : ''}`}>
            <span>{notification.message}</span>
            <span className="time">{notification.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
