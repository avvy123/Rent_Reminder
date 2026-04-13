"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
    label: string;
    value: string;
};

type SelectProps = {
    label?: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
};

export default function Select({
    label,
    options,
    value,
    onChange,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => o.value === value);

    // close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full" ref={ref}>
            {label && (
                <label className="block text-sm font-medium mb-1 text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Select button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white shadow-sm hover:border-gray-400 transition"
                >
                    <span className="text-gray-800">
                        {selected?.label || "Select option"}
                    </span>
                    <ChevronDown
                        className={`transition-transform ${open ? "rotate-180" : ""
                            }`}
                        size={18}
                    />
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${option.value === value ? "bg-gray-100 font-medium" : ""
                                    }`}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}