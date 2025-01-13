import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { validateApiKey } from '../utils/api';

interface NavbarProps {
  onApiKeyUpdate: (newKey: string) => void;
}

export default function Navbar({ onApiKeyUpdate }: NavbarProps) {
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      const response = await validateApiKey(apiKey);
      if (response.valid) {
        onApiKeyUpdate(apiKey);
        setShowApiModal(false);
        setApiKey('');
        setError('');
      } else {
        setError(response.message || 'Invalid API key');
      }
    } catch (err) {
      setError('Failed to validate API key');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">CDP Assistant</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setShowApiModal(true)}
              className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              <Settings className="w-5 h-5 mr-2" />
              Update API Key
            </button>
          </div>
        </div>
      </div>

      {showApiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Update API Key</h2>
              <button 
                onClick={() => {
                  setShowApiModal(false);
                  setApiKey('');
                  setError('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter OpenAI API Key"
                className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isValidating}
              />
              {error && (
                <p className="text-red-500 text-sm mb-4 break-words">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={isValidating}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? 'Validating...' : 'Update Key'}
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}