import { db } from './database';

export interface MealLog {
    id?: number;
    food_id: number | null;
    food_name: string;
    meal_type: string;
    grams: number;
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
    fiber: number;
    logged_at: number;
}

export const MealRepository = {
    async getLogsForDate(dateStr: string): Promise<MealLog[]> {
        try {
            // dateStr format: YYYY-MM-DD
            const result = db.executeSync(
                `SELECT * FROM meal_logs WHERE date(logged_at / 1000, 'unixepoch') = ? ORDER BY logged_at DESC`,
                [dateStr]
            );
            return (result.rows || []) as unknown as MealLog[];
        } catch (e) {
            console.warn("Failed to get logs", e);
            return [];
        }
    },

    async insert(meal: MealLog): Promise<void> {
        try {
            db.executeSync(
                `INSERT INTO meal_logs (food_id, food_name, meal_type, grams, calories, carbs, fat, protein, fiber, logged_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [meal.food_id, meal.food_name, meal.meal_type, meal.grams, meal.calories, meal.carbs, meal.fat, meal.protein, meal.fiber, meal.logged_at]
            );
        } catch (e) {
            console.error("Failed to insert meal", e);
        }
    },

    async getGoalForDate(dateStr: string): Promise<number> {
        try {
            const result = db.executeSync(
                `SELECT calorie_goal FROM daily_goals WHERE date = ?`,
                [dateStr]
            );
            if (result.rows && result.rows.length > 0) {
                return (result.rows[0] as any).calorie_goal;
            }
            return 2000; // default
        } catch (e) {
            return 2000;
        }
    },

    async updateGoalForDate(dateStr: string, goal: number): Promise<void> {
        try {
            db.executeSync(
                `INSERT INTO daily_goals (date, calorie_goal) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET calorie_goal = ?`,
                [dateStr, goal, goal]
            );
        } catch (e) {
            console.error("Failed to update goal", e);
        }
    }
};
