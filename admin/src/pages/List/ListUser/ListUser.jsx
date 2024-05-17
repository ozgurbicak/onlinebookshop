import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../assets/assets";
import "./ListUser.css";
import EditUser from "./EditUser";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeUser = async (userId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/remove/user",
        { id: userId }
      );
      if (response.data.success) {
        await fetchUsers();
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editUser = (user) => {
    setSelectedUser(user); // Seçilen kullanıcıyı state'e ayarla
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Users List</p>
      <div className="list-table">
        <div className="list-table-format-user title">
          <b>Email</b>
          <b>Full Name</b>
          <b>Phone Number</b>
          <b>Picture</b>
          <b>Action</b>
        </div>
        {users.map((user, index) => (
          <div key={index} className="list-table-format-user">
            <p>{user.email}</p>
            <p>{user.full_name}</p>
            <p>{user.phone_number}</p>
            {user.picture ? (
              <img className="profilepic" src={user.picture} alt="Profile" />
            ) : (
              <img
                className="profilepic"
                src={assets.userDefault}
                alt="Default"
              />
            )}
            <div className="actions">
              <button onClick={() => editUser(user)}>Edit</button>{" "}
              {/* Düzenleme butonu */}
              <p onClick={() => removeUser(user.id)} className="cursor">
                X
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Seçilen kullanıcı varsa EditUser bileşenini göster */}
      {selectedUser && (
        <EditUser
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={fetchUsers} // Kullanıcılar yeniden yüklenmeli
        />
      )}
    </div>
  );
}

export default ListUser;
