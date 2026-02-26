import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { useCameraDevice, useCameraPermission, Camera, useFrameProcessor } from 'react-native-vision-camera';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { useSharedValue, runOnJS } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function ScanScreen() {
    const router = useRouter();
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');

    const [detectedFood, setDetectedFood] = useState<{ name: string, confidence: number } | null>(null);

    // Load the dummy model
    const plugin = useTensorflowModel(require('../../assets/indian_food.tflite'));
    const model = plugin.state === 'loaded' ? plugin.model : null;

    // NOTE: Food labels should be loaded appropriately. We use a mock array for now to avoid fs blocks on UI thread
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        try {
            const loadedLabels = require('../../assets/food_labels.json');
            setLabels(loadedLabels);
        } catch (e) {
            console.warn("Labels not found");
        }
    }, []);

    useEffect(() => {
        if (!hasPermission) requestPermission();
    }, [hasPermission]);

    const { resize } = useResizePlugin();

    const handleDetection = (foodName: string, confidence: number) => {
        setDetectedFood({ name: foodName, confidence });
    };

    const handleUnknownFood = () => {
        setDetectedFood(null);
    };

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        if (!model) return;

        // Resize frame to match MobileNetV2 inputs (224x224x3)
        const resized = resize(frame, {
            scale: {
                width: 224,
                height: 224,
            },
            pixelFormat: 'rgb',
            dataType: 'uint8',
        });

        const outputs = model.runSync([resized]);

        // Process probabilities
        const probabilities = outputs[0] as unknown as Float32Array;
        let maxConfidence = 0;
        let maxIndex = -1;

        for (let i = 0; i < probabilities.length; i++) {
            // Since MobileNet is uint8/quantized, probabilities might need scaling or just direct comparison
            const confidence = typeof probabilities[i] === 'number' ? probabilities[i] : (probabilities[i] as any) / 255.0;
            if (confidence > maxConfidence) {
                maxConfidence = confidence;
                maxIndex = i;
            }
        }

        if (maxConfidence >= 0.75) {
            // In a real app we'd map maxIndex to the actual label strings via a runOnJS call
            runOnJS(handleDetection)(`Class ${maxIndex}`, maxConfidence);
        } else {
            runOnJS(handleUnknownFood)();
        }

    }, [model]);

    if (!hasPermission) return <View style={styles.center}><Text>No Camera Permission</Text></View>;
    if (!device) return <View style={styles.center}><Text>No Camera Device</Text></View>;

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
            />

            {/* Bottom Sheet Overlay */}
            <View style={styles.overlay}>
                {detectedFood ? (
                    <View style={styles.card}>
                        <Text style={styles.foodName}>{detectedFood.name}</Text>
                        <Text style={styles.confidence}>Confidence: {(detectedFood.confidence * 100).toFixed(1)}%</Text>
                        <TouchableOpacity
                            style={styles.logBtn}
                            onPress={() => router.push('/modal/portion-picker')}
                        >
                            <Text style={styles.logBtnText}>Log Meal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/modal/unknown-food')} style={{ marginTop: 10 }}>
                            <Text style={{ color: 'gray', textAlign: 'center' }}>Not Correct?</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.card}>
                        <Text style={styles.scanningText}>Scanning food...</Text>
                        <ActivityIndicator color="#32a68d" />
                        <TouchableOpacity
                            style={[styles.logBtn, { backgroundColor: 'gray', marginTop: 15 }]}
                            onPress={() => router.push('/modal/unknown-food')}
                        >
                            <Text style={styles.logBtnText}>Enter Manually</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    foodName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    confidence: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    logBtn: {
        backgroundColor: '#32a68d',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    logBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scanningText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    }
});
