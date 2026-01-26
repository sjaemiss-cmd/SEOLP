"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

const FloatingCTA = ({ theme = "#FECE48" }: { theme?: string }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-auto md:right-8 z-40 p-4 md:p-0 flex flex-row md:flex-col gap-3 items-center md:items-end"
                >
                    {/* Naver Button */}
                    <a
                        href="https://pcmap.place.naver.com/place/38729351/ticket"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none w-full md:w-auto bg-[#03C75A] text-white font-bold text-lg py-4 px-6 rounded-xl shadow-xl hover:bg-[#02b351] transition-colors text-center flex items-center justify-center gap-2"
                    >
                        <span className="font-extrabold">N</span>
                        <span>무료체험예약</span>
                    </a>

                    {/* Call Button */}
                    <a
                        href="tel:02-930-9394"
                        className="flex-1 md:flex-none w-full md:w-auto text-black font-bold text-lg py-4 px-6 rounded-xl shadow-xl hover:brightness-110 transition-all text-center flex items-center justify-center gap-2 relative"
                        style={{ backgroundColor: theme }}
                    >
                        <span
                            className="bg-black text-xs px-2 py-0.5 rounded-full absolute -top-3 left-1/2 md:left-auto md:right-4 transform -translate-x-1/2 md:translate-x-0 animate-bounce whitespace-nowrap"
                            style={{ color: theme }}
                        >
                            상담 무료!
                        </span>
                        <Phone size={20} className="font-extrabold" />
                        <span>전화 상담</span>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingCTA;
