import { View, Text } from 'react-native';

export default function Bookshelf() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ fontSize: 16, color: '#666' }}>
        My Bookshelf
      </Text>
    </View>
  );
} 