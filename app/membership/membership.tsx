import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

interface MembershipOption {
  days: number;
  price: number;
  popular?: boolean;
}

export default function Membership() {
  const membershipOptions: MembershipOption[] = [
    { days: 3, price: 9.9 },
    { days: 7, price: 19.99 },
    { days: 30, price: 29.99, popular: true },
    { days: 90, price: 69.99 },
    { days: 365, price: 169.99 }
  ];

  const handlePurchase = (option: MembershipOption) => {
    console.log(`Selected ${option.days} days plan for $${option.price}`);
  };

  return (
    <View style={styles.container}>
      {/* 顶部会员卡片 */}
      <View style={styles.memberCard}>
        <FontAwesome name="crown" size={40} color="#FFD700" />
        <Text style={styles.memberTitle}>Premium Membership</Text>
        <Text style={styles.memberDesc}>Unlock all premium content</Text>
      </View>

      {/* 会员选项列表 */}
      <ScrollView style={styles.optionsContainer}>
        <View style={styles.optionsGrid}>
          {membershipOptions.map((option) => (
            <Pressable
              key={option.days}
              style={({ pressed }) => [
                styles.optionCard,
                { opacity: pressed ? 0.9 : 1 }
              ]}
              onPress={() => handlePurchase(option)}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionDays}>{option.days} Days</Text>
                <Text style={styles.optionPrice}>${option.price}</Text>
              </View>
              {option.popular && (
                <View style={styles.popularTag}>
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* 底部提示 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          • Unlimited access to all novels{'\n'}
          • Ad-free reading experience{'\n'}
          • Support for offline reading{'\n'}
          • Priority customer service
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  memberCard: {
    backgroundColor: '#1a1a1a',
    padding: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  memberTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
  },
  memberDesc: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  optionsContainer: {
    flex: 1,
    padding: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  optionLeft: {
    flex: 1,
  },
  optionDays: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  optionPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  popularTag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
  },
}); 