import { Languages, Download, Printer, Upload, FileText, Key, Sparkles, Briefcase, User, GraduationCap, Code, Lightbulb, Target, Save, FolderOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCVData } from "@/hooks/useCVData";
import { useProfile } from "@/contexts/ProfileContext";
import { exportToJSON, importFromJSON } from "@/utils/exportCV";
import { validatePDF, extractTextFromPDF } from "@/utils/pdfParser";
import { extractCVDataWithAI } from "@/utils/geminiAI";
import { useToast } from "@/hooks/use-toast";
import { PDFImportModal } from "@/components/PDFImportModal";
import { AIImprovementModal } from "@/components/AIImprovementModal";
import { TailorCVModal } from "@/components/TailorCVModal";
import { improveJobsPrompt, improveProfilePrompt, improveEducationPrompt, improveSkillsPrompt, getAdvicePrompt, tailorCVPrompt, callGeminiAI } from "@/utils/aiPrompts";
import { useRef, useState, useEffect } from "react";

export const CVSettings = () => {
  const { language } = useLanguage();
  const { cvData } = useCVData();
  const { updateCvData } = useProfile();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [pdfInfo, setPdfInfo] = useState({ fileName: '', fileSize: 0, extractedText: '', aiResponse: '', aiProcessing: false });
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [aiModal, setAiModal] = useState({ open: false, title: '', response: '', isProcessing: false, type: '' as 'jobs' | 'profile' | 'education' | 'skills' | 'advice' | '' });
  const [showTailorModal, setShowTailorModal] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('geminiApiKey');
    if (savedKey) setGeminiApiKey(savedKey);
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setGeminiApiKey(key);
    localStorage.setItem('geminiApiKey', key);
  };

  const handleTailorCV = async (jobDescription: string) => {
    const apiKey = localStorage.getItem('geminiApiKey');
    if (!apiKey) return;

    setIsTailoring(true);

    try {
      const prompt = tailorCVPrompt(JSON.stringify(cvData, null, 2), jobDescription);
      const response = await callGeminiAI(prompt, apiKey);
      
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        let jsonStr = jsonMatch[0]
          .replace(/,\s*([}\]])/g, '$1')
          .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
          .replace(/:\s*'([^']*)'/g, ': "$1"');
        
        const tailoredCV = JSON.parse(jsonStr);
        
        if (!tailoredCV.experience || !tailoredCV.experience.es) {
          throw new Error('Invalid CV structure from AI');
        }
        
        updateCvData(tailoredCV);
        setShowTailorModal(false);
        toast({
          title: "✅ CV Tailored Successfully",
          description: "Your CV has been optimized for the job description!",
        });
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    } catch (error) {
      console.error('CV tailoring error:', error);
      toast({
        title: "❌ Error",
        description: error instanceof Error ? error.message : "Failed to tailor CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTailoring(false);
    }
  };

  const handleAIImprovement = async (type: 'jobs' | 'profile' | 'education' | 'skills' | 'advice') => {
    const apiKey = localStorage.getItem('geminiApiKey');
    if (!apiKey) return;

    let prompt = '';
    let title = '';

    switch (type) {
      case 'jobs':
        title = 'AI Job Experience Improvement';
        prompt = improveJobsPrompt(JSON.stringify(cvData.experience, null, 2));
        break;
      case 'profile':
        title = 'AI Profile Improvement';
        prompt = improveProfilePrompt(JSON.stringify(cvData.profile, null, 2));
        break;
      case 'education':
        title = 'AI Education Improvement';
        prompt = improveEducationPrompt(JSON.stringify(cvData.education, null, 2));
        break;
      case 'skills':
        title = 'AI Skills Improvement';
        prompt = improveSkillsPrompt(JSON.stringify(cvData.skills, null, 2));
        break;
      case 'advice':
        title = 'AI CV Advice';
        prompt = getAdvicePrompt(JSON.stringify(cvData, null, 2));
        break;
    }

    setAiModal({ open: true, title, response: '', isProcessing: true, type });

    try {
      const response = await callGeminiAI(prompt, apiKey, (text) => {
        setAiModal(prev => ({ ...prev, response: text }));
      });
      setAiModal(prev => ({ ...prev, isProcessing: false }));
    } catch (error) {
      console.error('AI improvement error:', error);
      setAiModal({ open: false, title: '', response: '', isProcessing: false, type: '' });
      toast({
        title: "❌ Error",
        description: "Failed to get AI suggestions. Please check your API key.",
        variant: "destructive",
      });
    }
  };

  const handleAIExtract = async (text: string) => {
    const apiKey = localStorage.getItem('geminiApiKey');
    if (!apiKey) {
      toast({
        title: "⚠ API Key Required",
        description: "Please set your Gemini API key in settings first.",
        variant: "destructive",
      });
      return;
    }

    setPdfInfo(prev => ({ ...prev, aiProcessing: true, aiResponse: '' }));

    try {
      const cvData = await extractCVDataWithAI(text, apiKey, (response) => {
        setPdfInfo(prev => ({ ...prev, aiResponse: response }));
      });
      updateCvData(cvData);
      setPdfInfo(prev => ({ ...prev, aiProcessing: false }));
      setTimeout(() => {
        setShowPDFModal(false);
        toast({
          title: "✅ Success",
          description: "CV data extracted and applied successfully!",
        });
      }, 1000);
    } catch (error) {
      console.error('AI extraction error:', error);
      setPdfInfo(prev => ({ ...prev, aiProcessing: false, aiResponse: `Error: ${error}` }));
      toast({
        title: "❌ Error",
        description: "Failed to extract CV data with AI. Please check your API key.",
        variant: "destructive",
      });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importFromJSON(file, (data) => {
        try {
          updateCvData(data);
          toast({
            title: "✅ Success",
            description: "CV loaded successfully!",
          });
        } catch (error) {
          console.error('Import error:', error);
          toast({
            title: "❌ Error",
            description: "Failed to load CV. Please check the file format.",
            variant: "destructive",
          });
        }
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePDFImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      setPdfInfo({ fileName: file.name, fileSize: file.size, extractedText: '', aiResponse: '', aiProcessing: false });
      setShowPDFModal(true);
      
      try {
        const result = await validatePDF(file);
        
        if (!result.isValid) {
          setShowPDFModal(false);
          toast({
            title: "⚠ Invalid File",
            description: "This file is not a valid PDF.",
            variant: "destructive",
          });
          return;
        }

        const extractedText = await extractTextFromPDF(file);
        setPdfInfo({ fileName: file.name, fileSize: file.size, extractedText, aiResponse: '', aiProcessing: false });
      } catch (error) {
        console.error('Error processing PDF:', error);
        setShowPDFModal(false);
        toast({
          title: "Error",
          description: "Failed to process PDF file.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
        if (pdfInputRef.current) {
          pdfInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">CV Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Language
          </Label>
          <LanguageSwitch />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gemini-api-key" className="text-sm font-medium flex items-center gap-2">
            <Key className="h-4 w-4" />
            Gemini API Key
          </Label>
          <input
            id="gemini-api-key"
            type="password"
            value={geminiApiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your Gemini API key"
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-2 pt-2 border-t">
          <Button
            variant="default"
            size="sm"
            className="w-full"
            disabled={!geminiApiKey}
            onClick={() => setShowTailorModal(true)}
          >
            <Target className="h-4 w-4 mr-2" />
            Tailor CV to Job
          </Button>
        </div>
        <div className="space-y-2 pt-2 border-t">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Actions
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              disabled={!geminiApiKey}
              onClick={() => handleAIImprovement('jobs')}
            >
              <Briefcase className="h-3 w-3 mr-1" />
              Improve Jobs
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              disabled={!geminiApiKey}
              onClick={() => handleAIImprovement('profile')}
            >
              <User className="h-3 w-3 mr-1" />
              Improve Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              disabled={!geminiApiKey}
              onClick={() => handleAIImprovement('education')}
            >
              <GraduationCap className="h-3 w-3 mr-1" />
              Improve Education
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              disabled={!geminiApiKey}
              onClick={() => handleAIImprovement('skills')}
            >
              <Code className="h-3 w-3 mr-1" />
              Improve Skills
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={!geminiApiKey}
            onClick={() => handleAIImprovement('advice')}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Get AI Advice
          </Button>
        </div>
        <div className="space-y-2">
          <Button 
            onClick={() => window.print()} 
            variant="default" 
            size="sm" 
            className="w-full"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print CV
          </Button>
          <Button 
            onClick={() => exportToJSON(cvData, language)} 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            Save CV (JSON)
          </Button>
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            Load CV (JSON)
          </Button>
          <Button 
            onClick={() => pdfInputRef.current?.click()} 
            variant="outline" 
            size="sm" 
            className="w-full"
            disabled={isProcessing}
          >
            <FileText className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Import PDF'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <input
            ref={pdfInputRef}
            type="file"
            accept=".pdf"
            onChange={handlePDFImport}
            className="hidden"
          />
        </div>
      </CardContent>
      
      <PDFImportModal
        open={showPDFModal}
        onOpenChange={setShowPDFModal}
        fileName={pdfInfo.fileName}
        fileSize={pdfInfo.fileSize}
        extractedText={pdfInfo.extractedText}
        aiResponse={pdfInfo.aiResponse}
        aiProcessing={pdfInfo.aiProcessing}
        onAIExtract={handleAIExtract}
      />
      
      <TailorCVModal
        open={showTailorModal}
        onOpenChange={setShowTailorModal}
        onTailor={handleTailorCV}
        isProcessing={isTailoring}
      />
      
      <AIImprovementModal
        open={aiModal.open}
        onOpenChange={(open) => setAiModal(prev => ({ ...prev, open }))}
        title={aiModal.title}
        response={aiModal.response}
        isProcessing={aiModal.isProcessing}
        onApply={(data) => {
          if (aiModal.type !== 'advice') {
            const updatedData = { ...cvData };
            switch (aiModal.type) {
              case 'jobs':
                updatedData.experience = data;
                break;
              case 'profile':
                updatedData.profile = data;
                break;
              case 'education':
                updatedData.education = data;
                break;
              case 'skills':
                updatedData.skills = data;
                break;
            }
            updateCvData(updatedData);
            setAiModal(prev => ({ ...prev, open: false }));
            toast({
              title: "✅ Applied",
              description: "AI improvements have been applied to your CV!",
            });
          }
        }}
      />
    </Card>
  );
};
