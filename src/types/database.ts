export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
        }
      }
      qr_codes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          type: 'vcard' | 'dynamic'
          content: string
          title: string
          views: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          type: 'vcard' | 'dynamic'
          content: string
          title: string
          views?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          type?: 'vcard' | 'dynamic'
          content?: string
          title?: string
          views?: number
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
  }
}