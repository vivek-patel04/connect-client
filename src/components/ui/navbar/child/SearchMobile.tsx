"use client";

import { useAppDispatch } from "@/hooks/redux/hooks";
import { closeBurgerMenu } from "@/store/features/uiSlice";

export default function SearchMobile({ openSearch }: { openSearch: () => void }) {
    const dispatch = useAppDispatch();

    return (
        <button
            className="nav-item-mobile"
            onClick={() => {
                openSearch();
                dispatch(closeBurgerMenu());
            }}
        >
            Search
        </button>
    );
}
