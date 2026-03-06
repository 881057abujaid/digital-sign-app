import { useState, useEffect } from "react";
import useSignatureStore from "./useSignatureStore";
import useSignatureDnd from "./useSignatureDnd";
import { useParams } from "react-router-dom";
import * as signService from "../services/signService";

const useEditorPage = () => {
    const [scale, setScale] = useState(1.4);
    const [tempScale, setTempScale] = useState(1.4);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSigned, setIsSigned] = useState(false);
    const [signedFileUrl, setSignedFileUrl] = useState(null);
    
    const store = useSignatureStore();
    const { pdfContainerRef, sensors, handleDragStart, handleDragEnd, activeItem, handleResize } = useSignatureDnd({...store, scale});
    const { signatures, deleteSignature, selectedId, setSelectedId } = store;
    
    const { token } = useParams();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setScale(tempScale);
        }, 120);
        return () => clearTimeout(timeout);
    }, [tempScale]);

    const handleFinalize = async () => {
        if(!signatures.length || isSigned || isSubmitting) return;

        setIsSubmitting(true);

        const payload = signatures.map((sig) => {
            const pageElement = document.querySelector(`[data-page="${sig.page}"]`);
            if(!pageElement) return null;
            
            const originalWidth = Number(pageElement.dataset.originalWidth);
            const originalHeight = Number(pageElement.dataset.originalHeight);
            
            // Signature coordinates are already stored in unscaled PDF points
            const pdfX = Number(sig.x);
            const pdfWidth = Number(sig.width);
            const pdfHeight = Number(sig.height);
            
            // PDF origin is bottom-left, HTML is top-left
            const pdfY = originalHeight - Number(sig.y) - pdfHeight;

            return {
                signatureImage: sig.image,
                page: sig.page - 1,
                x: pdfX,
                y: pdfY,
                width: pdfWidth,
                height: pdfHeight,
            };
        }).filter(Boolean);

        console.log(payload);

        try {
            const data = await signService.submitSignatures(token, payload);
            setIsSigned(true);
            const apiBaseUrl = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";
            setSignedFileUrl(`${apiBaseUrl}${data.fileUrl}`);
        } catch(error) {
            const errorMsg = error.response?.data?.message || "Failed to submit signatures";
            alert(errorMsg);
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        scale,
        tempScale,
        setTempScale,
        isSubmitting,
        isSigned,
        signedFileUrl,
        
        pdfContainerRef,
        sensors,
        handleDragStart,
        handleDragEnd,
        activeItem,
        handleResize,
        
        signatures,
        deleteSignature,
        selectedId,
        setSelectedId,
        
        handleFinalize
    };
};

export default useEditorPage;
