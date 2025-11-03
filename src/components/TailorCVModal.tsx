import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

interface TailorCVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTailor: (jobDescription: string) => void;
  isProcessing: boolean;
}

export const TailorCVModal = ({ open, onOpenChange, onTailor, isProcessing }: TailorCVModalProps) => {
  const [jobDescription, setJobDescription] = useState("");

  const handleTailor = () => {
    if (jobDescription.trim()) {
      onTailor(jobDescription);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Tailor CV to Job Description
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Paste the job description below:
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here..."
              className="w-full h-64 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              disabled={isProcessing}
            />
          </div>

          {isProcessing ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
              <span className="text-sm text-muted-foreground">
                AI is tailoring your CV to match the job description...
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleTailor}
                disabled={!jobDescription.trim()}
                className="flex-1"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Tailor My CV
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
