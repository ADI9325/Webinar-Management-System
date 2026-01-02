// frontend/src/components/WebinarCard.tsx

import { Calendar, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Webinar } from '../types';
import { formatDate, formatTime } from '../utils/dateUtils';

interface WebinarCardProps {
  webinar: Webinar;
}

export const WebinarCard = ({ webinar }: WebinarCardProps) => {
  return (
    <Link
      to={`/webinars/${webinar._id}`}
      className="block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md p-6"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
        {webinar.title}
      </h3>
      
      {webinar.description && (
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
          {webinar.description}
        </p>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-600" />
          <span>{formatDate(webinar.scheduledAt)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-blue-600" />
          <span>{formatTime(webinar.scheduledAt)}</span>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <Users size={16} className="text-green-600" />
          <span className="font-medium">
            {webinar.attendeeCount} {webinar.attendeeCount === 1 ? 'attendee' : 'attendees'}
          </span>
        </div>
      </div>
    </Link>
  );
};
