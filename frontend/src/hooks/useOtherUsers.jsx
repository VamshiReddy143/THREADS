import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOtherUsers } from '../redux/authSlice'
import axios from 'axios'

const useOtherUsers = (id) => {
    const dispatch=useDispatch()

    useEffect(()=>{
        const fetchOtherUsers=async()=>{
            try {
                const res=await axios.get(`http://localhost:5000/api/users/suggested/${id}`,{
                    withCredentials:true
                })
                dispatch(getOtherUsers(res.data?.otherUsers))
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers()
    },[id])
 
}

export default useOtherUsers