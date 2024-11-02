import { useState } from 'react'
import { useForm } from "react-hook-form";
import { Typography, Input, Button } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';

import ErrorMessage from "../../components/ErrorMessage";
import { userServices } from "../../utils";

export function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    toast.promise(
      userServices.forgotPassword(data),
      {
        loading: 'Loading...',
        success: (data) => data.message,
        error: (err) => err.message,
      }
    )
  }
  const [error, setError] = useState(false);

  return (
    <section className="flex bg-gray-100 min-h-screen">
      <div className="w-1/3 bg-white flex flex-col rounded-lg shadow-lg h-fit
            items-center justify-center mx-auto mt-20 p-5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-2">
            Forgot Password
          </Typography>
        </div>
        <form className="mt-4 mb-2 mx-auto w-full">
          <div className="mb-4 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-5 font-medium">
              Email
            </Typography>
            <Input {...register("email", {
              required: "Please enter your email",
              validate: (val) => {
                const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                if (!pattern.test(val.trim())) {
                  return "Please enter a valid email";
                }
              }
            })}
              autoFocus
              size="md" onFocus={() => setError(false)}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email &&
              <ErrorMessage mess={errors.email.message} />
            }

            {error && <ErrorMessage mess={error} />}
          </div>

          <Button className="mt-6 text-md" type='submit'
            fullWidth onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </form>
      </div>
    </section>

  )
}
