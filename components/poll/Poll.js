"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Poll({ data, onFinish }) {
  const { data: session } = useSession();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    answers: Yup.array()
      .of(Yup.number().required('Valg er påkrevd'))
      .required('All questions must be answered')
      .test('answers-length', 'All questions must be answered', val => val && val.length === data.questions.length)
  });

  console.log("Poll data:", data);

  const formik = useFormik({
    initialValues: {
      answers: Array(data.questions.length).fill(null)
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      console.log("Submitting answers:", values);

      const answersData = {
        pollId: data.id,
        userId: session?.user?.id,
        answers: values.answers.flatMap((optionId, questionIndex) => {
          const question = data.questions[questionIndex];
    
          if (optionId) {
            return {
              questionId: question.id,
              optionId: optionId,
            };
          }
          return [];
        })
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
            <h2 className="text-lg font-semibold mb-2">
              Spørsmål {index + 1}: {question.title}
            </h2>
            <label className="mb-8">Velg et alternativ nedenfor:</label>
            <RadioGroup
              value={formik.values.answers[index]}
              onValueChange={(value) => {
                const answers = [...formik.values.answers];
                answers[index] = parseInt(value);
                formik.setFieldValue('answers', answers);
              }}
            >
              {question.options.map((option, optionIndex) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id}></RadioGroupItem>
                  <Label>{option.title}</Label>
                </div>
              ))}
            </RadioGroup>
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
