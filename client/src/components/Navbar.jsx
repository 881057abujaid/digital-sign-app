import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, User, ChevronDown, LogOut } from "lucide-react";
import Button from "./ui/Button";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu and profile dropdown on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
    }, [location.pathname]);

    // Handle scroll effect for dynamic navbar styling
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navLinks = [
        { name: "Dashboard", path: "/" },
        { name: "Documents", path: "/documents" },
        { name: "Activity", path: "/activity" },
    ];

    return (
        <header 
            className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b py-3 md:py-4 ${
                scrolled 
                ? "bg-white/85 backdrop-blur-xl border-gray-200/50 shadow-sm" 
                : "bg-white/50 backdrop-blur-lg border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-red-500 rounded-xl shadow-md flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">
                        <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-red-600 transition-colors">SignFlow</h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-2">
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.path}
                            className={({ isActive }) => 
                                `relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                                    isActive 
                                    ? 'text-red-700 bg-red-50' 
                                    : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop Right Section (User & Actions) */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-100"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-100 to-red-50 flex items-center justify-center text-red-600 border border-red-200 shadow-sm">
                                    <User size={16} className="opacity-80"/>
                                </div>
                                <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                                    {user.name || user.email?.split('@')[0]}
                                </span>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                                        <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                            <p className="text-sm font-bold text-gray-900 truncate">{user.name || "User"}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <div className="px-2">
                                            <button 
                                                onClick={() => {
                                                    logout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="text-sm font-bold px-5 py-2 shadow-none hover:shadow-sm">Log in</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" className="text-sm font-bold px-5 py-2 shadow-md shadow-red-200/50">Sign up</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 text-gray-600 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-100 rounded-xl transition-all duration-200 focus:outline-none shadow-sm"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="px-4 py-6 space-y-6 max-h-[calc(100vh-80px)] overflow-y-auto">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <NavLink 
                                    key={link.name} 
                                    to={link.path}
                                    className={({ isActive }) => 
                                        `text-base font-bold px-4 py-3 rounded-2xl transition-all duration-200 ${
                                            isActive 
                                            ? 'bg-red-50 text-red-600' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>
                        
                        <div className="h-px bg-gray-100 w-full" />
                        
                        {user ? (
                            <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200 shadow-sm">
                                        <User size={24} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-extrabold text-gray-900">{user.name || "User"}</span>
                                        <span className="text-xs font-medium text-gray-500">{user.email}</span>
                                    </div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-center bg-white border-red-100 text-red-600 hover:bg-red-50 font-bold py-3 shadow-sm" 
                                    onClick={logout}
                                >
                                    Log out
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/login" className="w-full">
                                    <Button variant="outline" className="w-full justify-center font-bold py-3 bg-white">Log in</Button>
                                </Link>
                                <Link to="/register" className="w-full">
                                    <Button variant="primary" className="w-full justify-center font-bold py-3 shadow-md shadow-red-200/50">Sign up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;