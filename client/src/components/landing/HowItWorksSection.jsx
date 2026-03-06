import { FileCheck2, Users, PenTool } from "lucide-react";

const HowItWorksSection = () => {
    return (
        <section className="py-24 bg-gray-900 text-white px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">Sign in 3 simple steps</h2>
                
                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-gray-800"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-800 border-[6px] border-gray-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
                            <FileCheck2 size={32} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">1. Upload</h3>
                        <p className="text-gray-400 font-medium">Upload any PDF document securely to your dashboard.</p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-800 border-[6px] border-gray-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
                            <Users size={32} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">2. Add Signers</h3>
                        <p className="text-gray-400 font-medium">Add email addresses of the people who need to sign.</p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-800 border-[6px] border-gray-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
                            <PenTool size={32} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">3. Sign & Send</h3>
                        <p className="text-gray-400 font-medium">Place signature fields and hit send. It's that easy.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
