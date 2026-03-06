import { useState } from "react";
import useSignatureFonts from "../../hooks/useSignatureFonts";
import DraggableTemplate from "./DraggableTemplate";
import Input from "../ui/Input";
import Button from "../ui/Button";

const colors = ["#000000", "#2563eb", "#dc2626", "#16a34a"];

const SignaturePanel = ({ handleFinalize, isSigned, isSubmitting, signedFileUrl }) =>{
    const [text, setText] = useState("");
    const [color, setColor] = useState(colors[0]);
    const fonts = useSignatureFonts();

    return (
        <div className="space-y-8 bg-white/70 backdrop-blur-xl border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-xl shadow-gray-200/50">
            <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-1">
                    Create Signature
                </h3>
                <p className="text-sm font-medium text-gray-500">Pick a style and drag it onto the document</p>
            </div>

            <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
                <Input 
                    type="text"
                    placeholder="E.g. John Doe"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full !mb-0"
                />
            </div>
            
            <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Ink Color</label>
                <div className="flex gap-4 px-1">
                    {colors.map((c) => (
                        <button
                            key={c}
                            onClick={() => setColor(c)}
                            className={`w-10 h-10 rounded-full border-2 transition-all duration-300 relative ${
                                color === c 
                                ? 'border-red-500 scale-110 shadow-lg ring-4 ring-red-500/10' 
                                : 'border-white scale-100 hover:scale-105 shadow-sm'
                            }`}
                            style={{ backgroundColor: c }}
                            title={`Select color ${c}`}
                        >
                            {color === c && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Choose Style</label>
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {!text.trim() ? (
                        <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                            <p className="text-sm font-medium text-gray-400 italic">Type your name to see styles</p>
                        </div>
                    ) : (
                        fonts.map((font) => (
                            <div 
                                key={font.name}
                                className="group relative bg-gray-50/50 hover:bg-red-50 border border-gray-100 hover:border-red-200 p-5 rounded-2xl transition-all duration-300 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5"
                            >
                                <DraggableTemplate 
                                    id={`template-${font.name}`}
                                    text={text}
                                    font={font.name}
                                    color={color}
                                />
                                <div className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Drag Me</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="pt-6 space-y-3">
                <Button 
                    variant={isSubmitting || isSigned ? "secondary" : "primary"}
                    onClick={handleFinalize}
                    disabled={isSigned || isSubmitting || !text.trim()}
                    className="w-full py-4 text-lg font-bold shadow-red-200/50"
                >
                    {isSubmitting ? "Generating PDF..." : isSigned ? "✓ Document Signed" : "Finalize & Submit"}
                </Button>

                {isSigned && (
                    <Button
                        variant="success"
                        className="w-full py-4 font-bold"
                        onClick={() =>{
                            const link = document.createElement("a");
                            link.href = signedFileUrl;
                            link.download = "signed-document.pdf";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                    >
                        Download PDF
                    </Button>
                )}
            </div>
        </div>
    );
};
export default SignaturePanel;