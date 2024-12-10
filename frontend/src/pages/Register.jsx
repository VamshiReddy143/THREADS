import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import {toast,Toaster} from "react-hot-toast"
import { useNavigate,Link } from 'react-router-dom';



const Register = () => {
    const [formData,setFormData]=useState({
        username:"",
        fullName:"",
        email:"",
        password:""
    })
    const [loading,setLoading] =useState(false)
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }


    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
          const res=await axios.post("http://localhost:5000/api/auth/register",formData,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
          })
          
            navigate("/login")
            toast.success(res.data?.message  || "registered successfully")
            setFormData({
                email: "",
                username: "",
                fullName: "",
                password: "",
            })
                    
        } catch (error) {
            console.error(error.message)
            toast.error(error.response?.data?.message || "something went wrong ")
        }finally{
            setLoading(false)
        }
    }

  return (
   <form onSubmit={handleSubmit}>
     <div className='bg-[url("https://images.unsplash.com/photo-1689274828137-c04faefb6571?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRocmVhZHMlMjBhcHB8ZW58MHx8MHx8fDA%3D")] bg-cover bg-center h-screen flex items-center justify-center px-4'>
      <div className=' bg-opacity-90 shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-white text-center mb-6'>Sign Up for Your Account</h2>

        <div className='flex flex-col gap-4'>
          <input
            type="text"
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="input input-bordered w-full p-7 rounded-lg border border-gray-500 "
          />
          <input
            type="text"
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            placeholder="First Name"
            className="input input-bordered w-full p-7 rounded-lg border border-gray-500 "
          />
          <input
            type="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full p-7 rounded-lg border border-gray-500 "
          />
          <input
            type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full p-7 rounded-lg border border-gray-500 focus:ring "
          />
        </div>

        <button
          className="mt-6 w-full bg-white text-black py-5 rounded-lg font-semibold shadow-lg transition duration-200  disabled:{loading} ">
          {
            loading ? <LoadingSpinner/> : "SignUP"
          }
        </button>
        

        <p className='text-sm text-center text-white mt-4'>
          Already have an account? <Link to="/login"><span className='text-blue-500 cursor-pointer hover:underline'>Log In</span></Link>
        </p>
      </div>
      <Toaster/>
    </div>
   </form>
  );
};

export default Register;