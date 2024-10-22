import useApplicationAppStore from "@/lib/store";
import React from "react";
import { Button } from "../ui/button";

const ReviewSubmit = () => {
  const { submitForm, prevStep } = useApplicationAppStore();
  return (
    <div>
      ReviewSubmit
      {/* BUTTONS */}
      <div className="flex justify-end mt-5 gap-3">
        <Button variant="outline" onClick={prevStep}>
          Previous &larr;
        </Button>
        <Button onClick={submitForm}>Submit Application</Button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
