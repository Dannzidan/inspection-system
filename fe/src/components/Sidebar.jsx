import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPeopleSharp, IoDuplicate, IoBarChart, IoLogOut, IoDocuments } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import "../sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow ">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
          <NavLink to="/dashboard" activeClassName="active-hover">
            <IoBarChart /> Dashboard
          </NavLink>
          </li>
          <li>
          <NavLink to="/tasks" activeClassName="active-hover">
            <IoDuplicate /> Tugas
          </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
              <NavLink to="/users" activeClassName="active-hover">
                <IoPeopleSharp /> Users
              </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Pengaturan</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Log Out
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
