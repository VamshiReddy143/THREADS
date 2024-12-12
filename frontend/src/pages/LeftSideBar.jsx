import React, { useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from 'react-icons/ai';
import { RiAddBoxLine } from 'react-icons/ri';
import { BiLogOut } from "react-icons/bi";
import { FaUserCircle } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { setUser } from "../redux/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [newNotifications, setNewNotifications] = useState(false); // Track new notifications
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Simulate notification checking (In real case, fetch this from backend)
  useEffect(() => {
    const checkNewNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/notifications", { withCredentials: true });
        setNewNotifications(res.data.notifications.length > 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    checkNewNotifications();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      dispatch(setUser(""));
      toast.success(res.data?.message || "Successfully logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.error || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-20 ml-5   text-white flex flex-col items-center py-6 fixed left-0 top-0 h-full space-y-8 shadow-lg">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img width={"60px"} src="https://www.edigitalagency.com.au/wp-content/uploads/Threads-app-logo-white-png-transparent.png" alt="Logo" />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-8 items-center">
        {/* Home Icon */}
        <Link to="/home" className="group">
          <div className="text-gray-400 group-hover:text-white transition-colors p-2">
            <AiOutlineHome size={40} />
          </div>
        </Link>

        {/* Add Icon */}
        <Link to="/home" className="group">
          <div className="bg-gray-700 rounded-full p-4 group-hover:bg-gray-600 transition-colors">
            <RiAddBoxLine size={40} />
          </div>
        </Link>

        {/* Notifications Icon */}
        <Link to="/notifications" onClick={() => setNewNotifications(false)} className="group relative">
          <div className="text-gray-400 group-hover:text-white transition-colors p-2">
            <AiOutlineHeart size={40} />
            {/* Notification Badge */}
            {newNotifications && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full ring-2 ring-gray-900" />
            )}
          </div>
        </Link>

        {/* Profile Icon */}
        <Link to={`/profile/${user?._id}`} className="group">
          <div className="text-gray-400 group-hover:text-white transition-colors p-2">
            <FaUserCircle size={40} />
          </div>
        </Link>

        {/* Logout Icon */}
        <div className="group cursor-pointer text-gray-400 group-hover:text-white transition-colors p-2">
          <BiLogOut
            size={40}
            className={`transform transition-transform duration-200 hover:scale-110 ${loading && "opacity-50 cursor-not-allowed"}`}
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          />
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default LeftSidebar;
