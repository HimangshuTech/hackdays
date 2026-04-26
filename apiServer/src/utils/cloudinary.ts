import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs/promises";

export type UploadedImage = {
  url: string;
  publicId: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (
  localFilePath: string
): Promise<UploadedImage> => {
  if (!localFilePath) {
    throw new TypeError("uploadOnCloudinary: localFilePath is required");
  }

  const MAX_RETRIES = 2;

  let lastError: unknown;

  try {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) { // tries two times to upload to cloudinary
      try {
        const response: UploadApiResponse =
          await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "posts",
          });

        return {
          url: response.secure_url,
          publicId: response.public_id,
        };
      } catch (error) {
        console.warn(`Upload attempt ${attempt} failed`);

        lastError = error;

        if (attempt === MAX_RETRIES) break; // if attempt excides break and continue
      }
    }

    throw lastError;
  } finally {
    try {
      await fs.unlink(localFilePath); // clearning up the temp 
    } catch (err) {
      console.warn("Temp cleanup failed:", err);
    }
  }
};

export default uploadOnCloudinary;
