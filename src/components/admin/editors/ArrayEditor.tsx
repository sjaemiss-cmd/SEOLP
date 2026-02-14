"use client";

import React from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface ArrayEditorProps<T> {
    label: string;
    items: T[];
    onChange: (items: T[]) => void;
    renderItem: (item: T, index: number, update: (item: T) => void) => React.ReactNode;
    createItem: () => T;
    maxItems?: number;
}

export default function ArrayEditor<T>({
    label,
    items,
    onChange,
    renderItem,
    createItem,
    maxItems,
}: ArrayEditorProps<T>) {
    const addItem = () => {
        if (maxItems && items.length >= maxItems) return;
        onChange([...items, createItem()]);
    };

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const moveItem = (index: number, direction: "up" | "down") => {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= items.length) return;
        const newItems = [...items];
        [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
        onChange(newItems);
    };

    const updateItem = (index: number, item: T) => {
        const newItems = [...items];
        newItems[index] = item;
        onChange(newItems);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">{label} ({items.length})</label>
                <button
                    type="button"
                    onClick={addItem}
                    disabled={maxItems !== undefined && items.length >= maxItems}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                    <Plus size={14} /> 추가
                </button>
            </div>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white relative">
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => moveItem(index, "up")}
                                disabled={index === 0}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            >
                                <ChevronUp size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => moveItem(index, "down")}
                                disabled={index === items.length - 1}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            >
                                <ChevronDown size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="p-1 text-red-400 hover:text-red-600"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <div className="pr-20">
                            {renderItem(item, index, (updated) => updateItem(index, updated))}
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-lg">
                        항목이 없습니다. &quot;추가&quot; 버튼을 클릭하세요.
                    </p>
                )}
            </div>
        </div>
    );
}
