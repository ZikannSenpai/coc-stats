export type StatValue = string | number;
export type LevelStats = { level: number; [key: string]: StatValue };
export type GameItem = { id: string; name: string; category: "gear" | "spell" | "troop" | "hero"; rarity: string; hero: string; maxLevel: number; description: string; stats: LevelStats[]; tags: string[] };
