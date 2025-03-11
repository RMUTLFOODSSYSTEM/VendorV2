import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ใช้ useAuth เพื่อตรวจสอบสถานะล็อกอิน

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth(); // ดึงข้อมูลผู้ใช้จาก Context

  if (!currentUser) {
    return <Navigate to="/login" replace />; // ถ้าไม่มีผู้ใช้ ให้ไปที่หน้า Login
  }

  return children; // ถ้ามีผู้ใช้ ให้แสดงเนื้อหาปกติ
}

export default ProtectedRoute;
