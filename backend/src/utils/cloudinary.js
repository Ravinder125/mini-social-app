import {
    v2 as cloudinary,
} from 'cloudinary';
import { fileCleanup } from './file-cleanup.js';
import dotenv from 'dotenv'
dotenv.config()


// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload image 
export const uploadOnCloudinary = async (localFilePath) => {
    return await cloudinary.uploader
        .upload(localFilePath, {
            resource_type: "image",
            folder: "mini_social_media",
            use_filename: true,
            unique_filename: true,
            overwrite: true,
            format: "webp"
        })
        .then(result => {
            console.log("File successfully uploaded on Cloud Storage")
            return result
        })
        .catch((error) => console.error('Error while uploading image on Cloudinary', error))
        .finally(() => fileCleanup(localFilePath))
}

export const deleteOnCloudinary = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId)
        .then(() => console.log("Image successfully deleted"))
        .catch((error) => console.error("Error while deleting the image", error))
}


