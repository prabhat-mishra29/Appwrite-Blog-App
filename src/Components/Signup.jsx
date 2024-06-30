//form is created using 'react-hook-form'
//when you click on 'signup' component it is submitted.

import React, {useState} from 'react'
import authServices from '../Appwrite/auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import { login } from '../store/authSlice.js'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")//to display errors
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    //We will create a create method and pass it to handlesubmit.
    const create = async(data) => {
        setError("") //Jese hi form submit hoo sare error nikal doo.

        try {
            //account create ksro
            const userData = await authServices.createAccount(data)
            if (userData) {
                //userData 'getCurrentUser' se hi niklega
                //current user lelo.
                const userData = await authServices.getCurrentUser(userData)

                //store update kardo
                if(userData) dispatch(login(userData));

                //Agar data agaya toh navigate kardo
                navigate("/") //navigate to home.
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Agar error hai toh show karo */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    {/* "handleSubmit" is an event and it requires a method. */}

                    <div className='space-y-5'>
                        {/* This "Input" is our component. */}
                        {/* When we use 'input' component in parent,automaticaly parent-'ref' passes to input-field. */}
                        
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {
                            //Javascript:--
                                //1st spread register :- takes an unique name and an object of options.
                            ...register("name", {
                            required: true,
                                }
                            )
                        }
                        />

                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {
                            //Javascript:--
                                //1st spread register :- takes an unique name and an object of options.
                            ...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                                    }
                                }
                            )
                        }
                        />

                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {
                            //Javascript:--
                                //1st spread register :- takes an unique name and an object of options.
                            ...register("password", {
                            required: true,
                                }
                            )
                        }
                        />

                        <Button text="Create Account" type="submit" className="w-full">
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup