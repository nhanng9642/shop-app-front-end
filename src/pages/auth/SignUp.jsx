import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { userServices } from "../../utils";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await userServices.signup(data);
    console.log(res)

    if (res.status === 'success') {
      toast.success('Sign up successfully!')
      navigate('/auth/sign-in');
    } else {
      setError(res.message);
    }
  }

  return (
    <section className="flex bg-gray-100 h-screen">
      <div className="w-1/3 bg-white flex flex-col rounded-lg shadow-lg h-fit
            items-center justify-center m-auto p-5">
        <div className="text-center w-full">
          <Typography variant="h2" className="font-bold mb-2">
            Sign Up
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}
          className="mt-4 mb-2 mx-auto w-full">
          <div className="mb-3 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              Full Name
            </Typography>
            <Input {...register('name', {
              required: 'Please enter your full name',
              validate: (val) => {
                const pattern = /^[a-zA-Z]+(\s[a-zA-Z]+)+$/;
                if (!pattern.test(val.trim())) {
                  return "Your name must be at least 2 words, and only contain letters";
                }
              }
            })}
              placeholder="Your Name" autoFocus
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {errors.name && <ErrorMessage mess={errors.name.message} />}
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              Email
            </Typography>
            <Input onFocus={() => setError(false)}
              {...register('email', {
                required: 'Please enter your email',
                validate: (val) => {
                  const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                  if (!pattern.test(val.trim())) {
                    return "Please enter a valid email";
                  }
                }
              })}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && <ErrorMessage mess={errors.email.message} />}
            {error && <ErrorMessage mess={error} />}
          </div>

          <div className="mb-1 flex flex-col gap-6 mt-4">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              Password
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

          <div className="mt-2">
          </div>

          <Checkbox
            {...register('agree', {
              required: 'Please agree to our terms and conditions',
            })
            }
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <div className="mb-4">
          </div>
          {errors.agree && <ErrorMessage mess={errors.agree.message} />}
          <Button className="mt-6" fullWidth type="submit">
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
