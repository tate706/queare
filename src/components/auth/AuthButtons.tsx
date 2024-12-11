import React from 'react';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import EmailSignup from './EmailSignup';

export default function AuthButtons() {
  const { signIn } = useAuthStore();

  return (
    <div>
      <div className="space-y-3">
        <button
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        <button
          onClick={() => signIn('facebook')}
          className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-[#1864D9] transition-colors"
        >
          <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
          Continue with Facebook
        </button>
      </div>

      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <EmailSignup />
    </div>
  );
}