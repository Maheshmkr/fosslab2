# Project Setup
Step 1: Create a project folder
```
mkdir express-blog-backend
cd express-blog-backend
```
# Step 2: Initialize Node project
```
npm init -y
```
📦 3. Install Dependencies

Run this command in your project folder:
```
npm install express mongoose dotenv cors bcryptjs jsonwebtoken express-validator

Optional (for development):
npm install --save-dev nodemon
```

📁 Project Structure
express-blog-backend/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── config/
│   └── db.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes/
│   ├── auth.js
│   └── posts.js
└── README.md


7. Test the API Routes

Use Postman, Thunder Client, or curl to test.

✅ Register
POST http://localhost:4000/api/auth/register
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

✅ Login
POST http://localhost:4000/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "123456"
}


You’ll receive a token in the response.

✅ Create Post
POST http://localhost:4000/api/posts
Headers:
Authorization: Bearer <token>

Body (JSON):
{
  "title": "My First Blog",
  "slug": "my-first-blog",
  "body": "This is my first post",
  "tags": ["node", "express"],
  "published": true
}
