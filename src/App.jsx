// Mega project :--
    import { useEffect, useState } from "react";
    import config from "./conf/config";
    import {useDispatch} from 'react-redux';
    import authServices from "./Appwrite/auth";
    import { login,logout } from "./store/authSlice";
    import { Header,Footer } from "./Components";
    import {Outlet} from 'react-router-dom'
    import { ToastContainer} from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

        function App(){

        /*
            //How to access environment variable in 'create react app' platform.
            console.log(process.env.REACT_APP_APPWRITE_URL);

            -> 1st way:-
                //How to access environment variable in 'Vite' platform.
                console.log(import.meta.env.VITE_APPWRITE_URL); 

            -> 2nd way:-
                //How to access environment variable in 'Vite' platform.[using 'config.js' file]
                console.log(config.appWrite_url);
        */


    //Jese hii application load hoo pucho authServices see ki user login hai ya nahi hai.Agar hai toh kuch dikhao agar nahi toh loading screen dikhao..

        //1st we will create a loading state.Iske help se hmm condition rendering karr sakte hain.
            const[loading,setLoading]=useState(true);
            //By-default 'true' means , at 1st kuch nahi hoo raha hai toh loading screen show karega.

            const dispatch=useDispatch();

            //Jese hii application load hoo "authServices" ko pucho currently user kon hai..
            useEffect(() => {
                authServices.getCurrentUser()
                    .then((userData) => {
                        //agar data hai toh dispatch karoo..
                            if (userData) {
                                dispatch(login({userData}))
                                            // " Object "
                            } else {
                                dispatch(logout())
                                //Agar data nahi mila toh state hi change karlo.
                            }
                            //Note:- State hamesha change hoga.. 
                    })
                    .finally( () => setLoading(false) ) //loading ka kaam khatam hoo chuka hai.
                }, []);

            
            //Conditional rendering:---
                if(loading){
                    //Loading icon
                    return(
                        <div className="loading bg-gray-400"><div className="spinner"></div></div>
                    );
                }
                else{
                    return(
                        <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
                            <div className='w-full block'>
                                <ToastContainer/>

                                <Header></Header>
                                    {/* Jabb v kuch alag show karna hai toh 'main' se wrapp karlo */}
                                    <main>
                                        <Outlet/>
                                    </main>
                                <Footer></Footer>
                            </div>
                        </div>
                    );
                }
        }

export default App
