import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef } from "react";
import DraggableItem from "./DraggableItem";

const PDFPage = ({ page, viewport, pageNum, signatures = [], onResize, onDelete, selectedId, setSelectedId, scale }) =>{
    const canvasRef = useRef(null);

    const { setNodeRef, isOver } = useDroppable({ id: pageNum });

    useEffect(() =>{
        let renderTask;

        const renderPage = async () =>{
            const canvas = canvasRef.current;

            if(!canvas) return;

            const context = canvas.getContext("2d");

            // Cancel previous render task if exists
            if(canvas._renderTask) {
                try {
                    canvas._renderTask.cancel();
                } catch(error) {
                    console.error("Error cancelling render task:", error);
                }
            }

            // Resize canvas to match viewport
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            renderTask = page.render({
                canvasContext: context,
                viewport,
            });
            canvas._renderTask = renderTask;
            canvas.style.visibility = "hidden";

            try {
                await renderTask.promise;
                canvas.style.visibility = "visible";
            } catch(error) {
                if(error?.name !== "RenderingCancelException"){
                    // Only log actual rendering errors, not cancellation errors
                    console.error("PDF page render error", error);
                }
            }
        };
        renderPage();

        return () =>{
            if(renderTask){
                try {
                    renderTask.cancel();
                } catch(error){
                    console.error("Error cancelling render task:", error);
                }
            }
        }
    }, [page, viewport.width, viewport.height]);

    return (
        <div
            ref={setNodeRef}
            data-page={pageNum}
            className={`relative mx-auto mb-10 rounded-xl overflow-hidden ${
                isOver 
                ? "ring-4 ring-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]" 
                : "shadow-2xl shadow-gray-200/50"
            }`}
            style={{
                width: viewport.width,
                height: viewport.height,
            }}
            data-original-width={viewport.width / scale}
            data-original-height={viewport.height / scale}
        >
            <canvas ref={canvasRef} className="block" />
            
            {/* Drop Indicator Overlay */}
            {isOver && (
                <div className="absolute inset-0 border-4 border-dashed border-red-500/40 bg-red-500/5 z-20 pointer-events-none rounded-xl" />
            )}

            <div className="absolute inset-0">
                {signatures.filter((sig) => sig.page === pageNum).map((sig) =>(
                    <DraggableItem 
                    key={sig.id} {...sig} 
                    onResize={onResize} 
                    onDelete={onDelete}
                    selected={selectedId === sig.id}
                    onSelect={setSelectedId}
                    scale={scale}
                />
                ))}
            </div>
        </div>
    );
};
export default PDFPage;