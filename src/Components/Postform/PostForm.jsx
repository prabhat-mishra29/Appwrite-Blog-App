//How to add a post-form(add-post).

import React, { useCallback,useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import data from "../../Appwrite/database_storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {

    // 'post' props is used whenever we want to edit our post.
    // otherwise we will not provide anything as our props in 'add-post' component.

    //watch:- kissi v field ko agar continously monitor karna hai toh.
    //setValue:-- kissi v field ka agar value set karna hai toh.
    //control:-- kissi v form ka control lena hai toh.
    //getValue:-- kissi v field value lena hai toh.
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    //submit hua hee agar,data pass toh hua hii hoga.
    const submit = async (Data) => {

        console.log("DATA : ",Data);
        console.log("user-data : ",userData);

        //Agar post hai toh
        if (post) {
        //              agar image hai         toh upload karo                  nahi hai toh null hoga
            const file = Data.image[0] ? await data.uploadFile(Data.image[0]) : null;

            //upload hona ke badd delete karo.
            if (file) {
                data.deleteFile(post.featuredImage);
            }

            //update post:-
            const dbPost = await data.updatePost(post.$id, {
                ...Data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 

        //Agar post nahi hai toh
        else {
            const file = await data.uploadFile(Data.image[0]);

            if (file) {
                const fileId = file.$id;
                Data.featuredImage = fileId;
                const dbPost = await data.createPost({ ...Data, userId: userData.$id , userName:userData.name});

                if (dbPost) {
                    console.log("A new post : ",dbPost);
            
                    //Navigate to bigger image where you can edit and delete a post
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    //title ko watch karke slug generate karo.
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-zA-Z\d\s]+/g, "-")
                        .replace(/\s/g, "-");

        return "";
    }, []);

    //How to use slug-transform interview question:-
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe(); //For memory-management purpose we can use it.
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}

                    //If we write anything direct in 'sulg' , it will used to tranfer that input into a valid slug.
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {/* It happens when we edit a post:- */}
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={data.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button text={post ? "Update" : "Submit"} type="submit" bgColor={post ? "bg-green-500" : "bg-violet-700"} className="w-full">
                </Button>
                
            </div>
        </form>
    );
}