/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { LazadaLoginCodeEmailHTML } from "@/components/globals/account-notify-email";
import { LazadaFailEmailHTML } from "@/components/globals/fail-notify-email";
import db from "@/lib/db";
import nodemailer from "nodemailer";

export const passApplicant = async (id: string) => {
  if (!id) {
    return { error: "No ID provided" };
  }

  try {
    const applicant = await db.jobApplication.findFirst({
      where: {
        id: id,
      },
    });

    if (!applicant) {
      return { error: "Applicant not found" };
    }

    await db.jobApplication.update({
      where: {
        id: id,
      },
      data: {
        status: "Passed",
      },
    });

    return { success: "Job application passed successfully" };
  } catch (error) {
    console.error("Error passing applicant:", error);
    return { error: "Failed to pass applicant" };
  }
};

export const sendEmail = async (
  accountNumber: string,
  password: string,
  name: string,
  accountNotice: string,
  email: string
) => {
  const htmlContent = await LazadaLoginCodeEmailHTML({
    accountNumber,
    password,
    name,
    accountNotice,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "christian12345montero@gmail.com",
      pass: "xyfmpnnnrmewfnys",
    },
  });

  const message = {
    from: "christian12345montero@gmail.com",
    to: email,
    subject: "Lazada Expedise Account Creation",
    text: `Your account has been created. Your account number is ${accountNumber} and your password is ${password}.`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);
    return { success: true };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};

export const createAccount = async (
  data: { accountNumber: string; password: string; adminNotice: string },
  email: string,
  name: string,
  applicantId: string
) => {
  if (
    !data.accountNumber ||
    !data.password ||
    !email ||
    !name ||
    !applicantId
  ) {
    return { error: "Missing required fields" };
  }

  try {
    const account = await db.applicantAccount.create({
      data: {
        accountNumber: data.accountNumber,
        password: data.password,
        jobApplicantId: applicantId,
      },
    });

    await sendEmail(
      data.accountNumber,
      data.password,
      name,
      data.adminNotice,
      email
    );

    return { success: "Account created successfully", account };
  } catch (error: any) {
    return {
      error: `Failed to create account. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const failApplicant = async (
  id: string,
  name: string,
  email: string,
  reason: string
) => {
  if (!id) {
    return { error: "No ID provided" };
  }

  try {
    const applicant = await db.jobApplication.findFirst({
      where: {
        id: id,
      },
    });

    if (!applicant) {
      return { error: "Applicant not found" };
    }

    await db.jobApplication.update({
      where: {
        id: id,
      },
      data: {
        status: "Failed",
      },
    });

    await sendEmailFail(name, reason, email);

    return { success: "Job application failed successfully" };
  } catch (error) {
    console.error("Error failing applicant:", error);
    return { error: "Failed to fail applicant" };
  }
};

export const sendEmailFail = async (
  name: string,
  reason: string,
  email: string
) => {
  const htmlContent = await LazadaFailEmailHTML({
    name,
    reason,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "christian12345montero@gmail.com",
      pass: "xyfmpnnnrmewfnys",
    },
  });

  const message = {
    from: "christian12345montero@gmail.com",
    to: email,
    subject: "Lazada Expedise Job Application Failed",
    text: `We regret to inform you that your job application has been declined due to the following reason: ${reason}.`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);
    return { success: true };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};
