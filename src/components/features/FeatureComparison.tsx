import React from 'react';
import { Check, X } from 'lucide-react';

const features = [
  { name: 'Create VCard QR Code', free: true, premium: true },
  { name: 'Download VCard', free: true, premium: true },
  { name: 'Download QR Code', free: true, premium: true },
  { name: 'Save History', free: false, premium: true },
  { name: 'Custom Branding', free: false, premium: true },
  { name: 'Analytics', free: false, premium: true },
  { name: 'Bulk Generation', free: false, premium: true },
  { name: 'Dynamic Updates', free: false, premium: true },
];

export default function FeatureComparison() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Features
          </h2>
        </div>
        <div className="mt-12 space-y-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
            >
              <span className="text-gray-900">{feature.name}</span>
              <div className="flex space-x-8 w-32 justify-end">
                <div className="w-12 text-center">
                  {feature.free ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </div>
                <div className="w-12 text-center">
                  {feature.premium ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}