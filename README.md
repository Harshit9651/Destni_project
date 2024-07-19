# Destni

Destni is an advanced social media platform that allows users to share their travel plans, post photos, chat with others, and interact through likes, comments, and shares. The project is built using Node.js, Express, MongoDB, and various other technologies to provide a scalable and efficient microservices architecture.

## Features

- **User Authentication**: Sign up, login, and secure session management.
- **User Profiles**: Create and manage user profiles, including profile pictures and personal information.
- **Posts and Interactions**: Users can create posts, like, comment, and share posts.
- **Real-Time Chat**: Instant messaging functionality between users.
- **Travel Plans**: Users can publish their travel plans and search for others' plans based on location and dates.
- **Location-Based Services**: Integration with location services to enhance user interactions.
- **Responsive Design**: User interface designed for both desktop and mobile devices.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB, Redis (for caching)
- **Messaging**: Kafka
- **File Storage**: Cloudinary (for image uploads)
- **Frontend**: EJS, HTML, CSS, JavaScript, jQuery
- **Real-Time Communication**: WebSockets, Socket.io
- **Containerization**: Docker
- **Microservices Architecture**: Multiple services for user management, posts, and chat functionalities

## Microservices

1. **destni_user**: Handles user authentication and profile management.
2. **destni_post**: Manages user posts, including likes, comments, shares, and reports.
3. **destni_chatting**: Implements real-time chat functionality between users.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/destni.git
   cd destni
   
2. ## if you are developer then follow this steps 🥇 ## 
  ```bash
 cd destni_user
 npm run dev
 localhost:3001/user/sigin 
 after that 

3. ## open that new shell in your vscode terminal 
  ```bash
cd destni_post
npm run dev
localhost:3000/destni_post/protectedRoute/protectedRouteInPost
if its ok then 
localhost:3000/destni_post/protectedRoute/developer

