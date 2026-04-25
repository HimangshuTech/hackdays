import { Request,Response } from "express";
import { Authservice } from "./auth.service";
import {z} from "zod";
const signupSchema = z.object({
  name: z.string(),
  email: z.string().email("invalide emain address"),
  password: z.string().min(8)
});
const signup=async(req,res)=>{
  const parse=signupSchema.safeParse(req.body);
  const {name,email,password}=parse.data;
  const user = await Authservice.signup(name,email,password)
  return res.status(201).json({name : user.name,email : user.email})
}
export default {signup}