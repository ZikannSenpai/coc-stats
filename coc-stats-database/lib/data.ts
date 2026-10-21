import rawItems from "@/data/items.json";
import type { GameItem } from "@/lib/types";
export const items = rawItems as GameItem[];
export const categories = [{id:"all",label:"All items"},{id:"gear",label:"Hero Gear"},{id:"spell",label:"Spells"},{id:"troop",label:"Troops"},{id:"hero",label:"Heroes"}] as const;
