/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";

export const createEmployee = async (formData: any) => {
  try {
    const employee = await db.employee.create({
      data: {
        name: formData.personalInfo.name,
        email: formData.personalInfo.email,
        age: parseInt(formData.personalInfo.age), // Convert to integer
        sex: formData.personalInfo.sex,
        address: `${formData.personalInfo.houseNumber}, ${formData.personalInfo.barangay}, ${formData.personalInfo.municipality}, ${formData.personalInfo.province}, ${formData.personalInfo.region}, ${formData.personalInfo.zipCode}`,
        contactNumber: formData.personalInfo.contactNumber,
        profileImage: formData.personalInfo.profileImage || null,
        totalYearExperience: parseInt(
          formData.qualificationSkillsInfo.totalYearsExperience
        ), // Convert to integer
        highestRoleAchieved:
          formData.qualificationSkillsInfo.highestRoleAchieved,
        fieldOfExpertise: formData.qualificationSkillsInfo.fieldOfExpertise,
        awards: formData.qualificationSkillsInfo.awards || null,
        companyName: formData.workExperienceInfo.companyName,
        jobPosition: formData.workExperienceInfo.jobPosition,
        yearsWorkedInCompany: parseInt(
          formData.workExperienceInfo.yearsWorkedInCompany
        ), // Convert to integer
        certificate: formData.workExperienceInfo.certificate || null,
        logisticsCompany: formData.workExperienceInfo.logisticsCompany,
        logisticsYearsWorked: parseInt(
          formData.workExperienceInfo.logisticsYearsWorked
        ), // Convert to integer
        degreeStatus: formData.educationInfo.degreeStatus,
        yearGraduated: parseInt(formData.educationInfo.yearGraduated),
      },
    });
    return employee;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Failed to create employee.");
  }
};
