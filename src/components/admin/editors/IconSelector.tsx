"use client";

import React from "react";
import {
    Award, Clock, Check, Users, Shield, Monitor, ShieldCheck, Smile, Repeat,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
    award: <Award size={18} />,
    clock: <Clock size={18} />,
    check: <Check size={18} />,
    users: <Users size={18} />,
    shield: <Shield size={18} />,
    monitor: <Monitor size={18} />,
    ShieldCheck: <ShieldCheck size={18} />,
    Smile: <Smile size={18} />,
    Repeat: <Repeat size={18} />,
};

const ICON_NAMES = Object.keys(ICON_MAP);

interface IconSelectorProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export default function IconSelector({ label, value, onChange }: IconSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex flex-wrap gap-2">
                {ICON_NAMES.map((name) => (
                    <button
                        key={name}
                        type="button"
                        onClick={() => onChange(name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                            value === name
                                ? "bg-gray-900 text-white border-gray-900"
                                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                        }`}
                    >
                        {ICON_MAP[name]}
                        <span className="text-xs">{name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
