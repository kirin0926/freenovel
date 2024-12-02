import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function RootLayout() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   // 确保初始导航到 tabs
  //   navigation.navigate('(tabs)');
  // }, []);

  return (
    <Stack screenOptions={{
      headerShown: false // 隐藏所有页面的默认头部
    }}>
      <Stack.Screen 
        name="(tabs)"
        options={{
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="membership/membership" 
        options={{
          headerShown: true,
          title: 'Membership',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            color: '#333',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#333',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="novel/[id]" 
        options={{
          headerShown: true,
          title: 'Novel Detail',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            color: '#333',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#333',
        }}
      />
    </Stack>
  );
}
