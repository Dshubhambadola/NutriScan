import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal/portion-picker" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modal/unknown-food" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modal/manual-entry" options={{ presentation: 'modal' }} />
      <Stack.Screen name="history" options={{ title: 'History' }} />
    </Stack>
  );
}
