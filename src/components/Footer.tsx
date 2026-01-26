"use client";

import React from "react";
import Image from "next/image";

import { siteConfig } from "@/data/siteConfig";

const Footer = ({ theme = "#FECE48" }: { theme?: string }) => {
    return (
        <footer className="bg-gray-900 py-12 text-gray-400 text-sm">
            <div className="container mx-auto px-4 text-center md:text-left">
                {/* 1. grid-cols-1 추가 (모바일에서 1열로 꽉 채우기 위함) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* 2. md:col-span-2 로 변경 (모바일에서는 col-span 적용 안 함) */}
                    {/* md:col-span-2 적용 (모바일 1칸, 데스크탑 2칸) */}
                    <div className="md:col-span-2">
                        <div className="mb-6 flex justify-center md:justify-start">
                            <Image
                                src="/logo-white.webp"
                                alt={siteConfig.common.companyName}
                                width={160}
                                height={48}
                                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                            />
                        </div>

                        {/* [중요] p 태그를 div로 변경하여 Hydration 에러 방지 */}
                        <div className="mb-4 text-center md:text-left text-sm text-gray-400">
                            {siteConfig.common.address}<br />
                            사업자등록번호: {siteConfig.common.businessNumber}
                        </div>
                    </div>
                    {/* 고객센터 영역: 이제 그리드가 1열이 되므로 text-center만 있어도 중앙으로 옵니다 */}
                    <div className="text-center md:text-center">
                        <h4 className="font-bold text-white mb-4">{siteConfig.footer.customerCenter}</h4>
                        <p className="font-bold text-lg mb-2" style={{ color: theme }}>{siteConfig.common.phoneNumber}</p>
                        <p className="whitespace-pre-line">{siteConfig.footer.operatingHours}</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-gray-600">
                    {siteConfig.common.copyright}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
