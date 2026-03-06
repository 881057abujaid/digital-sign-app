import { ShieldCheck, PenTool, Clock } from "lucide-react";

const FeaturesSection = () => {
    return (
        <section className="py-24 bg-white px-4 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Everything you need to sign</h2>
                    <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">A complete toolkit for managing your digital agreements securely and efficiently.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all group">
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-grade Security</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">Your documents are encrypted and securely stored. We ensure maximum privacy for all your confidential agreements.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all group">
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <PenTool size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Intuitive Editor</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">Drag and drop your signature exactly where it needs to go. Our visual editor makes placing fields effortless.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all group">
                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Clock size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Tracking</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">Know exactly when your document is opened, viewed, and signed. Never guess the status of an agreement again.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
