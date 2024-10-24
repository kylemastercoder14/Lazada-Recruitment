"use server";

import { formSchema } from "@/app/admin/_components/login-form";
import db from "@/lib/db";
import { z } from "zod";
import * as jose from "jose";
import { cookies } from "next/headers";

export const createAdmin = async (values: z.infer<typeof formSchema>) => {
  try {
    const response = await db.admin.create({
      data: {
        username: values.username,
        password: values.password,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const loginAdmin = async (values: z.infer<typeof formSchema>) => {
  try {
    const response = await db.admin.findUnique({
      where: {
        username: values.username,
      },
    });

    if (!response) {
      return { error: "User not found" };
    }

    if (response.password !== values.password) {
      return { error: "Invalid password" };
    }

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(response.id.toString())
      .sign(secret);

    (
      await // Set the cookie with the JWT
      cookies()
    ).set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    return { token: jwt };
  } catch (error) {
    throw error;
  }
};
