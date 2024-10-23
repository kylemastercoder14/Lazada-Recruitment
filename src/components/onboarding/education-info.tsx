/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";
import { educationInfoSchema } from "@/lib/validators";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const EducationInfo = () => {
  const { nextStep, prevStep, formData, setEducationInfo } =
    useApplicationAppStore();
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev: any) => ({ ...prev, [e.target.name]: "" }));
    setEducationInfo({ [e.target.name]: e.target.value });
  };
  const handleSelectChange = (name: string, value: string) => {
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
    setEducationInfo({ [name]: value });
  };

  const validateAndNext = () => {
    try {
      educationInfoSchema.parse(formData.educationInfo);
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
      <h2 className="text-xl font-semibold pb-3">Educational Attainments</h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.degreeStatus ? "text-red-500" : "text-gray-900"
              }`}
            >
              Degree/Undergraduate Status
              <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={formData.educationInfo.degreeStatus}
              onValueChange={(value) => {
                handleSelectChange("degreeStatus", value);
              }}
            >
              <SelectTrigger
                className={`${
                  errors.degreeStatus ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select degree/undegraduate status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="Vocational">Vocational</SelectItem>
                <SelectItem value="Associate Degree (2 years)">Associate Degree (2 years)</SelectItem>
                <SelectItem value="Bachelor's Degree (4 years)">Bachelor&apos;s Degree (4 years)</SelectItem>
                <SelectItem value="Master's Degree (Postgraduate)">Master&apos;s Degree (Postgraduate)</SelectItem>
                <SelectItem value="Doctoral Degree (Ph.D)">Doctoral Degree (Ph.D)</SelectItem>
              </SelectContent>
            </Select>
            {errors.degreeStatus && (
              <p className="text-red-500 text-sm">
                {errors.degreeStatus}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm ${
                errors.yearGraduated ? "text-red-500" : "text-gray-900"
              }`}
            >
              Year Graduated
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              required
              placeholder="Enter certification received if any"
              name="yearGraduated"
              value={formData.educationInfo.yearGraduated}
              className={`${
                errors.yearGraduated ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.yearGraduated && (
              <p className="text-red-500 text-sm">{errors.yearGraduated}</p>
            )}
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

export default EducationInfo;
