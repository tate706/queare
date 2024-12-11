import React from 'react';
import type { QRCode } from '../../types/qr';

interface QRCodeCardProps {
  code: QRCode;
}

export default function QRCodeCard({ code }: QRCodeCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="font-medium text-gray-900">{code.title}</h3>
      <p className="text-sm text-gray-500 mt-1">
        Created {new Date(code.created_at).toLocaleDateString()}
      </p>
      <div className="mt-4">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
            code.content
          )}`}
          alt={code.title}
          className="w-32 h-32 mx-auto"
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Views: {code.views}
      </p>
    </div>
  );
}