import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database"; // ใช้ Firebase Realtime Database
import "./Navbar.css"; // Import CSS

function Navbar() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(0); // สถานะของการแจ้งเตือน
  const navigate = useNavigate(); // สร้าง navigate hook

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // ฟังก์ชันตรวจสอบการแจ้งเตือนจาก Firebase Realtime Database
    if (user) {
      const db = getDatabase();
      const notificationsRef = ref(db, 'notifications/' + user.uid);
      onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        setNotifications(data ? Object.keys(data).length : 0); // นับจำนวนการแจ้งเตือน
      });
    }

    return () => unsubscribe(); // Cleanup function to unsubscribe on unmount
  }, [user]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-link">Restaurant System</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/menu" className="navbar-link">Menu</Link>
        <Link to="/orders" className="navbar-link">Orders</Link>
        {user && (
          <>
            <Link to="/notifications" className="navbar-link">
              Notifications
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </Link>
            <span className="navbar-user">Hello, {user.displayName || "User"}</span>
            <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
          </>
        )}
        {!user && (
          <button onClick={() => navigate('/login')} className="navbar-link login-register-btn">Login/Register</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
