import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form';
//Using controller we can implement 'editor' component.
//Read 'controlled inputs' from react-hook-form.

export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name={name || "content"}
        control={control} //Parent element

        //render takes a callback.
        render={  ( { field: {onChange} }
                     //Key :  value (pair)
                  ) => (
                        //Jo v element hmme render karna hai.

                    <Editor
                      //log-in 'tiny-mce' and get api-key
                      apiKey='k5s2mhe2nrlln1xis7pmg5zjqvtz18u6y9roi81kpx066yix'

                      initialValue={defaultValue}
                      init={
                            //Intial hote hii kya kya value chahte hain.
                              {
                              initialValue: defaultValue,
                              height: 500,
                              menubar: true,
                              plugins: [
                                  "image",
                                  "advlist",
                                  "autolink",
                                  "lists",
                                  "link",
                                  "image",
                                  "charmap",
                                  "preview",
                                  "anchor",
                                  "searchreplace",
                                  "visualblocks",
                                  "code",
                                  "fullscreen",
                                  "insertdatetime",
                                  "media",
                                  "table",
                                  "code",
                                  "help",
                                  "wordcount",
                                  "anchor",
                              ],
                              toolbar:
                              "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }
                          }

                      onEditorChange={onChange} //takes value from key-value pair
                    />
                    )
              }
        />

    </div>
  )
}
