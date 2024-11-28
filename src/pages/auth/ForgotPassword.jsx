import { useForm } from "react-hook-form";
import { Typography, Button } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';

import { TextInput } from "@/components";
import { forgotPassword } from "@/services";

export function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    console.log(data);

    toast.promise(
      forgotPassword(data),
      {
        loading: 'Loading...',
        success: (data) => data.message,
        error: (err) => err.message,
      }
    )
  }

  return (
    <section className="flex bg-gray-100 min-h-screen">
      <div className="w-1/3 bg-white flex flex-col rounded-lg shadow-lg h-fit
            items-center justify-center mx-auto mt-20 p-5">

        <Typography variant="h2" className="font-bold mb-2">
            Forgot Password
        </Typography>

        <form className="mt-4 mb-2 mx-auto w-full">
            <TextInput 
                label="Email"
                type="email"
                register={register}
                name="email"
                autoFocus
                email
                errors={errors}
            />

          <Button className="mt-6 text-md" type='submit'
            fullWidth onClick={handleSubmit(onSubmit)}>
                Submit
          </Button>
        </form>
        
      </div>
    </section>
  )
}
