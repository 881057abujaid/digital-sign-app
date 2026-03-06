import { useState, useEffect, useRef } from "react";
import useDocuments from "./useDocuments";
import toast from "react-hot-toast";

const useDocumentsPage = () => {
    const { documents, loading, error, refresh, removeDocument } = useDocuments();
    
    const [isUploadOpen, setUploadOpen] = useState(false);
    const [isChoiceOpen, setChoiceOpen] = useState(false);
    const [signMode, setSignMode] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const menuRef = useRef(null);

    const API_BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

    const handleChoiceSelect = (mode) => {
        setSignMode(mode);
        setChoiceOpen(false);
        setUploadOpen(true);
    };

    const promptDelete = (doc, e) => {
        e.stopPropagation();
        setDocumentToDelete(doc);
        setDeleteModalOpen(true);
        setActiveMenuId(null);
    };

    const confirmDelete = async () => {
        if (!documentToDelete) return;
        try {
            await removeDocument(documentToDelete._id);
            toast.success("Document deleted successfully");
        } catch(error) {
            toast.error("Failed to delete document. Please try again.");
        } finally {
            setDeleteModalOpen(false);
            setDocumentToDelete(null);
        }
    };

    const handleViewPDF = (fileUrl, e) => {
        e.stopPropagation();
        let normalizedUrl = fileUrl ? fileUrl.replace(/\\/g, "/") : "";
        if(normalizedUrl.startsWith("/")) {
            normalizedUrl = normalizedUrl.slice(1);
        }
        const fullUrl = normalizedUrl ? `${API_BASE_URL}/${normalizedUrl}` : "#";
        if (normalizedUrl) window.open(fullUrl, "_blank");
        setActiveMenuId(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.originalFileName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === "all" || doc.status.toLowerCase() === filterType.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return {
        documents,
        loading,
        error,
        refresh,
        
        isUploadOpen,
        setUploadOpen,
        isChoiceOpen,
        setChoiceOpen,
        signMode,
        setSignMode,
        
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
    };
};

export default useDocumentsPage;
