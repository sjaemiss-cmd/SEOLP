"use client";

import React from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Check, ArrowRight, Gift, Cookie } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const ICON_MAP: Record<string, React.ReactNode> = {
    Cookie: <Cookie size={24} />,
    Gift: <Gift size={24} />,
};

const CookieEvent = ({ theme = "#FECE48" }: { theme?: string }) => {
    const { siteConfig } = useSiteConfig();
    const event = siteConfig.event;
    if (!event || !event.plans || event.plans.length === 0) return null;

    return (
        <LazyMotion features={domAnimation}>
        <section id="event" className="py-16 md:py-24 bg-gradient-to-b from-[#3E2723] to-[#1A120B] border-y border-[#5D4037] relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={siteConfig.media?.eventBackground || "/images/cookieevent.png"}
                    alt="Cookie Event Background"
                    fill
                    loading="lazy"
                    sizes="100vw"
                    className="object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#3E2723]/90 via-[#3E2723]/80 to-[#1A120B]/90"></div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >

                        <span
                            className="inline-block text-black font-bold px-4 py-1.5 rounded-full mb-6 text-sm md:text-base shadow-lg"
                            style={{ backgroundColor: theme, boxShadow: `0 10px 15px -3px ${theme}33` }}
                        >
                            {event.badge}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep font-hakgyoansim leading-tight">
                            {event.title} <span style={{ color: theme }}>{event.titleHighlight}</span><br />
                            <span className="text-gray-300 text-2xl md:text-3xl font-normal mt-2 block">{event.subtitle}</span>
                        </h2>
                        <p className="text-orange-200/90 text-sm md:text-base font-medium bg-orange-900/30 inline-block px-4 py-2 rounded-lg border border-orange-500/20">
                            {event.urgencyNote}
                        </p>
                    </m.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {event.plans.map((plan, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0, x: plan.highlighted ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 + idx * 0.2 }}
                            className={`rounded-3xl p-8 relative overflow-hidden flex flex-col ${
                                plan.highlighted
                                    ? "bg-[#3E2723] border-2 shadow-lg"
                                    : "bg-[#4E342E]/50 backdrop-blur-sm border border-[#795548] transition-colors group"
                            }`}
                            style={plan.highlighted ? { borderColor: theme, boxShadow: `0 0 30px ${theme}1a` } : undefined}
                            onMouseEnter={!plan.highlighted ? (e) => { e.currentTarget.style.borderColor = `${theme}80`; } : undefined}
                            onMouseLeave={!plan.highlighted ? (e) => { e.currentTarget.style.borderColor = '#795548'; } : undefined}
                        >
                            <div
                                className={`absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-bl-xl ${
                                    plan.highlighted ? "text-black animate-pulse" : "bg-orange-600 text-white"
                                }`}
                                style={plan.highlighted ? { backgroundColor: theme } : undefined}
                            >
                                {plan.tag}
                            </div>

                            <div className="mb-6">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                    style={{
                                        backgroundColor: plan.highlighted ? `${theme}33` : 'rgba(249,115,22,0.2)',
                                        color: plan.highlighted ? theme : '#fb923c',
                                    }}
                                >
                                    {ICON_MAP[plan.icon] || <Gift size={24} />}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 font-hakgyoansim">{plan.title}</h3>
                                <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: plan.description.replace(/\n/g, '<br/>') }} />
                            </div>

                            <div
                                className="mb-8 p-4 rounded-xl border"
                                style={{
                                    backgroundColor: plan.highlighted ? 'rgba(45,31,27,0.8)' : 'rgba(62,39,35,0.5)',
                                    borderColor: plan.highlighted ? `${theme}4d` : '#5D4037',
                                }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span
                                        className="text-sm font-bold"
                                        style={{ color: plan.highlighted ? theme : '#9ca3af' }}
                                    >
                                        {plan.benefitLabel}
                                    </span>
                                    <span
                                        className="font-bold px-2 py-0.5 rounded text-xs"
                                        style={{
                                            backgroundColor: plan.highlighted ? `${theme}1a` : 'rgba(154,52,18,0.3)',
                                            color: plan.highlighted ? theme : '#fdba74',
                                        }}
                                    >
                                        {plan.benefitBadge}
                                    </span>
                                </div>
                                <div className="flex items-end gap-1">
                                    <span className="text-2xl font-bold text-white">{plan.benefitText}</span>
                                </div>
                            </div>

                            <ul className={`space-y-3 mb-8 ${plan.highlighted ? 'flex-1' : ''}`}>
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <Check size={16} className="mt-0.5 shrink-0" style={{ color: plan.highlighted ? theme : '#fb923c' }} />
                                        <span className={plan.highlighted && fIdx === 0 ? "font-bold text-white" : ""}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={plan.ctaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full block text-center font-bold py-4 rounded-xl transition-colors ${
                                    plan.highlighted
                                        ? "flex items-center justify-center gap-2 text-black shadow-lg hover:brightness-110"
                                        : "bg-[#5D4037] hover:bg-[#4E342E] text-white"
                                }`}
                                style={plan.highlighted ? { backgroundColor: theme } : undefined}
                            >
                                {plan.ctaText} {plan.highlighted && <ArrowRight size={20} />}
                            </a>
                        </m.div>
                    ))}
                </div>

                {event.disclaimer && (
                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-sm">
                            {event.disclaimer}
                        </p>
                    </div>
                )}
            </div>
        </section>
        </LazyMotion>
    );
};

export default CookieEvent;
