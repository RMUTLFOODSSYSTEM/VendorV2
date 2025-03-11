import { useState, useEffect } from 'react';
import { firestore1 } from '../firebase';  // ใช้ firestore1 จากโปรเจกต์แรก
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './MenuManagement.css';

const MenuManagement = () => {
  const [newMenu, setNewMenu] = useState({ name: '', price: '' });
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);

  // ดึงรายการเมนูจาก Firestore
  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const querySnapshot = await getDocs(collection(firestore1, "menus"));
    const menuList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setMenus(menuList);
  };

  const addMenuToFirestore = async () => {
    if (!newMenu.name || !newMenu.price || isNaN(newMenu.price)) {
      alert("กรุณากรอกชื่อและราคาของเมนูให้ถูกต้อง");
      return;
    }

    try {
      await addDoc(collection(firestore1, "menus"), {
        name: newMenu.name,
        price: parseFloat(newMenu.price),
      });

      alert("เมนูถูกเพิ่มแล้ว!");
      setNewMenu({ name: '', price: '' });
      fetchMenus(); // รีเฟรชข้อมูล
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มเมนู");
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setNewMenu({ name: menu.name, price: menu.price.toString() });
  };

  const updateMenuInFirestore = async () => {
    if (!newMenu.name || !newMenu.price || isNaN(newMenu.price)) {
      alert("กรุณากรอกชื่อและราคาของเมนูให้ถูกต้อง");
      return;
    }

    try {
      const menuDoc = doc(firestore1, "menus", editingMenu.id);
      await updateDoc(menuDoc, {
        name: newMenu.name,
        price: parseFloat(newMenu.price),
      });

      alert("เมนูถูกอัปเดตแล้ว!");
      setEditingMenu(null);
      setNewMenu({ name: '', price: '' });
      fetchMenus(); // รีเฟรชข้อมูล
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตเมนู");
    }
  };

  const deleteMenuFromFirestore = async (menuId) => {
    if (!window.confirm("คุณต้องการลบเมนูนี้ใช่หรือไม่?")) return;

    try {
      await deleteDoc(doc(firestore1, "menus", menuId));
      alert("เมนูถูกลบแล้ว!");
      fetchMenus(); // รีเฟรชข้อมูล
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("เกิดข้อผิดพลาดในการลบเมนู");
    }
  };

  return (
    <div className="menu-management">
      <h2>{editingMenu ? "แก้ไขเมนู" : "เพิ่มเมนู"}</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="ชื่อเมนู"
          value={newMenu.name}
          onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          placeholder="ราคา"
          value={newMenu.price}
          onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
        />
      </div>

      <button className="btn" onClick={editingMenu ? updateMenuInFirestore : addMenuToFirestore}>
        {editingMenu ? "บันทึกการแก้ไข" : "เพิ่มเมนู"}
      </button>

      <h2>รายการเมนู</h2>
      <ul className="menu-list">
        {menus.map((menu) => (
          <li key={menu.id}>
            {menu.name} - {menu.price} บาท
            <button className="edit-btn" onClick={() => handleEdit(menu)}>แก้ไข</button>
            <button className="delete-btn" onClick={() => deleteMenuFromFirestore(menu.id)}>ลบ</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuManagement;
