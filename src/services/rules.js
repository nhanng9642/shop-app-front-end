export const passwordRules = {
    minLength: {
        value: 6,
        message: "Your password must be at least 6 characters",
    }
};

export const confirmPasswordRules = (watch, password = "password") => ({
    validate: (value) => {
        if (value !== watch(password)) {
            return "Passwords do not match";
        }
    }
})