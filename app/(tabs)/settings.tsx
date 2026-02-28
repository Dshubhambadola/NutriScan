import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMealStore } from '../../stores/mealStore';

export default function SettingsScreen() {
    const { dailyGoal } = useMealStore();

    const MenuItem = ({ icon, title, subtitle, value, valueColor, isDestructive }: any) => (
        <TouchableOpacity style={[styles.menuItem, isDestructive && styles.menuItemDestructive]}>
            <View style={[styles.menuIconContainer, isDestructive && { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
                <MaterialCommunityIcons
                    name={icon}
                    size={24}
                    color={isDestructive ? '#ef4444' : '#13ecc8'}
                />
            </View>
            <View style={styles.menuTextContainer}>
                <Text style={[styles.menuTitle, isDestructive && { color: '#ef4444' }]}>{title}</Text>
                {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
            </View>
            <View style={styles.menuRight}>
                {value && <Text style={[styles.menuValue, valueColor && { color: valueColor }]}>{value}</Text>}
                <MaterialCommunityIcons name="chevron-right" size={24} color={isDestructive ? 'rgba(239,68,68,0.5)' : '#64748b'} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
                <TouchableOpacity>
                    <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Profile */}
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>SB</Text>
                    </View>
                    <View>
                        <Text style={styles.profileName}>Shubham Badola</Text>
                        <View style={styles.goalPill}>
                            <MaterialCommunityIcons name="fire" size={16} color="#13ecc8" />
                            <Text style={styles.goalText}>Goal: {dailyGoal} kcal/day</Text>
                        </View>
                    </View>
                </View>

                {/* Goals */}
                <Text style={styles.sectionHeader}>Goals</Text>
                <View style={styles.card}>
                    <MenuItem icon="target" title="Calorie Goal" value={`${dailyGoal} kcal`} />
                    <MenuItem icon="chart-pie" title="Macro Split" value="40/30/30" />
                </View>

                {/* AI & Training */}
                <Text style={styles.sectionHeader}>AI & Training</Text>
                <View style={styles.card}>
                    <MenuItem
                        icon="brain"
                        title="Vision Model Status"
                        subtitle="Optimized for Indian Cuisine"
                        value="UP TO DATE"
                        valueColor="#10b981"
                    />
                    <MenuItem icon="robot-outline" title="Retrain on Local Data" />
                </View>

                {/* Appearance */}
                <Text style={styles.sectionHeader}>Appearance</Text>
                <View style={styles.card}>
                    <MenuItem icon="moon-waning-crescent" title="Theme" value="Dark Mode" />
                    <MenuItem icon="earth" title="Language" value="English (India)" />
                </View>

                {/* Data */}
                <Text style={styles.sectionHeader}>Data</Text>
                <View style={styles.card}>
                    <MenuItem icon="export-variant" title="Export Logs" />
                    <MenuItem icon="delete-outline" title="Clear Logs" isDestructive />
                </View>

                {/* About */}
                <Text style={styles.sectionHeader}>About</Text>
                <View style={styles.card}>
                    <View style={styles.infoItem}>
                        <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(100,116,139,0.1)' }]}>
                            <MaterialCommunityIcons name="information-outline" size={24} color="#64748b" />
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuTitle}>Data Source</Text>
                            <Text style={styles.infoText}>
                                NutriScan India utilizes the <Text style={{ color: '#13ecc8', fontWeight: '600' }}>IFCT 2017</Text> (Indian Food Composition Tables) provided by ICMR-NIN.
                            </Text>
                        </View>
                    </View>
                    <MenuItem icon="shield-check-outline" title="Privacy Policy" />
                </View>

                <Text style={styles.version}>Version 2.4.1 (Build 890)</Text>

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
        paddingBottom: 4,
    },
    title: {
        color: '#f8fafc',
        fontSize: 22,
        fontWeight: '700',
    },
    doneText: {
        color: '#13ecc8',
        fontSize: 16,
        fontWeight: '600',
    },
    scroll: {
        padding: 20,
        paddingBottom: 100,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(19, 236, 200, 0.2)',
        borderWidth: 2,
        borderColor: 'rgba(19, 236, 200, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        color: '#13ecc8',
        fontSize: 24,
        fontWeight: '700',
    },
    profileName: {
        color: '#f8fafc',
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    goalPill: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 4,
    },
    goalText: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '500',
    },
    sectionHeader: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 12,
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#1E2128',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2f3f50',
    },
    menuItemDestructive: {
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(19, 236, 200, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    menuTitle: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '500',
    },
    menuSubtitle: {
        color: '#64748b',
        fontSize: 12,
        marginTop: 2,
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    menuValue: {
        color: '#94a3b8',
        fontSize: 14,
    },
    infoItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2f3f50',
    },
    infoText: {
        color: '#94a3b8',
        fontSize: 12,
        marginTop: 4,
        lineHeight: 18,
    },
    version: {
        textAlign: 'center',
        color: '#64748b',
        fontSize: 10,
        marginTop: 16,
        marginBottom: 8,
    }
});
