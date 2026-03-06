import { useEffect, useState } from "react";
import * as documentService from "../services/documentService";

const useDocuments = () =>{
    const [documents, setDocuments] = useState([]);
    const [invitedDocuments, setInvitedDocuments] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fetchDocuments = async () =>{
        try {
            setLoading(true);
            const [docsData, invitedData, activityData] = await Promise.all([
                documentService.getDocuments(),
                documentService.getInvitedDocuments(),
                documentService.getActivity()
            ]);
            setDocuments(docsData);
            setInvitedDocuments(invitedData);
            setActivities(activityData);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load documents");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchDocuments();
    }, []);

    const removeDocument = async (id) => {
        try {
            await documentService.deleteDocument(id);
            await fetchDocuments();
        } catch (err) {
            console.error("Failed to delete document", err);
            throw err;
        }
    };

    return {
        documents,
        invitedDocuments,
        activities,
        loading,
        error,
        refresh: fetchDocuments,
        removeDocument
    };
};
export default useDocuments;