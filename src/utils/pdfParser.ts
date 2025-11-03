import { PDFParse } from 'pdf-parse';

interface PDFValidationResult {
  isValid: boolean;
  fileName: string;
  fileSize: number;
  fileType: string;
  extractedText?: string;
}

export const validatePDF = async (file: File): Promise<PDFValidationResult> => {
  try {
    const isValid = file.type === 'application/pdf' && file.size > 0;
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer.slice(0, 5));
    const signature = String.fromCharCode(...bytes);
    const hasPDFSignature = signature === '%PDF-';
    
    return {
      isValid: isValid && hasPDFSignature,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    };
  } catch (error) {
    console.error('PDF validation error:', error);
    throw new Error('Failed to validate PDF');
  }
};

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const parser = new PDFParse({ data: await file.arrayBuffer() });
  try {
    const result = await parser.getText();
    return result.text;
  } catch (error) {
    console.error('PDF text extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  } finally {
    await parser.destroy();
  }
};
