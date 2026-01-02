// frontend/src/pages/WebinarDetail.tsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Mail, Clock } from 'lucide-react';
import { webinarApi } from '../services/api';
import { Webinar } from '../types';
import { RegisterModal } from '../components/RegisterModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { formatDate, formatTime } from '../utils/dateUtils';

export const WebinarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWebinar = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await webinarApi.getWebinarById(id);
      setWebinar(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load webinar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (error || !webinar) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Webinars
          </Link>
          <ErrorMessage message={error || 'Webinar not found'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Webinars
        </Link>

        {/* Webinar Info Card */}
        <div className="bg-white rounded-lg shadow p-6 sm:p-8 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {webinar.title}
          </h1>
          
          {webinar.description && (
            <p className="text-gray-600 mb-6">{webinar.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar size={20} className="text-blue-600" />
              <div>
                <div className="text-xs text-gray-500">Date</div>
                <div className="font-medium">{formatDate(webinar.scheduledAt)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock size={20} className="text-blue-600" />
              <div>
                <div className="text-xs text-gray-500">Time</div>
                <div className="font-medium">{formatTime(webinar.scheduledAt)}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-blue-50 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              <span className="font-semibold text-gray-900">
                {webinar.attendeeCount} attendees registered
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Attendees Section */}
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Registered Attendees ({webinar.attendees?.length || 0})
          </h2>

          {!webinar.attendees || webinar.attendees.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Users size={32} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No attendees registered yet</p>
              <p className="text-gray-400 text-sm mt-1">Be the first to register!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {webinar.attendees.map((attendee) => (
                <div
                  key={attendee._id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {attendee.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {attendee.fullName}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} />
                      <span className="truncate">{attendee.email}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    {formatDate(attendee.joinedAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {id && (
        <RegisterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchWebinar}
          webinarId={id}
          webinarTitle={webinar.title}
        />
      )}
    </div>
  );
};
