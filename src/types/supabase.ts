export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      // Add your table definitions here
      // Example:
      // users: {
      //   Row: {
      //     id: string
      //     created_at: string
      //     email: string
      //     full_name: string | null
      //   }
      //   Insert: {
      //     id?: string
      //     created_at?: string
      //     email: string
      //     full_name?: string | null
      //   }
      //   Update: {
      //     id?: string
      //     created_at?: string
      //     email?: string
      //     full_name?: string | null
      //   }
      //   Relationships: []
      // }
    }
    Views: {
      // Add your view definitions here
    }
    Functions: {
      // Add your function definitions here
    }
    Enums: {
      // Add your enum definitions here
    }
    CompositeTypes: {
      // Add your composite type definitions here
    }
  }
}