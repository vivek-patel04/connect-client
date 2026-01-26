"use client";

import { useState } from "react";
import { useGetMeQuery } from "@/hooks/api/user/useGetMeQuery";
import AddAwardForm from "../child/AddAwardForm";
import AwardCard from "../child/AwardCard";
import UpdateAwardForm from "../child/UpdateAwardForm";
import ErrorMessage from "../../error/ErrorMessage";

export default function Awards() {
    const [editAwardId, setEditAwardId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const { data, isLoading, error } = useGetMeQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5">
                <div className="loading-card-white">
                    <div className="loading-line-small"></div>
                    <div className="loading-line-mid mt-3"></div>
                </div>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <ErrorMessage />;
    }

    const awards = data?.personalData?.awards || [];

    return (
        <div className="backdrop-white-1">
            <div className=" flex justify-between items-start relative">
                <h1 className="text-heading font-semibold">Awards and Recognitions</h1>

                <button
                    onClick={() => {
                        setShowAddForm(true);
                    }}
                    className="btn-icon absolute -top-1 right-0"
                >
                    Add
                </button>
            </div>

            {showAddForm && <AddAwardForm onCancel={() => setShowAddForm(false)} />}

            <ul className={`mt-6 ${awards.length === 0 && "hidden"} flex flex-col gap-4`}>
                {awards.map(award => (
                    <li key={award.id}>
                        {editAwardId !== award.id ? (
                            <AwardCard award={award} onClickEdit={id => setEditAwardId(id)} />
                        ) : (
                            <UpdateAwardForm award={award} onCancel={() => setEditAwardId("")} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
