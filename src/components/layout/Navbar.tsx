import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-blue-600">
              <QrCode className="h-6 w-6" />
              <span className="font-bold text-xl">QR Creator</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/create/vcard"
              className="text-gray-700 hover:text-blue-600"
            >
              Create VCard
            </Link>
            <Link
              to="/create/qr"
              className="text-gray-700 hover:text-blue-600"
            >
              Create QR Code
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}