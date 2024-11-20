import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { ErrorMessage } from "..";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

/* eslint-disable react/prop-types */
export const PasswordInput = ({ register, errors, validationRules = {},
                                name, label, optional = false }) => {
    
    const [passwordShown, setPasswordShown] = useState(false);
    const toggleShowPassword = () => setPasswordShown((prev) => !prev);
    
    if (!optional) {
        validationRules["required"] = `Enter ${label.toLowerCase()}`;
    }

    return (
        <div className={errors[name] ? "mb-4" : "mb-6"}>
        <Input
            autoCapitalize="on"
            variant="outlined"
            error={!!errors[name]}
            type={passwordShown ? "text" : "password"}
            label={label}
            {...register(name, validationRules)}
            icon={
                <i 
                    className="cursor-pointer hover:text-blue-600"
                    onClick={toggleShowPassword}>
                  {passwordShown ? (
                    <EyeIcon className="h-45 w-45" />
                  ) : (
                    <EyeSlashIcon className="h-45 w-45" />
                  )}
                </i>
            }
        >
        </Input>

        {errors[name] && <ErrorMessage mess={errors[name].message} />}
        </div>
    )
};