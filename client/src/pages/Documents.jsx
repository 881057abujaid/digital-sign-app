import UploadChoiceModal from "../components/modals/UploadChoiceModal";
import useDocumentsPage from "../hooks/useDocumentsPage";
import Button from "../components/ui/Button";
import MainLayout from "../layouts/MainLayout";
import UploadModal from "../components/modals/UploadModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { Search, Filter, FileText, Clock, MoreVertical, Eye, Trash2 } from "lucide-react";

const Documents = () => {
    const { 
        loading, 
        error, 
        refresh,
        isUploadOpen,
        setUploadOpen,
        isChoiceOpen,
        setChoiceOpen,
        signMode,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        activeMenuId,
        setActiveMenuId,
        isDeleteModalOpen,
        setDeleteModalOpen,
        documentToDelete,
        menuRef,
        filteredDocuments,
        handleChoiceSelect,
        promptDelete,
        confirmDelete,
        handleViewPDF
    } = useDocumentsPage();

    const getStatusStyle = (status) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-700 border-green-200";
            case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "draft": return "bg-gray-100 text-gray-700 border-gray-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8" onClick={() => setActiveMenuId(null)}>
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 auto-animate">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Documents</h1>
                        <p className="text-sm font-medium text-gray-500 mt-1">Manage and track all your signed and pending documents.</p>
                    </div>
                    <Button variant="primary" onClick={() => setChoiceOpen(true)} className="shadow-md shadow-red-200/50">
                        Upload New Document
                    </Button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search documents by name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium placeholder:font-normal"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="appearance-none w-full sm:w-40 pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                        </div>
                    </div>
                </div>

                {/* Document List */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-visible pb-20">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Loading documents...</div>
                    ) : error ? (
                        <div className="p-12 text-center text-red-500">{error}</div>
                    ) : (
                        <>
                            <div className="overflow-x-auto min-h-[300px]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/50">
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Signers</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredDocuments.map((doc) => (
                                            <tr key={doc._id} className="hover:bg-gray-50/80 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100 group-hover:text-red-700 transition-colors">
                                                            <FileText size={20} />
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer">{doc.originalFileName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${getStatusStyle(doc.status)}`}>
                                                        {doc.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {doc.totalSigners > 0 ? (
                                                        <div className="flex flex-col gap-1 w-24">
                                                            <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                                                                <span>{doc.completedSigners}/{doc.totalSigners}</span>
                                                            </div>
                                                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                                <div 
                                                                    className="bg-red-500 h-1.5 rounded-full"
                                                                    style={{ width: `${(doc.completedSigners / doc.totalSigners) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 font-medium">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                                                        <Clock size={14} className="text-gray-400" />
                                                        {formatDate(doc.createdAt)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right relative">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveMenuId(activeMenuId === doc._id ? null : doc._id);
                                                        }}
                                                        className="text-gray-400 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-200 transition-all focus:outline-none"
                                                    >
                                                        <MoreVertical size={18} />
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    {activeMenuId === doc._id && (
                                                        <div 
                                                            ref={menuRef}
                                                            className="absolute right-6 top-10 w-40 bg-white border border-gray-100 rounded-xl shadow-lg shadow-black/5 z-50 py-1 flex flex-col items-start overflow-hidden animate-in fade-in zoom-in-95 duration-100"
                                                        >
                                                            <button 
                                                                onClick={(e) => handleViewPDF(doc.currentFileUrl, e)}
                                                                className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                            >
                                                                <Eye size={16} className="text-gray-400" />
                                                                View PDF
                                                            </button>
                                                            <button 
                                                                onClick={(e) => promptDelete(doc, e)}
                                                                className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"
                                                            >
                                                                <Trash2 size={16} className="text-red-500" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredDocuments.length === 0 && (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                        <FileText className="text-gray-400" size={28} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">No documents found</h3>
                                    <p className="text-sm text-gray-500">
                                        Try adjusting your search or filters.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>

            {isChoiceOpen && (
                <UploadChoiceModal
                    onSelect={handleChoiceSelect}
                    onClose={() => setChoiceOpen(false)}
                />
            )}
            <UploadModal 
                isOpen={isUploadOpen}
                signMode={signMode}
                onClose={() => setUploadOpen(false)}
                onSuccess={refresh}
            />
            <ConfirmDeleteModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={documentToDelete?.originalFileName}
            />
        </MainLayout>
    );
};

export default Documents;
