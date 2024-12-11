import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCode, CreditCard } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { qrService } from '../services/qr.service';
import QRCodeList from '../components/qr/QRCodeList';
import type { QRCodeType } from '../types/qr';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<QRCodeType>('vcard');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('vcard')}
              className={`${
                activeTab === 'vcard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
            >
              <CreditCard className="h-5 w-5 mx-auto mb-1" />
              VCards
            </button>
            <button
              onClick={() => setActiveTab('dynamic')}
              className={`${
                activeTab === 'dynamic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
            >
              <QrCode className="h-5 w-5 mx-auto mb-1" />
              Dynamic QR
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to={`/create/${activeTab}`}
              className="block p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-100 transition-colors"
            >
              <div className="text-center">
                <QrCode className="h-8 w-8 mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Create New</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab === 'vcard' ? 'Generate a new VCard QR code' : 'Create a dynamic QR code'}
                </p>
              </div>
            </Link>

            <QRCodeList type={activeTab} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}