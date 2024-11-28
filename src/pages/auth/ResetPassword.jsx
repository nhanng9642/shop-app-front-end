import { useEffect, useState} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Typography,  Button } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';

import {  PasswordInput } from "@/components";
import { resetPassword, confirmPasswordRules } from "@/services";

export function ResetPassword() {
  const [tokenReset, setTokenReset] = useState('')
  const [searchParams] = useSearchParams()
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
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

        <Typography variant="h2" className="font-bold mb-2">
            Reset Password
        </Typography>

        <form className="mt-4 mb-2 mx-auto w-full">
            <PasswordInput 
                label="New password"
                register={register}
                name="password"
                autoFocus
                errors={errors}
            />

            <PasswordInput
                label="Confirm password"
                register={register}
                name="confirmPassword"
                errors={errors}
                validationRules={confirmPasswordRules(watch)}
            />

          <Button className="mt-6 text-md" type='submit'
            fullWidth onClick={handleSubmit(onSubmit)}>
            Reset
          </Button>
        </form>
      </div>
    </section>

  )
}
