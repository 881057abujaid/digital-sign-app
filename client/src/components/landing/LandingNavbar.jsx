import { Link } from "react-router-dom";
import Button from "../ui/Button";

const LandingNavbar = () => {
    return (
        <header className="absolute top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center bg-transparent">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-red-500 rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">
                        <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-red-600 transition-colors">SignFlow</h1>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 px-3 sm:px-4 py-2 transition-colors">Log in</Link>
                    <Link to="/register">
                        <Button variant="primary" className="text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 shadow-xl shadow-red-200/50">Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default LandingNavbar;
