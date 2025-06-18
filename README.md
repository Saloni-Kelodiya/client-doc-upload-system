📁 Client Document Upload and Notification System
A full-stack web application that allows clients to register, upload documents (PDF, images, videos), and receive expiry notifications. Admins can view all uploads and manage them easily.

🚀 Live Demo
Frontend: https://client-doc-upload-system.vercel.app/
Backend: https://client-doc-upload-system.onrender.com

🧰 Tech Stack
Tech	Use
React + Vite	Frontend UI
Bootstrap	Frontend styling
Node.js	Backend logic (Express)
MongoDB	Database to store users & documents
JWT	Authentication (client login/register)
Axios	Frontend-backend communication
Multer	File uploading
Nodemailer	Email notifications for expiry reminders

✨ Features
✅ Client registration and login

✅ Secure JWT-based authentication

✅ Upload documents with:

Title

Type (PDF, image, video)

Description

Expiry date

✅ View, edit, delete documents

✅ Admin dashboard to view all client uploads

✅ Automatic expiry reminders via email

🖼️ Screenshots
(You can add screenshots here using Markdown)

scss
Copy
Edit
![Home Page](./screenshots/home.png)
![Upload Page](./screenshots/upload.png)
⚙️ Installation Instructions
🔧 1. Clone the repo
bash
Copy
Edit
git clone https://github.com/your-username/client-upload-system.git
cd client-upload-system
💻 2. Setup Backend
bash
Copy
Edit
cd server
npm install
touch .env
.env file:

env
Copy
Edit
MONGO_URL=your-mongo-db-url
JWT_SECRET=your-secret
CLIENT_URL=http://localhost:5173
bash
Copy
Edit
npm start
🌐 3. Setup Frontend
bash
Copy
Edit
cd ../client
npm install
touch .env
.env file:

env
Copy
Edit
VITE_API_URL=http://localhost:5000
bash
Copy
Edit
npm run dev
🚀 Deployment
Frontend: Deployed using Vercel

Backend: Deployed using Render

Database: Hosted on MongoDB Atlas

📬 Contact
Made with ❤️ by Saloni kelodiya
📧 Email: kelodiyasaloni@gmail.com
🌐 LinkedIn: https://www.linkedin.com/in/saloni-kelodiya-833801278/
