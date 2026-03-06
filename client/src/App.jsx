import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Editor from "./pages/Editor";
import InviteSigner from "./pages/InviteSigner";
import Documents from "./pages/Documents";
import Activity from "./pages/Activity";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" toastOptions={{
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '12px',
          fontWeight: 600,
        },
        success: {
          style: {
            background: '#16a34a',
          },
        },
        error: {
          style: {
            background: '#dc2626',
          },
        },
      }} />
      <div className="flex-1">
        <Routes>
          {/* Public/Landing Route */}
          <Route path="/" element={<Home />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path="/documents" element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
          />
          <Route path="/activity" element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
          />
          <Route path="/sign/:token" element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          } />
          <Route path="/documents/:id/invite" element={
            <ProtectedRoute>
              <InviteSigner />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
export default App;