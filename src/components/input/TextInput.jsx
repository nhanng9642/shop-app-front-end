import { Input, Textarea } from "@material-tailwind/react";
import { ErrorMessage } from "..";

import { positiveRule, numberRule, integerRule } from '@/services'

const ruleFunctions = { number: numberRule, 
                        integer: integerRule, 
                        positive: positiveRule };

/* eslint-disable react/prop-types */
export const TextInput = ({ register, errors = {}, name, validationRules = {validate: {}}, label,
                            disabled = false, autoFocus = false,
                            isTextArea = false, optional = false,
                            integer = false, positive = false, number = false
                        }) => {
    
    const Component = isTextArea ? Textarea : Input;
    
    if (!optional) {
        validationRules["required"] = `Enter ${label.toLowerCase()}`;
    }

    const rules = { number, integer, positive };

    Object.keys(rules).forEach(rule => {
        if (rules[rule]) {
            validationRules.validate = { ...validationRules.validate, ...ruleFunctions[rule] };
        }
    });

    return (
        <div className={errors[name] ? "mb-4" : "mb-6"}>
            <Component
                autoComplete="on"
                autoFocus={autoFocus}
                autoCapitalize="on"
                variant="outlined"
                error={!!errors[name]}
                label={label}
                disabled={disabled}
                {...register(name, validationRules)}
            >
            </Component>

            {errors[name] && <ErrorMessage mess={errors[name].message} />}
        </div>
    )
};