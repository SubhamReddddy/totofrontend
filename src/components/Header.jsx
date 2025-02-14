import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { userNotExist } from "../Redux/Reducers/userReducer";

const Header = () => {
  const [user, setUser] = useState(false);
  const findUser = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (findUser) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [findUser, user]);

  const logout = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      dispatch(userNotExist());
      setUser(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-16 w-full bg-gray-900 text-white flex justify-between items-center px-6 md:px-8 fixed top-0 z-50">
      {/* Logo */}
      <div className="text-3xl font-bold cursor-pointer hover:text-fuchsia-600 transition duration-200">
        TODO.
      </div>

      {/* Nav Links */}
      <div className="h-full w-fit">
        <ul className="flex flex-wrap gap-6 md:gap-10 h-full font-semibold items-center text-lg">
          <li className="cursor-pointer hover:text-fuchsia-500 transition duration-200">
            <NavLink to={"/"}>Home</NavLink>
          </li>

          {user && (
            <li className="cursor-pointer hover:text-fuchsia-500 transition duration-200">
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
          )}

          {user && (
            <li className="cursor-pointer hover:text-fuchsia-500 transition duration-200">
              <NavLink to={"/task"}>Task</NavLink>
            </li>
          )}

          {!user && (
            <li className="cursor-pointer hover:text-fuchsia-500 transition duration-200">
              <NavLink to={"/signin/up"}>SignIn/Up</NavLink>
            </li>
          )}

          {user && (
            <li
              className="cursor-pointer hover:text-fuchsia-500 transition duration-200"
              onClick={logout}
            >
              Logout
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
