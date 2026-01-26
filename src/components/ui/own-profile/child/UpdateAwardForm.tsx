import { AwardType } from "@/types/user/types";
import { useState } from "react";
import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";
import { awardInputValidation } from "@/input-validation/user/inputValidators";
import { useUpdateAwardMutation } from "@/hooks/api/user/useUpdateAwardMutation";

interface PropsType {
    award: AwardType;
    onCancel: () => void;
}

export default function UpdateAwardForm({ award, onCancel }: PropsType) {
    const [inputs, setInputs] = useState({
        title: award.title,
        description: award.description,
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutateAsync, isPending } = useUpdateAwardMutation();

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;

        const { success, data, error } = awardInputValidation(inputs);

        if (!success) {
            setErrorMessage(error.issues[0].message);
            return;
        }
        try {
            await mutateAsync({ body: data, awardID: award.id });
            onCancel();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="max-w-[420px] w-full">
            <h2 className="text-heading font-semibold"> Update Award</h2>
            <form className="mt-4" onSubmit={handleOnSubmit}>
                <div>
                    <TextInput label="Title" value={inputs.title} onChange={e => setInputs(p => ({ ...p, title: e.target.value }))} maxLength={50} />
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
