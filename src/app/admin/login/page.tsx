"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.replace("/admin/common");
            } else {
                const data = await res.json();
                setError(data.error || "로그인에 실패했습니다.");
            }
        } catch {
            setError("서버 연결에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-xl font-bold text-gray-900">CMS 관리자</h1>
                        <p className="text-sm text-gray-500 mt-1">고수의 운전면허 도봉점</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                                placeholder="관리자 비밀번호를 입력하세요"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "로그인 중..." : "로그인"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
