import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

interface UserInfo {
  id: string;
  username: string;
  avatar: string;
  isVip: boolean;
}

export default function Mine() {
  const userInfo: UserInfo = {
    id: "12345",
    username: "John Doe",
    avatar: "https://picsum.photos/200",
    isVip: false
  };

  const handleSubscribe = () => {
    router.push('/membership/membership');
  };

  return (
    <View style={styles.container}>
      {/* 用户信息卡片 */}
      <View style={styles.userCard}>
        <Image 
          source={{ uri: userInfo.avatar }} 
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {userInfo.username}
          </Text>
          <Text style={styles.userId}>
            ID: {userInfo.id}
          </Text>
        </View>
      </View>

      {/* 会员订阅卡片 */}
      <Pressable 
        style={({ pressed }) => [
          styles.subscriptionCard,
          { opacity: pressed ? 0.9 : 1 }
        ]}
        onPress={handleSubscribe}
      >
        <View style={styles.subscriptionLeft}>
          <Text style={styles.subscriptionTitle}>
            $9.9/Month Premium Membership
          </Text>
          <Text style={styles.subscriptionDesc}>
          Read all novels without restrictions
          </Text>
        </View>
        <View style={styles.subscriptionRight}>
          <View style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>
              {userInfo.isVip ? 'Renew' : 'Subscribe'}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userCard: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: '#666',
  },
  // 会员订阅卡片样式
  subscriptionCard: {
    margin: 16,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subscriptionLeft: {
    flex: 1,
    marginRight: 12,
  },
  subscriptionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subscriptionDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 20,
  },
  subscriptionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 