"useClient";

import { useState } from "react";
import TextInput from "../../common/TextInput";
import DateInput from "../../common/DateInput";
import DropDownInput from "../../common/DropDownInput";
import TextInputCollection from "../../common/TextInputCollections";
import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import { useUpdateBasicInfoMutation } from "@/hooks/api/user/useUpdateBasicInfoMutation";

const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
];

export default function BasicInfoUpdateForm({ closeForm }: { closeForm: () => void }) {
    const { data } = useGetMeQuery();
    const [info, setInfo] = useState({
        dob: data?.personalData.dob,
        gender: data?.personalData.gender,
        hometown: data?.personalData.hometown,
        languages: data?.personalData.languages ? [...data?.personalData.languages] : [],
        interests: data?.personalData.interests ? [...data?.personalData.interests] : [],
    });
    const { mutateAsync } = useUpdateBasicInfoMutation();

    if (info.dob === undefined || info.gender === undefined || info.hometown === undefined || info.languages === undefined || info.interests === undefined) {
        return null;
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cleanedInfo = {
            dob: info.dob || null,
            gender: info.gender || null,
            hometown: info.hometown || null,
            languages: info.languages.filter(lang => lang.trim() !== ""),
            interests: info.interests.filter(interest => interest.trim() !== ""),
        };

        try {
            await mutateAsync(cleanedInfo);
            closeForm();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form onSubmit={onSubmit} className="max-w-[420px] w-full">
            <div>
                <DateInput
                    label="Date of birth (DD-MM-YYYY)"
                    value={info.dob}
                    onChange={newDate => setInfo(p => ({ ...p, dob: newDate ? newDate.toISOString().slice(0, 10) : null }))}
                />
            </div>

            <div className="mt-4">
                <TextInput
                    label="Hometown"
                    value={info.hometown ? info.hometown : ""}
                    onChange={e => setInfo(p => ({ ...p, hometown: e.target.value ? e.target.value : null }))}
                    maxLength={50}
                />
            </div>

            <div className="mt-4">
                <DropDownInput label="Gender" options={genderOptions} value={info.gender} onChange={newGender => setInfo(p => ({ ...p, gender: newGender }))} />
            </div>

            <div className="mt-4">
                <TextInputCollection
                    label="Languages"
                    value={info.languages}
                    maxInputs={5}
                    maxLengthPerInput={15}
                    onChange={(newLanguage, index) =>
                        setInfo(p => {
                            const updated = [...p.languages];
                            updated[index] = newLanguage;
                            return { ...p, languages: updated };
                        })
                    }
                    onDelete={index =>
                        setInfo(p => {
                            const updated = [...p.languages].filter((_, i) => index !== i);
                            return { ...p, languages: updated };
                        })
                    }
                    onAdd={() => {
                        setInfo(p => {
                            const updated = [...p.languages, ""];
                            return { ...p, languages: updated };
                        });
                    }}
                />
            </div>

            <div className="mt-4">
                <TextInputCollection
                    label="Interests"
                    value={info.interests}
                    maxInputs={10}
                    maxLengthPerInput={30}
                    onChange={(newInterest, index) =>
                        setInfo(p => {
                            const updated = [...p.interests];
                            updated[index] = newInterest;
                            return { ...p, interests: updated };
                        })
                    }
                    onDelete={index =>
                        setInfo(p => {
                            const updated = [...p.interests].filter((_, i) => index !== i);
                            return { ...p, interests: updated };
                        })
                    }
                    onAdd={() => {
                        setInfo(p => {
                            const updated = [...p.interests, ""];
                            return { ...p, interests: updated };
                        });
                    }}
                />
            </div>

            <div className="mt-3 flex gap-3">
                <input type="submit" value="Save" className="btn" />

                <button className="btn" onClick={closeForm} type="button">
                    Cancel
                </button>
            </div>
        </form>
    );
}
