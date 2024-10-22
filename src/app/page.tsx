"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
      <p className="text-5xl font-black text-blue-600 mt-3">Welcome To Lazada Logistics Applicant System</p>
      <p className="mt-2">Please fill out the following information to apply for a position. You can print your application after submitting it.</p>
      <Button onClick={() => router.push("/onboarding")} className="mt-5 px-10">Apply Now</Button>
    </div>
  );
};

export default LandingPage;
