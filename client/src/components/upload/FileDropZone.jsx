import { useState, useCallback } from "react";
import { UploadCloud, FileType, CheckCircle2 } from "lucide-react";

const FileDropZone = ({ onFileSelect }) =>{
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleFile = useCallback((file) => {
        if(file.type === "application/pdf") {
            setSelectedFileName(file.name);
            onFileSelect(file);
        } else {
            alert("Only PDF files are allowed.");
        }
    }, [onFileSelect]);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragActive) setIsDragActive(true);
    }, [isDragActive]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const handleChange = (e) =>{
        if(e.target.files && e.target.files.length > 0){
            handleFile(e.target.files[0]);
        }
    };

    return (
        <label 
            className={`relative flex flex-col items-center justify-center w-full min-h-[220px] rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
                isDragActive 
                ? "border-red-500 bg-red-50/50" 
                : selectedFileName 
                    ? "border-green-300 bg-green-50/30" 
                    : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input 
                type="file"
                accept="application/pdf"
                onChange={handleChange}
                className="hidden"
            />

            <div className="flex flex-col items-center justify-center p-6 text-center z-10">
                {selectedFileName ? (
                    <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-sm border border-green-200">
                            <CheckCircle2 size={32} />
                        </div>
                        <p className="text-gray-900 font-bold mb-1 truncate max-w-xs">{selectedFileName}</p>
                        <p className="text-sm font-medium text-green-600 bg-green-100/50 px-3 py-1 rounded-full mt-2">Ready to upload</p>
                    </>
                ) : (
                    <>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragActive ? 'bg-red-100 text-red-600' : 'bg-white text-gray-400 border border-gray-100 shadow-sm'}`}>
                            <UploadCloud size={32} />
                        </div>
                        <p className="text-gray-900 font-bold mb-1">
                            {isDragActive ? "Drop PDF here" : "Click or drag file to upload"}
                        </p>
                        <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5 mt-2">
                            <FileType size={14} className="text-gray-400" />
                            PDF documents only (Max 10MB)
                        </p>
                    </>
                )}
            </div>
            
            {/* Background floating gradient effect when active */}
            {isDragActive && (
                <div className="absolute inset-0 bg-gradient-to-tr from-red-100/30 to-transparent blur-xl pointer-events-none"></div>
            )}
        </label>
    );
};

export default FileDropZone;