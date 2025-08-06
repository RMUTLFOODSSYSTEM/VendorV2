import React from "react";
import Navbar from "../Components/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      <header>
        <h1>ยินดีต้อนรับสู่ RMUTL Shop</h1>
        <p>
          ระบบสั่งอาหารและสินค้าสำหรับนักศึกษาและบุคลากร RMUTL
          <br />
          สะดวก รวดเร็ว ไม่ต้องรอคิวหน้าร้าน
        </p>
      </header>

      <main className="about-section">
        <h2>เกี่ยวกับเรา</h2>
        <p>
          เราเป็นระบบสั่งซื้อสินค้าออนไลน์สำหรับนักศึกษาและบุคลากร RMUTL
          ที่ช่วยให้การสั่งซื้อสะดวกขึ้น ลดเวลารอคิว
          และสนับสนุนร้านค้าภายในมหาวิทยาลัย
        </p>

        <div className="shop-welcome">
          <p>
            สวัสดีร้านค้าพันธมิตร RMUTL!
            ระบบของเราช่วยให้คุณสามารถรับคำสั่งซื้อ
            จากนักศึกษาและบุคลากรได้แบบเรียลไทม์
            จัดการออเดอร์ได้สะดวก รวดเร็ว
            และช่วยโปรโมทร้านของคุณให้เข้าถึงลูกค้าในมหาวิทยาลัยได้มากขึ้น
          </p>
        </div>
      </main>

      <footer>
        <p>© 2025 RMUTL Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}
