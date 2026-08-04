# TasteLoop - Food App 🍔🍕🍩

A full-stack food platform where users can explore food videos, save their favorite items, like posts, and manage food media with a mobile-first responsive design.

## Live Demo

- **Live Site**: [Insert Your Live Link Here]

## Features

- **Mobile-First Approach**: Fully optimized for mobile screens first and scalable to desktop displays.
- **User Authentication**: Secure JWT-based authentication for users and creators.
- **Media Uploads**: Video and image uploads integrated with ImageKit.
- **Interactions**: Like/unlike videos and dynamic like counter updates.
- **Saved Items**: Bookmark and manage saved recipes and videos.

## Tech Stack

- **Frontend**: React.js, React Router DOM, Mobile-First CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Services**: ImageKit SDK, Multer, JWT

## API Endpoints

### Food Routes

- **POST** `/api/food/create` - Upload & create food item
- **GET** `/api/food/get-all` - Fetch all food items
- **POST** `/api/food/like` - Like/Unlike a food item
- **POST** `/api/food/save` - Save/Unsave a food item
- **GET** `/api/food/save-video` - Fetch saved videos for current user
