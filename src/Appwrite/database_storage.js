import config from "../conf/config";
import { Client, Databases,Storage,Query, ID} from "appwrite";


// The "Databases service" allows you to create structured collections of documents, query and filter lists of documents, and manage an advanced set of read and write access permissions.

//The "Storage service" allows you to manage your project files. Using the Storage service, you can upload, view, download, and query all your project files.

//Learn difference between 'database' and 'storage' in chatGpt.

/*

//Create document:--
    const client = new Client();
    const databases = new Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('5df5acd0d48c2') // Your project ID
    ;

    const promise = databases.createDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]', {});
                                                                                            //Object of content

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });


// Update document:--
    // Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.

    const client = new Client();
    const databases = new Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('5df5acd0d48c2') // Your project ID
    ;

    const promise = databases.updateDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]');

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });


// Delete document:-
    // Delete a document by its unique ID.

    const client = new Client();
    const databases = new Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('5df5acd0d48c2') // Your project ID
    ;

    const promise = databases.deleteDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]');

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });


// Get document:--
    // Get a document by its unique ID. This endpoint response returns a JSON object with the document data.

    const client = new Client();

    const databases = new Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('5df5acd0d48c2') // Your project ID
    ;

    const promise = databases.getDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]');

    // Get all documents:--
        // const promise = databases.listDocuments('[DATABASE_ID]', '[COLLECTION_ID]');

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });


// Get Documents(which satisfy query):--

    const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('<PROJECT_ID>');

    const databases = new Databases(client);

    databases.listDocuments(
        '[DATABASE_ID]',
        '[COLLECTION_ID]',
        [
            Query.equal('title', ['Avatar', 'Lord of the Rings']),
            Query.greaterThan('year', 1999)
        ]
    );


// Upload file / create file:--
    // Create a new file. Before using this route, you should create a new bucket resource using either a server integration API or directly from your Appwrite console.

    const client = new Client();

    const storage = new Storage(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('5df5acd0d48c2') // Your project ID
    ;

    const promise = storage.createFile('[BUCKET_ID]', '[FILE_ID]',document.getElementById('uploader').files[0]);

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });


// Delete file:-
    // Delete a file by its unique ID. Only users with write permissions have access to delete this resource.

    const client = new Client();

    const storage = new Storage(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('5df5acd0d48c2') // Your project ID
    ;

    const promise = storage.deleteFile('[BUCKET_ID]', '[FILE_ID]');

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });


//Get file preview:--[It does not return promise]
    // Get a file preview image. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image.

    const client = new Client();

    const storage = new Storage(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('5df5acd0d48c2') // Your project ID
    ;

    const result = storage.getFilePreview('[BUCKET_ID]', '[FILE_ID]');

    console.log(result); // Resource URL
*/



// Database Services using 'class'/'services':--
    //just like we did in "authentication" service.
export class dataServices{
    //1st create client then create variables.
    //Make an constructor which includes 1.client's "setEndpoint" and "setProject" and 2.defining of variable.

    client=new Client();
    databases; //variable
    bucket;  //variable [you can take 'storage' as a variable also]

    //jabb v object call hoo by default constructor tabb jake database main account banaye taki storage wastage naa hoo.
    constructor(){
        this.client
            .setEndpoint(config.appWrite_url)
            .setProject(config.appWrite_projectId);
        this.databases = new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    //CreateDocument/CreatePost:--
    /*
        > In the context of databases and web development, a "slug" is a human-readable, URL-friendly version of a string. It is often used to represent a unique identifier for a resource, such as a post, article, or product, in the context of a web application.

        > The purpose of a slug is to create a URL that is easy to read and understand, typically composed of words separated by hyphens or underscores, making it more user-friendly than an identifier consisting of random characters or numbers. Slugs are commonly used to improve search engine optimization (SEO) and make URLs more memorable for users.

        > Here's an example to illustrate the concept:

        Original Title: "Introduction to Web Development"
        Original URL: https://example.com/articles/123

        With a slug, it might look like this:
            Slug: introduction-to-web-development
            URL with Slug: https://example.com/articles/introduction-to-web-development
    */

    // Here we use 'slug' as our unique documnet id.
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                config.appWrite_databaseId,//Database Id
                config.appWrite_collectionId,//Collection Id
                slug,//Document Id
                {
                    //Object of content
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        }
        catch(error){
            console.log("Create post error",error);
        }
    }

    //Diya gaya 'slug' main jake update karoo.
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                config.appWrite_databaseId,//Database Id
                config.appWrite_collectionId,//Collection Id
                slug,//Document Id
                {
                    //Object of content
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        }
        catch(error){
            throw error;
        }
    }

    //Diya gaya 'slug' main jake delete karoo.
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
            config.appWrite_databaseId,//Database Id
            config.appWrite_collectionId,//Collection Id
            slug//Document Id
            );

            return true;
        }
        catch(error){
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    //Slug ko use karo ekk post kese lee
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appWrite_databaseId,//Database Id
                config.appWrite_collectionId,//Collection Id
                slug//Document Id
            );
        }
        catch(error){
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    //hmme woo document/post chahiye jiska andar query hai ki status active hoo.
    //Indexes banani hogi queries ko access karne ke liye.
    //Checkout 'indexes' in appwrite.
    //Syntax:-- queries is a variable of array and it takes 'Query' that need to be check while performing operation.
    async getPosts(){
        try{
            return await this.databases.listDocuments(
                config.appWrite_databaseId,//Database Id
                config.appWrite_collectionId,//Collection Id
                [
                    Query.equal("status","active")
                    //Here 'status' is key which is stored in 'index'.
                ]
            );
        }
        catch(error){
            throw error;
        }
    }

    // file upload service:-
    // Upload images,files etc into the storage.
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appWrite_bucketId,//Bucket Id
                ID.unique(),//File Id
                file
            );
        }
        catch(error){
            console.log("Appwrite service :: uploadPost :: error",error);
            return false;
        }
    }

    // file delete service:-[we have to given 'file id' to delete particular file]
    //This 'fileID' will serve as 'featuredImage' in createPost section.
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appWrite_bucketId,//Bucket Id
                fileId//File Id
            );
            return true;
        }
        catch(error){
            throw error;
        }
    }

    // Get file preview:--
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appWrite_bucketId,//Bucket Id
            fileId//File Id
        );
    }
    
}

//object:-
const data=new dataServices();

export default data;