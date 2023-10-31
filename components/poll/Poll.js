"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

function Poll({ data, onFinish }) {
  const { data: session } = useSession();
  const router = useRouter();

  const validationSchema = Yup.array().of(
    Yup.object({
      questionId: Yup.string().required(),
      optionId: Yup.string().required(),
    })
  );

  const formik = useFormik({
    initialValues: {
      answers: data.questions.map(question => ({
        questionId: question.id,
        optionId: ''
      }))
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      console.log("Submitting answers:", values);

      const answersData = {
        pollId: data.id,
        userId: session?.user?.id,
        answers: values.answers.map(answer => ({
          questionId: answer.questionId,
          optionId: answer.optionId
        }))
      };
      

      try {
        const response = await fetch("/api/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answersData),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error);
        }

        console.log("Answers saved successfully:", result);
        formik.resetForm();

        if (onFinish) {
          onFinish();
        }
      } catch (error) {
        console.error("Failed to submit answers:", error);
      }
    }
  });

  const handleBack = () => {
    router.push("/poll");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full my-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
        <p className="text-muted-foreground mb-4">{data.description}</p>

        {data.questions.map((question, index) => (
          <div key={index} className="p-4 border border-border rounded-md mb-4">
            <h2 key={question.id} className="text-lg font-semibold mb-2">
              Spørsmål {index + 1}: {question.title}
            </h2>
            <label className="mb-8">Velg et alternativ nedenfor:</label>
          
            {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`answers[${index}].optionId`}
                value={option.id}
                checked={formik.values.answers[index].optionId === option.id}
                onChange={() => {
                  const updatedAnswer = {
                    ...formik.values.answers[index], 
                    optionId: option.id
                  };
                  formik.setFieldValue(`answers[${index}]`, updatedAnswer);
                }}
                
              />
              <Label>{option.title}</Label>
            </div>
          ))}


            {formik.touched.answers && formik.errors.answers && <div className="text-red-500 mt-2">{formik.errors.answers}</div>}
          </div>
        ))}

        <div className="flex gap-4 mt-4">
          <Button type="button" variant="outline" onClick={handleBack}>
            Tilbake
          </Button>
          <Button type="submit">
            Send
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Poll;
