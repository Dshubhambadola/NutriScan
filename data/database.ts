import { open } from '@op-engineering/op-sqlite';

export const db = open({ name: 'ifct2017.db' });

export function initStores() {
    try {
        db.executeSync(`
            CREATE TABLE IF NOT EXISTS meal_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                food_id INTEGER,
                food_name TEXT NOT NULL,
                meal_type TEXT NOT NULL,
                grams REAL NOT NULL,
                calories REAL NOT NULL,
                carbs REAL NOT NULL,
                fat REAL NOT NULL,
                protein REAL NOT NULL,
                fiber REAL DEFAULT 0,
                logged_at INTEGER NOT NULL
            );
        `);

        db.executeSync(`
            CREATE TABLE IF NOT EXISTS daily_goals (
                date TEXT PRIMARY KEY,
                calorie_goal INTEGER NOT NULL
            );
        `);
        console.log("DB stores initialized successfully.");
    } catch (e) {
        console.error("Failed to initialize DB stores:", e);
    }
}
