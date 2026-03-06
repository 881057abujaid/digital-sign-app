import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, X, FileUp } from "lucide-react";
import Button from "../ui/Button";
import FileDropZone from "../upload/FileDropZone";
import { uploadDocument } from "../../services/documentService";
import toast from "react-hot-toast";

const UploadModal = ({ isOpen, onClose, onSuccess, signMode }) =>{
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if(!isOpen) return null;

    const handleUpload = async () =>{
        if(!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const data = await uploadDocument(formData);
            onSuccess();

            if(signMode === "self"){
                navigate(`/sign/${data.selfSignToken}`);
            }

            if(signMode === "invite"){
                navigate(`/documents/${data.documentId}/invite`);
            }

            onClose();
            // reset file state on close
            setFile(null);
            toast.success("Document uploaded successfully!");
        } catch(error) {
            toast.error(error.message || "Failed to upload document");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFile(null); // Reset file selection on close
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                
                <div className="p-8 sm:p-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
                                <FileUp size={20} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900">Upload PDF</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">Select a document from your device</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleClose}
                            className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Dropzone */}
                    <div className="mb-8">
                        <FileDropZone onFileSelect={setFile} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                        <Button 
                            variant="outline" 
                            onClick={handleClose}
                            className="px-6 font-bold"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className="px-8 shadow-lg shadow-red-200/50 flex items-center gap-2 font-bold"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                "Upload Document"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UploadModal;