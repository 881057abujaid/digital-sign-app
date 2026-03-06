import { XCircle } from "lucide-react";
import Button from "../ui/Button";

const ConfirmDeclineModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                <div className="p-8 pb-6 text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-white shadow-sm shadow-red-100">
                        <XCircle size={28} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Decline Invitation</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Are you sure you want to decline the invitation to sign <span className="font-bold text-gray-800">{itemName || "this document"}</span>? 
                        This action will remove the document from your dashboard.
                    </p>
                </div>
                
                <div className="flex items-center gap-3 p-6 pt-0">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none"
                    >
                        Cancel
                    </button>
                    <Button 
                        variant="primary" 
                        onClick={onConfirm}
                        className="flex-1 shadow-lg shadow-red-200/50 font-bold"
                    >
                        Decline
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeclineModal;
