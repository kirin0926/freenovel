import { Text, View, FlatList, Image, Dimensions, ActivityIndicator, RefreshControl, Pressable } from "react-native";
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
        pageSize: 50 // 增加一次性加载的数量
      });

      setNovels(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Loading failed');
    }
  };

  // 首次加载
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
      style={({ pressed }) => ({
        width: itemWidth,
        marginBottom: spacing,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
        opacity: pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }]
      })}
    >
      <Image
        source={{ uri: item.cover }}
        style={{
          width: '100%',
          height: 150,
          resizeMode: 'cover'
        }}
      />
      <View style={{ padding: 8 }}>
        <Text 
          style={{ 
            fontSize: 16, 
            fontWeight: 'bold',
            marginBottom: 4 
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text 
          style={{ 
            fontSize: 12, 
            color: '#666',
            marginBottom: 4 
          }}
        >
          Author: {item.author}
        </Text>
        <Text 
          style={{ 
            fontSize: 12, 
            color: '#999',
            lineHeight: 16 
          }}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
    </Pressable>
  );

  const renderError = () => {
    if (error) {
      return (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {renderError()}
      <FlatList
        data={novels}
        renderItem={renderNovelItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: horizontalPadding,
          marginTop: spacing
        }}
        contentContainerStyle={{
          paddingBottom: spacing
        }}
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
