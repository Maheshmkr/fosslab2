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
