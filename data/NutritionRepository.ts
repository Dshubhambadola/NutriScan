import { db } from './database';

export interface FoodItem {
    id: number;
    name: string;
    energy: number;
    carb: number;
    fat: number;
    protein: number;
    fibre: number;
}

export function lookupFood(label: string): FoodItem | null {
    try {
        const result = db.executeSync(
            `SELECT id, name, energy, carb, fat, protein, fibre
       FROM foods
       WHERE name LIKE ? OR lang LIKE ?
       ORDER BY 
         CASE 
           WHEN name = ? THEN 0
           WHEN name LIKE ? THEN 1
           ELSE 2
         END
       LIMIT 1`,
            [`%${label}%`, `%${label}%`, label, `${label}%`]
        );

        if (!result.rows || result.rows.length === 0) return null;
        return result.rows[0] as unknown as FoodItem;
    } catch (e) {
        console.warn("DB not ready or error:", e);
        return null;
    }
}

export function searchFoods(query: string): FoodItem[] {
    try {
        const result = db.executeSync(
            `SELECT id, name, energy, carb, fat, protein, fibre
       FROM foods
       WHERE name LIKE ? OR lang LIKE ?
       ORDER BY name
       LIMIT 20`,
            [`%${query}%`, `%${query}%`]
        );
        return (result.rows || []) as unknown as FoodItem[];
    } catch (e) {
        console.warn("DB not ready or error:", e);
        return [];
    }
}
