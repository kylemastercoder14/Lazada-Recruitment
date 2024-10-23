/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { workExperienceInfoSchema } from "@/lib/validators";

const WorkInfo = () => {
  const { nextStep, prevStep, formData, setWorkExperienceInfo } =
    useApplicationAppStore();
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev: any) => ({ ...prev, [e.target.name]: "" }));
    setWorkExperienceInfo({ [e.target.name]: e.target.value });
  };
  const validateAndNext = () => {
    try {
      workExperienceInfoSchema.parse(formData.workExperienceInfo);
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
      <h2 className="text-xl font-semibold pb-3">Work Experience</h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.companyName ? "text-red-500" : "text-gray-900"
              }`}
            >
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter company name"
              name="companyName"
              value={formData.workExperienceInfo.companyName}
              className={`${
                errors.companyName ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.jobPosition ? "text-red-500" : "text-gray-900"
              }`}
            >
              Job Role/Position <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter job role/position"
              name="jobPosition"
              value={formData.workExperienceInfo.jobPosition}
              className={`${
                errors.jobPosition ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.jobPosition && (
              <p className="text-red-500 text-sm">{errors.jobPosition}</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.yearsWorkedInCompany ? "text-red-500" : "text-gray-900"
              }`}
            >
              Years of Experience in Company{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter years worked in company"
              name="yearsWorkedInCompany"
              value={formData.workExperienceInfo.yearsWorkedInCompany}
              className={`${
                errors.yearsWorkedInCompany
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }`}
              onChange={handleChange}
            />
            {errors.yearsWorkedInCompany && (
              <p className="text-red-500 text-sm">
                {errors.yearsWorkedInCompany}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.certificate ? "text-red-500" : "text-gray-900"
              }`}
            >
              Certification Received (if any)
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter certification received if any"
              name="certificate"
              value={formData.workExperienceInfo.certificate}
              className={`${
                errors.certificate ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.certificate && (
              <p className="text-red-500 text-sm">{errors.certificate}</p>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold pb-3 mt-5">
        Logistics-Related Experience
      </h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="space-y-1">
          <Label
            className={`text-sm ${
              errors.logisticsCompany ? "text-red-500" : "text-gray-900"
            }`}
          >
            Company Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            required
            placeholder="Enter company name"
            name="logisticsCompany"
            value={formData.workExperienceInfo.logisticsCompany}
            className={`${
              errors.logisticsCompany ? "border-red-500 focus:ring-red-500" : ""
            }`}
            onChange={handleChange}
          />
          {errors.logisticsCompany && (
            <p className="text-red-500 text-sm">{errors.logisticsCompany}</p>
          )}
        </div>
        <div className="space-y-1 mt-5">
          <Label
            className={`text-sm ${
              errors.logisticsYearsWorked ? "text-red-500" : "text-gray-900"
            }`}
          >
            Years of Experience in Logistics Company{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            required
            placeholder="Enter years worked in logistics company"
            name="logisticsYearsWorked"
            value={formData.workExperienceInfo.logisticsYearsWorked}
            className={`${
              errors.logisticsYearsWorked
                ? "border-red-500 focus:ring-red-500"
                : ""
            }`}
            onChange={handleChange}
          />
          {errors.logisticsYearsWorked && (
            <p className="text-red-500 text-sm">
              {errors.logisticsYearsWorked}
            </p>
          )}
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

export default WorkInfo;
