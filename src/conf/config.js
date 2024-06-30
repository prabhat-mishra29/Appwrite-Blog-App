const config={
    appWrite_url:String(import.meta.env.VITE_APPWRITE_URL),
    appWrite_projectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWrite_databaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWrite_collectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWrite_bucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config;