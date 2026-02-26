import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function UnknownFoodModal() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Background simulating Camera ViewFinder */}
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop' }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={10}
            >
                <View style={styles.overlay} />
            </ImageBackground>

            {/* Top Bar overlay */}
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                        <MaterialCommunityIcons name="close" size={24} color="#f8fafc" />
                    </TouchableOpacity>
                    <Text style={styles.title}>NutriScan India</Text>
                    <TouchableOpacity style={styles.iconBtn}>
                        <MaterialCommunityIcons name="flashlight" size={24} color="#f8fafc" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Bottom Sheet UI */}
            <View style={styles.bottomSheetWrapper}>
                <View style={styles.bottomSheet}>
                    <View style={styles.handleContainer}>
                        <View style={styles.handle} />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.warningIconBg}>
                            <MaterialCommunityIcons name="alert" size={36} color="#eebd2b" />
                        </View>

                        <Text style={styles.sheetTitle}>We don't recognize this food</Text>
                        <Text style={styles.sheetSubtitle}>Our AI is still learning traditional Indian dishes. Help us improve!</Text>

                        <TouchableOpacity
                            style={styles.primaryBtn}
                            onPress={() => router.push('/modal/manual-entry')}
                        >
                            <MaterialCommunityIcons name="square-edit-outline" size={24} color="#1a160d" />
                            <Text style={styles.primaryBtnText}>Name This Food</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
                            <Text style={styles.secondaryBtnText}>Try Scanning Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    safeArea: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: '700',
    },
    bottomSheetWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    bottomSheet: {
        backgroundColor: 'rgba(26,22,13,0.95)', // background-dark matching mockup
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 40,
    },
    handleContainer: {
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    handle: {
        width: 48,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    content: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    warningIconBg: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(238, 189, 43, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    sheetTitle: {
        color: '#f8fafc',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    sheetSubtitle: {
        color: '#94a3b8',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 16,
    },
    primaryBtn: {
        flexDirection: 'row',
        width: '100%',
        height: 56,
        borderRadius: 16,
        backgroundColor: '#eebd2b',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16,
    },
    primaryBtnText: {
        color: '#1a160d',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryBtn: {
        width: '100%',
        height: 52,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryBtnText: {
        color: '#cbd5e1',
        fontSize: 16,
        fontWeight: '600',
    }
});
