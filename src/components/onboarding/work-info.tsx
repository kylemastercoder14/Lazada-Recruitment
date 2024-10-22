"use client";

import React from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";

const WorkInfo = () => {
  const { nextStep, prevStep } = useApplicationAppStore();
  return (
    <div>
      WorkInfo
      {/* BUTTONS */}
      <div className="flex justify-end mt-5 gap-3">
        <Button variant="outline" onClick={prevStep}>
          Previous &larr;
        </Button>
        <Button onClick={nextStep}>Next &rarr;</Button>
      </div>
    </div>
  );
};

export default WorkInfo;
