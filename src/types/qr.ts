export type QRCodeType = 'vcard' | 'dynamic';

export interface QRCode {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  type: QRCodeType;
  content: string;
  title: string;
  views: number;
}

export interface QRCodeCreate {
  user_id: string;
  type: QRCodeType;
  content: string;
  title: string;
}