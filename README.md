# 🖋️ Premium Digital Signature App

A modern, full-stack digital signature platform built for professional document management. This application allows users to upload PDF documents, invite signers, and place cryptographic-quality signatures with a high-end, premium UI/UX experience.

![Demo](https://via.placeholder.com/800x400?text=Premium+Signature+UI+Preview) <!-- Replace with your actual screenshot -->

## ✨ Key Features

- **🚀 Premium UI/UX**: Built with Tailwind CSS v4, featuring glassmorphism, smooth animations, and a polished professional aesthetic.
- **🎨 Custom Signature Generator**: Create multiple signature styles with different fonts and ink colors.
- **🖱️ Smooth Drag & Drop**: Tactile drag-and-drop system for precise signature placement on PDF pages.
- **📱 Fully Responsive**: Optimized for Mobile, Tablet, and Desktop with adaptive touch targets and layouts.
- **🔒 Secure Signature Flow**: Token-based authentication for invited signers and secure PDF processing.
- **📄 PDF Management**: Upload documents, track signing status, and download final signed versions.
- **⚡ Fast Performance**: Powered by Vite for the frontend and a high-performance Node.js backend using `pdf-lib`.

## 🛠️ Tech Stack

### Frontend
- **React 19** & **Vite**
- **Tailwind CSS v4** (Modern design system)
- **@dnd-kit/core** (Advanced drag-and-drop)
- **PDF.js** (PDF rendering)
- **Lucide React** (Premium iconography)

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Database)
- **PDF-lib** (High-level PDF manipulation)
- **JWT & BcryptJS** (Authentication)
- **Multer** (File handling)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/digital-signature-app.git
   cd digital-signature-app
   ```

2. **Backend Configuration:**
   - Go to `server/`:
     ```bash
     cd server
     npm install
     ```
   - Create a `.env` file in the `server/` directory:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLIENT_URL=http://localhost:5173
     ```
   - Start the server:
     ```bash
     npm run dev
     ```

3. **Frontend Configuration:**
   - Go to `client/`:
     ```bash
     cd ../client
     npm install
     ```
   - Create a `.env` file in the `client/` directory:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - Start the client:
     ```bash
     npm run dev
     ```

## 🌐 Deployment

### Frontend (Vercel)
- Connect your GitHub repo to Vercel.
- Set the Root Directory to `client`.
- Add the `VITE_API_URL` environment variable (pointing to your Render backend).

### Backend (Render / Railway)
- Connect your GitHub repo.
- Set the Root Directory to `server`.
- Configure Environment Variables (MONGO_URI, JWT_SECRET, CLIENT_URL).

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---
*Created with ❤️ by [Your Name](https://github.com/your-username)*
