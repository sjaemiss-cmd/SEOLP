/**
 * Landing Page Content Data
 * 
 * IMPORTANT: This file contains PURE DATA only.
 * - No HTML tags (use \n for line breaks)
 * - No CSS classes (styling is handled in components)
 * - All text is plain text
 * 
 * Styling and formatting should be handled in:
 * - UI components using the textFormatter utility
 * - Component-level conditional styling
 */

// ============================================
// Base Interfaces
// ============================================

export interface FeatureItem {
    title: string;
    description: string;
    icon?: 'award' | 'clock' | 'check' | 'users' | 'shield' | 'monitor' | 'ShieldCheck' | 'Smile' | 'Repeat';
    highlight?: boolean;
}

export interface CurriculumStep {
    step: string;
    title: string;
    description: string;
}

export interface OfferContent {
    title: string;
    priceDescription: string;
    points: string[];
    ctaText: string;
    ctaLink?: string;
}

export interface DiagnosisOption {
    id: string;
    text: string;
    score: number;
}

export interface DiagnosisQuestion {
    id: number;
    question: string;
    options: DiagnosisOption[];
}

export interface DiagnosisResult {
    minScore: number;
    maxScore: number;
    level: string;
    description: string;
    recommendation: string;
    color: string;
}

export interface DiagnosisContent {
    title: string;
    subtitle: string;
    questions: DiagnosisQuestion[];
    results: DiagnosisResult[];
}

export interface HeroContent {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink?: string;
}

export interface ProblemContent {
    title: string;
    subtitle: string;
    features: FeatureItem[];
}

export interface CurriculumContent {
    title: string;
    steps: CurriculumStep[];
}

export interface CTAContent {
    title: string;
    subtitle: string;
    button: string;
    link?: string;
}

// ============================================
// Intent-Specific Interfaces (Discriminated Union)
// ============================================

interface BaseLandingContent {
    theme: string;
    hero: HeroContent;
    problem: ProblemContent;
    curriculum: CurriculumContent;
    offer: OfferContent;
}

export interface SpeedContent extends BaseLandingContent {
    intentType: 'speed';
    designStyle: 'aggressive';
}

export interface SkillContent extends BaseLandingContent {
    intentType: 'skill';
    designStyle: 'trust';
    diagnosis: DiagnosisContent;
}

export interface CostContent extends BaseLandingContent {
    intentType: 'cost';
    designStyle: 'premium';
}

export interface PhobiaContent extends BaseLandingContent {
    intentType: 'phobia';
    cta: CTAContent;
}

export interface PracticeContent extends BaseLandingContent {
    intentType: 'practice';
}

export type LandingPageData = SpeedContent | SkillContent | CostContent | PhobiaContent | PracticeContent;

// ============================================
// Legacy Interface (for backward compatibility)
// ============================================

export interface LandingContent {
    hero: HeroContent;
    problem: ProblemContent;
    curriculum: CurriculumContent;
    offer: OfferContent;
    diagnosis?: DiagnosisContent;
    usp?: ProblemContent;
    theme?: string;
    designStyle?: 'aggressive' | 'trust' | 'premium';
    cta?: CTAContent;
}

// ============================================
// Content Data
// ============================================

export const landingData: Record<string, LandingContent> = {
    speed: {
        theme: "#EF4444",
        designStyle: 'aggressive',
        hero: {
            badge: "고객의 의심을 확신으로 바꿔주는 한 방",
            title: "학원들의 '3일 완성' 광고,\n진실을 폭로합니다.",
            subtitle: "재능 타고난 상위 1%가 아니라면 현실적으로 어렵습니다.\n희망 고문 대신, 누구나 가능한 '가장 빠른 1주일' 플랜을 제시합니다.",
            ctaText: "현실적인 1주 완성반 보기"
        },
        problem: {
            title: "왜 3일 만에 따려다\n3주가 걸릴까요?",
            subtitle: "팩트 체크: 3일 완성이 실패하는 이유",
            features: [
                {
                    title: "90%는 불합격",
                    description: "기능 4시간, 주행 6시간...\n법정 최소 시간만 타보고 시험장 가면\n대부분 떨어집니다.",
                    icon: 'shield',
                    highlight: false
                },
                {
                    title: "시간 2배 소요",
                    description: "한 번 떨어지면 재접수까지 3일 대기.\n결국 시간은 2배로 듭니다.",
                    icon: 'clock',
                    highlight: true
                },
                {
                    title: "비용 추가 발생",
                    description: "돈과 시간 아끼려다\n재시험 비용으로 15만 원 더 썼습니다.\n결국 4주 소요됩니다.",
                    icon: 'award',
                    highlight: false
                }
            ]
        },
        curriculum: {
            title: "재수 없는(One-Pass)\nNO FAIL ROUTINE",
            steps: [
                {
                    step: "Step 1",
                    title: "OT & 기능 기초",
                    description: "필기 요령 및 학습법 코칭.\n좌/우회전, 차선 유지(코스 따라가기) 집중 연습"
                },
                {
                    step: "Step 2",
                    title: "장내 기능 마스터",
                    description: "기기 조작, 경사로, 돌발, 가속 구간 완벽 공략.\n가장 어려운 직각(T자) 주차 공식 전수"
                },
                {
                    step: "Step 3",
                    title: "도로 주행 핵심 스킬",
                    description: "가감속, 차선 변경, 교차로(좌/우/유턴),\n커브, 차간 거리 유지 등 실전 스킬 훈련"
                },
                {
                    step: "Step 4",
                    title: "시험 코스 시뮬레이션",
                    description: "운전면허시험장 A, B, C, D 코스 완벽 분석.\n네비게이션 음성과 코스를 통째로 암기"
                }
            ]
        },
        offer: {
            title: "3개월 합격무제한반\n(기능+도로)",
            priceDescription: "500,000원 (2종 보통 기준, 부가세 별도)",
            points: [
                "3개월 내 면허 취득 시까지 무제한 교육",
                "불합격 시 추가 교육비 0원 보장",
                "도봉/노원 시험장 코스 완벽 분석",
                "합격할 때까지 끝까지 책임집니다"
            ],
            ctaText: "합격무제한반 상담하기"
        },
        get usp() {
            return this.problem;
        }
    },
    skill: {
        theme: "#3B82F6",
        designStyle: 'trust',
        hero: {
            badge: "LOGIC DRIVEN DRIVING",
            title: "운전은 감각이 아니라\n공식(Formula)입니다.",
            subtitle: "애매한 '감'으로 운전하면 반드시 떨어집니다.\n수학 문제 풀듯이 딱 떨어지는 정답만 알려드립니다.",
            ctaText: "합격 공식 다운로드"
        },
        problem: {
            title: "왜 30년 베테랑 아빠에게\n배워도 떨어질까요?",
            subtitle: "감으로 운전하는 것과 시험 합격 공식은 다릅니다.",
            features: [
                {
                    title: "감(Feeling) vs 공식(Logic)",
                    description: "모호한 감 대신\n명확한 수학 공식을 전수합니다.",
                    icon: 'monitor',
                    highlight: false
                },
                {
                    title: "Cheat Sheet 제공",
                    description: "시뮬레이터 화면에 표시되는\n가이드라인(정답선)만 따라가세요.",
                    icon: 'check',
                    highlight: true
                },
                {
                    title: "무제한 연습",
                    description: "횟수 제한 없이\n부족한 부분을 무한 반복하세요.",
                    icon: 'shield',
                    highlight: false
                }
            ]
        },
        curriculum: {
            title: "기계치도 합격하는\n공식 암기 루틴",
            steps: [
                {
                    step: "Step 1",
                    title: "OT & 기초 공식",
                    description: "필기 요령 및 학습법 코칭.\n핸들링, 차선 유지 등 기초 주행 공식 학습"
                },
                {
                    step: "Step 2",
                    title: "장내 기능 공식",
                    description: "기기 조작, 경사로, 가속 구간 공식화.\n가장 어려운 직각(T자) 주차 공식 완벽 전수"
                },
                {
                    step: "Step 3",
                    title: "도로 주행 공식",
                    description: "나의 주행 습관을 고수 매니저가 하나하나 샅샅히 파악하여 빗나간 각도와 타이밍을 미세 조정해드립니다."
                },
                {
                    step: "Step 4",
                    title: "시험 코스 분석",
                    description: "면허시험장 A~D 코스 정밀 분석.\n네비게이션 음성과 코스 공략법 암기"
                }
            ]
        },
        offer: {
            title: "3개월 합격무제한반\n(기능+도로)",
            priceDescription: "550,000원 (부가세 포함)",
            points: [
                "3개월 내 면허 취득 시까지 무제한 교육",
                "불합격 시 추가 교육비 0원 보장",
                "기능/도로주행 공식 완벽 전수",
                "합격할 때까지 끝까지 책임집니다"
            ],
            ctaText: "합격무제한반 상담하기"
        },
        diagnosis: {
            title: "나의 운전 실력 진단하기",
            subtitle: "간단한 테스트로 나에게 딱 맞는 커리큘럼을 찾아보세요.",
            questions: [
                {
                    id: 1,
                    question: "주차할 때 가장 어려운 점은 무엇인가요?",
                    options: [
                        { id: "a", text: "공간 감각이 없어서 어디로 꺾어야 할지 모르겠어요.", score: 1 },
                        { id: "b", text: "수정 주차가 너무 어려워요.", score: 2 },
                        { id: "c", text: "주차는 할 수 있는데 시간이 너무 오래 걸려요.", score: 3 },
                        { id: "d", text: "주차는 자신 있어요!", score: 4 }
                    ]
                },
                {
                    id: 2,
                    question: "차선 변경, 언제 가장 두려우신가요?",
                    options: [
                        { id: "a", text: "사이드미러 보는 것 자체가 무서워요.", score: 1 },
                        { id: "b", text: "끼어들 타이밍을 전혀 못 잡겠어요.", score: 2 },
                        { id: "c", text: "뒤차가 빵! 거릴까 봐 겁나요.", score: 3 },
                        { id: "d", text: "차선 변경은 문제 없어요.", score: 4 }
                    ]
                },
                {
                    id: 3,
                    question: "좁은 골목길이나 코너를 돌 때 느낌은?",
                    options: [
                        { id: "a", text: "긁을까 봐 조마조마해서 못 지나가겠어요.", score: 1 },
                        { id: "b", text: "반대편에서 차가 오면 멘붕이 와요.", score: 2 },
                        { id: "c", text: "천천히 가면 갈 수 있어요.", score: 3 },
                        { id: "d", text: "부드럽게 잘 빠져나갑니다.", score: 4 }
                    ]
                }
            ],
            results: [
                {
                    minScore: 0,
                    maxScore: 5,
                    level: "기초 메커니즘 이해 필요",
                    description: "재능은 충분합니다! 하지만 자만은 금물. '3개월 무제한반'으로 감각을 완벽하게 다듬고, 최단 기간 합격에 도전하세요. 평균 한달만에 면허취득까지 가능합니다!",
                    recommendation: "3개월 합격무제한반 (기초 집중)",
                    color: "text-red-500"
                },
                {
                    minScore: 6,
                    maxScore: 9,
                    level: "도로주행 공식 적용 필요",
                    description: "재능은 충분합니다! 하지만 자만은 금물. '3개월 무제한반'으로 감각을 완벽하게 다듬고, 최단 기간 합격에 도전하세요. 평균 한달만에 면허취득까지 가능합니다!",
                    recommendation: "3개월 합격무제한반 (공식 마스터)",
                    color: "text-orange-500"
                },
                {
                    minScore: 10,
                    maxScore: 12,
                    level: "합격 최적화 상태",
                    description: "재능은 충분합니다! 하지만 자만은 금물. '3개월 무제한반'으로 감각을 완벽하게 다듬고, 최단 기간 합격에 도전하세요. 평균 한달만에 면허취득까지 가능합니다!",
                    recommendation: "3개월 합격무제한반 (코스 분석)",
                    color: "text-green-500"
                }
            ]
        },
        get usp() {
            return this.problem;
        }
    },
    cost: {
        theme: "#FECE48",
        designStyle: 'premium',
        hero: {
            badge: "",
            title: `<span class="block text-xl md:text-3xl font-bold text-white/90 mb-6 font-sans tracking-tight">노원·도봉 1위 시뮬레이션 운전면허</span><span class="block text-4xl md:text-7xl font-black text-brand-yellow leading-tight font-sans tracking-tighter drop-shadow-lg">반값이면 충분합니다.</span>`,
            subtitle: "100만원짜리 운전면허, 반값으로 끝내세요.<br/>불합격해도 추가비용 0원.",
            ctaText: "추가비용 없이 시작하기"
        },
        problem: {
            title: "왜 고수의 운전면허 도봉점인가요?",
            subtitle: "다른 곳과는 비교할 수 없는 압도적인 차이",
            features: []
        },
        curriculum: {
            title: "가성비 끝판왕\n합격 최적화 루틴",
            steps: [
                {
                    step: "Step 1",
                    title: "OT & 기초 주행",
                    description: "필기 요령 및 학습법 코칭.\n기초 주행 능력 빠르게 습득"
                },
                {
                    step: "Step 2",
                    title: "장내 기능 마스터",
                    description: "기기 조작, 경사로, 돌발, 가속 구간.\n직각(T자) 주차 집중 훈련"
                },
                {
                    step: "Step 3",
                    title: "도로 주행 스킬",
                    description: "가감속, 차선 변경, 교차로, 커브 등\n실전 도로 주행 능력 배양"
                },
                {
                    step: "Step 4",
                    title: "시험 코스 완벽 대비",
                    description: "운전면허시험장 A~D 코스 시뮬레이션.\n코스 암기 및 모의고사 진행"
                }
            ]
        },
        offer: {
            title: "3개월 합격무제한반\n(기능+도로)",
            priceDescription: "550,000원 (부가세 포함)",
            points: [
                "3개월 내 면허 취득 시까지 무제한 교육",
                "학원 대비 50% 저렴한 비용",
                "불합격 시 추가 교육비 0원 보장",
                "합격할 때까지 끝까지 책임집니다"
            ],
            ctaText: "최저가 상담하기",
            ctaLink: "https://pcmap.place.naver.com/place/38729351/ticket"
        }
    },
    phobia: {
        theme: "#4ADE80",
        hero: {
            title: "도로 위가 무서우신가요?\n그건 당신의 잘못이 아닙니다.",
            subtitle: "사고 위험 0%의 안전한 시뮬레이터에서\n운전의 즐거움을 되찾아 드립니다.",
            badge: "장롱면허 탈출 솔루션",
            ctaText: "안전운전 체험 예약하기",
            ctaLink: "https://pcmap.place.naver.com/place/38729351/ticket"
        },
        problem: {
            title: "왜 운전이 두려워졌을까요?",
            subtitle: "도로 연수의 두려움을 제거하고 심리적 안전을 제공합니다.",
            features: [
                {
                    title: "절대 안전",
                    description: "사고로부터 100% 안전한 실내 시뮬레이터로 도로상황을 완벽하게 재현해 운전에 자신감을 쌓아갑니다",
                    icon: "ShieldCheck"
                },
                {
                    title: "친절한 교육",
                    description: "소리 지르지 않는 매니저님과 함께하는 편안한 수업",
                    icon: "Smile"
                },
                {
                    title: "무한 반복",
                    description: "두려운 구간만 집중적으로 반복하여 자신감 회복",
                    icon: "Repeat"
                }
            ]
        },
        curriculum: {
            title: "두려움을 자신감으로 바꾸는 3단계",
            steps: [
                {
                    step: "STEP 01",
                    title: "도로 주행 기초",
                    description: "가감속, 차선 변경, 교차로(좌/우/유턴), 커브, 차간 거리 유지 등 기초 주행 감각 회복"
                },
                {
                    step: "STEP 02",
                    title: "심화 주행 & 고속도로",
                    description: "고속 주행, 시내 주행(실제 도로 구현), 지방 도로 코스 등 다양한 환경 적응"
                },
                {
                    step: "STEP 03",
                    title: "주차 완전 정복",
                    description: "후진/평행/기계식 주차, 좁은 골목길, 주차장 진출입로 등 고난이도 주차 마스터"
                }
            ]
        },
        offer: {
            title: "장롱면허 탈출\n24시간 완성반",
            priceDescription: "640,000원 (2종 보통 기준, 부가세 별도)",
            points: [
                "충분한 시간으로 두려움 완벽 극복",
                "기초부터 주행까지 꼼꼼한 케어",
                "사고 위험 없는 안전한 연수",
                "자신감 생길 때까지 무한 반복"
            ],
            ctaText: "처방전대로 시작하기",
            ctaLink: "https://pcmap.place.naver.com/place/38729351/ticket"
        },
        cta: {
            title: "이제 운전이 즐거워집니다",
            subtitle: "더 이상 두려워하지 마세요. 고수의 운전면허가 함께합니다.",
            button: "무료 상담 신청하기",
            link: "https://pcmap.place.naver.com/place/38729351/ticket"
        }
    },
    practice: {
        theme: "#8B5CF6",
        hero: {
            badge: "초보 탈출 핀셋 과외",
            title: "운전, 부족한 점만 골라 채우세요.\n1:1 핀셋 과외로 완성합니다.",
            subtitle: "여행, 출장 앞두고 급하신가요?\n부족한 스킬만 쏙쏙 골라 채워드립니다.",
            ctaText: "원 포인트 레슨 예약",
            ctaLink: "https://pcmap.place.naver.com/place/38729351/ticket"
        },
        problem: {
            title: "도로 연수는 이동 시간이 절반입니다.",
            subtitle: "시뮬레이터는 원하는 상황만 무한 반복하여 효율을 극대화합니다.",
            features: [
                {
                    title: "주차 무한 반복",
                    description: "평행 주차, 후진 주차, 골목길 주차 등\n가장 어려운 주차만 집중 훈련합니다.",
                    icon: "Repeat",
                    highlight: true
                },
                {
                    title: "상황별 시나리오",
                    description: "골목길, 고속도로, 차로진입 등 까다로운 특정상황만 집중적으로 연습 가능합니다",
                    icon: "monitor",
                    highlight: false
                },
                {
                    title: "압도적 가성비",
                    description: "도로 연수 대비 1/2 가격으로\n원하는 만큼 충분히 연습하세요.",
                    icon: "award",
                    highlight: false
                }
            ]
        },
        curriculum: {
            title: "3시간 완성 핀셋 커리큘럼",
            steps: [
                {
                    step: "STEP 01",
                    title: "주행 감각 & 기초",
                    description: "가감속, 차선 변경, 교차로 등\n잊어버린 기초 주행 감각을 빠르게 되살립니다."
                },
                {
                    step: "STEP 02",
                    title: "고속 & 시내 주행",
                    description: "고속도로 진입, 복잡한 시내 주행,\n커브길 등 실전 도로 상황을 집중 연습합니다."
                },
                {
                    step: "STEP 03",
                    title: "주차 마스터",
                    description: "후진, 평행, 기계식 주차 및\n좁은 골목길 주차까지 완벽하게 마스터합니다."
                }
            ]
        },
        offer: {
            title: "속성 12시간 마스터반",
            priceDescription: "360,000원 (2종 보통 기준, 부가세 별도)",
            points: [
                "원하는 스킬만 집중 공략",
                "가성비 최고의 선택",
                "시간 낭비 없는 효율적 교육",
                "부족한 부분만 쏙쏙 골라 마스터"
            ],
            ctaText: "12시간반 무료체험&상담",
            ctaLink: "https://pcmap.place.naver.com/place/38729351/ticket"
        }
    }
};
