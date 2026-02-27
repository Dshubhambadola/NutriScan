import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMealStore } from '../../stores/mealStore';

export default function PortionPickerModal() {
    const [grams, setGrams] = useState('100');
    const { addMeal, currentDateStr } = useMealStore();

    const handleSave = async () => {
        const amount = parseFloat(grams) || 100;
        await addMeal({
            food_id: null,
            food_name: 'Detected Indian Dish',
            meal_type: 'Lunch', // Hardcoded for prototype
            grams: amount,
            calories: (amount / 100) * 240, // Mock: 240kcal per 100g
            carbs: (amount / 100) * 18,
            fat: (amount / 100) * 12,
            protein: (amount / 100) * 14,
            fiber: 0,
            logged_at: Date.now(),
        });
        router.push('/');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                <View style={styles.sheet}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Adjust Portion</Text>
                        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                            <MaterialCommunityIcons name="close" size={24} color="#f8fafc" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitle}>Specify the amount to accurately log macros.</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={grams}
                            onChangeText={setGrams}
                            keyboardType="numeric"
                            autoFocus
                            placeholderTextColor="#64748b"
                        />
                        <Text style={styles.unit}>g</Text>
                    </View>

                    <View style={styles.macrosPreview}>
                        <View style={styles.macroBox}>
                            <Text style={styles.macroLabel}>CALORIES</Text>
                            <Text style={styles.macroValue}>{Math.round(((parseFloat(grams) || 100) / 100) * 240)}</Text>
                        </View>
                        <View style={styles.macroBox}>
                            <Text style={styles.macroLabel}>CARBS</Text>
                            <Text style={styles.macroValue}>{Math.round(((parseFloat(grams) || 100) / 100) * 18)}</Text>
                        </View>
                        <View style={styles.macroBox}>
                            <Text style={styles.macroLabel}>PROTEIN</Text>
                            <Text style={styles.macroValue}>{Math.round(((parseFloat(grams) || 100) / 100) * 14)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveBtnText}>Log Meal</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    keyboardView: {
        width: '100%',
    },
    sheet: {
        backgroundColor: '#1E2128',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        color: '#f8fafc',
        fontSize: 22,
        fontWeight: '700',
    },
    closeBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 18,
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: 14,
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F1117',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#334155',
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
        paddingVertical: 16,
        textAlign: 'center',
    },
    unit: {
        color: '#94a3b8',
        fontSize: 24,
        fontWeight: '500',
        paddingRight: 16,
    },
    macrosPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(50, 166, 141, 0.1)',
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
    },
    macroBox: {
        alignItems: 'center',
    },
    macroLabel: {
        color: '#32a68d',
        fontSize: 10,
        fontWeight: '700',
        marginBottom: 4,
    },
    macroValue: {
        color: '#e2e8f0',
        fontSize: 18,
        fontWeight: '700',
    },
    saveBtn: {
        backgroundColor: '#32a68d',
        borderRadius: 16,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    }
});
