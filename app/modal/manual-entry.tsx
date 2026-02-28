import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMealStore } from '../../stores/mealStore';
import { TrainingBuffer } from '../../ml/TrainingBuffer';
import { Retraining } from '../../modules/react-native-retraining/src';

export default function ManualEntryModal() {
    const [foodName, setFoodName] = useState('');

    const chips = ['Dhokla', 'Khaman', 'Idli', 'Vada'];

    return (
        <SafeAreaView style={styles.container}>
            {/* Background overlay */}
            <View style={styles.backdrop}>
                <ImageBackground
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPaoId_MJj-0_UETEFtqLWIJ3cTniq629q45od5oQy7V2UBH9DPthoTTs2kV49QT1WeiMcFy8B8Jl-05QzIjqlTmLBN50LkCmLJbI62OECVUIogY8wwC8upTc8tQFZigIyZIkVeXylqFOYTRZoYi-I7AnjtgIFfhP7lUG6UBnJm0rGbXn6zDs1133VuO3HR9Kagn_dgEXf8yH_17E4-AEqmJ8vGoajW8iFJxqUc3wCw6u2Dp-iY6crLT_YS00l6_0E2qPoN6bWMv1W' }}
                    style={StyleSheet.absoluteFillObject}
                    imageStyle={{ opacity: 0.4 }}
                />
                <View style={styles.darkOverlay} />
            </View>

            <View style={styles.sheetContainer}>
                {/* Handle */}
                <View style={styles.handleWrapper}>
                    <View style={styles.handle} />
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>What's this food?</Text>
                    <Text style={styles.subtitle}>Help NutriScan learn this dish</Text>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Image Preview */}
                    <ImageBackground
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9VbT5Rhh72VKyqbKvohnFNuO3t91m2_Z47fLQP9GVq9OmdlFMcjQ-CRmVnMrn-Ig3MtYGq8bF7fDKEsMaaOg3zEjAw7-xlB-NzlYcSfnm648VROxuMaKpc-rppGeldMvEOgL7_uGMbgrNPHgaZz-UhfEAV0orsGb3mBwidnnDTd6K4LxpXffyknG0PTrh-fO48h8ZTHNeeMHvDTOTI2pKjh4sxImaWYgCpjbSGy6DqBlvjRpS65EPRpHHcTmMQPQ8QcPGfSY0Mi2u' }}
                        style={styles.imagePreview}
                        imageStyle={{ borderRadius: 12 }}
                    >
                        <View style={styles.cameraIconBg}>
                            <MaterialCommunityIcons name="camera" size={16} color="#fff" />
                        </View>
                    </ImageBackground>

                    {/* Input field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Food Name</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter food name"
                                placeholderTextColor="#475569"
                                value={foodName}
                                onChangeText={setFoodName}
                            />
                            <MaterialCommunityIcons name="pencil" size={20} color="rgba(13, 242, 242, 0.6)" style={styles.pencilIcon} />
                        </View>
                    </View>

                    {/* Chips */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                        {chips.map((chip, idx) => (
                            <TouchableOpacity key={idx} style={idx === 0 ? styles.chipActive : styles.chipInactive}>
                                <Text style={idx === 0 ? styles.chipTextActive : styles.chipTextInactive}>{chip}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Divider */}
                    <View style={styles.dividerRow}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>MANUAL MACROS</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Macros Grid */}
                    <View style={styles.macrosGrid}>
                        <View style={styles.macroBox}>
                            <Text style={styles.macroLabel}>CALORIES</Text>
                            <Text style={styles.macroValue}>160 <Text style={styles.macroUnit}>kcal</Text></Text>
                        </View>
                        <View style={styles.macroBox}>
                            <Text style={styles.macroLabel}>CARBS</Text>
                            <Text style={styles.macroValue}>18 <Text style={styles.macroUnit}>g</Text></Text>
                        </View>
                        <View style={styles.macroBox}>
                            <Text style={styles.macroLabel}>FAT</Text>
                            <Text style={styles.macroValue}>7 <Text style={styles.macroUnit}>g</Text></Text>
                        </View>
                        <View style={styles.macroBox}>
                            <Text style={styles.macroLabel}>PROTEIN</Text>
                            <Text style={styles.macroValue}>4 <Text style={styles.macroUnit}>g</Text></Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.primaryBtn} onPress={async () => {
                        await TrainingBuffer.logUnknownFood('file:///dummy-image-uri.jpg', foodName || 'Unknown');
                        Retraining.scheduleRetrainingJob();
                        router.back();
                    }}>
                        <MaterialCommunityIcons name="brain" size={24} color="#102222" />
                        <Text style={styles.primaryBtnText}>Save & Train Model</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ghostBtn} onPress={() => router.back()}>
                        <Text style={styles.ghostBtnText}>Skip for now</Text>
                    </TouchableOpacity>

                    <View style={styles.hintRow}>
                        <MaterialCommunityIcons name="battery-charging" size={16} color="#64748b" />
                        <Text style={styles.hintText}>Your phone will train on this overnight while charging 🔋</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1E293B',
    },
    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    sheetContainer: {
        height: '85%',
        backgroundColor: '#1E2128',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    handleWrapper: {
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    handle: {
        width: 48,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#475569',
    },
    header: {
        paddingHorizontal: 24,
        paddingBottom: 8,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: 14,
        marginTop: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    imagePreview: {
        width: '100%',
        height: 160,
        marginTop: 16,
        marginBottom: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    cameraIconBg: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 8,
        borderRadius: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        color: '#cbd5e1',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    inputWrapper: {
        position: 'relative',
    },
    textInput: {
        backgroundColor: 'rgba(16,34,34,0.5)',
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 12,
        color: '#fff',
        padding: 16,
        paddingRight: 48,
        fontSize: 16,
    },
    pencilIcon: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
    chipsScroll: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    chipActive: {
        backgroundColor: 'rgba(13,242,242,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(13,242,242,0.3)',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    chipInactive: {
        backgroundColor: '#1E293B',
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    chipTextActive: {
        color: '#0df2f2',
        fontSize: 12,
        fontWeight: '600',
    },
    chipTextInactive: {
        color: '#cbd5e1',
        fontSize: 12,
        fontWeight: '600',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#1E293B',
    },
    dividerText: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginHorizontal: 16,
    },
    macrosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    macroBox: {
        width: '48%',
        backgroundColor: 'rgba(16,34,34,0.4)',
        borderWidth: 1,
        borderColor: '#1E293B',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    macroLabel: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: '700',
        marginBottom: 4,
    },
    macroValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    macroUnit: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: '400',
    },
    footer: {
        padding: 24,
        backgroundColor: 'rgba(16,34,34,0.8)',
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
    },
    primaryBtn: {
        flexDirection: 'row',
        backgroundColor: '#0df2f2',
        borderRadius: 12,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16,
    },
    primaryBtnText: {
        color: '#102222',
        fontSize: 16,
        fontWeight: '700',
    },
    ghostBtn: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    ghostBtnText: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '600',
    },
    hintRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    hintText: {
        color: '#64748b',
        fontSize: 10,
    }
});
