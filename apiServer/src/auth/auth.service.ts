import { prisma } from "../db/client"
import bcrypt from "bcrypt";

export const Authservice = {
  //SIGNUP ADDED
  async signup(name, password, email) {
    try {
      const emailexist = await prisma.user.findFirst({
        where: {
          email: email
        }
      })

      if (emailexist) {
        throw new Error("User already exist")
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword
        },
        select: {
          name: true,
          email: true
        }
      })

      return user;

    } catch (error) {
      throw error;
    }
  },

  //LOGIN ADDED
  async login(email, password) {
    try {
      const user = await prisma.user.findFirst({
        where: { email }
      });

      if (!user) {
        throw new Error("User not exist") 
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return;
      }

      return {
        email: user.email
      };

    } catch (error) {
      throw error;
    }
  }
}