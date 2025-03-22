
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress"; 
import { Input } from "@/components/ui/input";
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
  Film,
  Youtube
} from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface GenerationProgress {
  status: "preparing" | "generating" | "rendering" | "completed";
  progress: number;
  message: string;
}

interface YouTubeUploadSettings {
  title: string;
  description: string;
  tags: string;
  isPublic: boolean;
  isForKids: boolean;
}

const VideoCreator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState([15]);
  const [style, setStyle] = useState("realistic");
  const [aspect, setAspect] = useState("16:9");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [youtubeSettings, setYoutubeSettings] = useState<YouTubeUploadSettings>({
    title: "",
    description: "",
    tags: "",
    isPublic: false,
    isForKids: false
  });
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
    setUploadComplete(false);
    
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
                    
                    // Auto-populate YouTube settings
                    setYoutubeSettings({
                      ...youtubeSettings,
                      title: `${style.charAt(0).toUpperCase() + style.slice(1)} Video - ${duration[0]} seconds`,
                      description: `AI-generated ${style} video created with prompt: "${prompt}"`,
                      tags: `ai video, ${style}, generated video`
                    });
                    
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
  
  const handleYouTubeUpload = () => {
    if (!youtubeSettings.title) {
      toast.error("Please provide a title for your YouTube video");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    const uploadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev.progress >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setUploadComplete(true);
          toast.success("Successfully uploaded to YouTube!");
          return prev;
        }
        
        return {
          ...prev,
          progress: prev.progress + 10,
          message: prev.progress < 50 
            ? "Preparing video for upload..." 
            : "Uploading to YouTube..."
        };
      });
    }, 800);
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
                max={600}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-right text-muted-foreground">
                {duration[0]} seconds ({Math.floor(duration[0] / 60)}:{String(duration[0] % 60).padStart(2, "0")})
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
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500">
                        <Youtube className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Upload to YouTube</DialogTitle>
                        <DialogDescription>
                          Fill in the details for your YouTube video
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            value={youtubeSettings.title}
                            onChange={(e) => setYoutubeSettings({...youtubeSettings, title: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={youtubeSettings.description}
                            onChange={(e) => setYoutubeSettings({...youtubeSettings, description: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tags" className="text-right">
                            Tags
                          </Label>
                          <Input
                            id="tags"
                            value={youtubeSettings.tags}
                            onChange={(e) => setYoutubeSettings({...youtubeSettings, tags: e.target.value})}
                            className="col-span-3"
                            placeholder="Separate tags with commas"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="visibility" className="text-right">
                            Public
                          </Label>
                          <div className="flex items-center space-x-2 col-span-3">
                            <Switch
                              id="visibility"
                              checked={youtubeSettings.isPublic}
                              onCheckedChange={(checked) => 
                                setYoutubeSettings({...youtubeSettings, isPublic: checked})
                              }
                            />
                            <span className="text-sm text-muted-foreground">
                              {youtubeSettings.isPublic ? "Public video" : "Private video"}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="kids" className="text-right">
                            For Kids
                          </Label>
                          <div className="flex items-center space-x-2 col-span-3">
                            <Switch
                              id="kids"
                              checked={youtubeSettings.isForKids}
                              onCheckedChange={(checked) => 
                                setYoutubeSettings({...youtubeSettings, isForKids: checked})
                              }
                            />
                            <span className="text-sm text-muted-foreground">
                              {youtubeSettings.isForKids ? "Content for kids" : "Not for kids"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        {isUploading ? (
                          <div className="w-full space-y-2">
                            <Progress value={progress.progress} className="h-2 w-full" />
                            <p className="text-sm text-center">{progress.message}</p>
                          </div>
                        ) : uploadComplete ? (
                          <div className="flex flex-col items-center w-full gap-2">
                            <div className="text-green-500 font-medium flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              Upload Complete
                            </div>
                            <Button onClick={() => setUploadComplete(false)}>Close</Button>
                          </div>
                        ) : (
                          <Button 
                            onClick={handleYouTubeUpload}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <Youtube className="w-4 h-4 mr-2" />
                            Upload to YouTube
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                  <span>Duration: {duration[0]} seconds ({Math.floor(duration[0] / 60)}:{String(duration[0] % 60).padStart(2, "0")})</span>
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
