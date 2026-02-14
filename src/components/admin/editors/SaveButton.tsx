"use client";

import React from "react";

interface SaveButtonProps {
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    label?: string;
}

export default function SaveButton({ onClick, loading = false, disabled = false, label = "저장" }: SaveButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={loading || disabled}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            {loading ? (
                <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    저장 중...
                </>
            ) : (
                label
            )}
        </button>
    );
}
