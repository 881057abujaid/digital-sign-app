import { FileText, Eye, Download, Clock } from "lucide-react";

const DocumentCard = ({ title, status, fileUrl, date, totalSigners, completedSigners }) =>{
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "completed": return "bg-green-100 text-green-700 border-green-200";
            case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "draft": return "bg-gray-100 text-gray-700 border-gray-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const API_BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";
    
    // Normalize path to handle Windows backslashes for existing DB entries
    let normalizedUrl = fileUrl ? fileUrl.replace(/\\/g, "/") : "";
    
    // Ensure we don't have double slashes if it already starts with a slash
    if(normalizedUrl.startsWith("/")) {
        normalizedUrl = normalizedUrl.slice(1);
    }
    
    const fullUrl = normalizedUrl ? `${API_BASE_URL}/${normalizedUrl}` : "#";

    const handleView = (e) => {
        e.stopPropagation();
        if(normalizedUrl) window.open(fullUrl, "_blank");
    };

    const handleDownload = async (e) => {
        e.stopPropagation();
        if(!normalizedUrl) return;
        
        try {
            const response = await fetch(fullUrl);
            if (!response.ok) throw new Error("Network response was not ok");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = title || "document.pdf";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 100);
        } catch(err) {
            console.error("Download failed:", err);
            // Fallback to opening in new tab
            window.open(fullUrl, "_blank");
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 group flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(status)}`}>
                        {status || "Unknown"}
                    </span>
                </div>
                
                <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-tight" title={title}>
                    {title}
                </h3>

                {totalSigners !== undefined && totalSigners > 0 && (
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                                className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${(completedSigners / totalSigners) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">
                            {completedSigners} / {totalSigners} Signed
                        </span>
                    </div>
                )}
                
                {date && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mt-2 mb-4">
                        <Clock size={12} />
                        {date}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                <button 
                    onClick={handleView}
                    disabled={!normalizedUrl}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 text-gray-600 font-bold text-sm rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Eye size={16} />
                    View
                </button>
                <button 
                    onClick={handleDownload}
                    disabled={!normalizedUrl}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-50 hover:bg-red-100 hover:text-red-800 text-red-600 font-bold text-sm rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download size={16} />
                    Save
                </button>
            </div>
        </div>
    );
}

export default DocumentCard;