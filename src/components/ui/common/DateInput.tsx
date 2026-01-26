"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface propsType {
    label?: string;
    value?: string | null;
    onChange?: (newDate: Date | null) => any;
}

function DateInput({ label = "Select date", value = null, onChange = () => {} }: propsType) {
    return (
        <div>
            <label className={`text-small text-white-50 ml-2`}>{label}</label>
            <div className="w-full">
                <DatePicker
                    dateFormat={"dd-MM-yyyy"}
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
                    className="input-text"
                    wrapperClassName="w-full"
                />
            </div>
        </div>
    );
}

export default DateInput;
