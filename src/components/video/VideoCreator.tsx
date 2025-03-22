
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Video, 
  Play, 
  Pause,
  Download, 
  Save, 
  Wand2, 
  Loader2, 
  Clock, 
  Tag,
  ImageIcon,
  VideoIcon,
  Film
} from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VideoCreator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState([15]);
  const [style, setStyle] = useState("realistic");
  const [aspect, setAspect] = useState("16:9");
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error("Please enter a description for your video");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo("https://file-examples.com/storage/fee788a10e64f06aae9f905/2017/04/file_example_MP4_480_1_5MG.mp4");
      toast.success("Video generated successfully!");
    }, 5000);
  };
  
  const styleOptions = [
    "realistic",
    "cinematic",
    "anime",
    "3d",
    "fantasy",
    "abstract"
  ];
  
  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Wand2 className="w-5 h-5" />
            <h3 className="text-lg font-medium">Describe your video</h3>
          </div>
          
          <Textarea
            placeholder="Describe the video you want to create... (e.g., 'A stunning timelapse of a coastal city at sunset, with boats sailing in the harbor')"
            className="min-h-[120px] resize-none rounded-xl border-input bg-white/50 dark:bg-black/20"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Duration (seconds)</span>
              </div>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={5}
                max={30}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-right text-muted-foreground">
                {duration[0]} seconds
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Style</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {styleOptions.map((option) => (
                  <Button
                    key={option}
                    variant={style === option ? "default" : "outline"}
                    size="sm"
                    className="rounded-full capitalize"
                    onClick={() => setStyle(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Aspect Ratio</span>
              </div>
              <Select value={aspect} onValueChange={setAspect}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
                  <SelectItem value="9:16">Vertical (9:16)</SelectItem>
                  <SelectItem value="1:1">Square (1:1)</SelectItem>
                  <SelectItem value="4:3">Standard (4:3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button
            className="w-full rounded-xl gap-2"
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating your video...
              </>
            ) : (
              <>
                <VideoIcon className="w-4 h-4" />
                Generate Video
              </>
            )}
          </Button>
        </div>
      </GlassCard>
      
      {generatedVideo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard elevation="high">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Video className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Your Generated Video</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden">
                <video className="w-full" controls src={generatedVideo}>
                  Your browser does not support the video element.
                </video>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {duration[0]} seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>Style: {style}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  <span>Aspect Ratio: {aspect}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

export default VideoCreator;
