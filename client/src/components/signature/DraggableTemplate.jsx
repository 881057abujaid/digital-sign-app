import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableTemplate = ({ id, text, font, color }) =>{
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        data: {
            type: "signature-template",
            text,
            font,
            color,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        fontFamily: font,
        color: color,
        opacity: isDragging ? 0.3 : 1, // Subtle dimming instead of hiding
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="text-3xl select-none transition-opacity duration-200"
        >
            {text}
        </div>
    );
};
export default DraggableTemplate;