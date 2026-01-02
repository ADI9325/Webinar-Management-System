# Webinar Management System - Frontend

A clean, modern React TypeScript frontend with Tailwind CSS for managing webinars and attendee registrations.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Build Tool**: Vite

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CreateWebinarModal.tsx    # Modal for creating webinars
│   │   ├── RegisterModal.tsx         # Modal for attendee registration
│   │   ├── WebinarCard.tsx           # Webinar card component
│   │   ├── LoadingSpinner.tsx        # Loading indicator
│   │   └── ErrorMessage.tsx          # Error display component
│   ├── pages/
│   │   ├── WebinarList.tsx           # Webinar list page
│   │   └── WebinarDetail.tsx         # Webinar detail page
│   ├── services/
│   │   └── api.ts                    # API service layer
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   ├── utils/
│   │   └── dateUtils.ts              # Date formatting utilities
│   ├── App.tsx                       # Main app with routing
│   ├── main.tsx                      # Entry point
│   ├── index.css                     # Global styles with Tailwind
│   └── vite-env.d.ts                 # Vite TypeScript definitions
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on http://localhost:3000

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file (or use the existing one):
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Visit: `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Features

### 1. Webinar List Page
- View all webinars in a card layout
- Each card shows:
  - Title
  - Description (truncated)
  - Scheduled date & time
  - Attendee count
- Create new webinar button
- Responsive grid layout
- Loading states
- Error handling
- Empty state when no webinars

### 2. Webinar Detail Page
- Full webinar information
- Register button
- Complete attendee list showing:
  - Full name
  - Email
  - Registration date
- Back navigation
- Loading states
- Error handling

### 3. Create Webinar Modal
- Title input (required)
- Description textarea (optional)
- Date & time picker (required)
- Form validation
- Loading state during submission
- Error display
- Success handling

### 4. Register Modal
- Full name input (required)
- Email input (required)
- Form validation
- Loading state during submission
- Error display (including duplicate registration)
- Success handling

## UI/UX Features

### Loading States
- Spinner component for async operations
- Disabled buttons during loading
- Loading spinner inside buttons

### Error Handling
- Consistent error message display
- API error messages shown to user
- Form validation errors
- Network error handling

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Adaptive button sizes
- Modal works on all screen sizes

### Accessibility
- Semantic HTML
- Proper form labels
- Keyboard navigation
- Focus states
- ARIA attributes where needed

## Components

### LoadingSpinner
```tsx
<LoadingSpinner size={24} className="my-4" />
```

### ErrorMessage
```tsx
<ErrorMessage message="Something went wrong" />
```

### WebinarCard
```tsx
<WebinarCard webinar={webinarData} />
```

### CreateWebinarModal
```tsx
<CreateWebinarModal 
  isOpen={isOpen}
  onClose={handleClose}
  onSuccess={handleSuccess}
/>
```

### RegisterModal
```tsx
<RegisterModal 
  isOpen={isOpen}
  onClose={handleClose}
  onSuccess={handleSuccess}
  webinarId={id}
  webinarTitle={title}
/>
```

## API Integration

All API calls are centralized in `src/services/api.ts`:

```typescript
// Get all webinars
const webinars = await webinarApi.getAllWebinars();

// Get webinar by ID
const webinar = await webinarApi.getWebinarById(id);

// Create webinar
const newWebinar = await webinarApi.createWebinar({
  title: 'My Webinar',
  description: 'Description',
  scheduledAt: '2026-01-15T10:00:00Z'
});

// Register attendee
const attendee = await webinarApi.registerAttendee(webinarId, {
  fullName: 'John Doe',
  email: 'john@example.com'
});
```

## Styling

### Tailwind CSS Classes Used

- **Colors**: blue-600, gray-50, gray-900, red-50
- **Layout**: flex, grid, gap, space-y
- **Spacing**: p-4, px-6, py-2, m-4
- **Typography**: text-xl, font-bold, text-gray-600
- **Effects**: hover:shadow-lg, transition-shadow
- **Responsive**: md:grid-cols-2, lg:grid-cols-3

### Custom Styles

Minimal custom CSS in `index.css`:
- Tailwind directives
- Font family setup
- Font smoothing

## Date Formatting

Using `date-fns` for consistent date display:

```typescript
formatDate('2026-01-15T10:00:00Z')      // "Jan 15, 2026"
formatDateTime('2026-01-15T10:00:00Z')  // "Jan 15, 2026 10:00 AM"
formatTime('2026-01-15T10:00:00Z')      // "10:00 AM"
```

## Icons

Using Lucide React icons:
- Calendar
- Users
- Plus
- ArrowLeft
- X
- AlertCircle
- Loader2
- Mail
- User

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

To preview the production build:
```bash
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port 5173 already in use
Change the port in `vite.config.ts`:
```typescript
server: {
  port: 5174, // or any available port
}
```

### API connection errors
- Ensure backend is running on http://localhost:3000
- Check CORS is enabled on backend
- Verify VITE_API_URL in `.env`

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Code Quality

- ✅ TypeScript for type safety
- ✅ Clean component structure
- ✅ Proper error handling
- ✅ Loading states everywhere
- ✅ Responsive design
- ✅ No hardcoded values
- ✅ Reusable components
- ✅ Consistent naming conventions

## Next Steps

1. ✅ Frontend complete and working
2. Test all user flows
3. Deploy to production
4. Add more features (optional)

---

**Status**: ✅ Frontend Complete & Production-Ready
