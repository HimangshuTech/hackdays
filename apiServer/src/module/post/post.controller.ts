"use strict";

import { Request, Response } from "express";
import uploadOnCloudinary from "../../utils/cloudinary";
import { PostService } from "./post.service";
import { v2 as cloudinary } from "cloudinary";

const safeParse = (value?: string) => {
  try {
    return value ? JSON.parse(value) : undefined;
  } catch {
    return undefined;
  }
};

export const PostController = {
  async uploadPost(req: Request, res: Response) {
    let uploadedImages: {
      url: string;
      publicId: string;
      order?: number;
    }[] = [];

    try {
      const userId = req.user.id;

      const parsedBody = {
        ...req.body,
        location: safeParse(req.body.location),
        metadata: safeParse(req.body.metadata),
        event: safeParse(req.body.event),
        service: safeParse(req.body.service),
      };

      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
      }

      //  upload images
      uploadedImages = await Promise.all(
        files.map(async (file, index) => {
          const res = await uploadOnCloudinary(file.path);

          return {
            url: res.url,
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
        data: finalBody,
        post,
      });

    } catch (error) {
      console.error("UploadPost error:", error);

      // rollback only if images exist
      if (uploadedImages.length > 0) {
        await Promise.allSettled(
          uploadedImages.map((img) =>
            cloudinary.uploader.destroy(img.publicId)
          )
        );
      }

      return res.status(500).json({
        error: "Failed to upload post",
      });
    }
  },
};
