import React from "react";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  ListCheck,
} from "lucide-react";
import db from "@/lib/db";
import { IconBadge } from "@/components/globals/icon-badge";
import TitleForm from "./_components/title-form";
import QuestionForm from "./_components/question-form";
import DescriptionForm from './_components/description-form';

const QuestionnaireId = async ({
  params,
}: {
  params: { questionnaireId: string };
}) => {
  const questionnaire = await db.questionnaire.findUnique({
    where: {
      id: params.questionnaireId,
    },
    include: {
      question: true,
    },
  });

  if (!questionnaire) {
    return redirect("/admin/questionnaire-creation");
  }

  const requiredFields = [
    questionnaire.title,
    questionnaire.description,
    questionnaire.question.some((item) => item.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">Questionnaire Setup</h1>
          <span className="text-sm text-slate-700">
            Please complete all required fields. {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex gap-x-2 items-center">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl font-semibold">
              Customize your questionnaire
            </h2>
          </div>
          <TitleForm
            initialData={questionnaire}
            questionnaireId={questionnaire.id}
          />
          <DescriptionForm
            initialData={questionnaire}
            questionnaireId={questionnaire.id}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListCheck} />
              <h2 className="text-xl font-semibold">Questionnaire items</h2>
            </div>
            <QuestionForm
              initialData={questionnaire}
              questionnaireId={questionnaire.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireId;
