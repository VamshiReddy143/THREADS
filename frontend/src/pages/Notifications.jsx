import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import RightSidebar from "../pages/RightSideBar";
import LeftSidebar from "./LeftSideBar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, userProfile, otherUsers } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("https://threads-1-1epq.onrender.com/api/users/notifications", {
          withCredentials: true,
        });
        setNotifications(res.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
        setError("There was an error fetching notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderNotificationType = (type) => {
    switch (type) {
      case "follow":
        return "followed you";
      case "like":
        return "liked your post";
      case "comment":
        return "commented on your post";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 shadow-lg p-4">
        <LeftSidebar />
      </div>
      <div className="divider divider-horizontal divider-start"/>

      {/* Main Content */}
      <div className="w-full md:w-2/4 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Notifications</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification._id}
                  className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={notification?.from.profileImg}
                      alt="profile"
                    />
                    <div className="ml-4">
                      <strong className="text-gray-800">{notification.from?.username}</strong>
                      <p className="text-sm text-gray-600">
                        {renderNotificationType(notification.type)}
                      </p>
                    </div>
                  </div>
                  <small className="text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </small>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No notifications yet.</p>
            )}
          </ul>
        )}
      </div>
      <div className="divider divider-horizontal divider-start"/>
      {/* Right Sidebar */}
      <div className="w-full md:w-2/6 shadow-lg p-4">
        <RightSidebar otherUsers={otherUsers} />
      </div>
    </div>
  );
};

export default Notifications;
