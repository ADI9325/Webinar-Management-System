# Webinar Management System - Backend

A clean, scalable NestJS backend for managing webinars and attendee registrations.

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB (Mongoose)
- **Validation**: class-validator, class-transformer
- **Language**: TypeScript

## Project Structure

```
backend/
├── src/
│   ├── webinars/
│   │   ├── webinar.controller.ts    # Webinar endpoints
│   │   ├── webinar.service.ts       # Business logic
│   │   ├── webinar.schema.ts        # Mongoose schema
│   │   ├── webinar.dto.ts           # Request validation
│   │   └── webinar.module.ts        # Module definition
│   ├── attendees/
│   │   ├── attendee.controller.ts   # Attendee endpoints
│   │   ├── attendee.service.ts      # Business logic
│   │   ├── attendee.schema.ts       # Mongoose schema
│   │   ├── attendee.dto.ts          # Request validation
│   │   └── attendee.module.ts       # Module definition
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── pipes/
│   │   │   └── objectid-validation.pipe.ts
│   │   ├── utils/
│   │   │   └── response.interface.ts
│   │   └── constants/
│   │       └── error-codes.ts
│   ├── app.module.ts                # Root module
│   └── main.ts                      # Entry point
├── .env                             # Environment variables
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend root:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/webinar-system
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running:
   ```bash
   # Ubuntu/Linux
   sudo systemctl start mongod
   
   # macOS (Homebrew)
   brew services start mongodb-community
   
   # Or run manually
   mongod --dbpath /path/to/data/directory
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start
   ```

6. **Verify the server is running**
   
   Visit: `http://localhost:3000`

## API Endpoints

### Webinars

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webinars` | Create a new webinar |
| GET | `/webinars` | List all webinars |
| GET | `/webinars/:id` | Get webinar details with attendees |

### Attendees

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webinars/:id/register` | Register attendee for a webinar |
| GET | `/webinars/:id/attendees` | List all attendees of a webinar |

## Request/Response Examples

### Create Webinar

**Request:**
```json
POST /webinars
{
  "title": "Introduction to NestJS",
  "description": "Learn the basics of NestJS framework",
  "scheduledAt": "2026-01-15T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "659abc123def456789012345",
    "title": "Introduction to NestJS",
    "description": "Learn the basics of NestJS framework",
    "scheduledAt": "2026-01-15T10:00:00.000Z",
    "attendeeCount": 0,
    "createdAt": "2026-01-03T12:00:00.000Z"
  }
}
```

### Register Attendee

**Request:**
```json
POST /webinars/659abc123def456789012345/register
{
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "659def456ghi789012345678",
    "webinarId": "659abc123def456789012345",
    "fullName": "John Doe",
    "email": "john@example.com",
    "joinedAt": "2026-01-03T12:05:00.000Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "You are already registered for this webinar",
  "errorCode": "DUPLICATE_REGISTRATION"
}
```

## Key Features

### Data Validation
- All requests validated using class-validator
- Email normalization (lowercase, trimmed)
- String trimming for all text inputs
- ObjectId validation for parameters

### Error Handling
- Consistent error response format
- Custom error codes for specific scenarios
- Global exception filter

### Database Design
- Compound unique index: `{ webinarId: 1, email: 1 }`
- Prevents duplicate registrations
- Optimized queries with proper indexing

### MongoDB Aggregation Usage
- Used ONLY for webinar details endpoint
- Combines webinar data with attendee statistics
- Not used for simple operations (inserts, counts)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/webinar-system |

## Assumptions

1. MongoDB is running locally on default port (27017)
2. No authentication required for API endpoints
3. Dates are provided in ISO 8601 format
4. Email addresses are case-insensitive
5. Webinar deletion is not implemented (out of scope)

## Design Decisions

1. **Aggregation Usage**: Used only for the webinar details endpoint where we need to join data and calculate statistics
2. **Attendee Count**: Stored as a denormalized field for quick access on list view, incremented atomically
3. **Validation**: DTOs with class-validator ensure data integrity at the API boundary
4. **Error Codes**: Predefined error codes help frontend handle specific scenarios
5. **Response Format**: Consistent success/error response structure across all endpoints

## Testing

To test the API, you can use:
- Postman
- cURL
- Any HTTP client

Example cURL command:
```bash
curl -X POST http://localhost:3000/webinars \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Webinar",
    "description": "Test Description",
    "scheduledAt": "2026-01-15T10:00:00Z"
  }'
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using the port

### Validation Errors
- Check request body matches DTO requirements
- Ensure dates are in ISO 8601 format
- Verify email format is valid
