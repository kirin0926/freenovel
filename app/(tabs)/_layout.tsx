import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: { 
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee'
      },
      tabBarActiveTintColor: '#333',
      tabBarInactiveTintColor: '#999',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        color: '#333',
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookshelf"
        options={{
          title: 'Bookshelf',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mine"
        options={{
          title: 'Mine',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 