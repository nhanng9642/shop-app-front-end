import {useEffect, useState} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Typography, Input, Button } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';

import { ErrorMessage } from "@/components";
import { resetPassword } from "@/services";

export function ResetPassword() {
  const [tokenReset, setTokenReset] = useState('')
  const [searchParams] = useSearchParams()
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    toast.promise(
      resetPassword(data, tokenReset),
      {
        loading: 'Loading...',
        success: () => {
          navigate('/auth/sign-in');
         return  "Reset password successfully!"
        },
        error: (err) => err.message,
      }
    )
  }

  useEffect(() => {
    setTokenReset(searchParams.get('token'))
  }, [searchParams])

  return (
    <section className="flex bg-gray-100 min-h-screen">
      <div className="w-1/3 bg-white flex flex-col rounded-lg shadow-lg h-fit
            items-center justify-center mx-auto mt-20 p-5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-2">
            Reset Password
          </Typography>
        </div>
        <form className="mt-4 mb-2 mx-auto w-full">
        <div className="mb-1 flex flex-col gap-6 mt-4">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              New Password
            </Typography>
            <Input {...register('password', {
              required: 'Please enter your password',
              minLength: {
                value: 6,
                message: "Your password must be at least 6 characters",
              }
            })}
              type="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && <ErrorMessage mess={errors.password.message} />}
          </div>

          <div className="mb-1 flex flex-col gap-6 mt-4">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              Confirm Password
            </Typography>
            <Input
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (val) => {
                  if (watch('password') != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              type="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.confirm_password && <ErrorMessage mess={errors.confirm_password.message} />}
          </div>

          <Button className="mt-6 text-md" type='submit'
            fullWidth onClick={handleSubmit(onSubmit)}>
            Reset
          </Button>
        </form>
      </div>
    </section>

  )
}
