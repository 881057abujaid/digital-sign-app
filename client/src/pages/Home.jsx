import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";

const Home = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // Redirect to Dashboard if already logged in
    useEffect(() => {
        if (!loading && user) {
            navigate("/dashboard");
        }
    }, [user, loading, navigate]);

    if (loading) return null;

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-red-200 selection:text-red-900 flex flex-col">
            <LandingNavbar />
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
        </div>
    );
};

export default Home;
