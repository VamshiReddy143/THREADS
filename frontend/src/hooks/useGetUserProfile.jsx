import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setProfile} from "../redux/authSlice"
import axios from 'axios'

const useGetUserProfile = (id) => {
    const dispatch=useDispatch()


    useEffect(()=>{
        const fetchUserProfile=async()=>{
            try {
                if (!id) {
                    console.error("ID is undefined or null, skipping fetch");
                    return;
                }
                const res=await axios.get(`http://localhost:5000/api/users/profile/${id}`,{
                   
                    withCredentials:true
                })
                dispatch(setProfile(res.data?.user))
               
            } catch (error) {
                console.error("Error fetching user profile:", error.message);
            }
        }
        fetchUserProfile()

    },[dispatch,id])

}

export default useGetUserProfile