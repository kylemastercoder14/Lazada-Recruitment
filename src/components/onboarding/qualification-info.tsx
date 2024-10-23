/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { qualificationSkillsInfoSchema } from "@/lib/validators";

const QualificationInfo = () => {
  const { nextStep, formData, setQualificationSkillsInfo, prevStep } =
    useApplicationAppStore();
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev: any) => ({ ...prev, [e.target.name]: "" }));
    setQualificationSkillsInfo({ [e.target.name]: e.target.value });
  };
  const validateAndNext = () => {
    try {
      qualificationSkillsInfoSchema.parse(formData.qualificationSkillsInfo);
      setErrors({});
      nextStep();
    } catch (error: any) {
      const errorMap: any = {};
      error.errors.forEach((err: any) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
    }
  };
  return (
    <div>
      <h2 className="text-xl font-semibold pb-3">
        Qualification and Skill Criteria
      </h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.totalYearsExperience ? "text-red-500" : "text-gray-900"
              }`}
            >
              Experience (Years) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              required
              placeholder="Enter experience in years"
              name="totalYearsExperience"
              value={formData.qualificationSkillsInfo.totalYearsExperience}
              className={`${
                errors.totalYearsExperience ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.totalYearsExperience && <p className="text-red-500 text-sm">{errors.totalYearsExperience}</p>}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.highestRoleAchieved ? "text-red-500" : "text-gray-900"
              }`}
            >
              Highest Role/Position Achieved <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter highest role achieved"
              name="highestRoleAchieved"
              value={formData.qualificationSkillsInfo.highestRoleAchieved}
              className={`${
                errors.highestRoleAchieved ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.highestRoleAchieved && <p className="text-red-500 text-sm">{errors.highestRoleAchieved}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.fieldOfExpertise ? "text-red-500" : "text-gray-900"
              }`}
            >
              Field of Expertise <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter field of expertise"
              name="fieldOfExpertise"
              value={formData.qualificationSkillsInfo.fieldOfExpertise}
              className={`${
                errors.fieldOfExpertise ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.fieldOfExpertise && <p className="text-red-500 text-sm">{errors.fieldOfExpertise}</p>}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.awards ? "text-red-500" : "text-gray-900"
              }`}
            >
              Awards (if any)
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter awards if any"
              name="awards"
              value={formData.qualificationSkillsInfo.awards}
              className={`${
                errors.awards ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.awards && <p className="text-red-500 text-sm">{errors.awards}</p>}
          </div>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="flex justify-end mt-5 gap-3">
        <Button variant="outline" onClick={prevStep}>
          Previous &larr;
        </Button>
        <Button onClick={validateAndNext}>Next &rarr;</Button>
      </div>
    </div>
  );
};

export default QualificationInfo;
