import { Request, Response } from "express";
import uploadOnCloudinary from "../../utils/cloudinary";
import { PostService } from "./post.service";

const safeParse = (value?: string) => {
  try {
    return value ? JSON.parse(value) : undefined;
  } catch {
    return undefined;
  }
};

export const PostController = {
  async uploadPost(req: Request, res: Response) {
    try {

      const userId = req.user.id;

      // here we are parsing the strings to objects
      const parsedBody = {
        ...req.body,
        location: safeParse(req.body.location),
        metadata: safeParse(req.body.metadata),
        event: safeParse(req.body.event),
        service: safeParse(req.body.service),
      };

      // we are taking the array images from multer req 
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
      }
      // uploading to cloudinary using promise
      const uploadedImages = await Promise.all(
        files.map(async (file, index) => {
          const res = await uploadOnCloudinary(file.path);

          return {
            url: res.url, // this will be useds
            publicId: res.publicId,
            order: index,
          };
        })
      );

      const finalBody = {
        ...parsedBody,
        images: uploadedImages,
        userId,
      };

      const post = await PostService.createPost(finalBody);

      return res.status(201).json({
        message: "Post processed successfully",
        data: finalBody,  //TODO: remove it
        post
      });

    } catch (error) {
      console.error("UploadPost error:", error);

      return res.status(500).json({
        error: "Failed to upload post",
      });
    }
  },
};
