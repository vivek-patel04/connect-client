import { WorkExperienceType } from "@/types/user/types";
import { useState } from "react";
import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";
import DateInput from "../../common/DateInput";
import { useUpdateWorkMutation } from "@/hooks/api/user/useUpdateWorkMutation";
import { workExpInputValidation } from "@/input-validation/user/inputValidators";
import { LuTrash2 } from "react-icons/lu";

interface PropsType {
    work: WorkExperienceType;
    onCancel: () => void;
}

export default function UpdateWorkForm({ work, onCancel }: PropsType) {
    const [inputs, setInputs] = useState({
        organization: work.organization,
        role: work.role,
        location: work.location,
        startDate: work.startDate,
        endDate: work.endDate,
        description: work.description,
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutateAsync, isPending } = useUpdateWorkMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;

        const { success, data, error } = workExpInputValidation(inputs);

        if (!success) {
            setErrorMessage(error.issues[0].message);
            return;
        }
        try {
            await mutateAsync({ body: data, workID: work.id });
            onCancel();
        } catch (error) {}
    };
    return (
        <div className="max-w-[420px] w-full">
            <h2 className="text-heading font-semibold"> Update Work Experience</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div>
                    <TextInput
                        label="Organization"
                        value={inputs.organization}
                        onChange={e => setInputs(p => ({ ...p, organization: e.target.value }))}
                        maxLength={50}
                    />
                </div>

                <div className="mt-4">
                    <TextInput label="Role*" value={inputs.role} onChange={e => setInputs(p => ({ ...p, role: e.target.value }))} maxLength={50} />
                </div>

                <div className="mt-4">
                    <TextInput label="Location" value={inputs.location} onChange={e => setInputs(p => ({ ...p, location: e.target.value }))} maxLength={50} />
                </div>

                <div className="mt-4">
                    <DateInput
                        label="Start date (DD-MM-YYYY)"
                        value={inputs.startDate}
                        onChange={newDate =>
                            setInputs(p => ({ ...p, startDate: newDate ? newDate.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10) }))
                        }
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

                    <button className="btn" onClick={onCancel} type="button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
