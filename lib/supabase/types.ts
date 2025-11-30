export type Database = {
  public: {
    Tables: {
      component_favorites: {
        Row: {
          id: string
          user_id: string
          component_slug: string
          component_name: string
          component_category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          component_slug: string
          component_name: string
          component_category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          component_slug?: string
          component_name?: string
          component_category?: string | null
          created_at?: string
        }
      }
      component_shares: {
        Row: {
          id: string
          component_slug: string
          platform: string
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          component_slug: string
          platform: string
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          component_slug?: string
          platform?: string
          user_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
