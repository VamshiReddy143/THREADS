
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchPosts=createAsyncThunk("posts/fetchposts",async(filterType,{getState})=>{
    const {user} =getState().auth    //*getstate is used to get the state of another slice
  
    try {
        const res=await axios.get("https://threads-1-1epq.onrender.com/api/posts/all",{
            params:{userId:user._id,filterType},   //*we are passing it through params and receiving at backend for "for you" and "following"  posts
            headers:{"Content-Type" : "application/json"},
            withCredentials:true
        })
        return res.data
    } catch (error) {
        console.error(error)
    }
})



const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    filterType: 'foryou',
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchPosts.pending, (state) => {
        state.loading = true;  
        state.error = null; 
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false; 
        state.posts = action.payload;  
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message; 
      });
  }
});

export const { setPosts,setFilterType } = postSlice.actions;
export default postSlice.reducer;
