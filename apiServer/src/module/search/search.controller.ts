import { Request, Response } from "express";
import { searchService } from "./search.services";

export const searchController = {
  async searchAll(req: Request, res: Response) {
    try {
      const {
        query,        // text search
        postType,     // EVENT | PLACE | SERVICE
        state,
        page = "1",
        limit = "10"
      } = req.query;

      const result = await searchService.searchAll({
        query: query as string,
        postType: postType as string,
        state: state as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string)
      });

      return res.status(200).json({
        success: true,
        ...result
      });

    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};