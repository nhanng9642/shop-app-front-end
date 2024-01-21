import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <section className="flex bg-gray-100 h-screen">
      <div className="w-1/3 bg-white flex flex-col rounded-lg shadow-lg h-fit
            items-center justify-center m-auto p-5">
        <div className="text-center w-full">
          <Typography variant="h2" className="font-bold mb-2">
            Sign Up
          </Typography>
        </div>

        <form className="mt-4 mb-2 mx-auto w-full">
          <div className="mb-3 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              Full Name
            </Typography>
            <Input
              size="sm"
              placeholder="Your Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              Email
            </Typography>
            <Input
              size="sm"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6 mt-4">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              Password
            </Typography>
            <Input
              size="sm"
              type="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6 mt-4">
            <Typography variant="small" color="blue-gray"
              className="-mb-5 font-medium">
              Confirm Password
            </Typography>
            <Input
              size="sm"
              type="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth>
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
