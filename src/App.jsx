import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SignInUp from "./components/SignInUp";
import Home from "./components/Home";
import Task from "./components/Task";
import Profile from "./components/Profile";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "./Redux/Reducers/userReducer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const ifUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/me`,
          { withCredentials: true }
        );
        dispatch(userExist(data.user));
      } catch (error) {
        toast.error(error.response.data.message);
        dispatch(userNotExist());
      }
    };
    ifUser();
  });
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin/up" element={<SignInUp />} />
        <Route path="/task" element={<Task />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
