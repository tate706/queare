import React, { useState } from 'react';
import { VCardData } from '../types/vcard';
import { UserCircle, Building2, Mail, Phone, Globe, MapPin, Briefcase, Download, Share2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { generateVCard, generateQRCodeUrl } from '../utils/vcard';

export default function VCardForm() {
  const { user } = useAuthStore();
  const [data, setData] = useState<VCardData>({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    address: '',
  });
  const [qrCode, setQrCode] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vcardContent = generateVCard(data);
    const qrCodeUrl = generateQRCodeUrl(vcardContent);
    setQrCode(qrCodeUrl);
  };

  const handleChange = (field: keyof VCardData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({ ...data, [field]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Create Your VCard
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <UserCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={handleChange('firstName')}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <UserCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={handleChange('lastName')}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Other form fields remain the same */}
            
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Generate QR Code
              </button>
            </div>
          </div>
        </div>
      </form>

      {qrCode && (
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <img
              src={qrCode}
              alt="Generated QR Code"
              className="mx-auto mb-4"
            />
            <div className="flex justify-center space-x-4">
              <a
                href={qrCode}
                download="vcard-qr.png"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </a>
              {user && (
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}