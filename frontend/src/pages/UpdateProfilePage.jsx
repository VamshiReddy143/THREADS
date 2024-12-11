// // UpdateProfilePage.jsx (Frontend)
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setUser } from "../redux/authSlice"; // Dispatch update to redux state
// import { toast, ToastContainer } from "react-toastify";

// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../components/LoadingSpinner";
// import RightSidebar from "./RightSideBar";
// import LeftSidebar from "./LeftSideBar";

// const UpdateProfilePage = () => {
//   const [loading,setLoading]=useState(false)
//   const navigate=useNavigate()
//   const dispatch = useDispatch();
//   const {user,otherUsers} = useSelector(store=>store.auth)

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     username: "",
//     currentPassword: "",
//     newPassword: "",
//     bio: "",
//     link: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         ...formData,
//         fullName: user.fullName,
//         email: user.email,
//         username: user.username,
//         bio: user.bio,
//         link: user.link,
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImgChange = (e, state) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (state === "coverImg") setFormData({ ...formData, coverImg: reader.result });
//         if (state === "profileImg") setFormData({ ...formData, profileImg: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true)
//     try {
//       const formDataToSend = new FormData();
//       for (let key in formData) {
//         if (formData[key]) {
//           formDataToSend.append(key, formData[key]);
//         }
//       }

//       const res = await axios.post("http://localhost:5000/api/users/update", formDataToSend, { 
//         headers:{"Content-Type":"application/json"},
//         withCredentials: true 
//       });
//       dispatch(setUser(res.data.updatedUser)); // Update user in Redux store
//       toast.success(res.data?.message);
//       setTimeout(() => {
//         navigate(-1)
//       }, 1000);
//     } catch (error) {
//       console.log("Error updating profile:", error.message);
//       alert("Error updating profile");
//     }finally{
//       setLoading(false)
//     }
//   };

//   return (
//     <div className="flex justify-evenly">
//       <div className="w-[20%] ">
//         <LeftSidebar/>
//       </div>
//     <div className="flex w-[60%]">
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:w-[30vw]  sm:w-[40vw] ">
//       <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
//         <h2 className="text-2xl font-bold text-center text-pink-500 mb-8">Edit Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Full Name</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Username</label>
//               <input 
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Bio</label>
//               <textarea
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               ></textarea>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Link</label>
//               <input
//                 type="text"
//                 name="link"
//                 value={formData.link}
//                 onChange={handleChange}
//                 className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Profile Image</label>
//               <input
//                 type="file"
//                 name="profileImg"
//                 onChange={(e) => handleImgChange(e, "profileImg")}
//                 className="file-input file-input-bordered w-full max-w-xs"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Cover Image</label>
//               <input
//                 type="file"
//                 name="coverImg"
//                 onChange={(e) => handleImgChange(e, "coverImg")}
//                className="file-input file-input-bordered w-full max-w-xs"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Current Password</label>
//               <input
//                 type="password"
//                 name="currentPassword"
//                 onChange={handleChange}
//                 className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">New Password</label>
//               <input
//                 type="password"
//                 name="newPassword"
//                 onChange={handleChange}
//                 className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             <div className="mt-6">
//               <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition duration-300">
//                {
//                 loading ? <LoadingSpinner/>  : "save changes"
//                }
//               </button>
//             </div>
//           </div>
//         </form>
//         <ToastContainer />
//       </div>
//     </div>
//     </div>
//     <div className="w-[40%]">
//        <RightSidebar/>
//      </div>
     
//     </div>
//   );
// };

// export default UpdateProfilePage;


//*if you dont want this code you can try above code 

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import RightSidebar from "./RightSideBar";
import LeftSidebar from "./LeftSideBar";

const UpdateProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    currentPassword: "",
    newPassword: "",
    bio: "",
    link: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        bio: user.bio,
        link: user.link,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, [state]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const res = await axios.post(
        "http://localhost:5000/api/users/update",
        formDataToSend,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(setUser(res.data.updatedUser));
      toast.success(res.data?.message);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.log("Error updating profile:", error.message);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden lg:block lg:w-[20%] ">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {[
                { label: "Full Name", name: "fullName", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Username", name: "username", type: "text" },
                { label: "Bio", name: "bio", type: "textarea" },
                { label: "Link", name: "link", type: "text" },
                { label: "Current Password", name: "currentPassword", type: "password" },
                { label: "New Password", name: "newPassword", type: "password" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium">{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="mt-2 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500"
                    ></textarea>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="mt-2 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500"
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium">Profile Image</label>
                <input
                  type="file"
                  onChange={(e) => handleImgChange(e, "profileImg")}
                  className="mt-2 w-full bg-gray-700 text-white rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => handleImgChange(e, "coverImg")}
                  className="mt-2 w-full bg-gray-700 text-white rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition duration-300"
              >
                {loading ? <LoadingSpinner /> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block lg:w-[20%] ">
        <RightSidebar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfilePage;
