import {
  Input,
  Button,
  Typography
} from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {ErrorMessage} from "@/components";
import { userServices } from "@/services";
import { toast } from "react-hot-toast";

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
                setError(inputError, {type: 'manual', message: message}, {shouldFocus: true});
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
                <div className="mb-6 flex flex-col">
                    <Input 
                        autoFocus
                        label="Username"
                        variant="outlined"
                        error={errors.username}
                        {...register('username', {
                            required: 'Enter username'
                        })}
                    />
                    {errors.username && <ErrorMessage mess={errors.username.message} />}
                </div>

                <div className="mb-6 flex flex-col gap-6">
                    <div className="flex gap-4">
                        <div>
                            <Input 
                                label="First name"
                                variant="outlined"
                                error={errors.firstName}
                                {...register('firstName', {
                                required: 'Enter first name',
                                validate: (val) => {
                                    const pattern = /^[a-zA-Z]+$/;
                                    if (!pattern.test(val.trim())) {
                                        return "First name should only contain letters";
                                    }
                                }
                            })}
                            />
                            {errors.firstName && <ErrorMessage mess={errors.firstName.message} />}
                        </div>
                        
                        <div>
                            <Input 
                                label="Last name (optional)"
                                variant="outlined"
                                error={errors.lastName}
                                {...register('lastName', {
                                validate: (val) => {
                                    const pattern = /^[a-zA-Z]*$/;
                                    if (!pattern.test(val.trim())) {
                                        return "Last name should only contain letters";
                                    }
                                }
                            })}
                            />
                            
                            {errors.lastName && <ErrorMessage mess={errors.lastName.message} />}
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex flex-col">
                    <Input 
                        label="Email"
                        variant="outlined"
                        error={errors.email}
                        {...register('email', {
                            required: 'Enter email',
                            validate: (val) => {
                                const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                                if (!pattern.test(val.trim())) {
                                    return "Enter a valid email";
                                }
                            }
                        })}
                    />
                    {errors.email && <ErrorMessage mess={errors.email.message} />}
                </div>

                <div className="mb-6 mt-4">
                    <Input
                        label="Password"
                        variant="outlined"
                        error={errors.password}
                        type="password"
                        {...register('password', {
                        required: 'Enter password',
                        minLength: {
                            value: 6,
                            message: "Your password must be at least 6 characters",
                        }
                    })}
                    />
                    {errors.password && <ErrorMessage mess={errors.password.message} />}
                </div>

                <div className="mb-6 flex flex-col mt-4">
                    <Input
                        label="Confirm Password"
                        error={errors.confirm_password}
                        variant="outlined"
                        {...register("confirm_password", {
                            required: "Enter confirm password",
                            validate: (val) => {
                                if (watch('password') != val) {
                                    return "Your passwords do not match";
                                }
                            },
                        })}
                        type="password"
                    />
                    {errors.confirm_password && <ErrorMessage mess={errors.confirm_password.message} />}
                </div>
                
                <Button className="mt-2 font-bold text-base" fullWidth type="submit">
                    Register Now
                </Button>
                
                <hr className="my-4 border-gray-300 w-full" />

                <div className="mt-4 text-center">
                    <p className="opacity-70 inline">
                        Already have an account?
                    </p>
                    <Link to="/auth/sign-in" 
                        className="inline pl-2 font-bold text-blue-700 text-lg
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
