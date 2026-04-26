import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    //  Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    await fs.unlink(localFilePath); //delete from temp

    return response;
  } catch (error) {
    // Cleanup in case of failure
    try {
      await fs.unlink(localFilePath);
    } catch (unlinkError) {
      console.error("Failed to delete temp file:", unlinkError);
    }

    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export { uploadOnCloudinary };


