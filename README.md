# 🎯 Webinar Management System

A full-stack web application for managing webinars and attendee registrations.

## 🔗 Live Demo

- **Frontend:** [https://webinar-management-system-i2dinknd3-adi9325s-projects.vercel.app](https://webinar-management-system-i2dinknd3-adi9325s-projects.vercel.app)
- **Backend API:** [Your Backend URL]
- **Documentation:** [Google Drive](https://drive.google.com/file/d/157nxrAdG5QQb1pq26NmqaIFtPRoP2a3_/view?usp=sharing)

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS
- Vite
- Axios
- React Router
- Lucide Icons

**Backend:**
- NestJS
- MongoDB (Mongoose)
- TypeScript
- Class Validator

## 📋 Features

- ✅ Create and manage webinars
- ✅ Register attendees for webinars
- ✅ View webinar details with attendee list
- ✅ Duplicate registration prevention
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Real-time attendee count
- ✅ Clean and simple UI

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ADI9325/Webinar-Management-System.git
cd Webinar-Management-System
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=3000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/webinar-system" >> .env

# Start MongoDB (if local)
# Windows: Start MongoDB service
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Run backend
npm run start:dev
```

**Backend runs on:** http://localhost:3000

### 3️⃣ Frontend Setup

Open a **new terminal** and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000" > .env

# Run frontend
npm run dev
```

**Frontend runs on:** http://localhost:5173

## 📂 Project Structure

```
Webinar-Management-System/
├── backend/
│   ├── src/
│   │   ├── webinars/          # Webinar module
│   │   ├── attendees/         # Attendee module
│   │   ├── common/            # Shared utilities
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔌 API Endpoints

### Webinars

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webinars` | Create webinar |
| GET | `/webinars` | List all webinars |
| GET | `/webinars/:id` | Get webinar details |

### Attendees

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webinars/:id/register` | Register attendee |
| GET | `/webinars/:id/attendees` | List attendees |

## 🧪 Testing the Application

### 1. Create a Webinar

```bash
curl -X POST http://localhost:3000/webinars \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to React",
    "description": "Learn React basics",
    "scheduledAt": "2026-01-15T10:00:00Z"
  }'
```

### 2. Register an Attendee

```bash
curl -X POST http://localhost:3000/webinars/{WEBINAR_ID}/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com"
  }'
```

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Set Root Directory: `frontend`
4. Set Framework: `Vite`
5. Add Environment Variable: `VITE_API_URL`
6. Deploy

### Backend (Render.com)

1. Connect GitHub repository
2. Set Root Directory: `backend`
3. Add Environment Variables:
   - `PORT=3000`
   - `MONGODB_URI=your-mongodb-uri`
   - `NODE_ENV=production`
4. Deploy

## 📝 Environment Variables

### Backend (.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/webinar-system
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### Backend won't start?
- Ensure MongoDB is running
- Check if port 3000 is available
- Verify MONGODB_URI in .env

### Frontend shows network errors?
- Check if backend is running
- Verify VITE_API_URL in .env
- Check CORS is enabled in backend

### Can't create webinar?
- Check backend logs
- Verify MongoDB connection
- Test API with curl/Postman

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 👨‍💻 Author

**ADI9325**
- GitHub: [@ADI9325](https://github.com/ADI9325)
- Repository: [Webinar-Management-System](https://github.com/ADI9325/Webinar-Management-System)

## 🙏 Acknowledgments

Built as part of a full-stack development assignment demonstrating:
- Clean architecture
- RESTful API design
- MongoDB aggregation
- React best practices
- TypeScript
- Responsive design