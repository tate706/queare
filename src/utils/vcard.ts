import { VCardData } from '../types/vcard';

export function generateVCard(data: VCardData): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.firstName} ${data.lastName}`,
    `N:${data.lastName};${data.firstName};;;`,
    data.organization && `ORG:${data.organization}`,
    data.title && `TITLE:${data.title}`,
    data.email && `EMAIL:${data.email}`,
    data.phone && `TEL:${data.phone}`,
    data.website && `URL:${data.website}`,
    data.address && `ADR:;;${data.address}`,
    'END:VCARD'
  ]
    .filter(Boolean)
    .join('\n');

  return vcard;
}

export function generateQRCodeUrl(vcardContent: string): string {
  const encodedVCard = encodeURIComponent(vcardContent);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedVCard}`;
}