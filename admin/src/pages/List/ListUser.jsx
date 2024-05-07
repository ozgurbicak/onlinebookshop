import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
function List() {
  const [users, setUsers] = useState([]);

  const usersData = async () => {
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
    console.log(userId);
    const response = await axios.post("http://localhost:5000/api/remove/user", {
      id: userId,
    });
    if (response.data.success) {
      await usersData();
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    usersData();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Users List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Email</b>
          <b>Full Name</b>
          <b>Phone Number</b>
          <b>Picture</b>
          <b>Action</b>
        </div>
        {users.map((user, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{user.email}</p>
              <p>{user.full_name}</p>
              <p>{user.phone_number}</p>
              {user.picture ? (
                <img className="profilepic" src={user.picture} alt="" />
              ) : (
                <img className="profilepic" src={assets.userDefault} alt="" />
              )}
              <p onClick={() => removeUser(user.id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
