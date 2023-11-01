import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { validationCreatePoll } from '@/schemas/index';
import { Formik, Form, ErrorMessage } from 'formik';
import { capitalizeString } from "@/utils/capitalizeString";

export default function PollStart({ setPollTitle, setPollDescription, nextStep }) {
  const handleSubmit = async (values) => {
    setPollTitle(capitalizeString(values.title))
    setPollDescription(capitalizeString(values.description))
    nextStep();
  };

  return (
    <div className="flex justify-center md:items-center h-full">
      <div className="flex w-full md:w-[550px] flex-col">
        <div>
          <h1 className="text-3xl font-bold py-4">Opprett en poll</h1>
        </div>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={validationCreatePoll}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange, handleBlur, values }) => (
            <Form className="space-y-6">

            <Label htmlFor="title">Tittel:</Label>

              <div className="my-2">
                <Input
                  id="title"
                  name="title"
                  type="text"
                  maxLength={25}
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full"
                />
                {errors.title && (
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-sm font-medium text-red-500 my-2"
                  />
                )}
              </div>
              <div>
                <Label htmlFor="description">Beskrivelse:</Label>
                <Textarea
                  id="description"
                  name="description"
                  type="text"
                  maxLength={100}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full"
                />
                {errors.description && (
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-sm font-medium text-red-500 my-2"
                  />
                )}
              </div>
              <Button type="submit">Neste</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  ); 
}