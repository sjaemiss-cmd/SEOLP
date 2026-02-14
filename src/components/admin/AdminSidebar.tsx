"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Settings,
    Layout,
    FileText,
    HelpCircle,
    Gift,
    Image,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    BarChart3,
    MapPin,
    Star,
    Layers,
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    color?: string;
}

const siteItems: NavItem[] = [
    { label: "공통정보", href: "/admin/common", icon: <Settings size={18} /> },
    { label: "헤더", href: "/admin/header", icon: <Layout size={18} /> },
    { label: "푸터", href: "/admin/footer", icon: <FileText size={18} /> },
];

const contentItems: NavItem[] = [
    { label: "FAQ", href: "/admin/faq", icon: <HelpCircle size={18} /> },
    { label: "이벤트", href: "/admin/event", icon: <Gift size={18} /> },
    { label: "미디어", href: "/admin/media", icon: <Image size={18} /> },
];

const componentItems: NavItem[] = [
    { label: "Trust Bar (지표)", href: "/admin/trustbar", icon: <BarChart3 size={18} /> },
    { label: "USP 카드", href: "/admin/usp", icon: <Star size={18} /> },
    { label: "프로그램 카드", href: "/admin/programs", icon: <Layers size={18} /> },
    { label: "위치 안내", href: "/admin/location", icon: <MapPin size={18} /> },
];

const intentItems: NavItem[] = [
    { label: "속성 (speed)", href: "/admin/intents/speed", icon: <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />, color: "#EF4444" },
    { label: "스킬 (skill)", href: "/admin/intents/skill", icon: <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />, color: "#3B82F6" },
    { label: "가성비 (cost)", href: "/admin/intents/cost", icon: <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />, color: "#FECE48" },
    { label: "공포증 (phobia)", href: "/admin/intents/phobia", icon: <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />, color: "#4ADE80" },
    { label: "연습 (practice)", href: "/admin/intents/practice", icon: <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />, color: "#8B5CF6" },
];

function NavSection({ title, items, defaultOpen = true }: { title: string; items: NavItem[]; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen);
    const pathname = usePathname();

    return (
        <div className="mb-2">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
            >
                {title}
                {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {open && (
                <div className="space-y-0.5">
                    {items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                    isActive
                                        ? "bg-gray-900 text-white font-medium"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function AdminSidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const sidebarContent = (
        <nav className="p-4 space-y-1">
            <div className="mb-6">
                <h1 className="text-lg font-bold text-gray-900 px-3">CMS 관리자</h1>
                <p className="text-xs text-gray-500 px-3 mt-1">고수의 운전면허 도봉점</p>
            </div>
            <NavSection title="사이트 설정" items={siteItems} />
            <NavSection title="콘텐츠" items={contentItems} />
            <NavSection title="컴포넌트" items={componentItems} />
            <NavSection title="인텐트" items={intentItems} />
        </nav>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-sm"
            >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform lg:translate-x-0 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {sidebarContent}
            </aside>
        </>
    );
}
