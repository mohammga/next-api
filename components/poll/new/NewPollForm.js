import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { createPollValidationSchema } from "@/schemas/index";
import { capitalizeString } from "@/utils/capitalizeString";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function Test({
  session,
  setPollURL,
  setShowResult,
  isLoading,
  setIsLoading,
}) {
  const router = useRouter();

  const initialValues = {
    pollTitle: "",
    pollDescription: "",
    polls: [
      {
        questionTitle: "",
        questionOptions: [
          {
            option: "",
          },
          {
            option: "",
          },
          {
            option: "",
          },
        ],
      },
    ],
  };

  const handleSubmit = async (values) => {
    const pollData = {
      title: values.pollTitle,
      email: session?.user?.email,
      description: values.pollDescription,
      questions: values.polls.map((poll) => ({
        title: capitalizeString(poll.questionTitle),
        options: poll.questionOptions.map((option) => ({
          title: capitalizeString(option.option),
        })),
      })),
    };
  
    try {
      setIsLoading(true);
  
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const response = await fetch("/api/polls/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pollData),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        setIsLoading(false);
        setPollURL(`/poll/${responseData.data.id}`);
        setShowResult(true);
      } else {
        console.error("Failed to save the poll:", responseData.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/poll");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createPollValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, values, errors }) => (
        <div className="flex justify-center h-full">
          <div className="flex w-full md:w-[700px] flex-col">
            <h1 className="text-2xl font-bold pt-4 pb-2">Opprett en ny poll</h1>
            <p className="text-md text-muted-foreground pb-4">
              Opprett en ny poll nedenfor med opptil 10 spørsmål og 6
              svaralternativer per spørsmål.
            </p>
            <Form className="w-full">
              <FieldArray name="polls">
                {({ remove, push }) => (
                  <div className="space-y-6">
                    {values.polls.map((question, questionIndex) => (
                      <div
                        className="border border-border shadow rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-9"
                        key={questionIndex}
                      >
                        {questionIndex === 0 && (
                          <div className="space-y-3">
                            <div>
                              <div className="pb-2">
                                <Label htmlFor="pollTitle">Tittel:</Label>
                              </div>

                              <div>
                                <Input
                                  id={`pollTitle`}
                                  name={`pollTitle`}
                                  type="text"
                                  maxLength={50}
                                  value={values.pollTitle}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  disabled={isLoading}
                                  className="w-full"
                                />
                                {errors.pollTitle && (
                                  <ErrorMessage
                                    name="pollTitle"
                                    component="p"
                                    className="text-sm font-medium text-red-500 my-2"
                                  />
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="pb-2">
                                <Label htmlFor="pollDescription">
                                  Beskrivelse:
                                </Label>
                              </div>

                              <div>
                                <Textarea
                                  id={`pollDescription`}
                                  name={`pollDescription`}
                                  type="text"
                                  maxLength={100}
                                  value={values.pollDescription}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  disabled={isLoading}
                                  className="w-full"
                                />
                                {errors.pollDescription && (
                                  <ErrorMessage
                                    name="pollDescription"
                                    component="p"
                                    className="text-sm font-medium text-red-500 my-2"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-6">
                          <div className="pb-2">
                            <Label
                              htmlFor={`polls.${questionIndex}.questionTitle`}
                            >
                              Spørsmål {questionIndex + 1}:
                            </Label>
                          </div>
                          <div className="flex gap-3">
                            <Input
                              id={`polls[${questionIndex}].questionTitle`}
                              name={`polls[${questionIndex}].questionTitle`}
                              type="text"
                              maxLength={50}
                              value={values.polls[questionIndex].questionTitle}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isLoading}
                              className="w-full"
                            />
                            {questionIndex !== 0 && (
                              <Button
                                onClick={() => remove(questionIndex)}
                                disabled={isLoading}
                                type="button"
                                variant="destructive"
                              >
                                <TrashIcon />
                              </Button>
                            )}
                          </div>
                          <ErrorMessage
                            name={`polls.${questionIndex}.questionTitle`}
                            component="p"
                            className="text-sm font-medium text-red-500 my-2"
                          />
                        </div>
                        <div className="mt-6">
                          <div className="pb-2">
                            <Label>Svaralternativer:</Label>
                          </div>
                          <FieldArray
                            name={`polls.${questionIndex}.questionOptions`}
                          >
                            {({ remove: removeOption, push: pushOption }) => (
                              <div className="space-y-3">
                                {question.questionOptions.map(
                                  (option, optionIndex) => (
                                    <div key={optionIndex}>
                                      <div className="flex gap-3">
                                        <Input
                                          id={`polls.${questionIndex}.questionOptions.${optionIndex}.option`}
                                          name={`polls.${questionIndex}.questionOptions.${optionIndex}.option`}
                                          type="text"
                                          maxLength={50}
                                          value={
                                            values.polls[questionIndex]
                                              .questionOptions[optionIndex]
                                              .option
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          disabled={isLoading}
                                          className="w-full"
                                        />
                                        {optionIndex > 1 && (
                                          <Button
                                            disabled={isLoading}
                                            onClick={() =>
                                              removeOption(optionIndex)
                                            }
                                            type="button"
                                            variant="destructive"
                                          >
                                            <TrashIcon />
                                          </Button>
                                        )}
                                      </div>
                                      <ErrorMessage
                                        name={`polls.${questionIndex}.questionOptions.${optionIndex}.option`}
                                        component="p"
                                        className="text-sm font-medium text-red-500 my-2"
                                      />
                                    </div>
                                  )
                                )}
                                {question.questionOptions.length < 6 && (
                                  <Button
                                    onClick={() => pushOption({ option: "" })}
                                    disabled={isLoading}
                                    variant="outline"
                                    type="button"
                                  >
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Legg til svaralternativ
                                  </Button>
                                )}
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      </div>
                    ))}
                    <div className="pb-6">
                      {values.polls.length < 10 && (
                        <Button
                          variant="secondary"
                          type="button"
                          disabled={isLoading}
                          onClick={() =>
                            push({
                              questionTitle: "",
                              questionOptions: [{ option: "" }, { option: "" }],
                            })
                          }
                        >
                          <PlusIcon className="mr-2 h-4 w-4" />
                          Legg til spørsmål
                        </Button>
                      )}
                      <div className="flex gap-3 mt-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                        >
                          <ChevronLeftIcon className="h-4 w-4 mr-1" />
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
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                              Oppretter poll...
                            </>
                          ) : (
                            "Opprett poll"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </FieldArray>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}
