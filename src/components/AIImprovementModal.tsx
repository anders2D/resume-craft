import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface AIImprovementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  response: string;
  isProcessing: boolean;
  onApply?: (data: any) => void;
}

export const AIImprovementModal = ({ open, onOpenChange, title, response, isProcessing, onApply }: AIImprovementModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch && onApply) {
        const data = JSON.parse(jsonMatch[0]);
        onApply(data);
      }
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  };

  const hasJSON = response.includes('{') && response.includes('}');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {isProcessing ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">AI is analyzing and generating suggestions...</span>
            </div>
          ) : response ? (
            <>
              <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-foreground">{response}</pre>
              </div>
              <div className="flex gap-2">
                {hasJSON && onApply && (
                  <Button
                    size="sm"
                    onClick={handleApply}
                    className="flex-1"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Apply Changes
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
