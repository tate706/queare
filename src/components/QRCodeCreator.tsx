import React, { useState } from 'react';
import { QrCode, Download, Wifi, Link, CreditCard, Mail, Phone, MapPin } from 'lucide-react';

type QRContentType = 'url' | 'wifi' | 'vcard' | 'email' | 'phone' | 'location' | 'text';

interface ContentTypeOption {
  id: QRContentType;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}

const contentTypes: ContentTypeOption[] = [
  { id: 'url', label: 'Website URL', icon: <Link className="h-5 w-5" />, placeholder: 'https://example.com' },
  { id: 'wifi', label: 'WiFi Network', icon: <Wifi className="h-5 w-5" />, placeholder: 'Network details' },
  { id: 'vcard', label: 'Contact Card', icon: <CreditCard className="h-5 w-5" />, placeholder: 'Contact information' },
  { id: 'email', label: 'Email', icon: <Mail className="h-5 w-5" />, placeholder: 'Email details' },
  { id: 'phone', label: 'Phone Number', icon: <Phone className="h-5 w-5" />, placeholder: 'Phone number' },
  { id: 'location', label: 'Location', icon: <MapPin className="h-5 w-5" />, placeholder: 'Geographic coordinates' },
  { id: 'text', label: 'Plain Text', icon: <QrCode className="h-5 w-5" />, placeholder: 'Any text content' },
];

export default function QRCodeCreator() {
  const [selectedType, setSelectedType] = useState<QRContentType>('url');
  const [formData, setFormData] = useState({
    url: '',
    wifi: {
      ssid: '',
      password: '',
      encryption: 'WPA',
    },
    vcard: {
      name: '',
      phone: '',
      email: '',
    },
    email: {
      address: '',
      subject: '',
      body: '',
    },
    phone: '',
    location: {
      latitude: '',
      longitude: '',
    },
    text: '',
  });
  const [qrCode, setQrCode] = useState('');

  const generateContent = () => {
    switch (selectedType) {
      case 'url':
        return formData.url;
      case 'wifi':
        return `WIFI:T:${formData.wifi.encryption};S:${formData.wifi.ssid};P:${formData.wifi.password};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.vcard.name}\nTEL:${formData.vcard.phone}\nEMAIL:${formData.vcard.email}\nEND:VCARD`;
      case 'email':
        return `mailto:${formData.email.address}?subject=${encodeURIComponent(formData.email.subject)}&body=${encodeURIComponent(formData.email.body)}`;
      case 'phone':
        return `tel:${formData.phone}`;
      case 'location':
        return `geo:${formData.location.latitude},${formData.location.longitude}`;
      case 'text':
        return formData.text;
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = generateContent();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(content)}`;
    setQrCode(qrCodeUrl);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [selectedType]: typeof prev[selectedType] === 'object'
        ? { ...prev[selectedType], [field]: value }
        : value
    }));
  };

  const renderForm = () => {
    switch (selectedType) {
      case 'url':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">Website URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://example.com"
              required
            />
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Network Name (SSID)</label>
              <input
                type="text"
                value={formData.wifi.ssid}
                onChange={(e) => handleInputChange('ssid', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.wifi.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Encryption</label>
              <select
                value={formData.wifi.encryption}
                onChange={(e) => handleInputChange('encryption', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.vcard.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.vcard.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.vcard.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={formData.email.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                value={formData.email.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Body</label>
              <textarea
                value={formData.email.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'phone':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="+1234567890"
              required
            />
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                type="text"
                value={formData.location.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 40.7128"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                type="text"
                value={formData.location.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., -74.0060"
                required
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">Text Content</label>
            <textarea
              value={formData.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter any text content"
              required
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Create QR Code
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-lg border-2 text-center ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-center mb-2">{type.icon}</div>
                <div className="text-sm font-medium">{type.label}</div>
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            {renderForm()}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Generate QR Code
            </button>
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
            <a
              href={qrCode}
              download={`qrcode-${selectedType}.png`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </a>
          </div>
        </div>
      )}
    </div>
  );
}