"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CaretLeftIcon } from "@radix-ui/react-icons";

function Poll({ data, onFinish, isLoading, setIsLoading }) {
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
      answers: data.questions.map((question) => ({
        questionId: question.id,
        optionId: "",
      })),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting answers:", values);

      const answersData = {
        pollId: data.id,
        userId: session?.user?.id,
        answers: values.answers.map((answer) => ({
          questionId: answer.questionId,
          optionId: answer.optionId,
        })),
      };

      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

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
        setIsLoading(false);
        formik.resetForm();

        if (onFinish) {
          onFinish();
        }
      } catch (error) {
        console.error("Failed to submit answers:", error);
        setIsLoading(false);
      }
    },
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
          <div
            key={index}
            className="p-4 border border-border rounded-md mb-4 space-y-2"
          >
            <h2 key={question.id} className="text-lg font-semibold mb-2">
              Spørsmål {index + 1}: {question.title}
            </h2>
            <label className="mb-8">Velg et alternativ nedenfor:</label>

            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 ">
                <input
                  type="radio"
                  name={`answers[${index}].optionId`}
                  value={option.id}
                  className="bg-red-500"
                  checked={formik.values.answers[index].optionId === option.id}
                  onChange={() => {
                    const updatedAnswer = {
                      ...formik.values.answers[index],
                      optionId: option.id,
                    };
                    formik.setFieldValue(`answers[${index}]`, updatedAnswer);
                  }}
                />
                <label className="mt-0 ml-0">{option.title}</label>
              </div>
            ))}

            {formik.touched.answers && formik.errors.answers && (
              <div className="text-red-500 mt-2">{formik.errors.answers}</div>
            )}
          </div>
        ))}

        <div className="flex gap-4 mt-4">
          <Button type="button" variant="outline" onClick={handleBack}>
            <CaretLeftIcon className="h-6 w-6 " />
            Tilbake
          </Button>

          <Button
            size="default"
            variant="default"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-cutz-950 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Sender...
              </>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Poll;
