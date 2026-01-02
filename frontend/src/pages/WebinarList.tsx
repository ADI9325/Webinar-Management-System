// frontend/src/pages/WebinarList.tsx

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { webinarApi } from '../services/api';
import { Webinar } from '../types';
import { WebinarCard } from '../components/WebinarCard';
import { CreateWebinarModal } from '../components/CreateWebinarModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const WebinarList = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWebinars = async () => {
    try {
      setLoading(true);
      const data = await webinarApi.getAllWebinars();
      setWebinars(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load webinars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Webinars</h1>
            <p className="text-gray-600 mt-1">Browse and register for upcoming webinars</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Plus size={20} />
            Create Webinar
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size={40} />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : webinars.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No webinars yet</h3>
            <p className="text-gray-500 mb-6">Create your first webinar to get started</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Your First Webinar
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.map((webinar) => (
              <WebinarCard key={webinar._id} webinar={webinar} />
            ))}
          </div>
        )}
      </div>

      <CreateWebinarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchWebinars}
      />
    </div>
  );
};
