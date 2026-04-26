import { Request, Response } from "express";
import { Authservice } from "./auth.service";
import { z } from "zod";

// Signup Schema
const signupSchema = z.object({
  name: z.string(),
  email: z.string().trim().toLowerCase().email("invalid email address"),
  password: z.string().min(8)
});

// Login Schema
const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("invalid email address"),
  password: z.string().min(8)
});

// User Signup
const signup = async (req: Request, res: Response) => {
feature/auth-login
  try {
    const parse = signupSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json(parse.error);
    }
  const parse = signupSchema.safeParse(req.body);
  ;
  if (!parse.success) {
    return res.status(400).json(parse.error);
  }

    const { name, email, password } = parse.data;

    const { user, token } = await Authservice.signup(name, email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.userType
    });

  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Contributor Signup
const contributorSignup = async (req: Request, res: Response) => {
  try {
    const parse = signupSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json(parse.error);
    }

    const { name, email, password } = parse.data;

    const { user, token } = await Authservice.contributorSignup(name, email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.userType
    });

  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// User Login
const login = async (req: Request, res: Response) => {
  try {
    const parse = loginSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json(parse.error);
    }

    const { email, password } = parse.data;

    const { user, token } = await Authservice.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    return res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.userType
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Contributor Login
const contributor = async (req: Request, res: Response) => {
  try {
    const parse = loginSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json(parse.error);
    }

    const { email, password } = parse.data;

    const { user, token } = await Authservice.contributor(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    return res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.userType
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};


const getme = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id, name, email, userType } = user;

  return res.status(200).json({
    id,
    name,
    email,
    usetType: userType
  });
};

export default {
  signup,
  login,
  contributor,
  contributorSignup,
  getme
};

