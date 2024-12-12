import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import LeftSidebar from "./LeftSideBar";
import { useSelector } from "react-redux";
import RightSidebar from "./RightSideBar";

const Home = () => {
  const { otherUsers } = useSelector((store) => store.auth);

  return (
    <div className="flex sm:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full sm:w-1/5  min-h-screen">
        <LeftSidebar />
      </div>

      {/* Main Content (Middle Posts Area) */}
      <div className=" bg-gray-600 p-4 w-full max-w-4xl mt-5 mx-auto min-h-screen rounded-xl">
        <div className="divider" />
        <Posts />
      </div>

      {/* Right Sidebar */}
      <div className="w-full sm:w-2/6   min-h-screen">
        <RightSidebar otherUsers={otherUsers} />
      </div>
    </div>
  );
};

export default Home;
