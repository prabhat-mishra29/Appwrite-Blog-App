//Viewing post in a bigger format

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import data from "../Appwrite/database_storage";
import { Button, Container } from "../Components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams(); //database-Id
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    //Checks both post and userData is present or not?
    //It helps us to find a way , user can delete it's own post not others.
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    //console.log("POST :- ",post)

    //When component mounts , it checks whether slug is present or not?
    useEffect(() => {
        if (slug) {
            data.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } 
        else navigate("/");
    }, [slug, navigate]);

    //It is for delete a post.
    const deletePost = () => {
        data.deletePost(post.$id).then((status) => {
            if (status) {
                data.deleteFile(post.featuredImage);
                toast.success("Post is deleted!")
                navigate("/");
            }
            else{
                toast.error("Error while deleting the post!")
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={data.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">

                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3" text="Edit"/>
                            </Link>
                            
                            <Button bgColor="bg-red-500" onClick={deletePost} text="Delete"/>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {/* RTE gives html content , convert it to react using 'parse' */}
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}