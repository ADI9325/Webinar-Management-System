// frontend/src/components/Header.tsx

import { Link } from 'react-router-dom';
import { Video } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90">
            <div className="bg-white p-2 rounded-lg">
              <Video className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">WebinarHub</h1>
              <p className="text-blue-100 text-xs">Manage Your Webinars</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
