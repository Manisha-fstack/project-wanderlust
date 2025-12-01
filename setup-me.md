# Project Wanderlust - Setup Guide & Walkthrough

## 📋 Project Overview

**Wanderlust** is a full-stack web application similar to Airbnb, built with Node.js and Express. It's a platform where users can browse, create, edit, and manage property listings with features like:

- User authentication (login/signup)
- CRUD operations for property listings
- Image uploads via Cloudinary
- Review system for listings
- Interactive maps using MapLibre GL
- Session-based authentication with Passport.js

## 🏗️ Project Architecture

### Technology Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS (Embedded JavaScript)
- **Authentication**: Passport.js with Local Strategy
- **Image Storage**: Cloudinary
- **Session Management**: express-session with MongoDB store
- **Maps**: MapLibre GL
- **Validation**: Joi
- **File Upload**: Multer with Cloudinary storage

### 📁 Project Structure

```
project-wanderlust/
├── app.js                 # Main application entry point
├── cloudConfig.js         # Cloudinary configuration
├── schemas.js             # Joi validation schemas
├── middleware.js          # Custom middleware (auth, validation)
│
├── models/                # Mongoose data models
│   ├── listing.js        # Listing schema
│   ├── review.js         # Review schema
│   └── user.js           # User schema
│
├── controllers/           # Business logic handlers
│   ├── listing.js        # Listing CRUD operations
│   ├── review.js         # Review operations
│   └── user.js           # User authentication
│
├── routes/                # Express route definitions
│   ├── listing.js        # Listing routes
│   ├── review.js         # Review routes
│   └── user.js           # User/auth routes
│
├── views/                 # EJS templates
│   ├── layouts/          # Layout templates
│   ├── listings/         # Listing views
│   ├── users/            # User/auth views
│   └── includes/         # Reusable components
│
├── public/                # Static assets
│   ├── css/              # Stylesheets
│   └── js/               # Client-side JavaScript
│
├── utils/                 # Utility functions
│   ├── ExpressError.js   # Custom error class
│   └── wrapAsync.js      # Async error wrapper
│
└── init/                  # Database initialization
    ├── index.js          # DB initialization script
    └── data.js           # Seed data
```

## 🔧 Key Files Explained

### 1. **app.js** (Main Application File)
- Sets up Express server
- Configures MongoDB connection
- Initializes Passport.js authentication
- Sets up session management
- Configures middleware (flash messages, static files, etc.)
- Registers routes
- Server listens on port **8080**

### 2. **cloudConfig.js**
- Configures Cloudinary for image storage
- Sets up Multer storage for handling file uploads
- Stores images in 'Wanderlust_DEV' folder on Cloudinary

### 3. **models/** 
- **listing.js**: Defines property listing schema with fields like title, description, price, location, images, reviews, and owner
- **user.js**: User schema with email and password (via passport-local-mongoose)
- **review.js**: Review schema linked to listings and users

### 4. **routes/listing.js**
- Handles all listing-related routes:
  - GET `/` - List all listings
  - GET `/new` - Show create form
  - POST `/` - Create new listing
  - GET `/:id` - Show single listing
  - GET `/:id/edit` - Show edit form
  - PUT `/:id` - Update listing
  - DELETE `/:id` - Delete listing
- Includes authentication middleware (`isLoggedIn`, `isOwner`)
- Handles image uploads via Multer

### 5. **middleware.js**
- `isLoggedIn`: Checks if user is authenticated
- `isOwner`: Verifies user owns the listing
- `isReviewAuthor`: Verifies user wrote the review
- `validateReview`: Validates review data with Joi

## 🚀 Local Setup Instructions

### Prerequisites

1. **Node.js** (version 20.18.0 as specified in package.json)
   ```bash
   node --version  # Should be 20.18.0
   ```

2. **MongoDB**
   - Option A: MongoDB Atlas (cloud) - recommended for ease
   - Option B: Local MongoDB installation

3. **Cloudinary Account** (for image storage)
   - Sign up at https://cloudinary.com

### Step-by-Step Setup

#### 1. Install Dependencies

```bash
cd /Users/adivillareal/dev/project-wanderlust
npm install
```

#### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables to `.env`:

```env
# MongoDB Connection
# For MongoDB Atlas (cloud):
ATLAS_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority

# OR for Local MongoDB:
# ATLAS_DB_URL=mongodb://127.0.0.1:27017/wanderlust

# Session Secret (generate a random string)
SECRET_KEY=your-super-secret-key-here-make-it-long-and-random

# Cloudinary Configuration
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

**How to get these values:**

- **ATLAS_DB_URL**: 
  - For Atlas: Create account at https://www.mongodb.com/cloud/atlas, create a cluster, get connection string
  - For local: Just use `mongodb://127.0.0.1:27017/wanderlust`

- **SECRET_KEY**: 
  - Generate a random string: `openssl rand -base64 32`
  - Or use any long random string

- **Cloudinary credentials**: 
  - Sign up at https://cloudinary.com
  - Go to Dashboard → Your credentials are displayed there

#### 3. Set Up MongoDB

**Option A: Using MongoDB Atlas (Cloud - Recommended)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `wanderlust` (or add `?retryWrites=true&w=majority` at the end)
8. Add this as `ATLAS_DB_URL` in your `.env` file

**Option B: Using Local MongoDB**

1. Install MongoDB locally:
   ```bash
   # macOS
   brew install mongodb-community
   
   # Start MongoDB service
   brew services start mongodb-community
   ```

2. Use `mongodb://127.0.0.1:27017/wanderlust` in your `.env`

#### 4. (Optional) Initialize Sample Data

If you want to populate the database with sample listings:

```bash
# Make sure MongoDB is running and connected
node init/index.js
```

**Note**: This script uses a hardcoded local MongoDB URL. You may need to update `init/index.js` if using Atlas, or create a test user first.

#### 5. Start the Server

```bash
node app.js
```

Or create a start script in `package.json`:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

Then run:
```bash
npm start
```

#### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

## 🔍 Important Notes

### ✅ Route Registration Fixed

The user routes are now properly registered in `app.js`. Login, signup, and logout endpoints should work correctly.

### Database Initialization

The `init/index.js` file uses a hardcoded local MongoDB URL. If you're using Atlas, you may need to:
1. Create a user in your database first
2. Update the `owner` field in the init script with a valid user ID
3. Or modify the init script to use your `ATLAS_DB_URL`

### Port Configuration

The server runs on port **8080**. Make sure this port is available. You can change it in `app.js` if needed.

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot connect to DB" error**
   - Check your MongoDB connection string in `.env`
   - Ensure MongoDB is running (if local)
   - Verify network access in Atlas (whitelist your IP)

2. **"Module not found" errors**
   - Run `npm install` again
   - Delete `node_modules` and `package-lock.json`, then reinstall

3. **Image upload not working**
   - Verify Cloudinary credentials in `.env`
   - Check Cloudinary dashboard for API limits

4. **Session/S authentication errors**
   - Ensure `SECRET_KEY` is set in `.env`
   - Make sure it's a long, random string

5. **Port already in use**
   - Change port in `app.js` from 8080 to another port (e.g., 3000)
   - Or kill the process using port 8080:
     ```bash
     lsof -ti:8080 | xargs kill -9
     ```

## 📝 Next Steps

1. Create your first user account (signup)
2. Create your first listing
3. Customize the views in `views/` directory
4. Add more features as needed

## 🎯 Features Overview

- ✅ User Authentication (Login/Signup)
- ✅ Create, Read, Update, Delete Listings
- ✅ Image Upload via Cloudinary
- ✅ Review System
- ✅ Interactive Maps
- ✅ Session Management
- ✅ Flash Messages
- ✅ Owner Verification

---

**Happy Coding! 🚀**

