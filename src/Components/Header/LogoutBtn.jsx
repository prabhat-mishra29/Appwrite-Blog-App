import React from 'react'
import {useDispatch} from 'react-redux'
import authServices from '../../Appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

//logOut -> auth.js or directed to appwrite
//logout -> dircted to store

function LogoutBtn() {

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const logoutHandler = (e) => {
      e.preventDefault();
        authServices.logOut().then( () => {
            dispatch(logout())
            // Store main information update rahe,issiliye hmm dispatch karte hain.
            navigate("/login")
        } )
    }


  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={(e)=>logoutHandler(e)}
    >Logout</button>
  )
}

export default LogoutBtn;