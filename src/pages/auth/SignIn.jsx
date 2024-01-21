import { useForm } from "react-hook-form";
import {
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";

import { useGlobalContext, signin } from '../../context';
import { Link } from "react-router-dom";

import { userServices } from "../../utils";
import { useState, useRef, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage";

export function SignIn() {
    const { state, dispatch } = useGlobalContext();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState(false);

    const onSubmit = async (data) => {
        const res = await userServices.signin(data);
        console.log(res)

        if (res.status === 'success') {
            const user = res.data;
            dispatch(signin(user));
            toast.success('Sign in successfully');
            localStorage.setItem('token', res.token);
        } else {
            setError(true);
        }
    }

    return (
        <section className="flex bg-gray-100 min-h-screen">
            <div className="w-1/3 bg-white flex flex-col rounded-lg shadow-lg h-fit
            items-center justify-center m-auto p-5">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-2">
                        Sign In
                    </Typography>
                </div>
                <form className="mt-4 mb-2 mx-auto w-full">
                    <div className="mb-4 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-5 font-medium">
                            Email
                        </Typography>
                        <Input {...register("email", { required: "Please enter your email" })}
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
                    </div>

                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small"
                            color="blue-gray" className="-mb-5 font-medium">
                            Password
                        </Typography>
                        <Input {...register("password", { required: "Please enter your password" })}
                            type="password" onFocus={() => setError(false)}
                            size="md"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors.password && <ErrorMessage mess={errors.password.message} />}

                        {error && <ErrorMessage mess="Email or password is incorrect"/>}
                    </div>


                    <Button className="mt-6 text-md" fullWidth onClick={handleSubmit(onSubmit)}>
                        Sign In
                    </Button>

                    <div className="mt-6 flex justify-center">
                        <Typography variant="small" className="font-medium text-gray-900 ">
                            <a href="#">
                                Forgot Password
                            </a>
                        </Typography>
                    </div>
                    <div className="space-y-4 mt-8">
                        <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1156_824)">
                                    <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                                    <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                                    <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                                    <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1156_824">
                                        <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>Sign in With Google</span>
                        </Button>

                        <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" viewBox="0 0 48 48">
                                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                            </svg>
                            <span>Sign in With Facebook</span>
                        </Button>
                    </div>
                    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                        Not registered?
                        <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
                    </Typography>
                </form>

            </div>
            {/* <div className="w-2/5 h-full hidden lg:block">
                <img
                    src="/img/pattern.png"
                    className="h-full w-full object-cover rounded-3xl"
                />
            </div> */}

        </section>
    );
}

export default SignIn;
