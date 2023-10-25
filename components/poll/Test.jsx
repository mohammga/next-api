import React from "react";
import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";


export default function Test() {
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

  const questionValidationSchema = Yup.object().shape({
    polls: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Spørsmål er påkrevd"),
        options: Yup.array().of(
          Yup.object().shape({
            option: Yup.string().required("Svaralternativ er påkrevd"),
          })
        ),
      })
    ),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={questionValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, values }) => (
        <div className="flex mx-auto w-4/12 flex-col gap-4 border-none shadow-none">
          <h1 className="text-3xl font-bold mb-4">Tittel</h1>
          <Form>
            <FieldArray name="polls">
              {({ remove, push }) => (
                <div>
                  {values.polls.map((question, questionIndex) => (
                    <div className="mb-4" key={questionIndex}>
                      <Label htmlFor={`polls.${questionIndex}.title`}>
                        Spørsmål {questionIndex + 1}:
                      </Label>
                      <Input
                        id={`polls[${questionIndex}].title`}
                        name={`polls[${questionIndex}].title`}
                        type="text"
                        value={values.polls[questionIndex].question}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full"
                      />
                      <ErrorMessage
                        name={`polls.${questionIndex}.title`}
                        component="p"
                        className="text-sm font-medium text-red-500 my-2"
                      />

                      <Button
                        onClick={() => remove(questionIndex)}
                        type="button"
                        variant="destructive"
                      >
                        <TrashIcon />
                      </Button>

                      <Label className="block text-sm font-bold mb-2">
                        Svaralternativer:
                      </Label>
                      <FieldArray name={`polls.${questionIndex}.options`}>
                        {({ remove: removeOption, push: pushOption }) => (
                          <div>
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center space-x-4"
                              >
                                <Input
                                  id={`polls.${questionIndex}.options.${optionIndex}.option`}
                                  name={`polls.${questionIndex}.options.${optionIndex}.option`}
                                  type="text"
                                  value={
                                    values.polls[questionIndex].options[
                                      optionIndex
                                    ].option
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="w-full"
                                />
                    
                                <ErrorMessage
                                  name={`polls.${questionIndex}.options.${optionIndex}.option`}
                                  component="p"
                                  className="text-sm font-medium text-red-500 my-2"
                                />
                                <Button
                                  onClick={() => removeOption(optionIndex)}
                                  type="button"
                                  variant="destructive"
                                >
                                  <TrashIcon />
                                </Button>
                              </div>
                            ))}
                            <Button
                              onClick={() => pushOption({ option: "" })}
                              variant="outline"
                            >
                              <PlusIcon className="mr-2 h-4 w-4" />
                              Legg til svaralternativ
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    onClick={() =>
                      push({ title: "", options: [{ option: "" }] })
                    }
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Legg til spørsmål
                  </Button>
                  <div className="mt-4">
                    <Button type="submit">Lagre poll</Button>
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
