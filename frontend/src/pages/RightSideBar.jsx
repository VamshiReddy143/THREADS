import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useOtherUsers from "../hooks/useOtherUsers";

const RightSidebar = ({ id }) => {
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

 

  // Fetch other users when the component is mounted
  useOtherUsers(id);

  // Filter users: exclude the logged-in user and apply search
  const filteredUsers = otherUsers
    .filter(
      (user) =>
        String(user?._id) !== String(id) && // Convert both to strings for comparison
        (user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, 5);

  return (
    <div className="ml-4 fixed top-0 mr-40 mt-5 right-0 w-full md:w-[20%] bg-white rounded-lg shadow-xl p-4">
      {/* Search Box */}
      <div className="flex items-center p-3 bg-gray-100 rounded-full shadow-md mb-4">
        <CiSearch size="20px" className="text-gray-500" />
        <input
          type="text"
          className="bg-transparent outline-none px-4 py-2 w-full ml-3 text-gray-700 placeholder-gray-500 rounded-full focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Search for users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
        />
      </div>

      {/* Who to Follow Section */}
      <div className="space-y-4">
        <h1 className="font-semibold text-xl text-black">Who to follow</h1>
        {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user?._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                <Avatar src={user?.profileImg} size="50" round={true} className="border-2 border-gray-300" />
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">{user?.username}</h2>
                  <p className="text-sm text-gray-500">{`@${user?.fullName}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-4">No users match your search.</p>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
