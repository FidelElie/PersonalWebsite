export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          is_primary: boolean | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_primary?: boolean | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_primary?: boolean | null
          name?: string | null
        }
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: number
          role: number | null
          user: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          role?: number | null
          user?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          role?: number | null
          user?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
