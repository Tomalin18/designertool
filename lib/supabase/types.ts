// 這個檔案可以從 Supabase Dashboard 自動生成
// 暫時使用基本類型，之後可以從 Supabase CLI 生成完整的類型定義
export type Database = {
  public: {
    Tables: {
      // 可以在之後從 Supabase 生成完整的類型
      [key: string]: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
      }
    }
    Views: {
      [key: string]: {
        Row: Record<string, unknown>
      }
    }
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>
        Returns: unknown
      }
    }
  }
}

