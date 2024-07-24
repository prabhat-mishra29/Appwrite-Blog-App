import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../Components/index'
import data from "../Appwrite/database_storage";

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        data.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    // console.log(posts)
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'> {/* by-default shows 1/4 size of the postcard.when we click it moves to large form. */}
                        <PostCard {...post} />
                            {/* de-structuring post to get post-id,title,featuredImage */}
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts