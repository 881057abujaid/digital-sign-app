export const SIGNATURE_PADDING_X = 16; // Left/Right padding
export const SIGNATURE_PADDING_Y = 8;  // Top/Bottom padding

const generateSignatureImage = async (text, font, color = "black") =>{
    const fontSize = 32;
    await document.fonts.load(`${fontSize}px "${font}"`);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    context.font = `${fontSize}px "${font}"`;

    const metrics = context.measureText(text);
    const textWidth = metrics.width;

    const ascent = metrics.actualBoundingBoxAscent;
    const descent = metrics.actualBoundingBoxDescent;
    const height = ascent + descent;

    const width = textWidth + (SIGNATURE_PADDING_X * 2);
    const totalHeight = height + (SIGNATURE_PADDING_Y * 2);

    canvas.width = width;
    canvas.height = totalHeight;

    context.font = `${fontSize}px "${font}"`;
    context.fillStyle = color;
    context.textBaseline = "alphabetic";
    context.fillText(text, SIGNATURE_PADDING_X, ascent + SIGNATURE_PADDING_Y);

    return {
        image: canvas.toDataURL("image/png"),
        width,
        height: totalHeight,
    };
};
export default generateSignatureImage;