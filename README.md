# SiteForge-AI 🚀

SiteForge-AI is an advanced AI-powered website builder and code editor that allows users to generate, edit, and deploy websites seamlessly. Built with modern web technologies and integrating powerful AI models like Google Gemini and Groq, it provides an intuitive platform for rapid web development.

## 🌟 Features

- **AI-Powered Code Generation**: Leverage Google GenAI (Gemini) and Groq SDK to instantly generate website layouts and components.
- **Interactive Web Editor**: Built-in Monaco Editor for real-time code editing and previews.
- **Secure Authentication**: Robust user authentication combining Firebase on the frontend and JWT-based auth on the backend.
- **Premium Subscriptions**: Integrated with Razorpay for secure payment processing and subscription management.
- **Modern UI/UX**: Designed with TailwindCSS and Framer Motion for a sleek, responsive, and animated user interface.
- **State Management**: Efficient state handling using Redux Toolkit and Redux Persist.

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: TailwindCSS
- **State Management**: Redux Toolkit, React-Redux, Redux-Persist
- **Routing**: React Router DOM
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Payments**: Razorpay
- **Auth/Backend Services**: Firebase

### Backend
- **Environment**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens), Cookie Parser
- **AI Integrations**: @google/genai, Groq SDK
- **Payments**: Razorpay

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)
- API Keys for Google Gemini, Groq, Firebase, and Razorpay

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SiteForge-AI.git
   cd SiteForge-AI
   ```

2. **Setup the Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your environment variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
   Start the backend development server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory and add your environment variables:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_RAZORPAY_KEY_ID=your_razorpay_key
   VITE_BACKEND_URL=http://localhost:3000
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` to view the application.

## 📂 Project Structure

```
SiteForge-AI/
├── backend/            # Express.js server, MongoDB models, Routes, AI integration
└── frontend/           # React frontend, TailwindCSS, Monaco Editor, Redux store
```

## 📜 License

This project is licensed under the ISC License.
