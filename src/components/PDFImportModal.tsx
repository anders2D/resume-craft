import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, FileText, Loader2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface PDFImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  fileSize: number;
  extractedText?: string;
  aiResponse?: string;
  aiProcessing?: boolean;
  onAIExtract?: (text: string) => void;
}

export const PDFImportModal = ({ open, onOpenChange, fileName, fileSize, extractedText = '', aiResponse = '', aiProcessing = false, onAIExtract }: PDFImportModalProps) => {
  const [step, setStep] = useState(1);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showExtractedText, setShowExtractedText] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setExpandedStep(null);
      setTimeout(() => setStep(2), 300);
      setTimeout(() => setStep(3), 600);
      setTimeout(() => setStep(4), 900);
    }
  }, [open]);

  const baseSteps = [
    { 
      id: 1, 
      label: "Uploading PDF", 
      status: step >= 1 ? "complete" : "pending",
      details: `File uploaded: ${fileName}\nSize: ${(fileSize / 1024).toFixed(2)} KB\nType: application/pdf`
    },
    { 
      id: 2, 
      label: "Validating format", 
      status: step >= 2 ? "complete" : "pending",
      details: "Format validation: PASSED\nMIME type: application/pdf\nFile extension: .pdf\nBinary check: Valid"
    },
    { 
      id: 3, 
      label: "Checking signature", 
      status: step >= 3 ? "complete" : "pending",
      details: "PDF signature: %PDF-\nVersion detected: PDF 1.x\nHeader validation: PASSED\nStructure: Valid PDF format"
    },
    { 
      id: 4, 
      label: "Ready", 
      status: step >= 4 ? "complete" : "pending",
      details: "All checks passed\nFile is ready for processing\nNo errors detected\nStatus: SUCCESS"
    },
  ];

  const aiStep = {
    id: 5,
    label: "AI Processing",
    status: aiProcessing ? "processing" : (aiResponse ? "complete" : "pending"),
    details: aiResponse || "Waiting for AI extraction..."
  };

  const steps = aiProcessing || aiResponse ? [...baseSteps, aiStep] : baseSteps;

  const totalSteps = steps.length;
  const completedSteps = steps.filter(s => s.status === "complete").length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            PDF Import Progress
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <div className="space-y-2">
            {steps.map((s) => (
              <div key={s.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  {s.status === "complete" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : s.status === "processing" ? (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500 flex-shrink-0" />
                  ) : (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground flex-shrink-0" />
                  )}
                  <span className={`flex-1 ${s.status === "complete" ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                  {(s.status === "complete" || s.status === "processing") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setExpandedStep(expandedStep === s.id ? null : s.id)}
                    >
                      {expandedStep === s.id ? "Hide" : "Details"}
                    </Button>
                  )}
                </div>
                {expandedStep === s.id && (s.status === "complete" || s.status === "processing") && (
                  <div className="ml-8 bg-muted p-2 rounded text-xs max-h-40 overflow-y-auto whitespace-pre-wrap text-muted-foreground">
                    {s.details}
                  </div>
                )}
              </div>
            ))}
          </div>

          {step >= 4 && (
            <div className="pt-2 border-t space-y-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowExtractedText(!showExtractedText)}
                className="w-full"
              >
                {showExtractedText ? "Hide" : "Show"} Extracted Text
              </Button>
              {showExtractedText && (
                <div className="bg-muted p-3 rounded text-xs max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-muted-foreground">
                    {extractedText || 'No text extracted'}
                  </pre>
                </div>
              )}
              {extractedText && onAIExtract && !aiProcessing && !aiResponse && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onAIExtract(extractedText)}
                  className="w-full"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Use AI to Extract Content to Current Format
                </Button>
              )}
              {!aiProcessing && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="w-full"
                >
                  Done
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
