import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { qrService } from '../../services/qr.service';
import { generateVCard, generateQRCodeUrl } from '../../utils/vcard';
import type { VCardData } from '../../types/vcard';

export default function VCardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const vcardContent = generateVCard(data);
      const qrCodeUrl = generateQRCodeUrl(vcardContent);

      if (user) {
        await qrService.createQRCode({
          user_id: user.id,
          type: 'vcard',
          content: vcardContent,
          title: `${data.firstName} ${data.lastName}'s VCard`,
        });
      }

      // Store in local storage for non-authenticated users
      const localQRCodes = JSON.parse(localStorage.getItem('qrcodes') || '[]');
      localQRCodes.push({
        type: 'vcard',
        content: vcardContent,
        created_at: new Date().toISOString(),
        qrCodeUrl,
      });
      localStorage.setItem('qrcodes', JSON.stringify(localQRCodes));

      navigate('/dashboard', { state: { success: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create VCard');
    } finally {
      setLoading(false);
    }
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
            Create VCard QR Code
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={data.firstName}
                  onChange={handleChange('firstName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={data.lastName}
                  onChange={handleChange('lastName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={handleChange('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={data.phone}
                onChange={handleChange('phone')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create VCard QR Code'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}