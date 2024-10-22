"use client";

import React from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";

const PersonalInfo = () => {
  const { nextStep } = useApplicationAppStore();
  return (
    <div>
      PersonalInfo
      {/* BUTTONS */}
      <div className="flex justify-end mt-5">
        <Button onClick={nextStep}>Next &rarr;</Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
