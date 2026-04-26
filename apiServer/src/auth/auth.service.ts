import { prisma } from "../db/client";
import bcrypt from "bcrypt";
import { usertype } from "../../prisma/generated/enums";
import { generateToken } from "../utils/jwt";

export const Authservice = {
  // User Signup
  async signup(name, email, password) {
  try {
    const emailexist = await prisma.user.findUnique({
      where: { email }
    });

    if (emailexist) {
      throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType: usertype.USER
      }
    });

    const token = generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      },
      token
    };

  } catch (error) {
    throw error;
  }
},

  async contributorSignup(name, email, password) {
  try {
    const emailexist = await prisma.user.findUnique({
      where: { email }
    });

    if (emailexist) {
      throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType: usertype.CONTRIBUTOR
      }
    });

    const token = generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      },
      token
    };

  } catch (error) {
    throw error;
  }
},
  // User Login
  async login(email, password) {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        throw new Error("User not exist");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          userType: user.userType
        },
        token
      };
    } catch (error) {
      throw error;
    }
  },

  // Contributor Login
  async contributor(email, password) {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        throw new Error("User not exist");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          userType: usertype.CONTRIBUTOR
        }
      });

      const token = generateToken(updatedUser);

      return {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          userType: updatedUser.userType
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }
};