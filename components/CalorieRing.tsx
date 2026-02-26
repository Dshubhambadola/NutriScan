import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';

interface CalorieRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
    children?: React.ReactNode;
}

export const CalorieRing: React.FC<CalorieRingProps> = ({
    progress,
    size = 192,
    strokeWidth = 16,
    color = '#13ecec',
    backgroundColor = '#283939',
    children
}) => {
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;

    const bgPath = Skia.Path.Make();
    bgPath.addCircle(center, center, radius);

    const fgPath = Skia.Path.Make();
    const rect = { x: strokeWidth / 2, y: strokeWidth / 2, width: size - strokeWidth, height: size - strokeWidth };
    // 270 degrees is top
    fgPath.addArc(rect, 270, 360 * Math.min(progress, 1));

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Canvas style={{ position: 'absolute', width: size, height: size }}>
                <Path path={bgPath} style="stroke" strokeWidth={strokeWidth} color={backgroundColor} />
                <Path path={fgPath} style="stroke" strokeWidth={strokeWidth} color={color} strokeCap="round" />
            </Canvas>
            <View style={StyleSheet.absoluteFill}>
                {children}
            </View>
        </View>
    );
};
