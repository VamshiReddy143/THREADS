import React, { useRef, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, setPosts } from '../redux/postSlice';

const CreatePost = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef(null);



    const dispatch = useDispatch();
    const { posts } = useSelector((store) => store.posts);
    const { user } = useSelector((store) => store.auth);
    

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => setImg(reader.result);
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) {
            return toast.error("Post cannot be empty");
        }

        try {
            setLoading(true);
            const formData = new FormData();
            if (text.trim()) formData.append("text", text);
            if (img) formData.append("img", img);

            const res = await axios.post("http://localhost:5000/api/posts/create", formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            dispatch(setPosts([res.data?.newpost, ...posts]));    //*to show latest posts at top without distrubing recent posts
            
           
            toast.success(res.data?.message);
            dispatch(fetchPosts(posts))

           
          
            setText("");
            setImg(null);
            setFile(null);
            imageRef.current.value = null;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md dark:bg-gray-800">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        src={user?.profileImg || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                    />
                </div>
                <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {user?.fullName || "User"}
                </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's happening?"
                    className="w-full p-3 border rounded-lg resize-none border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                ></textarea>


                {/* //* The preview image and if it is there then cross symbol to cancel */}

                {img && (
                    <div className="relative">
                        <IoClose
                            className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-800 dark:hover:text-gray-300"
                            size={24}
                            onClick={() => {
                                setImg(null);
                                setFile(null);
                                imageRef.current.value = null;
                            }}
                        />
                        <img
                            src={img}
                            alt="Preview"
                            className="w-full rounded-lg object-cover"
                        />
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
                        onClick={() => imageRef.current.click()}  //* if we click on it it will click on  the image symbol
                    >
                        <CiImageOn size={24} />
                        <span>Add Image</span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"                  //*it is file which is hidden backe of image symbol and uses its reference
                        hidden
                        ref={imageRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        {loading ? <LoadingSpinner /> : "Post"}
                    </button>
                </div>
            </form>
           
        </div>
    );
};

export default CreatePost;