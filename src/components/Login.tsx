import { useState } from "react";
import {backendUrl} from '../App'
import axios from 'axios'
import { toast } from "react-toastify";
const Login = ({setToken}:any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e: any) => {
    try {
      e.preventDefault();
     const response=await axios.post(backendUrl+'/api/user/admin',{email,password})
   if(response.data.success){
    setToken(response.data.token)
   }else{
toast.error(response.data.message)
   }
     
    } catch (error:any) {
      toast.error(error.message)
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded w-full px-3  py-2 border border-gray-100 outline-none"
              type="email"
              placeholder="your@gmail.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded w-full px-3  py-2 border border-gray-100 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
