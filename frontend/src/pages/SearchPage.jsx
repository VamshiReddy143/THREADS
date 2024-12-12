import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to track search input
  const [searchResults, setSearchResults] = useState([]); // State to hold search results

  // Function to fetch search results
  const handleSearch = async () => {
    if (!searchQuery) return; // Don't search if query is empty
    try {
      const res = await axios.get(`https://threads-1-1epq.onrender.com/api/users/search?query=${searchQuery}`);
      setSearchResults(res.data.users); // Update results
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="w-full flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Search for users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <div key={user._id} className="flex items-center space-x-4 my-3">
              <img
                src={user.profileImg || "https://via.placeholder.com/40"}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-bold">{user.username}</h3>
                <p className="text-gray-500">{user.fullName}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found. Try searching for someone!</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
