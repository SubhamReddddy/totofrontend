import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  useCreateTaskMutation,
  useGetAllTaskQuery,
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
          "https://todo-app-server-ledo.onrender.com/tasks/mytasks",
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
      const { data } = await axios.delete(`http://localhost:4000/tasks/${id}`, {
        withCredentials: true,
      });
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

  // console.log(data.tasks)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const res = await createTask({ title, description });
    if (res.data) {
      toast.success(res.data.message);
    } else {
      toast.error(res.error.data.message);
    }
    setReload(!reload);
    setTitle("");
    setDescription("");
    // You can send this data to your backend or handle it according to your application's requirements
  };

  const user = useSelector((state) => state.userSlice.user);
  if (!user) return <Navigate to={"/signin/up"} />;
  return (
    <div className="h-fit w-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-96 mx-auto p-10 bg-white">
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                className="mt-1 block w-full outline-none"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Description</span>
              <textarea
                className="mt-1 block w-full outline-none"
                rows="4"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </label>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-5 my-10 ">
        {dat &&
          dat.map((task) => (
            <div key={task._id} className="w-fit grid grid-cols-4 gap-5">
              <input
                type="text"
                value={task.title}
                readOnly
                className="outline-none text-center"
              />
              <input
                type="text"
                value={task.description}
                readOnly
                className="outline-none text-center"
              />
              <div className="h-full w-full flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  className="cursor-pointer w-7 h-7"
                  onChange={() => {
                    update(task._id);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  deleteFun(task._id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Task;
