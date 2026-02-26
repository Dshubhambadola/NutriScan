import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#32a68d' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Scan Food',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="diary"
                options={{
                    title: 'Diary',
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                }}
            />
        </Tabs>
    );
}
