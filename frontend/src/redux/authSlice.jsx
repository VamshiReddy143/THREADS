import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        userProfile:null,
        otherUsers:[]
        
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setProfile:(state,action)=>{
            state.userProfile=action.payload
        },
        getOtherUsers:(state,action)=>{
            state.otherUsers=action.payload
        },
        followingUpdate:(state,action)=>{
            // unfollow
            if(state.user.following.includes(action.payload)){
                state.user.following = state.user.following.filter((itemId)=>{
                    return itemId !== action.payload;
                })
            }else{
                // follow
                state.user.following.push(action.payload);
            }
        }
        
    }
})

export const {setUser,setProfile,followingUpdate,getOtherUsers}=authSlice.actions
export default authSlice.reducer