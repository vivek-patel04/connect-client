"use client";

import TextArea from "@/components/ui/common/TextArea";
import TextInput from "@/components/ui/common/TextInput";
import { useAddAwardMutation } from "@/hooks/api/user/useAddAwardMutation";
import { awardInputValidation } from "@/input-validation/user/inputValidators";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function AddAwardForm({ onCancel }: { onCancel: () => void }) {
    const { mutateAsync, isPending } = useAddAwardMutation();
    const [htmlElement, setHtmlElement] = useState<HTMLElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [initial, setInitial] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        setHtmlElement(document.getElementById("modal"));
        document.body.classList.add("lock-scroll");

        return () => {
            document.body.classList.remove("lock-scroll");
        };
    }, []);

    if (!htmlElement) return null;

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return;
        setErrorMessage(null);

        const { success, data, error } = awardInputValidation(initial);

        if (!success) {
            setErrorMessage(error.issues[0].message);
            return;
        }
        try {
            await mutateAsync(data);
            onCancel();
        } catch (error) {}
    };

    return createPortal(
        <div className="modal-bg flex justify-center items-center">
            <div className="backdrop-white-1 max-w-[520px] max-h-[90dvh] overflow-y-auto no-scrollbar">
                <div className="flex justify-center">
                    <h2 className="text-heading font-semibold"> Add Award and Recognition</h2>
                </div>
                <form className="mt-4" onSubmit={handleOnSubmit}>
                    <div>
                        <TextInput label="Title*" value={initial.title} onChange={e => setInitial(p => ({ ...p, title: e.target.value }))} maxLength={50} />
                    </div>

                    <div className="mt-4">
                        <TextArea
                            label="Description"
                            value={initial.description}
                            onChange={e => setInitial(p => ({ ...p, description: e.target.value }))}
                            maxLength={750}
                        />
                    </div>

                    <div className={`mt-3 ${errorMessage ? "block" : "hidden"}`}>
                        <p className="text-red-500">{errorMessage}</p>
                    </div>

                    <div className="mt-3 flex gap-3">
                        <input type="submit" value={isPending ? "Saving" : "Save"} className="btn" disabled={isPending} />

                        <button type="button" onClick={onCancel} className="btn">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        htmlElement
    );
}
