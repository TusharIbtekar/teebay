import { createHmac, randomBytes } from "crypto";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import jwt from "jsonwebtoken";

import { prismaClient } from "../lib/db";

const JWT_SECRET = "super-secret-jwt";

const UserRegistrationPayload = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string(),
});

export type TUserRegistrationPayload = z.infer<typeof UserRegistrationPayload>;

const GetUserTokenPayload = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TGetUserTokenPayload = z.infer<typeof GetUserTokenPayload>;

class UserService {
  private static generateHashedPassword(
    salt: string,
    password: string
  ): string {
    return createHmac("sha512", salt).update(password).digest("hex");
  }

  public static async createUser(payload: TUserRegistrationPayload) {
    try {
      const validatedPayload = UserRegistrationPayload.parse(payload);
      const { firstName, lastName, email, password, phoneNumber } =
        validatedPayload;

      const salt = randomBytes(16).toString("hex");
      const hashedPassword = this.generateHashedPassword(salt, password);

      const user = await prismaClient.user.create({
        data: {
          firstName,
          lastName,
          phoneNumber,
          email,
          salt,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          "Invalid user registration data type. Please check the provided data."
        );
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("A new user cannot be created with this email");
        }
        throw new Error("Unable to create the user.");
      } else {
        throw error;
      }
    }
  }

  public static async getUserToken(payload: TGetUserTokenPayload) {
    const { email, password } = payload;

    try {
      const user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const hashedPassword = this.generateHashedPassword(user.salt, password);

      if (hashedPassword !== user.password) {
        throw new Error("Password is incorrect");
      }

      return jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
    } catch (error) {
      throw new Error("Unable to get user token.");
    }
  }

  public static decodeToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
  }
}

export default UserService;
