import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import SignaturePanel from "../components/signature/SignaturePanel";
import PDFViewer from "../components/editor/PDFViewer";
import MainLayout from "../layouts/MainLayout";
import useEditorPage from "../hooks/useEditorPage";
import { ZoomIn, ZoomOut } from "lucide-react";

const Editor = () => {
    const {
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
    } = useEditorPage();

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
                <DndContext
                    sensors={sensors}
                    disabled={isSigned}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCorners}
                >
                    <DragOverlay zIndex={1000} style={{ pointerEvents: 'none' }}>
                        {activeItem?.type === "signature-template" ? (
                            <div
                                className="bg-white/90 backdrop-blur-sm border border-red-200 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center"
                                style={{
                                    padding: `8px 16px`,
                                    fontFamily: activeItem.font,
                                    fontSize: "32px",
                                    color: activeItem.color,
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'top left',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {activeItem.text}
                            </div>
                        ) : null}
                    </DragOverlay>   

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:items-start">
                        {/* Left Column: PDF Viewer */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-2 sm:p-4 lg:p-6 overflow-hidden">
                                <div className="flex flex-wrap items-center justify-center mb-4 sm:mb-6 gap-2">
                                    <div className="flex items-center gap-2 sm:gap-3 bg-gray-50/80 backdrop-blur border border-gray-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                                        <button 
                                            onClick={() => setTempScale(Math.max(0.6, tempScale - 0.1))}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-1 flex items-center justify-center rounded-full hover:bg-red-50"
                                            title="Zoom Out"
                                        >
                                            <ZoomOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="range" 
                                                min={0.6}
                                                max={2.5}
                                                step={0.1}
                                                value={tempScale}
                                                onChange={(e) => setTempScale(parseFloat(e.target.value))}
                                                className="w-20 sm:w-24 lg:w-32 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-700 transition-all focus:outline-none"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => setTempScale(Math.min(2.5, tempScale + 0.1))}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-1 flex items-center justify-center rounded-full hover:bg-red-50"
                                            title="Zoom In"
                                        >
                                            <ZoomIn size={16} className="sm:w-[18px] sm:h-[18px]" />
                                        </button>
                                        <div className="w-[45px] sm:w-[50px] text-center border-l border-gray-300 pl-2 sm:pl-3 ml-1">
                                            <span className="text-[11px] sm:text-[13px] font-bold text-gray-700">{Math.round(tempScale * 100)}%</span>
                                        </div>
                                    </div>
                                </div>
                                <PDFViewer
                                    signatures={signatures}
                                    containerRef={pdfContainerRef}
                                    onResize={handleResize}
                                    onDelete={deleteSignature}
                                    selectedId={selectedId}
                                    setSelectedId={setSelectedId}
                                    scale={scale}
                                    fileUrl={fileUrl}
                                />
                            </div>
                        </div>

                        {/* Right Column: Signature Panel */}
                        <div className="lg:col-span-1 order-1 lg:order-2">
                            <div className="sticky top-8">
                                <SignaturePanel 
                                    handleFinalize={handleFinalize}
                                    isSigned={isSigned}
                                    isSubmitting={isSubmitting}
                                    signedFileUrl={signedFileUrl}
                                />
                            </div>
                        </div>
                    </div>
                </DndContext>
            </div>
        </MainLayout>
    );
};

export default Editor;