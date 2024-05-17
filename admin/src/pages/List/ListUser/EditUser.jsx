import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditUser({ user, onClose, onSave }) {
  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.full_name);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/edit/user", {
        id: user.id,
        email: email,
        full_name: fullName,
        phone_number: phoneNumber,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onSave(); // Kullanıcıları yeniden yükle
        onClose(); // Modali kapat
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Full Name:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
