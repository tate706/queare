import React, { useEffect, useState } from 'react';
import { qrService } from '../../services/qr.service';
import QRCodeCard from './QRCodeCard';
import type { QRCode } from '../../types/qr';

interface QRCodeListProps {
  type: QRCode['type'];
  userId: string;
}

export default function QRCodeList({ type, userId }: QRCodeListProps) {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQRCodes = async () => {
      try {
        const codes = await qrService.getUserQRCodes(userId);
        if (codes) {
          setQrCodes(codes.filter(code => code.type === type));
        }
      } finally {
        setLoading(false);
      }
    };

    loadQRCodes();
  }, [userId, type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {qrCodes.map((code) => (
        <QRCodeCard key={code.id} code={code} />
      ))}
    </>
  );
}