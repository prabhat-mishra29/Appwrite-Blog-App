//Show post :- which includes a title,name and an image that is store in appwrite 'storage'.

import React from 'react'
import data from "../Appwrite/database_storage"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage,userName}) {
    // Appwrite takes '$id' as a prop.so we use this type of convention.
    
  return (
    // by-default shows 1/4 size of the postcard.when we click it moves to large form.
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={data.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
            <h3 className='text-xs font-semibold text-gray-500'>Created by : {userName}</h3>
        </div>
    </Link>
  )
}


export default PostCard;