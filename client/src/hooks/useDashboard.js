import { useState } from "react";
import useDocuments from "./useDocuments";
import * as documentService from "../services/documentService";
import toast from "react-hot-toast";

const useDashboard = () => {
    const { documents, invitedDocuments, activities, loading, error, refresh } = useDocuments();
    const [isUploadOpen, setUploadOpen] = useState(false);
    const [isChoiceOpen, setChoiceOpen] = useState(false);
    const [signMode, setSignMode] = useState(null);
    const [acceptedInvites, setAcceptedInvites] = useState({});
    const [actionLoading, setActionLoading] = useState(false);
    const [isDeclineModalOpen, setDeclineModalOpen] = useState(false);
    const [declineDocumentInfo, setDeclineDocumentInfo] = useState({ token: null, name: "" });

    // Filter calculations
    const pendingCount = documents.filter((doc) => doc.status !== "completed").length;
    const completedCount = documents.filter((doc) => doc.status === "completed").length;

    const handleChoiceSelect = (mode) => {
        setSignMode(mode);
        setChoiceOpen(false);
        setUploadOpen(true);
    };

    const handleAcceptInvite = (token) => {
        setAcceptedInvites(prev => ({ ...prev, [token]: true }));
    };

    const handleDeclineInvite = (token, documentName) => {
        setDeclineDocumentInfo({ token, name: documentName });
        setDeclineModalOpen(true);
    };

    const confirmDeclineInvite = async () => {
        const { token } = declineDocumentInfo;
        if (!token) return;

        try {
            setActionLoading(true);
            await documentService.declineDocument(token);
            toast.success("Invitation declined successfully");
            setDeclineModalOpen(false);
            refresh();
        } catch(error) {
            toast.error(error.response?.data?.message || "Failed to decline invitation");
            console.error(error);
        } finally {
            setActionLoading(false);
        }
    };

    return {
        documents,
        invitedDocuments,
        activities,
        loading,
        error,
        refresh,
        
        isUploadOpen,
        setUploadOpen,
        isChoiceOpen,
        setChoiceOpen,
        signMode,
        setSignMode,

        pendingCount,
        completedCount,

        handleChoiceSelect,
        acceptedInvites,
        actionLoading,
        handleAcceptInvite,
        handleDeclineInvite,
        isDeclineModalOpen,
        setDeclineModalOpen,
        declineDocumentInfo,
        confirmDeclineInvite
    };
};

export default useDashboard;
