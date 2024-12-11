import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Free QR Code Generator
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create QR codes for your contact information or any content instantly. No sign-up required.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4">
            <Link
              to="/create/vcard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Create VCard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/create/qr"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Create QR Code <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <QrCode className="h-12 w-12 mx-auto text-blue-600" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                VCard QR Codes
              </h2>
              <p className="mt-2 text-gray-500">
                Create digital business cards that can be scanned and saved directly to phones.
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <QrCode className="h-12 w-12 mx-auto text-green-600" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                Custom QR Codes
              </h2>
              <p className="mt-2 text-gray-500">
                Generate QR codes for any text, URL, or content you want to share.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}