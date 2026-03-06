import { FileText, Users, X } from "lucide-react";

const UploadChoiceModal = ({ onClose, onSelect }) =>{
    return (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div
                className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-300 overflow-hidden"
            >
                {/* Decorative blobs */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-red-50/80 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 rounded-full bg-blue-50/80 blur-3xl pointer-events-none"></div>

                <div className="p-8 sm:p-12 relative z-10">
                    {/* Close */}
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-3">
                        How would you like to sign?
                    </h2>
                    <p className="text-gray-500 text-center mb-10 font-medium">Choose a method to get started with your document</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Self Sign */}
                        <div
                            onClick={() => onSelect("self")}
                            className="bg-white border border-gray-100 rounded-[24px] p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-green-100/50 hover:-translate-y-1 hover:border-green-300 group flex flex-col items-center text-center relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300 shadow-sm border border-green-100/50">
                                <FileText size={28} />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">
                                Me (Self SignOnly)
                            </h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed relative z-10">
                                I just need to sign this document myself without inviting anyone else.
                            </p>
                        </div>

                        {/* Invite Signers */}
                        <div
                            onClick={() => onSelect("invite")}
                            className="bg-white border border-gray-100 rounded-[24px] p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 hover:border-blue-300 group flex flex-col items-center text-center relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 shadow-sm border border-blue-100/50">
                                <Users size={28} />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">
                                Invite Signers
                            </h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed relative z-10">
                                Upload a document to send it to others for their secure e-signatures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UploadChoiceModal;