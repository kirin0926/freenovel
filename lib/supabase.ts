import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 小说数据类型
export interface Novel {
  id: string;
  created_at: string;
  title: string;
  author: string;
  cover: string;
  description: string;
}

// 小说相关的数据操作
export const novelApi = {
  // 获取小说列表
  async getNovels({ page = 1, pageSize = 10 }) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('novels')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      data: data as Novel[],
      total: count || 0,
      hasMore: (count || 0) > to + 1
    };
  }
}; 