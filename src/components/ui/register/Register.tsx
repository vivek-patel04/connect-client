"use client";

import { useState } from "react";
import { registerInputValidator } from "@/input-validation/auth/inputValidators";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/hooks/api/auth/useRegisterMutation";
import AuthShowPassword from "../common/AuthShowPassword";

export default function Register() {
    const router = useRouter();
    let { mutateAsync, isPending } = useRegisterMutation();

    const [input, setInput] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setInput(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) {
            return;
        }
        setErrorMessage("");
        const { data, error } = registerInputValidator(input);
        if (error) {
            setErrorMessage(`* ${error.issues[0].message}`);
            return;
        }
        try {
            await mutateAsync({ name: data.name, email: data.email, password: data.password });
            setInput({ name: "", email: "", password: "", confirmPassword: "" });
            router.push("/feed");
        } catch (error: any) {
            setErrorMessage(`* ${error.message}`);
            setInput(prev => ({ ...prev, password: "", confirmPassword: "" }));
        }
    };
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" className="input-auth" placeholder="Enter your name" value={input.name} onChange={e => handleOnChangeInput(e, "name")} />
                <input
                    type="text"
                    className="input-auth mt-3"
                    placeholder="Enter your email"
                    value={input.email}
                    onChange={e => handleOnChangeInput(e, "email")}
                />
                <input
                    type={showPassword ? "text" : "password"}
                    className="input-auth mt-3"
                    placeholder="Enter your password"
                    value={input.password}
                    onChange={e => handleOnChangeInput(e, "password")}
                />
                <input
                    type={showPassword ? "text" : "password"}
                    className="input-auth mt-3"
                    placeholder="Enter your password"
                    value={input.confirmPassword}
                    onChange={e => handleOnChangeInput(e, "confirmPassword")}
                />
                <div className="mt-3">
                    <AuthShowPassword showPassword={showPassword} onChange={() => setShowPassword(prev => !prev)} />
                </div>
                {errorMessage && (
                    <div className="mt-3 text-[red] text-small">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <input
                    type="submit"
                    value={isPending ? "Registering" : "Register"}
                    className={`${isPending ? "btn-auth-disable" : "btn-auth"} mt-3`}
                    disabled={isPending}
                />
            </form>
        </div>
    );
}
