import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { validationCreatePoll } from '@/schemas/index';
import { Formik, Form, ErrorMessage } from 'formik';

export default function PollStart({ setPollTitle, setPollDescription, nextStep }) {

  const handleSubmit = async (values) => {
    setPollTitle(values.title)
    setPollDescription(values.description)
    nextStep();
  };

  return (
    <div className="flex w-full md:mx-auto md:w-6/12 flex-col">
      <div>
        <h1 className="text-3xl font-semibold">Opprett en Poll</h1>
      </div>
      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={validationCreatePoll}
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange, handleBlur, values }) => (
          <Form>
            <div>
              <Label htmlFor="title">Tittel:</Label>
              <Input
                id="title"
                name="title"
                type="text"
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
              <Input
                id="description"
                name="description"
                type="text"
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
  ); 
}