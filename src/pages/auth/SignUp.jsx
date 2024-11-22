import {
  Button,
  Typography,
} from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { userServices, passwordRules, confirmPasswordRules } from "@/services";
import { PasswordInput, TextInput } from "@/components";

export function SignUp() {
  const { register, handleSubmit, setError, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    toast.promise(
        userServices.signup(data),
        {
            loading: 'Signing up...',
            success: (data) => {
                navigate('/auth/sign-in');
                return data.message;
            },
            error: ({message}) => {
                const inputError = userServices.extractInputError(message);
                setError(inputError, 
                        {type: 'manual', message: message}, {shouldFocus: true});
                return message;
            }
        }
    )
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

                <TextInput 
                    name="username"
                    autoFocus
                    register={register}
                    errors={errors}
                    label="Username"
                />

                <div className="flex gap-4">
                    <TextInput 
                        name="firstName"
                        register={register}
                        errors={errors}
                        label="First name"
                        validationRules={{
                            validate: (val) => {
                                const pattern = /^[a-zA-Z]+$/;
                                if (!pattern.test(val.trim())) {
                                    return "First name should only contain letters";
                                }
                            }
                        }}
                    />
                    
                    <TextInput 
                        name="lastName"
                        register={register}
                        errors={errors}
                        label="Last name"
                        optional
                        validationRules={{
                            validate: (val) => {
                                const pattern = /^[a-zA-Z]*$/;
                                if (!pattern.test(val.trim())) {
                                    return "Last name should only contain letters";
                                }
                            }
                        }}
                    />
                </div>

                <TextInput 
                    name="email"
                    register={register}
                    errors={errors}
                    label="Email"
                    validationRules={{
                        validate: (val) => {
                            const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                            if (!pattern.test(val.trim())) {
                                return "Enter a valid email";
                            }
                        }
                    }}
                />

                <PasswordInput
                    name="password"
                    register={register}
                    errors={errors}
                    label="Password"
                    validationRules={passwordRules}
                />

                <PasswordInput
                    name="confirm_password"
                    register={register}
                    errors={errors}
                    label="Confirm Password"
                    validationRules={confirmPasswordRules(watch)}
                />
                
                <Button className="mt-2 font-bold text-base" fullWidth type="submit">
                    Register Now
                </Button>
                
                <hr className="my-4 border-gray-300 w-full" />

                <div className="text-center">
                    <p className="opacity-70 inline text-sm">
                        Already have an account?
                    </p>
                    <Link to="/auth/sign-in" 
                        className="inline pl-2 font-bold text-blue-700 text-base
                                   hover:text-blue-900 hover:underline">
                            Log in
                    </Link>
                </div>
            </form>
        </div>
    </section>
);
}

export default SignUp;
