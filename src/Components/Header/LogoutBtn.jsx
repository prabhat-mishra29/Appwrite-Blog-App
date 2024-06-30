import React from 'react'
import {useDispatch} from 'react-redux'
import authServices from '../../Appwrite/auth'
import { logout } from '../../store/authSlice'

//logOut -> auth.js or directed to appwrite
//logout -> dircted to store

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authServices.logOut().then( () => {
            dispatch(logout())
            // Store main information update rahe,issiliye hmm dispatch karte hain.
        } )
    }
  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn;