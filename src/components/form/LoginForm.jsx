"use client";

import { useState } from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validationLogin } from '@/schemas/index';
import { cn } from "@/lib/utils";

export default function LoginForm() {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    //her skal vi sende data til backend
    //her skal vi lage brukeren
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-40 lg:px-8">
      <div className="py-5">
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">
          Logg inn
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationLogin}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className="space-y-6">
              <div>
                <Label htmlFor="email">E-postadresse</Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className={cn(
                      errors.email && touched.email && 'border-red-500'
                    )}
                  />
                  {errors.email && (
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-sm font-medium text-red-500 my-2"
                    />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="password">Passord</Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="password"
                    autoCorrect="off"
                    disabled={isLoading}
                    className={cn(
                      errors.password && touched.password && 'border-red-500'
                    )}
                  />
                  {errors.password && (
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-sm font-medium text-red-500 my-2"
                    />
                  )}
                </div>
              </div>

                <Button
                  size="default"
                  className="w-full"
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
                      Logger inn...
                    </>
                  ) : (
                    "Logg inn"
                  )}
                </Button>
            </Form>
          )}
        </Formik>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Har du ikke en konto?{" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-primary underline"
          >
            Opprett en konto
          </Link>
        </p>
      </div>
    </div>
  );
}
