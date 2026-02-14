import { getTurso } from "@/lib/turso";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readConfig(): Promise<any> {
    const result = await getTurso().execute(
        "SELECT data FROM site_config WHERE id = 1"
    );
    if (!result.rows.length) {
        throw new Error("No config found in database");
    }
    return JSON.parse(result.rows[0].data as string);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function writeConfig(config: any): Promise<void> {
    await getTurso().execute({
        sql: "INSERT OR REPLACE INTO site_config (id, data, updated_at) VALUES (1, ?, datetime('now'))",
        args: [JSON.stringify(config)],
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readSection(section: string): Promise<any> {
    const config = await readConfig();
    return config[section] ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function writeSection(section: string, data: any): Promise<void> {
    const config = await readConfig();
    config[section] = data;
    await writeConfig(config);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readIntent(intent: string): Promise<any> {
    const config = await readConfig();
    return config.landing?.[intent] ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function writeIntent(intent: string, data: any): Promise<void> {
    const config = await readConfig();
    if (!config.landing) config.landing = {};
    config.landing[intent] = data;
    await writeConfig(config);
}
