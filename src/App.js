import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/MenuManagement";
import Orders from "./pages/OrderManagement";
import Notifications from "./pages/Notification";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Components/Navbar"; // ตรวจสอบให้แน่ใจว่าใช้ตัวพิมพ์เล็ก
import ProtectedRoute from "./Components/ProtectedRoute"; // ใช้การนำเข้า ProtectedRoute ที่ถูกต้อง
import { AuthProvider } from "./context/AuthContext"; // ตรวจสอบการตั้งชื่อและตำแหน่งของไฟล์

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* หน้าหลัก */}
          <Route path="/" element={<Home />} />

          {/* หน้าล็อกอินและลงทะเบียน */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ใช้ ProtectedRoute สำหรับหน้าที่ต้องการการล็อกอิน */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
