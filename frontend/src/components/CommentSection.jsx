import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { setPosts } from '../redux/postSlice';

const CommentSection = ({ post }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false); // Toggle for dropdown
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const posts = useSelector((store) => store.posts.posts); // Get posts from Redux store

  const handleCommentChange = (e) => {
    setText(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!text.trim()) {
      return toast.error("Comment cannot be empty");
    }

    try {
      setLoading(true);

      const res = await axios.post(`http://localhost:5000/api/posts/comment/${post._id}`, { text }, { withCredentials: true });
      const newComment = res.data?.comment;
      const updatedComments = [newComment, ...post.comments];

      // Update the specific post with new comments
      const updatedPosts = posts.map((p) => p._id === post._id ? { ...p, comments: updatedComments } : p);
      dispatch(setPosts(updatedPosts)); // Dispatch to Redux to update the state
      toast.success("Comment added successfully!");
      setText(""); // Reset input field
    } catch (error) {
      console.error("Error adding comment:", error.message);
      toast.error(error.response?.data?.error || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      {/* Comments Dropdown */}
      <div className="comments-dropdown">
        <button
          className="btn btn-secondary bg-gray-500 b border-black"
          onClick={() => setCommentsVisible(!commentsVisible)}
        >
          {commentsVisible ? "Hide Comments" : "Show Comments"}
          <div className="badge badge-primary ml-2">{post?.comments?.length || 0}</div>
        </button>

        {commentsVisible && (
          <div className="comments-list bg-base-200 p-4 mt-2 rounded">
            {post.comments?.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="comment-item mb-2">
                  <div className="flex justify-between">
                    <strong>{comment.user?.username || "Anonymous"}:</strong>
                    <p>{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        )}
      </div>

      {/* Add Comment */}
      <div className="add-comment mt-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={handleCommentChange}
          className="comment-input p-2 border rounded w-full"
        />
        <button
          onClick={handleCommentSubmit}
          className="comment-submit btn btn-primary mt-2"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>
      
    </div>
  );
};

export default CommentSection;
