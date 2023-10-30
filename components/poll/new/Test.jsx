import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { questionValidationSchema, isAnyFieldEmpty } from "@/schemas/index";
import { capitalizeString } from "@/utils/capitalizeString";

export default function Test({
  pollTitle,
  pollDescription,
  session,
  setPollURL,
  setShowResult,
}) {
  const initialValues = {
    polls: [
      {
        title: "",
        options: [
          {
            option: "",
          },
        ],
      },
    ],
  };


  const handleSubmit = async (values) => {

    const pollData = {
      title: pollTitle,
      email: session?.user?.email,
      description: pollDescription,
      questions: values.polls.map((poll) => ({
        title: capitalizeString(poll.title),
        options: poll.options.map((option) => ({
          title: capitalizeString(option.option),
        })),
      })),
    };

    try {
      const response = await fetch("/api/polls/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pollData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setShowResult(true);
        setPollURL(`/poll/${responseData.data.id}`);
      } else {
        console.error("Failed to save the poll:", responseData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={questionValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, values, isValid }) => (
        <div className="flex mx-auto w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 flex-col space-y-4 border-none shadow-none">
          <h1 className="text-3xl font-bold mb-4"> {pollTitle} </h1>
          <Form>
            <FieldArray name="polls">
              {({ remove, push }) => (
                <div>
                  {values.polls.map((question, questionIndex) => (
                    <div className="mb-8" key={questionIndex}>
                      <Label htmlFor={`polls.${questionIndex}.title`}>
                        Spørsmål {questionIndex + 1}:
                      </Label>

                      <div className="flex gap-3">
                        <Input
                          id={`polls[${questionIndex}].title`}
                          name={`polls[${questionIndex}].title`}
                          type="text"
                          maxLength={50}
                          value={values.polls[questionIndex].title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full"
                        />

                        {questionIndex !== 0 && (
                          <Button
                            onClick={() => remove(questionIndex)}
                            type="button"
                            variant="destructive"
                          >
                            <TrashIcon />
                          </Button>
                        )}
                      </div>
                      <ErrorMessage
                        name={`polls.${questionIndex}.title`}
                        component="p"
                        className="text-sm font-medium text-red-500 my-2"
                      />

                      <Label>Svaralternativer:</Label>
                      <FieldArray name={`polls.${questionIndex}.options`}>
                        {({ remove: removeOption, push: pushOption }) => (
                          <div>
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex-col items-center space-y-2 py-3"
                              >
                                <div className="flex gap-3">
                                  <Input
                                    id={`polls.${questionIndex}.options.${optionIndex}.option`}
                                    name={`polls.${questionIndex}.options.${optionIndex}.option`}
                                    type="text"
                                    maxLength={50}
                                    value={
                                      values.polls[questionIndex].options[
                                        optionIndex
                                      ].option
                                    }
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full"
                                  />
                                  {optionIndex > 1 && (
                                    <Button
                                      onClick={() => removeOption(optionIndex)}
                                      type="button"
                                      variant="destructive"
                                    >
                                      <TrashIcon />
                                    </Button>
                                  )}
                                </div>

                                <ErrorMessage
                                  name={`polls.${questionIndex}.options.${optionIndex}.option`}
                                  component="p"
                                  className="text-sm font-medium text-red-500 my-2"
                                />
                              </div>
                            ))}
                            {question.options.length < 6 && (
                              <Button
                                onClick={() => pushOption({ option: "" })}
                                variant="outline"
                              >
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Legg til svaralternativ
                              </Button>
                            )}
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  ))}
                  {values.polls.length < 10 && (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        push({
                          title: "",
                          options: [{ option: "" }, { option: "" }],
                        })
                      }
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Legg til spørsmål
                    </Button>
                  )}

                  <div className="mt-4">
                    <Button
                      type="submit"
                      disabled={isAnyFieldEmpty(values) || !isValid}
                    >
                      Lagre poll
                    </Button>
                  </div>
                </div>
              )}
            </FieldArray>
          </Form>
        </div>
      )}
    </Formik>
  );
}
