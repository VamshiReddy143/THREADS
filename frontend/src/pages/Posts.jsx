import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setFilterType, setPosts } from '../redux/postSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import Post from './Post';
import CreatePost from './CreatePost';

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, loading, error, filterType } = useSelector((store) => store.posts);

    //* Fetch posts whenever the filterType changes, e.g., "For You" or "Following"
    useEffect(() => {
        dispatch(fetchPosts(filterType));
        
    }, [dispatch, filterType]);

    // *Handle tab changes and update filterType in the Redux store
    const handleTabChange = (type) => {
        dispatch(setFilterType(type));
    };

    //* Display error message if an error occurs while fetching posts
    if (error) {
        return (
            <div className="text-red-500 text-center mt-4">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="max-w-4xl   mx-auto p-4">
            {/* Tabs Section */}
            <div className="flex justify-center gap-8 mb-6">
                {/* //!"For You" Tab */}
                <button
                    onClick={() => handleTabChange('foryou')}
                    className={`px-6 py-2 text-lg font-medium relative transition-all duration-500 ease-out ${filterType === 'foryou' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-100 hover:text-blue-400'}`}
                >
                    For You
                </button>

                {/* //!"Following" Tab */}
                <button
                    onClick={() => handleTabChange('following')}
                    className={`px-6 py-2 text-lg font-medium relative transition-all duration-500 ease-out ${filterType === 'following' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-100 hover:text-blue-400'}`}
                >
                    Following
                </button>
            </div>

            {/* //* Posts Section */}
            <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className='mb-4'>
               <CreatePost/>
               
               

               </div>
                {loading ? (
                    // Show loading spinner while posts are being fetched
                    <div className="col-span-full flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : (
                    //* Render each post
                    posts && posts.map((post) => <Post key={post?._id} post={post} />)
                )}
            </div>
            
        </div>
    );
};

export default Posts;
