import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Novel, supabase } from '../../lib/supabase';

export default function NovelReader() {
  const { id } = useLocalSearchParams();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNovel() {
      try {
        const { data, error } = await supabase
          .from('novels')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setNovel(data as Novel);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Loading failed');
      } finally {
        setLoading(false);
      }
    }

    fetchNovel();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (!novel) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text>Novel not found</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: 'white' }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Novel Title */}
      <Text style={{ 
        fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333'
      }}>
        {novel.title}
      </Text>

      {/* Author Info */}
      <Text style={{ 
        fontSize: 16,
        color: '#666',
        marginBottom: 24
      }}>
        Author: {novel.author}
      </Text>

      {/* Novel Description */}
      <View style={{
        marginBottom: 32
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#333'
        }}>
          Description
        </Text>
        <Text style={{
          fontSize: 16,
          lineHeight: 24,
          color: '#444'
        }}>
          {novel.description}
        </Text>
      </View>

      {/* Novel Content */}
      <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#333'
        }}>
          Content
        </Text>
        <Text style={{
          fontSize: 16,
          lineHeight: 28,
          color: '#333',
          textAlign: 'justify'
        }}>
          {novel.content}
        </Text>
      </View>
    </ScrollView>
  );
} 