import React from "react";
import { getApplicantAccount } from "@/hooks/use-applicant";

const NewsAndAnnouncements = async () => {
  const { applicant } = await getApplicantAccount();
  return <div>News {applicant?.accountNumber}</div>;
};

export default NewsAndAnnouncements;
