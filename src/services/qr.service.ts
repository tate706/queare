import { supabase, handleSupabaseError } from '../lib/supabase';
import type { Database } from '../types/database';

type QRCode = Database['public']['Tables']['qr_codes']['Row'];
type QRCodeInsert = Database['public']['Tables']['qr_codes']['Insert'];

export const qrService = {
  createQRCode: async (qrCode: QRCodeInsert) => {
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .insert([qrCode])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error as Error);
    }
  },

  getUserQRCodes: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error as Error);
    }
  },

  updateQRCode: async (id: string, updates: Partial<QRCode>) => {
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error as Error);
    }
  },

  incrementViews: async (id: string) => {
    try {
      const { error } = await supabase.rpc('increment_qr_views', { qr_id: id });
      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error as Error);
    }
  },
};