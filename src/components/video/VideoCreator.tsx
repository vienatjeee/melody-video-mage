
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress"; 
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

interface GenerationProgress {
  status: "preparing" | "generating" | "rendering" | "completed";
  progress: number;
  message: string;
}

const VideoCreator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState([15]);
  const [style, setStyle] = useState("realistic");
  const [aspect, setAspect] = useState("16:9");
  const [progress, setProgress] = useState<GenerationProgress>({
    status: "preparing",
    progress: 0,
    message: "Preparing your request..."
  });
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error("Please enter a description for your video");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedVideo(null);
    
    // Simulate AI video generation with progressive updates
    setProgress({
      status: "preparing",
      progress: 10,
      message: "Analyzing your prompt..."
    });
    
    const simulateProgress = () => {
      // Preparing phase - 0-30%
      setTimeout(() => {
        setProgress({
          status: "preparing",
          progress: 25,
          message: "Setting up scene composition..."
        });
        
        // Generating phase - 30-70%
        setTimeout(() => {
          setProgress({
            status: "generating",
            progress: 40,
            message: "Generating initial frames..."
          });
          
          const interval = setInterval(() => {
            setProgress(prev => {
              if (prev.progress >= 70) {
                clearInterval(interval);
                
                // Rendering phase - 70-100%
                setProgress({
                  status: "rendering",
                  progress: 75,
                  message: "Rendering final video..."
                });
                
                setTimeout(() => {
                  setProgress({
                    status: "rendering",
                    progress: 90,
                    message: "Applying visual effects..."
                  });
                  
                  setTimeout(() => {
                    setProgress({
                      status: "completed",
                      progress: 100,
                      message: "Video ready!"
                    });
                    
                    setIsGenerating(false);
                    setGeneratedVideo("https://file-examples.com/storage/fee788a10e64f06aae9f905/2017/04/file_example_MP4_480_1_5MG.mp4");
                    toast.success("Video generated successfully!");
                  }, 1500);
                }, 2000);
                
                return prev;
              }
              
              return {
                ...prev,
                progress: prev.progress + 5,
                message: prev.progress < 55 
                  ? "Building video frames..." 
                  : "Enhancing video quality..."
              };
            });
          }, 600);
          
        }, 1000);
      }, 800);
    };
    
    simulateProgress();
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
      
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <h3 className="text-lg font-medium">Creating Your Video</h3>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {progress.progress}%
                </div>
              </div>
              
              <Progress value={progress.progress} className="h-2" />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${progress.status === "preparing" ? "bg-blue-500" : "bg-gray-300"}`}></div>
                <span className={progress.status === "preparing" ? "text-blue-500 font-medium" : ""}>Preparing</span>
                <div className="h-px bg-gray-200 flex-1"></div>
                <div className={`w-2 h-2 rounded-full ${progress.status === "generating" ? "bg-purple-500" : "bg-gray-300"}`}></div>
                <span className={progress.status === "generating" ? "text-purple-500 font-medium" : ""}>Generating</span>
                <div className="h-px bg-gray-200 flex-1"></div>
                <div className={`w-2 h-2 rounded-full ${progress.status === "rendering" ? "bg-amber-500" : "bg-gray-300"}`}></div>
                <span className={progress.status === "rendering" ? "text-amber-500 font-medium" : ""}>Rendering</span>
                <div className="h-px bg-gray-200 flex-1"></div>
                <div className={`w-2 h-2 rounded-full ${progress.status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
                <span className={progress.status === "completed" ? "text-green-500 font-medium" : ""}>Complete</span>
              </div>
              
              <p className="text-sm text-center italic">
                {progress.message}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      )}
      
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
