import { useMutation } from "@tanstack/react-query";

interface BodyType {
    email: string;
    password: string;
}

const login = async (body: BodyType) => {
    const response = await fetch(`/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: login,
        retry: false,
    });
};
