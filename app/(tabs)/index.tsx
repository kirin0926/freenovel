import { Text, View, FlatList, Image, Dimensions, ActivityIndicator, RefreshControl, Pressable, StyleSheet } from "react-native";
import { useState, useCallback, useEffect, useRef } from "react";
import { Novel, novelApi } from '@/lib/supabase';
import { router } from 'expo-router';

export default function Index() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFirstLoad = useRef(true);

  // 布局常量
  const screenWidth = Dimensions.get('window').width;
  const spacing = 12;
  const horizontalPadding = 16;
  const itemWidth = (screenWidth - (horizontalPadding * 2) - spacing) / 2;

  // 获取小说列表数据
  const fetchNovels = async () => {
    try {
      setError(null);
      
      const { data } = await novelApi.getNovels({
        page: 1,
        pageSize: 50
      });

      setNovels(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Loading failed');
    }
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchNovels();
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNovels();
    setRefreshing(false);
  }, []);

  const renderNovelItem = ({ item }: { item: Novel }) => (
    <Pressable 
      onPress={() => router.push(`/novel/${item.id}`)}
      style={({ pressed }) => [
        styles.novelCard,
        {
          width: itemWidth,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }]
        }
      ]}
    >
      <Image
        source={{ uri: item.cover }}
        style={styles.coverImage}
      />
      <View style={styles.cardContent}>
        <Text 
          style={styles.title}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={styles.author}>
          Author: {item.author}
        </Text>
      </View>
    </Pressable>
  );

  const renderError = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderError()}
      <FlatList
        data={novels}
        renderItem={renderNovelItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#666']}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  listContainer: {
    paddingBottom: 12,
  },
  novelCard: {
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
});
