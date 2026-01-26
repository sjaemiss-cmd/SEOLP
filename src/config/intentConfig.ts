/**
 * Intent Registry - Strategy Pattern for Landing Page Components
 * 
 * This file defines the component sets for each intent type, allowing
 * the page to dynamically select components without a switch statement.
 * 
 * To add a new intent:
 * 1. Create the intent's components in src/components/[intent]/
 * 2. Define the IntentType in this file
 * 3. Add the component set to INTENT_REGISTRY
 * 
 * No modification of page.tsx is required.
 */

import React from "react";
import type { CurriculumStep, LandingContent, OfferContent } from "@/data/landingData";


// Speed Components
import SpeedHero from "@/components/speed/SpeedHero";
import LicenseDDayCalculator from "@/components/speed/LicenseDDayCalculator";
import SpeedProblem from "@/components/speed/SpeedProblem";
import SpeedStory from "@/components/speed/SpeedStory";
import SpeedCurriculum from "@/components/speed/SpeedCurriculum";
import SpeedCTA from "@/components/speed/SpeedCTA";

// Phobia Components
import PhobiaHero from "@/components/phobia/PhobiaHero";
import AnxietyReliefPrescription from "@/components/phobia/AnxietyReliefPrescription";
import PhobiaProblem from "@/components/phobia/PhobiaProblem";
import PhobiaCurriculum from "@/components/phobia/PhobiaCurriculum";
import PhobiaCTA from "@/components/phobia/PhobiaCTA";

// Skill Components
import SkillHero from "@/components/skill/SkillHero";
import DriverDNATest from "@/components/skill/DriverDNATest";
import SkillProblem from "@/components/skill/SkillProblem";
import SkillCurriculum from "@/components/skill/SkillCurriculum";
import SkillCTA from "@/components/skill/SkillCTA";

// Practice Components
import PracticeHero from "@/components/practice/PracticeHero";
import CurriculumBuilder from "@/components/practice/CurriculumBuilder";
import PracticeProblem from "@/components/practice/PracticeProblem";
import PracticeCurriculum from "@/components/practice/PracticeCurriculum";
import PracticeCTA from "@/components/practice/PracticeCTA";

// Cost (Default) Components
import Hero from "@/components/Hero";
import CostCalculator from "@/components/CostCalculator";
import USP from "@/components/USP";
import Curriculum from "@/components/Curriculum";
import Offer from "@/components/Offer";

// ============================================
// Type Definitions
// ============================================

/**
 * All valid intent types.
 * Add new intents here to extend the system.
 */
export const INTENT_TYPES = ["speed", "phobia", "skill", "practice", "cost"] as const;
export type IntentType = (typeof INTENT_TYPES)[number];

type NoProps = Record<string, never>;

type LocationProps = {
    locationName?: string;
    keyword?: string;
};

type CostHeroProps = {
    data: LandingContent["hero"];
    theme: string;
    locationName?: string;
    keyword?: string;
    designStyle?: "aggressive" | "trust" | "premium";
};

type CostProblemProps = {
    data: LandingContent["problem"];
    theme: string;
};

type CostCurriculumProps = {
    title: string;
    steps: CurriculumStep[];
    theme: string;
};

type CostCTAProps = {
    offer: OfferContent;
    theme: string;
};

export type IntentComponentSet =
    | {
        isDataDriven?: false;
        Hero: React.ComponentType<LocationProps>;
        InteractiveSection: React.ComponentType<NoProps>;
        Problem: React.ComponentType<NoProps>;
        Story?: React.ComponentType<NoProps>;
        Curriculum: React.ComponentType<NoProps>;
        CTA: React.ComponentType<NoProps>;
    }
    | {
        isDataDriven: true;
        Hero: React.ComponentType<CostHeroProps>;
        InteractiveSection: React.ComponentType<NoProps>;
        Problem: React.ComponentType<CostProblemProps>;
        Curriculum: React.ComponentType<CostCurriculumProps>;
        CTA: React.ComponentType<CostCTAProps>;
    };

// ============================================
// Intent Registry
// ============================================

export const INTENT_REGISTRY: Record<IntentType, IntentComponentSet> = {
    speed: {
        Hero: SpeedHero,
        InteractiveSection: LicenseDDayCalculator,
        Problem: SpeedProblem,
        Story: SpeedStory,
        Curriculum: SpeedCurriculum,
        CTA: SpeedCTA,
    },
    phobia: {
        Hero: PhobiaHero,
        InteractiveSection: AnxietyReliefPrescription,
        Problem: PhobiaProblem,
        Curriculum: PhobiaCurriculum,
        CTA: PhobiaCTA,
    },
    skill: {
        Hero: SkillHero,
        InteractiveSection: DriverDNATest,
        Problem: SkillProblem,
        Curriculum: SkillCurriculum,
        CTA: SkillCTA,
    },
    practice: {
        Hero: PracticeHero,
        InteractiveSection: CurriculumBuilder,
        Problem: PracticeProblem,
        Curriculum: PracticeCurriculum,
        CTA: PracticeCTA,
    },
    cost: {
        Hero: Hero,
        InteractiveSection: CostCalculator,
        Problem: USP,
        Curriculum: Curriculum,
        CTA: Offer,
        isDataDriven: true, // Cost page uses data-driven pattern
    },
};

// ============================================
// Helper Functions
// ============================================

/**
 * Type guard to check if a string is a valid IntentType.
 */
export function isValidIntent(intent: string): intent is IntentType {
    return INTENT_TYPES.includes(intent as IntentType);
}

/**
 * Get the component set for a given intent.
 * Falls back to 'cost' if intent is invalid.
 */
export function getIntentComponents(intent: string): IntentComponentSet {
    if (isValidIntent(intent)) {
        return INTENT_REGISTRY[intent];
    }
    return INTENT_REGISTRY.cost;
}
