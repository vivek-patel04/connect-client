import { useMutation } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface BodyType {
    name: string;
    email: string;
    password: string;
}

const register = async (body: BodyType) => {
    const response = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "User registration failed");
    }

    return data;
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: register,
        retry: false,
    });
};
