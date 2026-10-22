export type StatValue = string | number;
export interface LevelStats {
level: number;
damage?: number;
totalAttack?: number;
[key: string]: string | number | undefined;
}
export type GameItem = { id: string; name: string; category: "gear" | "spell" | "troop" | "hero"; rarity: string; hero: string; maxLevel: number; description: string; stats: LevelStats[]; tags: string[] };
