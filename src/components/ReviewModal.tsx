"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface Review {
    id: number;
    image: string;
    text: string;
    name: string;
    date?: string;
}

interface ReviewModalProps {
    review: Review;
    onClose: () => void;
    theme?: string;
}

const ReviewModal = ({ review, onClose, theme = "#FECE48" }: ReviewModalProps) => {
    if (!review) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                        <Image
                            src={review.image}
                            alt={review.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-lg" style={{ color: theme }}>{review.name}</span>
                            <span className="text-gray-400 text-sm">{review.date}</span>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <p className="text-white leading-relaxed whitespace-pre-wrap">
                                {review.text}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ReviewModal;
