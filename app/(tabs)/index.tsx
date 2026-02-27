import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMealStore } from '../../stores/mealStore';
import { CalorieRing } from '../../components/CalorieRing';
import { MacroBars } from '../../components/MacroBars';

export default function HomeScreen() {
    const router = useRouter();
    const {
        currentDateStr,
        dailyGoal,
        totalCalories,
        totalCarbs,
        totalFat,
        totalProtein,
        meals,
        loadInitialData
    } = useMealStore();

    useEffect(() => {
        loadInitialData();
    }, []);

    const remaining = Math.max(dailyGoal - totalCalories, 0);
    const progress = Math.min(totalCalories / dailyGoal, 1);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Good morning, Shubham 👋</Text>
                    <Text style={styles.dateText}>{currentDateStr}</Text>
                </View>
                <TouchableOpacity style={styles.notificationBtn}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#e2e8f0" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

                {/* Calorie Card */}
                <View style={styles.card}>
                    <View style={styles.calorieSection}>
                        <CalorieRing progress={progress} size={180} strokeWidth={16}>
                            <Text style={styles.caloriesNumber}>{Math.round(totalCalories)}</Text>
                            <Text style={styles.caloriesLabel}>/ {dailyGoal} kcal</Text>
                        </CalorieRing>

                        <View style={styles.remainingBox}>
                            <Text style={styles.remainingText}>{remaining} kcal remaining</Text>
                            <Text style={styles.subtext}>Daily Calorie Goal</Text>
                        </View>

                        <MacroBars carbs={totalCarbs} fat={totalFat} protein={totalProtein} />
                    </View>
                </View>

                {/* Meals Section */}
                <Text style={styles.sectionTitle}>Meals Today</Text>

                {meals.length === 0 ? (
                    <TouchableOpacity style={styles.emptyState} onPress={() => router.push('/scan')}>
                        <MaterialCommunityIcons name="food-apple-outline" size={48} color="#475569" />
                        <Text style={styles.emptyText}>Tap to Scan a Meal</Text>
                    </TouchableOpacity>
                ) : (
                    meals.map((meal, index) => (
                        <View key={index} style={styles.mealCard}>
                            <View style={styles.mealIcon}>
                                <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#13ecec" />
                            </View>
                            <View style={styles.mealInfo}>
                                <Text style={styles.mealName}>{meal.food_name}</Text>
                                <Text style={styles.mealDesc}>{Math.round(meal.grams)}g • {meal.meal_type}</Text>
                            </View>
                            <View style={styles.mealKcalBox}>
                                <Text style={styles.mealKcal}>{Math.round(meal.calories)}</Text>
                                <Text style={styles.mealUnit}>KCAL</Text>
                            </View>
                        </View>
                    ))
                )}

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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 16,
    },
    greeting: {
        color: '#f8fafc',
        fontSize: 20,
        fontWeight: '700',
    },
    dateText: {
        color: '#94a3b8',
        fontSize: 14,
        marginTop: 2,
    },
    notificationBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1E2128',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // accommodate bottom tab
    },
    card: {
        backgroundColor: '#1E2128',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    calorieSection: {
        alignItems: 'center',
    },
    caloriesNumber: {
        color: '#13ecec',
        fontSize: 32,
        fontWeight: '800',
    },
    caloriesLabel: {
        color: '#94a3b8',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    remainingBox: {
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 24,
    },
    remainingText: {
        color: '#f97316',
        fontSize: 18,
        fontWeight: '700',
    },
    subtext: {
        color: '#64748b',
        fontSize: 12,
        marginTop: 4,
    },
    sectionTitle: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 16,
        paddingLeft: 4,
    },
    mealCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E2128',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#f97316',
    },
    mealIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(19, 236, 236, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    mealInfo: {
        flex: 1,
    },
    mealName: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '700',
    },
    mealDesc: {
        color: '#64748b',
        fontSize: 12,
        marginTop: 4,
    },
    mealKcalBox: {
        alignItems: 'flex-end',
    },
    mealKcal: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: '700',
    },
    mealUnit: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: '700',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: '#1E2128',
        borderRadius: 16,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#334155',
    },
    emptyText: {
        color: '#64748b',
        marginTop: 12,
        fontWeight: '500',
    }
});
