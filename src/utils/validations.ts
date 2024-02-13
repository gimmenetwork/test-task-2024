export const isValidUsername = (username: string): boolean => {
    return username.trim().length >= 6;
};

export const isValidPassword = (password: string): boolean => {
    return password.trim().length >= 10;
};
