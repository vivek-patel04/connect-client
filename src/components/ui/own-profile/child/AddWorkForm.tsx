import DateInput from "@/components/ui/common/DateInput";
import TextArea from "@/components/ui/common/TextArea";
import TextInput from "@/components/ui/common/TextInput";
import { useAddWorkMutation } from "@/hooks/api/user/useAddWorkMutation";
import { workExpInputValidation } from "@/input-validation/user/inputValidators";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface InitialType {
    organization: string;
    role: string;
    location: string;
    startDate: string | null;
    endDate: string | null;
    description: string | null;
}

export default function AddWorkForm({ onCancel }: { onCancel: () => void }) {
    const [htmlElement, setHtmlElement] = useState<HTMLElement | null>(null);

    const [inputs, setInputs] = useState<InitialType>({
        organization: "",
        role: "",
        location: "",
        startDate: null,
        endDate: null,
        description: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutateAsync, isPending } = useAddWorkMutation();

    useEffect(() => {
        setHtmlElement(document.getElementById("modal"));
        document.body.classList.add("lock-scroll");

        return () => {
            document.body.classList.remove("lock-scroll");
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return;
        setErrorMessage(null);

        const { success, data, error } = workExpInputValidation(inputs);

        if (!success) {
            setErrorMessage(error.issues[0].message);
            return;
        }
        try {
            await mutateAsync(data);
            onCancel();
        } catch (error) {}
    };

    if (!htmlElement) return null;
    return createPortal(
        <div className="modal-bg flex justify-center items-center">
            <div className="backdrop-white-1 max-w-[520px] max-h-[90dvh] overflow-y-auto no-scrollbar">
                <div className="flex justify-center">
                    <h2 className="text-heading font-semibold"> Add Work Experience</h2>
                </div>

                <form className="mt-4" onSubmit={handleSubmit}>
                    <div>
                        <TextInput
                            label="Organization*"
                            value={inputs.organization}
                            onChange={e => setInputs(p => ({ ...p, organization: e.target.value }))}
                            maxLength={50}
                        />
                    </div>

                    <div className="mt-4">
                        <TextInput label="Role*" value={inputs.role} onChange={e => setInputs(p => ({ ...p, role: e.target.value }))} maxLength={50} />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            label="Location*"
                            value={inputs.location}
                            onChange={e => setInputs(p => ({ ...p, location: e.target.value }))}
                            maxLength={50}
                        />
                    </div>

                    <div className="mt-4">
                        <DateInput
                            label="Start date* (DD-MM-YYYY)"
                            value={inputs.startDate}
                            onChange={newDate => setInputs(p => ({ ...p, startDate: newDate ? newDate.toISOString().slice(0, 10) : null }))}
                        />
                    </div>

                    <div className="mt-4">
                        <DateInput
                            label="End date (DD-MM-YYYY)"
                            value={inputs.endDate}
                            onChange={newDate => setInputs(p => ({ ...p, endDate: newDate ? newDate.toISOString().slice(0, 10) : null }))}
                        />
                    </div>

                    <div className="mt-4">
                        <TextArea
                            label="Description"
                            value={inputs.description}
                            onChange={e => setInputs(p => ({ ...p, description: e.target.value }))}
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
