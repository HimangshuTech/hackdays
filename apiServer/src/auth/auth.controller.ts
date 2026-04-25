import { Request, Response } from "express";
import { Authservice } from "./auth.service";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string(),
  email: z.string().trim().toLowerCase().email("invalid email address"),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("invalid email address"),
  password: z.string().min(8)
});

const signup = async (req: Request, res: Response) => {
  const parse = signupSchema.safeParse(req.body);
  ;
  if (!parse.success) {
    return res.status(400).json(parse.error);
  }

  const { name, email, password } = parse.data;

  const user = await Authservice.signup(name, email, password);

  return res.status(201).json({ name: user.name, email: user.email });
};

const login = async (req: Request, res: Response) => {
  const parse = loginSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json(parse.error);
  }

  const { email, password } = parse.data;

  const user = await Authservice.login(email, password);

  return res.status(200).json({ email: user.email });
};

const contributor = async (req: Request, res: Response) => {
  const parse = loginSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json(parse.error);
  }

  const { email, password } = parse.data;

  const user = await Authservice.contributor(email, password);

  return res.status(200).json({ email: user.email });
};

export default {
  signup,
  login,
  contributor
};
