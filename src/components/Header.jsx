import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { useUserLogoutQuery } from "../Redux/Api/UserApi";
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
        "https://todo-app-server-psjd.onrender.com/users/logout",
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
    <div className="h-16 w-full bg-gray-900 text-white flex justify-between px-8 fixed top-0">
      <div className="text-4xl font-bold h-full w-fit flex justify-center items-center cursor-pointer hover:text-fuchsia-600 delay-100">
        TODO.
      </div>

      <div className="h-full w-fit">
        <ul className="flex gap-10 h-full font-semibold items-center text-lg">
          <li className="cursor-pointer hover:text-fuchsia-500 delay-100">
            <NavLink to={"/"}>Home</NavLink>
          </li>

          {user && (
            <li className="cursor-pointer hover:text-fuchsia-500 delay-100">
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
          )}

          {user && (
            <li className="cursor-pointer hover:text-fuchsia-500 delay-100">
              <NavLink to={"/task"}>Task</NavLink>
            </li>
          )}

          {!user && (
            <li className="cursor-pointer hover:text-fuchsia-500 delay-100">
              <NavLink to={"/signin/up"}>SignIn/Up</NavLink>
            </li>
          )}

          {user && (
            <li
              className="cursor-pointer hover:text-fuchsia-500 delay-100"
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
