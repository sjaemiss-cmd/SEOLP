import { unstable_cache } from "next/cache";
import { getTurso } from "./turso";
import { siteConfig as staticConfig } from "@/data/siteConfig";
import type { SiteConfig } from "@/data/siteConfig";

function applyUspGetters(config: SiteConfig): SiteConfig {
  const landing = { ...config.landing };
  for (const key of ["speed", "skill"] as const) {
    const intent = landing[key];
    if (intent && intent.problem && !intent.usp) {
      landing[key] = { ...intent, usp: intent.problem };
    }
  }
  return { ...config, landing };
}

function applyCopyrightYear(config: SiteConfig): SiteConfig {
  if (!config.common?.copyright) return config;
  return {
    ...config,
    common: {
      ...config.common,
      copyright: config.common.copyright.replace(
        "{{YEAR}}",
        String(new Date().getFullYear())
      ),
    },
  };
}

async function fetchConfigFromTurso(): Promise<SiteConfig> {
  const result = await getTurso().execute(
    "SELECT data FROM site_config WHERE id = 1"
  );
  if (!result.rows.length) {
    throw new Error("No config found in database");
  }
  const raw = JSON.parse(result.rows[0].data as string) as SiteConfig;
  return applyCopyrightYear(applyUspGetters(raw));
}

export const getSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => {
    try {
      return await fetchConfigFromTurso();
    } catch {
      // Fallback to static config if Turso is unavailable
      return applyCopyrightYear(applyUspGetters(staticConfig));
    }
  },
  ["siteConfig"],
  { revalidate: 60, tags: ["siteConfig"] }
);
