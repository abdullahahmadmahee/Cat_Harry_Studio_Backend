# StudioSpace Backend API 🎬

This is the custom Node.js and Express backend that powers StudioSpace, a premium peer-to-peer workspace sharing marketplace. It handles secure user authentication, workspace listing management, and conflict-free booking reservations.

## 🚀 Live API Link

Production URL:cat-harry-studio-backend.vercel.app

## 🛠️ Technology Stack

* Runtime: Node.js
* Framework: Express.js
* Language: TypeScript
* Database: MongoDB & Mongoose
* Authentication: JWT (JSON Web Tokens) with secure HTTPOnly cookies
* Deployment: Vercel Serverless Functions

## ✨ Core Features

* Secure Authentication: Implements bcrypt password hashing and JWT-based authentication stored in HTTPOnly, SameSite=None cookies for cross-domain security.
* Double-Booking Prevention Engine: Active validation logic that intercepts booking requests and queries the database for overlapping time slots, strictly preventing schedule conflicts.
* Full CRUD Functionality: Complete RESTful endpoints for managing users, studio listings, and booking reservations.
* Serverless Optimized: Configured natively for Vercel using an `api/index.ts` entry point and optimized MongoDB connection pooling.

## 📡 API Endpoints Summary

### Authentication (`/api/auth`)

* `POST /register` - Register a new user
* `POST /login` - Authenticate a user and issue JWT cookie
* `POST /logout` - Clear the authentication cookie

### Studios (`/api/studios`)

* `GET /` - Retrieve all studios (Supports `?search=` and `?category=` queries)
* `GET /:id` - Retrieve specific studio details
* `GET /host/:email` - Retrieve all studios listed by a specific host (Protected)
* `POST /` - Publish a new studio listing (Protected)
* `PUT /:id` - Update an existing studio listing (Protected)
* `DELETE /:id` - Delete a studio listing (Protected)

### Bookings (`/api/bookings`)

* `POST /` - Create a new booking reservation (Protected)
* `GET /user/:email` - Retrieve all bookings for a specific user (Protected)
* `PATCH /:id/cancel` - Cancel a specific booking (Protected)

