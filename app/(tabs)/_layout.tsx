import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#0df2f2',
            tabBarInactiveTintColor: '#64748b',
            tabBarStyle: {
                backgroundColor: '#1E2128',
                borderTopColor: '#334155',
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                height: 60,
            },
            headerShown: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Scan',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="camera" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="diary"
                options={{
                    title: 'Diary',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="book-open-outline" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cog" size={size} color={color} />
                }}
            />
        </Tabs>
    );
}
