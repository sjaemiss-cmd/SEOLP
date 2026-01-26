"use client";

import React from "react";

const DrivingFormulaDiagram = () => {
    return (
        <div className="relative w-full h-full bg-blue-50 flex items-center justify-center overflow-hidden rounded-[22px] border border-blue-100">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            <div className="relative z-10 w-full max-w-[500px] aspect-square p-8">
                <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-lg">
                    {/* Parking Spot */}
                    <rect x="200" y="50" width="140" height="220" fill="white" stroke="#3B82F6" strokeWidth="3" strokeDasharray="10 5" rx="4" />
                    <text x="270" y="160" textAnchor="middle" fill="#94A3B8" fontSize="20" fontWeight="bold" fontFamily="monospace">PARKING ZONE</text>

                    {/* Path Line */}
                    <path
                        d="M 50 400 L 270 400 Q 340 400 340 330 L 340 180"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeDasharray="12 8"
                        opacity="0.6"
                    />

                    {/* Angle Marker */}
                    <path
                        d="M 270 400 L 320 350"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="3"
                    />
                    <circle cx="270" cy="400" r="6" fill="#EF4444" />
                    <text x="260" y="430" fill="#EF4444" fontSize="16" fontWeight="bold">45° Point</text>

                    {/* Car (Static, Large, High Quality) */}
                    <g transform="translate(290, 100) rotate(0)">
                        {/* Car Body */}
                        <rect x="-50" y="-90" width="100" height="180" rx="15" fill="#2563EB" stroke="#1E40AF" strokeWidth="3" />
                        {/* Windshield */}
                        <path d="M -40 -50 L 40 -50 L 35 -70 L -35 -70 Z" fill="#93C5FD" />
                        {/* Rear Window */}
                        <path d="M -40 40 L 40 40 L 35 60 L -35 60 Z" fill="#93C5FD" />
                        {/* Roof */}
                        <rect x="-40" y="-45" width="80" height="80" rx="5" fill="#1D4ED8" opacity="0.2" />
                        {/* Headlights */}
                        <path d="M -40 -85 L -30 -90 L -20 -85 Z" fill="#FEF08A" />
                        <path d="M 40 -85 L 30 -90 L 20 -85 Z" fill="#FEF08A" />
                        {/* Taillights */}
                        <rect x="-45" y="80" width="20" height="8" rx="2" fill="#EF4444" />
                        <rect x="25" y="80" width="20" height="8" rx="2" fill="#EF4444" />
                    </g>

                    {/* Formula Labels */}
                    <g transform="translate(60, 320)">
                        <rect x="0" y="0" width="140" height="50" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
                        <text x="70" y="20" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="monospace">FORMULA 01</text>
                        <text x="70" y="40" textAnchor="middle" fill="#1E293B" fontSize="14" fontWeight="bold">어깨선 맞춤</text>
                    </g>

                    <g transform="translate(360, 200)">
                        <rect x="0" y="0" width="140" height="50" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
                        <text x="70" y="20" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="monospace">FORMULA 02</text>
                        <text x="70" y="40" textAnchor="middle" fill="#1E293B" fontSize="14" fontWeight="bold">핸들 정렬</text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default DrivingFormulaDiagram;
