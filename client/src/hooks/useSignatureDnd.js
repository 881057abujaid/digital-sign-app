import { useRef, useState } from "react";
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import generateSignatureImage from "./useSignatureGenerator";

const useSignatureDnd = ({signatures, setSignatures, setSelectedId, scale}) => {
    const [activeItem, setActiveItem] = useState(null);
    const pdfContainerRef = useRef(null);

    // Start dragging
    const handleDragStart = (event) => {
        const activeData = event.active.data.current;
        setActiveItem(activeData)

        // Signature Highlight on drag
        if(event.active?.id){
            setSelectedId?.(event.active.id);
        }

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        if (pdfContainerRef.current) {
            pdfContainerRef.current.dataset.scrollTop = pdfContainerRef.current.scrollTop;
            pdfContainerRef.current.dataset.scrollLeft = pdfContainerRef.current.scrollLeft;
            pdfContainerRef.current.style.overflow = "hidden";
        }
    };

    // End of dragging
    const handleDragEnd = async (event) => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";

        const savedScrollTop = Number(pdfContainerRef.current?.dataset.scrollTop) || 0;
        const savedScrollLeft = Number(pdfContainerRef.current?.dataset.scrollLeft) || 0;

        if (pdfContainerRef.current) {
            pdfContainerRef.current.style.overflow = "";
            pdfContainerRef.current.scrollTop = savedScrollTop;
            pdfContainerRef.current.scrollLeft = savedScrollLeft;
        }

        const { active, over } = event;

        setActiveItem(null);

        if (!over) return;

        const activeData = active.data.current;
        const pageNum = over.id;

        const pageElement = document.querySelector(`[data-page="${pageNum}"]`);
        if (!pageElement) return;

        const pageRect = pageElement.getBoundingClientRect();
        const originalWidth = Number(pageElement.dataset.originalWidth);
        const originalHeight = Number(pageElement.dataset.originalHeight);
        
        // Calculate the actual current scaling factor from the DOM
        const effectiveScale = pageRect.width / originalWidth;

        const translated = active.rect.current.translated;
        if (!translated) return;

        // Convert screen pixels to unscaled PDF coordinates (Points)
        // This is 100% accurate relative to the page's current state
        const unscaledX = (translated.left - pageRect.left) / effectiveScale;
        const unscaledY = (translated.top - pageRect.top) / effectiveScale;

        if (activeData?.type === "signature-template") {
            try {
                const { image, width, height } = await generateSignatureImage(activeData.text, activeData.font, activeData.color);
                
                let unscaledW = width;
                let unscaledH = height;
                
                // Downscale if signatures are huge
                const MAX_UNSCALED_WIDTH = 250;
                if (unscaledW > MAX_UNSCALED_WIDTH) {
                    const ratio = MAX_UNSCALED_WIDTH / unscaledW;
                    unscaledW = MAX_UNSCALED_WIDTH;
                    unscaledH = unscaledH * ratio;
                }

                // Clamping using original point dimensions
                const clampedX = Math.max(0, Math.min(unscaledX, originalWidth - unscaledW));
                const clampedY = Math.max(0, Math.min(unscaledY, originalHeight - unscaledH));

                setSignatures((prev) => [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        image,
                        x: clampedX,
                        y: clampedY,
                        width: unscaledW,
                        height: unscaledH,
                        page: pageNum,
                    },
                ]);
            } catch (error) {
                console.error("Signature generate karne mein error:", error);
            }

        } else {
            const existingSig = signatures.find((s) => s.id === active.id);
            if (!existingSig) return;
            
            const clampedX = Math.max(0, Math.min(unscaledX, originalWidth - existingSig.width));
            const clampedY = Math.max(0, Math.min(unscaledY, originalHeight - existingSig.height));

            setSignatures((prev) =>
                prev.map((sig) =>
                    sig.id === active.id
                        ? { ...sig, x: clampedX, y: clampedY, page: pageNum }
                        : sig
                )
            );
        }
    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 8 },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 200,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    // Signature Resize handler
    const handleResize = (id, newWidth, newHeight) =>{
        setSignatures((prev) =>
            prev.map((sig) => sig.id === id ? {...sig, width: newWidth, height: newHeight} : sig)
        );
    };

    return {
        pdfContainerRef,
        sensors,
        handleDragStart,
        handleDragEnd,
        activeItem,
        handleResize,
    };
};

export default useSignatureDnd;