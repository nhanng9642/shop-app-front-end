import {
    Button,
    Typography,
} from "@material-tailwind/react";

import { toast } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

import { signin, extractInputError, signInWithGoogle, signInWithFacebook} from "@/services";

import { TextInput, PasswordInput, SingInWithFB } from "@/components";
import { useAuth } from '@/context/auth-context';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function SignIn() {
    const { dispatch } = useAuth();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [searchParams] = useSearchParams();

    const handleSignIn = async (data, func) => {
        toast.promise(
            func(data),
            {
                loading: 'Signing in...',
                success: (response) => {
                    const { data } = response;
                    localStorage.setItem('token', data.accessToken);
                    dispatch({ type: 'SIGN_IN', payload: data.user });
                    return response.message;
                },
                error: ({message}) => {
                    const inputError = extractInputError(message);
                    setError(inputError, 
                            {type: 'manual', message: message}, {shouldFocus: true});
                    return message;
                }
            }
        )
    }

    const handleLoginGGSuccess = (data) => {
        handleSignIn(data, signInWithGoogle);
    };

    const handleLoginFBSuccess = (accessToken) => {
        handleSignIn({accessToken}, signInWithFacebook);
    };

    const onSubmit = async (data) => {
        handleSignIn(data, signin);
    }

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            location.reload();
        }
    }, [searchParams])

    return (
        <section className="flex bg-gray-100 min-h-screen">
            <div className="w-1/3 bg-white flex flex-col rounded-lg shadow-lg h-fit
            items-center justify-center m-auto p-5">
                <Typography variant="h2" className="font-bold mb-2 text-center">
                    Sign In
                </Typography>

                <form className="mt-4 mb-2 mx-auto w-full"
                    onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        register={register}
                        errors={errors}
                        name="username"
                        label="Username / Email"
                        autoFocus={true}
                    />

                    <PasswordInput 
                        register={register}
                        errors={errors}
                        name="password"
                        label="Password"
                    />

                    <Button className="text-base" fullWidth type="submit">
                        SIGN IN
                    </Button>

                    <div className="mt-4 flex justify-between">
                        <Link to="/auth/forgot-password" 
                            className="text-gray-900 text-sm hover:text-blue-700">
                            Forgot Password?
                        </Link>
                        
                        <Link to="/auth/sign-up" 
                            className="text-gray-900 text-sm hover:text-blue-700">
                            Sign up
                        </Link>
                    </div>
                </form>

                <div className="space-y-4 mt-8">
                    
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin onSuccess={handleLoginGGSuccess} 
                                    onError={() => console.error("Login Failed")} />
                    </GoogleOAuthProvider>

                    <SingInWithFB 
                        onSuccess={handleLoginFBSuccess} />
                </div>
            </div>
        </section>
    );
}

export default SignIn;
