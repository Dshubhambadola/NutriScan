import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MacroBarsProps {
    label: string;
    value: number;
    goal: number;
    color: string;
}

export const MacroBar: React.FC<MacroBarsProps> = ({ label, value, goal, color }) => {
    const safeGoal = goal > 0 ? goal : 1;
    const progress = Math.min((value / safeGoal) * 100, 100);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${progress}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.value}>{Math.round(value)}g</Text>
        </View>
    );
};

export const MacroBars: React.FC<{ carbs: number, fat: number, protein: number }> = ({ carbs, fat, protein }) => {
    // Approximate daily goals for a generic 2000 cal diet:
    // Carbs: 250g, Fat: 65g, Protein: 100g
    return (
        <View style={styles.barsContainer}>
            <View style={styles.flexItem}>
                <MacroBar label="Carbs" value={carbs} goal={250} color="#f97316" />
            </View>
            <View style={styles.flexItem}>
                <MacroBar label="Fat" value={fat} goal={65} color="#3b82f6" />
            </View>
            <View style={styles.flexItem}>
                <MacroBar label="Protein" value={protein} goal={100} color="#10b981" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    barsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 12,
    },
    flexItem: {
        flex: 1,
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(51, 65, 85, 0.5)',
        alignItems: 'center'
    },
    container: {
        width: '100%',
        alignItems: 'center',
        gap: 6,
    },
    label: {
        color: '#94a3b8',
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        color: '#f8fafc',
        fontSize: 14,
        fontWeight: '700',
    },
    track: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 4,
    }
});
