import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/addbook" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Book</p>
        </NavLink>
        <NavLink to="/adduser" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add User</p>
        </NavLink>
        <NavLink to="/listbook" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Books</p>
        </NavLink>
        <NavLink to="/listuser" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Users</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
