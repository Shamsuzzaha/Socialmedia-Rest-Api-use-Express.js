# Social Media REST API 🚀  

This repository contains a **Social Media REST API** built using **Express.js** and **MongoDB**. It provides a scalable and efficient backend solution for social networking platforms, enabling users to create, interact, and manage their social media activities seamlessly.

## 🌟 Features  
✅ **User Authentication & Authorization** (JWT-based)  
✅ **User Profiles** (CRUD operations)  
✅ **Posts** (Create, Read, Update, Delete)  
✅ **Likes/unlikes** (Interact with posts/comments)  
✅ **Follow/Unfollow System**  
✅ **Timeline Feeds** (Get posts from followed users)  
✅ **Secure API with Middleware**  
✅ **MongoDB Integration with Mongoose**  


## 🛠 Tech Stack  
- **Node.js** & **Express.js**  
- **MongoDB** with **Mongoose**  
- **JWT Authentication**  
- **bcrypt for password hashing**  
- **Cloud Storage (Optional for media uploads)**  
- **Socket.io (For real-time updates, optional)**  

## 🚀 Installation  
Follow these steps to set up the project on your local machine:  

1️⃣ **Clone the repository:**  
   ```sh
   git clone https://github.com/your-username/socialmedia-rest-api.git
   cd socialmedia-rest-api
   ```

2️⃣ **Install dependencies:**  
   ```sh
   npm install
   ```

3️⃣ **Set up environment variables (`.env` file):**  
   ```sh
   MONGO_URI=your_mongodb_connection_string  
   JWT_SECRET=your_secret_key  
   PORT=5000  
   ```

4️⃣ **Run the server:**  
   ```sh
   nodemon start
   ```

5️⃣ **API will be available at:**  
   `http://localhost:5000` (Default port).  

## 📌 API Endpoints  
### 🔹 Authentication
- `POST /auth/register` → Register a new user  
- `POST /auth/login` → Log in with credentials  

### 🔹 User Management  
- `GET /user/:id` → Get user profile  
- `PUT /user/:id` → Update user profile  
- `DELETE /user/:id` → Delete user account  
- `PUT /user/:id/follow` → Follow a user  
- `PUT /user/:id/unfollow` → Unfollow a user  

### 🔹 Posts Management  
- `POST /post` → Create a post  
- `GET /post/:id` → Get a post by ID  
- `PUT /post/:id` → Update a post  
- `DELETE /post/:id` → Delete a post  
- `PUT /post/:id/like` → Like a post  
- `GET /post/:userId/timeline` → Get timeline posts  

## 🤝 Contributing  
Feel free to fork this repo, submit PRs, or report issues! 🎉  

## 📜 License  
This project is licensed under the **MIT License**.

