//how to create 'store':--
import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice.js';

//'store' needs knowledge about every reducers that are going to use.


export const store=configureStore({//It takes object
    reducer:{
        auth : authSlice,
    }
});