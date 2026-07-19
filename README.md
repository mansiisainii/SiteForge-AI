# SiteForge-AI 🚀

SiteForge AI is an advanced AI-powered website builder that lets users generate, customize, and deploy websites using natural language prompts — featuring prebuilt stunning templates, a coin-based usage system, and one-click deployment. Built with modern web technologies and the Groq API for lightning-fast AI generation.

## 🌟 Features

- **AI-Powered Website Generation**: Describe your website in plain English and get a fully functional HTML, Tailwind CSS, and JS website generated instantly using Groq API.
- **Prebuilt Templates**: 6 stunning hand-crafted templates (Portfolio, SaaS, Restaurant, E-commerce, Blog, Agency) — zero coins required to use.
- **Live Preview & Code View**: Instantly preview your generated website and access the raw HTML/CSS/JS code to copy or self-host.
- **AI-Powered Editing**: Refine and modify any section of your website at any time using natural language prompts.
- **One-Click Deployment**: Deploy your website with a single click and get a shareable live link instantly.
- **Coin-Based Usage System**: Free tier (100 coins) with paid upgrades via Razorpay for more generations.
- **Secure Authentication**: Google OAuth via Firebase on the frontend with JWT-based session management on the backend.
- **Premium Subscriptions**: Integrated Razorpay payment gateway for seamless plan upgrades.
- **Modern UI/UX**: Designed with Tailwind CSS and Framer Motion for a sleek, responsive, and animated user interface.
- **State Management**: Efficient state handling using Redux Toolkit and Redux Persist.

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit, React-Redux, Redux-Persist
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Payments**: Razorpay
- **Auth**: Firebase (Google OAuth)

### Backend
- **Environment**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Groq SDK
- **Payments**: Razorpay

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)
- API Keys for Groq, Firebase, and Razorpay

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mansiisainii/SiteForge-AI.git
   cd SiteForge-AI
   ```

2. **Setup the Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GROQ_API_KEY=your_groq_api_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend**
   Open a new terminal:
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_RAZORPAY_KEY_ID=your_razorpay_key
   VITE_BACKEND_URL=http://localhost:8000
   ```
   Start the frontend server:
   ```bash
   npm run dev
   ```

4. **Open in Browser**

   Navigate to `http://localhost:5173`

## 📂 Project Structure

```
SiteForge-AI/
├── backend/
│   ├── controllers/      # Route logic (generate, deploy, auth, payment)
│   ├── models/           # MongoDB schemas (User, Website)
│   ├── routes/           # Express API routes
│   ├── middleware/        # JWT auth middleware
│   └── server.js
└── frontend/
    ├── src/
    │   ├── pages/         # Generate, Editor, Dashboard, Landing
    │   ├── templates/     # 6 prebuilt HTML templates
    │   ├── components/    # Navbar, shared UI
    │   ├── redux/         # Store, userSlice
    │   └── main.jsx
    └── index.html
```

## 🔄 How It Works

```
1. Login with Google OAuth
2. Pick a prebuilt template (0 coins) OR describe your website
3. Groq AI generates a complete HTML + Tailwind CSS + JS file
4. Preview live, view source code, edit with natural language
5. Deploy with one click → get a shareable live link
```

## 📜 License

This project is licensed under the ISC License.
