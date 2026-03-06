import { useDraggable } from "@dnd-kit/core";
import { Trash2, Move } from "lucide-react";

const DraggableItem = ({ id, x, y, image, width, height, onResize, onDelete, selected, onSelect, scale }) =>{
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, data: { type: "placed-signature" } });
  
  const style = {
    position: "absolute",
    left: x * scale,
    top: y * scale,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    width: width * scale,
    height: "auto",
    touchAction: "none",
    userSelect: "none",
    zIndex: isDragging ? 999 : (selected ? 50 : 10),
    opacity: isDragging ? 0.6 : 1
  };

  const handleResize = (e) =>{
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = width;
    const aspectRatio = height / width;

    const handleMouseMove = (moveEvent) =>{
      const newWidth = Math.max(40, startWidth + (moveEvent.clientX - startX) / scale);
      const newHeight = newWidth * aspectRatio;
      onResize(id, newWidth, newHeight);
    };

    const handleMouseUp = () =>{
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  return (
      <div
          style={style}
          onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
          }}
          className={`absolute rounded-sm transition-shadow duration-200 ${
            selected 
            ? "ring-2 ring-red-500 ring-offset-2 ring-offset-white shadow-xl bg-white/10" 
            : "hover:ring-2 hover:ring-red-400/50"
          } ${isDragging ? "cursor-grabbing" : "cursor-move"}`}
      >
          {/* Controls Overlay */}
          {selected && (
              <div className="absolute inset-[-4px] border-2 border-dashed border-red-500/50 rounded-lg pointer-events-none" />
          )}

          {/* Signature Image */}
          <div
              ref={setNodeRef}
              {...listeners}
              {...attributes}
              className="relative"
          >
              <img
                  src={image}
                  alt="signature"
                  className="w-full h-auto block pointer-events-none drop-shadow-sm"
              />
              
              {/* Drag Indicator (Icon) only when selected */}
              {selected && !isDragging && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                    <Move size={12} className="text-red-400" />
                    MOVE SIGNATURE
                </div>
              )}
          </div>

          {/* Delete Button */}
          {selected && (
              <button
                  onClick={(e) => {
                      e.stopPropagation();
                      onDelete(id);
                  }}
                  className="absolute -top-4 -right-4 w-10 h-10 sm:w-8 sm:h-8 bg-red-600 hover:bg-red-700 active:scale-90 text-white rounded-full flex items-center justify-center shadow-lg transition-all z-50 border-2 border-white"
                  title="Delete Signature"
              >
                <Trash2 size={16} className="sm:w-[14px] sm:h-[14px]" />
              </button>
          )}

          {/* Resize Handle */}
          {selected && (
              <div
                  onMouseDown={handleResize}
                  onTouchStart={(e) => {
                      // Support touch for resizing if needed, though MouseDown usually works in dnd-kit context
                      // but standard DOM events might need specific handling if not wrapped
                  }}
                  className="absolute -right-3 -bottom-3 w-7 h-7 sm:w-5 sm:h-5 bg-white border-2 border-red-500 rounded-full cursor-nwse-resize shadow-md flex items-center justify-center hover:bg-red-50 active:bg-red-100 transition-colors z-50"
              >
                  <div className="w-2 h-2 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full" />
              </div>
          )}
      </div>
  );
};
export default DraggableItem;