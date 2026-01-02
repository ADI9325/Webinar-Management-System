// frontend/src/components/Footer.tsx

import { Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-1">WebinarHub</h3>
            <p className="text-sm text-gray-400">
              Your complete webinar management solution
            </p>
          </div>

          <div className="text-center text-sm">
            <p className="flex items-center justify-center gap-2">
              © {currentYear} WebinarHub. Made with{' '}
              <Heart size={14} className="text-red-500" fill="currentColor" /> for webinars
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
