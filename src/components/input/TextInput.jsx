import { Input, Textarea } from "@material-tailwind/react";
import { ErrorMessage } from "..";

/* eslint-disable react/prop-types */
export const TextInput = ({ register, errors, name, validationRules = {}, label,
                            disabled = false, autoFocus = false,
                            isTextArea = false, optional = false }) => {
    
    const Component = isTextArea ? Textarea : Input;
    
    if (!optional) {
        validationRules["required"] = `Enter ${label.toLowerCase()}`;
    }

    return (
        <div className={errors[name] ? "mb-4" : "mb-6"}>
            <Component
                disabled={disabled}
                autoComplete="on"
                autoFocus={autoFocus}
                autoCapitalize="on"
                variant="outlined"
                error={!!errors[name]}
                label={label}
                {...register(name, validationRules)}
            >
            </Component>

            {errors[name] && <ErrorMessage mess={errors[name].message} />}
        </div>
    )
};