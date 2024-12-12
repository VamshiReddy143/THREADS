import React from "react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useParams, Link, useNavigate } from "react-router-dom";
import { followingUpdate } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";
import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSideBar";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userProfile, otherUsers } = useSelector((store) => store.auth);
  const { id } = useParams();
  useGetUserProfile(id);

  const followAndUnfollowUser = async () => {
    try {
      const endpoint = user.following.includes(id)
        ? `http://localhost:5000/api/users/Unfollow/${id}`
        : `http://localhost:5000/api/users/follow/${id}`;
      const res = await axios.post(
        endpoint,
        { id: user?._id },
        { withCredentials: true }
      );

      dispatch(followingUpdate(id));
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen  ">
      {/* Left Sidebar */}
      <div className="w-full sm:w-1/5 min-h-screen">
        <LeftSidebar />
      </div>

      {/* Profile Section */}
      <div className="flex-grow bg-gradient-to-b mt-10 rounded-xl from-blue-50 to-white ">
        <div className="lg:w-[70%] mx-auto border-l border-r border-gray-200 min-h-screen">
          {/* Header Section */}
          <div className="flex items-center py-3 px-4  sticky top-0 z-10 border-b  shadow-sm">
            <Link to={`/home`} className="p-2 rounded-full hover:bg-gray-100">
              <IoMdArrowBack size="24px" />
            </Link>
            <div className="ml-4">
              <h1 className="font-bold text-lg text-gray-800">{userProfile?.username}</h1>
            </div>
          </div>

          {/* Banner Section */}
          <div className="relative">
            <img
              src={
                userProfile?.coverImg ||
                "https://via.placeholder.com/1080x360?text=Profile+Banner"
              }
              alt="banner"
              className="w-full h-48 md:h-64 object-cover rounded-b-md shadow-md"
            />
            <div className="absolute bottom-[-50px] left-6 border-4 border-white rounded-full shadow-lg">
              <Avatar
                src={
                  userProfile?.profileImg ||
                  "https://via.placeholder.com/120?text=Avatar"
                }
                alt="profile"
                size="120"
                round
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-12 px-6">
            {userProfile?._id === user?._id ? (
              <button
                onClick={() => navigate(`/profile/edit/${userProfile._id}`)}
                className="px-6 py-2 text-sm font-medium hover:bg-gray-200 bg-white rounded-full border border-gray-300 shadow-md"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followAndUnfollowUser}
                className={`px-6 py-2 text-sm font-medium rounded-full shadow-md transition-colors duration-200 ${
                  user?.following?.includes(id)
                    ? "bg-gray-200 text-black"
                    : "bg-blue-600 text-white"
                }`}
              >
                {user?.following?.includes(id) ? "Following" : "Follow"}
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="mt-8 px-6">
            <h1 className="font-bold text-2xl text-gray-900">{userProfile?.fullName}</h1>
            <p className="text-gray-600 mt-1">@{userProfile?.username}</p>
            <p className="text-gray-600 mt-1">{userProfile?.email}</p>
          </div>

          {/* Followers and Following Section */}
          <div className="flex justify-around mt-6 px-6">
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">{userProfile?.followers?.length}</span>
              <p className="text-gray-600 text-sm">Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">{userProfile?.following?.length}</span>
              <p className="text-gray-600 text-sm">Following</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6 px-6 text-sm text-gray-700">
            <p className="whitespace-pre-wrap break-words">
              {userProfile?.bio ||
                "🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!"}
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full sm:w-2/6 min-h-screen">
        <RightSidebar otherUsers={otherUsers} />
      </div>
    </div>
  );
};

export default ProfilePage;
