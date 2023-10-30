import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
    <div className="flex justify-center md:items-center h-full">
      <div className="flex w-full md:w-[550px] flex-col">
        <div>
          <h1 className="text-xl font-semibold py-4">Opprett en Poll</h1>
        </div>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={validationCreatePoll}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange, handleBlur, values }) => (
            <Form className="space-y-4">
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
                <Textarea
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
    </div>
  ); 
}