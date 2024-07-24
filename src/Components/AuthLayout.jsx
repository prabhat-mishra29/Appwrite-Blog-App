//Acts like a protected container.

import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

//file-name and function-name can be differnet.

export default function Protected({children, authentication = true}) {
    //Here 'children' is "children component".

    const navigate = useNavigate()

    //Ask,user is login or not from store.
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //It will decide where do you want me to go? [login or homepage or etc]
        //and agar kuch change hua toh recheck karun ya na karun? 

        //Agar 'logout'button pai click hua toh authStatus false ho jayega. and directly login page ko forward karr dega.
        //  true && false !== true   => true
        if(authentication && authStatus !== authentication){
            // move to log-in page.
            navigate("/login")
        } 
        
        // false && true !== true => false
        else if(!authentication && authStatus !== authentication){
            // Move to home-page.
            navigate("/")
        }

        
        //TODO: make it more easy to understand

            // if (authStatus ===true){
            //     navigate("/")
            // } else if (authStatus === false) {
            //     navigate("/login")
            // }
            
            //let authValue = authStatus === true ? true : false

    }, [authStatus, navigate, authentication])

  return (<>{children}</>);
}
