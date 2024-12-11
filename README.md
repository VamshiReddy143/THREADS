
---

# Threads Application

## Overview

Threads is a social media application that allows users to interact with each other through posts, comments, likes, and follows. It also provides a feature to manage user profiles, notifications, and much more. Built with a modern tech stack including **MongoDB**, **React**, **Node.js**, **Express**, and more, it provides a seamless user experience for both frontend and backend.

### Features

- **User Authentication & Authorization**: Users can sign up, log in, and manage their sessions.
- **Posting**: Create, view, and delete posts.
- **Like & Unlike Posts**: Users can like or unlike posts, and the like count is updated in real-time.
- **Commenting**: Users can comment on posts, and each comment is associated with the respective post.
- **Follow & Unfollow**: Users can follow or unfollow other users to see their posts in their feed.
- **Profile Management**: Users can view and update their profiles, including personal information like their bio, email, and avatar.
- **Notifications**: Get notified about interactions like comments, likes, and follow/unfollow events.
- **User Interaction**: View other user profiles and their posts.
  
## Tech Stack

- **Frontend**:
  - **React**: Used for building the interactive UI.
  - **React Icons**: For adding customizable icons throughout the app.
  - **React Avatar**: For displaying user avatars.
  - **DaisyUI**: Utility-first CSS component library based on Tailwind CSS, providing a responsive and modern UI.
  - **React Toastify & Hot Toast**: For showing toast notifications, providing instant feedback to the user.
  - **Redux Toolkit**: State management for maintaining and updating user-related data such as authentication status and notifications.
  - **Redux Persist**: Ensures the user's data persists across page reloads.

- **Backend**:
  - **Node.js & Express**: The server-side framework that handles API requests and connects to the MongoDB database.
  - **MongoDB**: NoSQL database for storing user profiles, posts, comments, likes, and notifications.
  
## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB cloud instance like MongoDB Atlas)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/threads-app.git
   cd threads-app
   ```

2. **Backend Setup**:
   - Go to the `backend` directory.
   - Install the required dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Create a `.env` file in the `backend` folder and add the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Go to the `frontend` directory.
   - Install the required dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure

### Backend

```
backend/
│
├── controllers/       # Functions that handle API requests
├── models/            # Mongoose models for User, Post, Comment, etc.
├── routes/            # Express route handlers
├── middleware/        # Authentication and authorization middleware
├── config/            # MongoDB connection and other configurations
└── server.js          # Main entry point to the server
```

### Frontend

```
frontend/
│
├── components/        # React components (Posts, Comments, Profile, etc.)
├── features/          # Redux slices and logic
├── pages/             # React pages (Home, Profile, EditProfile, etc.)
├── services/          # API service methods
├── App.js             # Main App component
└── index.js           # React entry point
```

## Features in Detail

### 1. **User Authentication**

- Sign up, login, and logout functionality.
- JWT-based authentication to secure routes.
- Session management using **Redux Persist** to keep the user logged in even after a page reload.

### 2. **Posting & Managing Posts**

- Users can create posts, and each post can be liked or deleted.
- **Redux Toolkit** is used to manage post-related state in the frontend.

### 3. **Like/Unlike Posts**

- Users can like/unlike posts, and the UI updates in real-time with the help of **React Toastify** for success/error notifications.

### 4. **Commenting on Posts**

- Users can leave comments on posts, and each comment is associated with the post.
- **Real-time** updates are made when comments are added.

### 5. **Follow/Unfollow Users**

- Users can follow or unfollow other users. This allows them to see posts from the followed users in their feed.

### 6. **Profile Management**

- Users can view and update their profile information, such as full name, bio, and avatar.
- **React Avatar** is used to display avatars on profiles.

### 7. **Notifications**

- Users are notified of interactions with their posts, such as when someone likes their post, comments, or follows them.
- Notifications are handled through **Redux** and displayed using **React Toastify**.

### 8. **Other Users' Profiles**

- Users can view the profiles of other users and see their posts.

## Contributing

We welcome contributions! If you'd like to contribute to this project, feel free to fork it, make changes, and submit a pull request. Please ensure your changes are well-documented and tested.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

