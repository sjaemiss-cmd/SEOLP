"use client";

import React, { useEffect } from "react";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 z-50 animate-[fadeInUp_0.3s_ease-out]">
            <div
                className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium flex items-center gap-2 ${
                    type === "success" ? "bg-green-600" : "bg-red-600"
                }`}
            >
                <span>{type === "success" ? "✓" : "✕"}</span>
                <span>{message}</span>
                <button onClick={onClose} className="ml-2 hover:opacity-70">
                    ×
                </button>
            </div>
        </div>
    );
}
