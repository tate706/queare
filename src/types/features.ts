export interface PremiumFeatures {
  saveHistory: boolean;
  customBranding: boolean;
  analytics: boolean;
  bulkGeneration: boolean;
  dynamicUpdates: boolean;
}

export interface VCardFeatures extends PremiumFeatures {
  downloadVCard: boolean;
  downloadQR: boolean;
  shareLinks: boolean;
}