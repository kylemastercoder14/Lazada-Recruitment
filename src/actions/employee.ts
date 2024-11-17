/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";

export const createEmployee = async (formData: any) => {
  try {
    const employee = await db.jobApplicant.create({
      data: {
        name: formData.personalInfo.name,
        email: formData.personalInfo.email,
        age: parseInt(formData.personalInfo.age), // Convert to integer
        sex: formData.personalInfo.sex,
        address: `${formData.personalInfo.houseNumber}, ${formData.personalInfo.barangay}, ${formData.personalInfo.municipality}, ${formData.personalInfo.province}, ${formData.personalInfo.region}, ${formData.personalInfo.zipCode}`,
        contactNumber: formData.personalInfo.contactNumber,
        profileImage: formData.personalInfo.profileImage || null,
        totalYearExperience:
          formData.qualificationSkillsInfo.totalYearsExperience,
        highestRoleAchieved:
          formData.qualificationSkillsInfo.highestRoleAchieved,
        fieldOfExpertise: formData.qualificationSkillsInfo.fieldOfExpertise,
        awards: formData.qualificationSkillsInfo.awards || null,
        companyName: formData.workExperienceInfo.companyName,
        jobPosition: formData.workExperienceInfo.jobPosition,
        yearsWorkedInCompany: formData.workExperienceInfo.yearsWorkedInCompany,
        certificate: formData.workExperienceInfo.certificate || null,
        logisticsCompany: formData.workExperienceInfo.logisticsCompany,
        logisticsYearsWorked: formData.workExperienceInfo.logisticsYearsWorked,
        degreeStatus: formData.educationInfo.degreeStatus,
        yearGraduated: formData.educationInfo.yearGraduated,
      },
    });

    await db.jobApplication.create({
      data: {
        jobApplicantId: employee.id,
        positionApplied: formData.workExperienceInfo.positionApplying,
        applicationDate: new Date(),
      },
    });
    return employee;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Failed to create employee.");
  }
};
