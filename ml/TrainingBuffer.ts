import * as FileSystem from 'expo-file-system/legacy';

export interface TrainingItem {
    id: string;
    imageUri: string;
    label: string;
    timestamp: number;
}

const BUFFER_FILE = `${FileSystem.documentDirectory}training_buffer.json`;

export const TrainingBuffer = {
    async logUnknownFood(imageUri: string, label: string): Promise<void> {
        try {
            const items = await this.getBuffer();

            // Copy image to a permanent local directory so it's not deleted from tmp
            const filename = imageUri.split('/').pop() || `${Date.now()}.jpg`;
            const permanentUri = `${FileSystem.documentDirectory}${filename}`;

            await FileSystem.copyAsync({
                from: imageUri,
                to: permanentUri
            });

            const newItem: TrainingItem = {
                id: Date.now().toString(),
                imageUri: permanentUri,
                label,
                timestamp: Date.now()
            };

            items.push(newItem);
            await FileSystem.writeAsStringAsync(BUFFER_FILE, JSON.stringify(items));

            console.log(`[TrainingBuffer] Logged ${label} for retraining.`);
        } catch (e) {
            console.error('[TrainingBuffer] Failed to log unknown food:', e);
        }
    },

    async getBuffer(): Promise<TrainingItem[]> {
        try {
            const info = await FileSystem.getInfoAsync(BUFFER_FILE);
            if (!info.exists) return [];
            const content = await FileSystem.readAsStringAsync(BUFFER_FILE);
            return JSON.parse(content) as TrainingItem[];
        } catch (e) {
            console.error('[TrainingBuffer] Failed to read buffer:', e);
            return [];
        }
    },

    async clearBuffer(): Promise<void> {
        try {
            const info = await FileSystem.getInfoAsync(BUFFER_FILE);
            if (info.exists) {
                await FileSystem.deleteAsync(BUFFER_FILE);
            }
        } catch (e) {
            console.error('[TrainingBuffer] Failed to clear buffer:', e);
        }
    }
};
