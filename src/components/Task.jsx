import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../Redux/Api/TaskApi";
import toast from "react-hot-toast";
import axios from "axios";

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [dat, setDat] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tasks/mytasks`,
          { withCredentials: true }
        );
        setDat([...data.tasks]);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    load();
  }, [reload]);

  const deleteFun = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setReload(!reload);
  };

  const update = async (_id) => {
    const res = await updateTask(_id);
    if (res.data) {
      toast.success(res.data.message);
    } else {
      toast.error(res.error.data.message);
    }
    setReload(!reload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createTask({ title, description });
    if (res.data) {
      toast.success(res.data.message);
    } else {
      toast.error(res.error.data.message);
    }
    setReload(!reload);
    setTitle("");
    setDescription("");
  };

  const user = useSelector((state) => state.userSlice.user);
  if (!user) return <Navigate to={"/signin/up"} />;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 mt-16">
      {/* Task Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Add a New Task
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 font-medium">Title</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 outline-none"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Description</label>
            <textarea
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 outline-none"
              rows="4"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-md hover:bg-indigo-700 transition"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {dat.map((task) => (
          <div
            key={task._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-500"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900">
                {task.title}
              </span>
              <span className="text-sm text-gray-600">{task.description}</span>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.isCompleted}
                className="w-6 h-6 cursor-pointer accent-indigo-600"
                onChange={() => update(task._id)}
              />

              <button
                onClick={() => deleteFun(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
