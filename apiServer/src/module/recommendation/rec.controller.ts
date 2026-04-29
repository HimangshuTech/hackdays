
import { Request, Response } from "express";

type Tag = {
  tag: string;
};

type Payload = {
  tags: Tag[];
  state: string;
  budget: number;
};

const transformToRecommendationPayload = (data: Payload) => {
  return {
    query: data.tags.map((t) => t.tag).join(" "),
    state:
      data.state.charAt(0).toUpperCase() +
      data.state.slice(1),
    budget: data.budget,
    top_k: 10,
  };
};

export const recController = {
  async getRec(req: Request, res: Response) {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const body: Payload = req.body;
    console.log(body)

    const payload = transformToRecommendationPayload(body);

    try {
      const response = await fetch(
        `${process.env.PYTHON_API_URL}/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        return res.status(502).json({
          message: "Recommendation service failed",
        });
      }

      const data = await response.json();

      return res.json(data); // 
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};
