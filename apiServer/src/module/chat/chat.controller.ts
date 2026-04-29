
import { Request, Response } from "express";


type Payload = {
  message: string;
};

export const ChatController = {
  async chat(req: Request, res: Response) {


    const body: Payload = req.body;


    try {
      const response = await fetch(
        `${process.env.PYTHON_API_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        return res.status(502).json({
          message: "Chatbot service failed",
        });
      }

      const data = await response.json();

      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};
