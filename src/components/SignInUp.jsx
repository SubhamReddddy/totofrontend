// SignUpSignInForm.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserLoginMutation, useUserRegisterMutation } from '../Redux/Api/UserApi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from '../Redux/Reducers/userReducer';

const SignInUp = () => {
  const [user,setUser] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  
  const dispatch = useDispatch();
  const noob = useSelector(state => state.userSlice.user);
  
  useEffect(()=>{
    if(noob !== null){
      setUser(true);
    }else{
      setUser(false);
    }
  },[noob]);
  

  const [userRegister] = useUserRegisterMutation();
  const [userLogin] = useUserLoginMutation();
  const handleSubmit =async (e) => {
    e.preventDefault(); 
    if (isSignUp) {
      // Handle sign-up logic
      const res = await userRegister({ username, email, password })
      if(res.data){
        dispatch(userExist(res.data.user));
        setUser(true);
        toast.success(res.data.message);
      }else{
        dispatch(userNotExist());
        setUser(false);
        // console.log(res)
        toast.error(res.error.data.message);
      }
    } else {
      // Handle sign-in logic
      const res = await userLogin({ email, password })
      if(res.data){
        toast.success(res.data.message);
        dispatch(userExist(res.data.user));
        setUser(true);
      }else{
        toast.error(res.error.data.message);
        dispatch(userNotExist());
        setUser(false);
      }
    }
  };
  if(user) return <Navigate to={'/'}/>
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-100'>
        <div className="w-[30vw] mx-auto bg-white p-10">
            <div className='text-3xl font-semibold text-center'>{isSignUp ? 'Sign in' : 'Sign up'}</div>
        <form className="mt-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
            {isSignUp && (
                <label className="block">
                <span className="text-gray-700">Username</span>
                <input
                    type="text"
                    className="mt-1 block w-full  outline-none"
                    placeholder="Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </label>
            )}

            <label className="block">
                <span className="text-gray-700">Email address</span>
                <input
                type="email"
                className="mt-1 block w-full  outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>

            <label className="block">
                <span className="text-gray-700">Password</span>
                <input
                type="password"
                className="mt-1 block w-full  outline-none"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>

            <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {isSignUp ? 'Sign up' : 'Sign in'}
            </button>

            <p className="mt-2 text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500 ml-1"
                onClick={() => setIsSignUp(!isSignUp)}
                >
                {isSignUp ? 'Sign in instead' : 'Sign up instead'}
                </button>
            </p>
            </div>
        </form>
        </div>
    </div>
  );
};

export default SignInUp;
