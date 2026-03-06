import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import PDFWorker from "pdfjs-dist/build/pdf.worker?url";
import PDFPage from "./PDFPage";

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFWorker;

const PDFViewer = ({ signatures, containerRef, onResize, onDelete, selectedId, setSelectedId, scale, fileUrl }) =>{
    const [pdf, setPdf] = useState(null);
    const [pages, setPages] = useState([]);

    useEffect(() =>{
        if (!fileUrl) return;
        const loadPDF = async () =>{
            const loadingTask = pdfjsLib.getDocument(fileUrl);
            const loadedPdf = await loadingTask.promise;
            setPdf(loadedPdf);
        };
        loadPDF();
    }, [fileUrl]);

    useEffect(() =>{
        if(!pdf) return;

        const loadPages = async () =>{
            const loadedPages = [];

            for(let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: scale });

                loadedPages.push({
                    page,
                    viewport,
                    pageNum,
                });
            }
            setPages(loadedPages);
        };
        loadPages();
    }, [pdf, scale]);

    return (
        <div 
            ref={containerRef}
            onMouseDown={(e) =>{
                if(e.target === e.currentTarget){
                    setSelectedId(null);
                }
            }}
            className="h-[80vh] overflow-auto bg-[#f8f9fa] p-4 sm:p-8 md:p-12 rounded-3xl shadow-inner border border-gray-200 relative scroll-smooth"
            style={{ 
                backgroundImage: `
                    linear-gradient(to right, #eef2f6 1px, transparent 1px),
                    linear-gradient(to bottom, #eef2f6 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px' 
            }}
        >
            {pages.map(({ page, viewport, pageNum }) =>(
                <PDFPage
                    key={pageNum}
                    page={page}
                    viewport={viewport}
                    pageNum={pageNum}
                    signatures={signatures}
                    onResize={onResize}
                    onDelete={onDelete}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    scale={scale}
                    className="transition duration-150 ease-out"
                />
            ))}
        </div>
    );
};
export default PDFViewer;