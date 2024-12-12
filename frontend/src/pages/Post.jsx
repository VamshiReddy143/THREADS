import axios from 'axios';
import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/postSlice';
import LoadingSpinner from "../components/LoadingSpinner";
import CommentSection from '../components/CommentSection';

const Post = ({ post }) => {

  const { posts } = useSelector(store => store.posts);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();


  const [deleting, setDeleting] = useState(false);
  const [liked, setLiked] = useState( post?.likes?.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post?.likes?.length || 0);
  const [liking, setLiking] = useState(false); 


  //*Deleting the post
  const deletePost = async (postid) => {
    try {
      setDeleting(true);
      const res = await axios.delete(`https://threads-1-1epq.onrender.com/api/posts/delete/${post?._id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const updatedPosts = posts.filter((p) => p._id !== postid);
      dispatch(setPosts(updatedPosts));
      toast.success(res.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  //*LIKEUNLIKE the post
  const likeUnlikePost=async(id)=>{
  
    try {
        setLiking(true)
        const res=await axios.post(`https://threads-1-1epq.onrender.com/api/posts/like/${post._id}`,{},{
            withCredentials:true
        })
       
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);    
        setLiked(!liked);

        const updatedPosts=posts.map((p)=>p._id === id ? {...p,likes:liked ? p.likes.filter(uid => uid !==user._id): [...p.likes,user._id]} : p)    //* its checking if the paramas post id is equals to the postid that we are liking if yes its again checking it is liked or not if liked it is removing the user id from is if not keeping the post and userid as it is for another posts
        dispatch(setPosts(updatedPosts));
        toast.success(res.data?.message);
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Failed to update like');
    }finally{
        setLiking(false);
    }
  }



  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md mb-6">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full overflow-hidden">
              <img src={post?.user?.profileImg} alt="User avatar" />
            </div>
          </div>
          <div>
            <strong className="text-lg">{post?.user?.fullName}</strong>
            <p className="text-gray-400 text-sm">{new Date(post?.createdAt).toLocaleString()}</p>
            
          </div>
        </div>
        {post?.user?._id === user?._id && (
          <div>
            {deleting ? (
                <LoadingSpinner size="sm" />                 
            ) : (
                <MdDelete
                className="text-xl cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => deletePost(post._id)}/>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        {post?.text && <p className="text-gray-300 mb-4">{post.text}</p>}
        {post?.img && (
          <img
            src={post?.img}
            alt="Post content"
            className="w-full h-auto rounded-lg shadow-md"
          />
        )}
      </div>
      <div className="flex gap-2 items-center">
                    <span className="cursor-pointer" onClick={() => likeUnlikePost(post?._id)}>
                        {liking ? (
                            <LoadingSpinner size="sm" />
                        ) : liked ? (
                            <FaHeart className="text-red-500" />
                        ) : (
                            <FaRegHeart className="text-gray-500" />
                        )}
                    </span>
                    <span className="text-sm">{postLike}</span>
                </div>

                <div>
                    <CommentSection  post={post}/>
                </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-4" />

    

    </div>
  );
};

export default Post;
