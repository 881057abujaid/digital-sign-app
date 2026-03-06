import { Link } from "react-router-dom";
import { Zap, ArrowRight, PenTool } from "lucide-react";
import Button from "../ui/Button";

const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-red-100/60 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-4xl mx-auto auto-animate">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-8">
                        <Zap size={14} className="fill-red-500" />
                        <span>The New Standard for E-Signatures</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
                        Sign documents <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">faster than ever.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                        SignFlow makes it effortlessly simple to securely sign, send, and track agreements in minutes. No complex software, just a beautiful experience.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register">
                            <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl shadow-red-200/50 flex items-center justify-center gap-2 group">
                                Start Signing Free
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg bg-white/80 backdrop-blur-md">
                                Login to Dashboard
                            </Button>
                        </Link>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-6 font-medium">No credit card required. Free forever plan available.</p>
                </div>

                {/* Dashboard Preview Image/Mockup */}
                <div className="mt-12 sm:mt-16 md:mt-20 max-w-5xl mx-auto relative auto-animate" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute -inset-1 bg-gradient-to-tr from-red-500 to-red-300 rounded-2xl sm:rounded-[24px] md:rounded-[32px] blur-xl sm:blur-2xl opacity-20"></div>
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[24px] md:rounded-[32px] border border-white shadow-2xl overflow-hidden aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/9] flex items-center justify-center">
                        {/* Abstract Mockup inside */}
                        <div className="w-full h-full p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3 sm:pb-4 flex-shrink-0">
                                <div className="w-24 sm:w-28 md:w-32 h-5 sm:h-5 md:h-6 bg-gray-200 rounded-full"></div>
                                <div className="w-8 sm:w-8 md:w-10 h-8 sm:h-8 md:h-10 bg-red-100 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 flex-shrink-0">
                                <div className="h-20 sm:h-24 md:h-32 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100"></div>
                                <div className="h-20 sm:h-24 md:h-32 bg-yellow-50 rounded-xl sm:rounded-2xl border border-yellow-100"></div>
                                <div className="hidden md:block h-32 bg-green-50 rounded-2xl border border-green-100"></div>
                            </div>
                            {/* Editor Mockup Area */}
                            <div className="flex-1 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 md:p-6 flex gap-4 sm:gap-5 md:gap-6 overflow-hidden">
                                {/* Sidebar Mockup */}
                                <div className="w-32 md:w-40 hidden sm:flex flex-col gap-2 md:gap-3 flex-shrink-0">
                                    <div className="h-8 md:h-10 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center px-3 md:px-4 gap-2 md:gap-3">
                                        <div className="w-3 md:w-4 h-3 md:h-4 rounded bg-red-100 flex-shrink-0"></div>
                                        <div className="h-1.5 md:h-2 w-full bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="h-8 md:h-10 bg-white/50 rounded-xl border border-gray-200 flex items-center px-3 md:px-4 gap-2 md:gap-3">
                                        <div className="w-3 md:w-4 h-3 md:h-4 rounded bg-blue-100 flex-shrink-0"></div>
                                        <div className="h-1.5 md:h-2 w-3/4 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="h-8 md:h-10 bg-white/50 rounded-xl border border-gray-200 flex items-center px-3 md:px-4 gap-2 md:gap-3">
                                        <div className="w-3 md:w-4 h-3 md:h-4 rounded bg-green-100 flex-shrink-0"></div>
                                        <div className="h-1.5 md:h-2 w-1/2 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                                
                                {/* Document Page Mockup */}
                                <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-3 md:gap-4 relative overflow-hidden">
                                    {/* Skeleton Text Lines */}
                                    <div className="h-2 sm:h-2 md:h-3 w-1/3 bg-gray-200 rounded-full mb-2 sm:mb-3 md:mb-4"></div>
                                    <div className="h-1.5 sm:h-1.5 md:h-2 w-full bg-gray-100 rounded-full"></div>
                                    <div className="h-1.5 sm:h-1.5 md:h-2 w-11/12 bg-gray-100 rounded-full"></div>
                                    <div className="h-1.5 sm:h-1.5 md:h-2 w-full bg-gray-100 rounded-full"></div>
                                    <div className="h-1.5 sm:h-1.5 md:h-2 w-4/5 bg-gray-100 rounded-full mb-2 sm:mb-3 md:mb-4"></div>
                                    <div className="h-1.5 sm:h-1.5 md:h-2 w-full bg-gray-100 rounded-full"></div>
                                    <div className="h-1.5 sm:h-1.5 md:h-2 w-3/4 bg-gray-100 rounded-full"></div>
                                    
                                    {/* Signature Block Simulation */}
                                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 w-24 sm:w-32 md:w-48 h-12 sm:h-16 md:h-20 bg-red-50/80 border-2 border-dashed border-red-300 rounded-xl flex items-center justify-center auto-animate">
                                        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-red-600 font-bold text-[10px] sm:text-xs md:text-sm">
                                            <PenTool className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span>Sign Here</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
