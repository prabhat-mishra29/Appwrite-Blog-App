import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../Components/index'
import data from "../Appwrite/database_storage"
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams() //coming from URL
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            data.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            {/* Edit the post */}
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost