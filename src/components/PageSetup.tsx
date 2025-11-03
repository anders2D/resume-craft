import { useState, useEffect } from "react";
import { Maximize2, ZoomOut } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface PageSetupProps {
  onPageSizeChange: (dimensions: string) => void;
}

const PAGE_SIZES = [
  { id: "A4", label: "A4", dimensions: "210 × 297 mm", portrait: "210mm 297mm", landscape: "297mm 210mm" },
  { id: "Letter", label: "Letter", dimensions: "8.5 × 11 in", portrait: "8.5in 11in", landscape: "11in 8.5in" },
  { id: "Legal", label: "Legal", dimensions: "8.5 × 14 in", portrait: "8.5in 14in", landscape: "14in 8.5in" },
  { id: "A3", label: "A3", dimensions: "297 × 420 mm", portrait: "297mm 420mm", landscape: "420mm 297mm" },
  { id: "Tabloid", label: "Tabloid", dimensions: "11 × 17 in", portrait: "11in 17in", landscape: "17in 11in" },
  { id: "Custom", label: "Custom", dimensions: "Custom size", portrait: "custom", landscape: "custom" }
];

export const PageSetup = ({ onPageSizeChange }: PageSetupProps) => {
  const [selectedSize, setSelectedSize] = useState("A4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [customWidth, setCustomWidth] = useState("210");
  const [customHeight, setCustomHeight] = useState("297");
  const [customUnit, setCustomUnit] = useState("mm");
  const [zoom, setZoom] = useState(100);

  const updatePageSize = (size: string, orient: "portrait" | "landscape") => {
    if (size === "Custom") {
      const width = orient === "portrait" ? customWidth : customHeight;
      const height = orient === "portrait" ? customHeight : customWidth;
      onPageSizeChange(`${width}${customUnit} ${height}${customUnit}`);
    } else {
      const pageSize = PAGE_SIZES.find(p => p.id === size);
      if (pageSize) {
        onPageSizeChange(orient === "portrait" ? pageSize.portrait : pageSize.landscape);
      }
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    updatePageSize(size, orientation);
  };

  const handleOrientationChange = (newOrientation: "portrait" | "landscape") => {
    setOrientation(newOrientation);
    updatePageSize(selectedSize, newOrientation);
  };

  useEffect(() => {
    if (selectedSize === "Custom") {
      updatePageSize("Custom", orientation);
    }
  }, [customWidth, customHeight, customUnit]);

  useEffect(() => {
    const style = document.getElementById('zoom-print-style') || document.createElement('style');
    style.id = 'zoom-print-style';
    style.textContent = `
      @media print {
        * {
          zoom: ${zoom / 100};
        }
      }
    `;
    if (!document.getElementById('zoom-print-style')) {
      document.head.appendChild(style);
    }
  }, [zoom]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Page Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Page Orientation */}
          <div>
            <Label className="text-sm font-medium flex items-center gap-2 mb-3">
              <Maximize2 className="h-4 w-4" />
              Orientation
            </Label>
            <RadioGroup value={orientation} onValueChange={(v) => handleOrientationChange(v as "portrait" | "landscape")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="portrait" id="portrait" />
                <Label htmlFor="portrait" className="cursor-pointer font-normal">Portrait</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="landscape" id="landscape" />
                <Label htmlFor="landscape" className="cursor-pointer font-normal">Landscape</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Page Size */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Paper Size</Label>
            <RadioGroup value={selectedSize} onValueChange={handleSizeChange}>
              {PAGE_SIZES.map((size) => (
                <div key={size.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={size.id} id={size.id} />
                  <Label htmlFor={size.id} className="cursor-pointer font-normal flex-1">
                    <span className="font-medium">{size.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">({size.dimensions})</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {selectedSize === "Custom" && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="width" className="text-xs">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      min="1"
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="height" className="text-xs">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      min="1"
                      className="h-8"
                    />
                  </div>
                </div>
                <Select value={customUnit} onValueChange={setCustomUnit}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">Millimeters (mm)</SelectItem>
                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                    <SelectItem value="in">Inches (in)</SelectItem>
                    <SelectItem value="pt">Points (pt)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Zoom Control */}
          <div>
            <Label className="text-sm font-medium flex items-center gap-2 mb-3">
              <ZoomOut className="h-4 w-4" />
              Print Zoom: {zoom}%
            </Label>
            <Slider
              value={[zoom]}
              onValueChange={(val) => setZoom(val[0])}
              min={50}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Reduce zoom to fit more content on one page
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
