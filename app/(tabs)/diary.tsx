import React, { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMealStore } from '../../stores/mealStore';
import { MealLog } from '../../data/MealRepository';

export default function DiaryScreen() {
    const router = useRouter();
    const { meals, dailyGoal, totalCalories, currentDateStr } = useMealStore();

    const groupedMeals = useMemo(() => {
        const groups: Record<string, MealLog[]> = {
            Breakfast: [],
            Lunch: [],
            Snack: [],
            Dinner: []
        };
        meals.forEach(m => {
            const type = m.meal_type || 'Snack';
            if (!groups[type]) groups[type] = [];
            groups[type].push(m);
        });
        return groups;
    }, [meals]);

    const left = Math.max(dailyGoal - totalCalories, 0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Diary</Text>
                <TouchableOpacity style={styles.searchBtn}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#f8fafc" />
                </TouchableOpacity>
            </View>

            <View style={styles.dateSelector}>
                <MaterialCommunityIcons name="chevron-left" size={24} color="#94a3b8" />
                <Text style={styles.dateText}>{currentDateStr}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Stat Pills */}
                <View style={styles.statsRow}>
                    <View style={styles.statPill}>
                        <Text style={styles.statLabel}>Eaten</Text>
                        <Text style={[styles.statValue, { color: '#f4c32f' }]}>{Math.round(totalCalories)}</Text>
                    </View>
                    <View style={styles.statPill}>
                        <Text style={styles.statLabel}>Left</Text>
                        <Text style={styles.statValue}>{Math.round(left)}</Text>
                    </View>
                    <View style={styles.statPill}>
                        <Text style={styles.statLabel}>Meals</Text>
                        <Text style={[styles.statValue, { color: '#2dd4bf' }]}>{meals.length}</Text>
                    </View>
                </View>

                {/* Meal Sections */}
                {Object.entries(groupedMeals).map(([mealType, items]) => {
                    const sectionCals = items.reduce((acc, m) => acc + m.calories, 0);

                    return (
                        <View key={mealType} style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{mealType}</Text>
                                <Text style={styles.sectionKcal}>{Math.round(sectionCals)} kcal</Text>
                            </View>

                            {items.length === 0 ? (
                                <TouchableOpacity style={styles.emptyAdd} onPress={() => router.push('/scan')}>
                                    <MaterialCommunityIcons name="silverware-fork-knife" size={32} color="#475569" />
                                    <Text style={styles.emptyAddText}>Log your {mealType.toLowerCase()}</Text>
                                </TouchableOpacity>
                            ) : (
                                items.map((meal, idx) => (
                                    <View key={idx} style={styles.mealItem}>
                                        <View style={styles.mealIcon}>
                                            <MaterialCommunityIcons name="food" size={24} color="#94a3b8" />
                                        </View>
                                        <View style={styles.mealInfo}>
                                            <Text style={styles.mealName}>{meal.food_name}</Text>
                                            <Text style={styles.mealDesc}>{Math.round(meal.grams)}g</Text>
                                        </View>
                                        <Text style={styles.mealKcalText}>{Math.round(meal.calories)} kcal</Text>
                                    </View>
                                ))
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F1117',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 16,
    },
    title: {
        color: '#f8fafc',
        fontSize: 22,
        fontWeight: '700',
    },
    searchBtn: {
        padding: 4,
    },
    dateSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E2128',
        alignSelf: 'center',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
        gap: 16,
    },
    dateText: {
        color: '#f8fafc',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    statPill: {
        flex: 1,
        backgroundColor: '#1E2128',
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 16,
        padding: 12,
    },
    statLabel: {
        color: '#94a3b8',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    statValue: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: '700',
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        color: '#f4c32f',
        fontSize: 18,
        fontWeight: '700',
    },
    sectionKcal: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '500',
    },
    mealItem: {
        backgroundColor: '#1E2128',
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    mealIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#334155',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    mealInfo: {
        flex: 1,
    },
    mealName: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '600',
    },
    mealDesc: {
        color: '#94a3b8',
        fontSize: 12,
        marginTop: 4,
    },
    mealKcalText: {
        color: '#2dd4bf',
        fontSize: 16,
        fontWeight: '700',
    },
    emptyAdd: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#334155',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyAddText: {
        color: '#64748b',
        fontWeight: '500',
        marginTop: 8,
    }
});
