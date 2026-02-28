import { create } from 'zustand';
import { MealRepository, MealLog } from '../data/MealRepository';

interface MealState {
    currentDateStr: string;
    meals: MealLog[];
    dailyGoal: number;
    totalCalories: number;
    totalCarbs: number;
    totalFat: number;
    totalProtein: number;

    setDate: (dateStr: string) => void;
    loadInitialData: () => Promise<void>;
    addMeal: (meal: MealLog) => Promise<void>;
    setDailyGoal: (goal: number) => Promise<void>;
}

const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
};

export const useMealStore = create<MealState>((set, get) => ({
    currentDateStr: getTodayStr(),
    meals: [],
    dailyGoal: 2000,
    totalCalories: 0,
    totalCarbs: 0,
    totalFat: 0,
    totalProtein: 0,

    setDate: async (dateStr: string) => {
        set({ currentDateStr: dateStr });
        await get().loadInitialData();
    },

    loadInitialData: async () => {
        const { currentDateStr } = get();
        // Ensure tables exist before querying
        const { initStores } = require('../data/database');
        initStores();

        const logs = await MealRepository.getLogsForDate(currentDateStr);
        const goal = await MealRepository.getGoalForDate(currentDateStr);

        let calories = 0, carbs = 0, fat = 0, protein = 0;
        logs.forEach(m => {
            calories += m.calories;
            carbs += m.carbs;
            fat += m.fat;
            protein += m.protein;
        });

        set({
            meals: logs,
            dailyGoal: goal,
            totalCalories: calories,
            totalCarbs: carbs,
            totalFat: fat,
            totalProtein: protein
        });
    },

    addMeal: async (meal: MealLog) => {
        await MealRepository.insert(meal);
        await get().loadInitialData(); // Re-fetch all to be safe
    },

    setDailyGoal: async (goal: number) => {
        const { currentDateStr } = get();
        await MealRepository.updateGoalForDate(currentDateStr, goal);
        set({ dailyGoal: goal });
    }
}));
