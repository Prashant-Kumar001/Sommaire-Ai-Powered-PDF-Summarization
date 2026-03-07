import pdf from "pdf-parse";


export async function fetchAndExtractPdfText({ fileUrl }: { fileUrl: string }) {
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdf(buffer);
    const text = data.text;
    return text;
}