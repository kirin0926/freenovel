import { Text, View, FlatList, Image, Dimensions, ActivityIndicator, RefreshControl } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { Novel, novelApi } from '../lib/supabase';

export default function Index() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 布局常量
  const screenWidth = Dimensions.get('window').width;
  const spacing = 12; // 卡片之间的间距
  const horizontalPadding = 16; // 屏幕左右边距
  const itemWidth = (screenWidth - (horizontalPadding * 2) - spacing) / 2; // 计算单个卡片宽度

  // 获取小说列表数据
  const fetchNovels = async (isRefresh = false) => {
    try {
      setError(null);
      const currentPage = isRefresh ? 1 : page;
      
      const { data, hasMore: more } = await novelApi.getNovels({
        page: currentPage,
        pageSize: 10
      });

      if (isRefresh) {
        setNovels(data);
        setPage(1);
      } else {
        setNovels(prev => [...prev, ...data]);
        setPage(currentPage + 1);
      }
      
      setHasMore(more);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Loading failed');
    }
  };

  // 首次加载
  useEffect(() => {
    fetchNovels(true);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNovels(true);
    setRefreshing(false);
  }, []);

  const onEndReached = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    await fetchNovels();
    setLoading(false);
  };

  const renderNovelItem = ({ item }: { item: Novel }) => (
    <View 
      style={{
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
        overflow: 'hidden'
      }}
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
          {item.author}
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
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) {
      return (
        <Text style={{ textAlign: 'center', padding: 16, color: '#666' }}>
          There is no more data available
        </Text>
      );
    }
    if (loading) {
      return (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      );
    }
    return null;
  };

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
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
