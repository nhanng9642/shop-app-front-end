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

export const numberRule = {
    number: v => {
        if (isNaN(v)) return "Enter a valid number";
        return true;
    }
};

export const positiveRule = {
    positive: v => {
        if (v < 0) return "Enter a positive number";
        return true;
    }
}

export const integerRule = {
    integer: v => {
        if (!Number.isInteger(Number(v))) return "Enter an integer";
        return true;
    }
}

export const emailRule = {
    email: v => {
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!pattern.test(v.trim())) return "Enter a valid email";
        return true;
    }
}