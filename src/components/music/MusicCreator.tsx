
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Music, 
  Play, 
  Download, 
  Save, 
  Wand2, 
  Loader2, 
  Volume2, 
  Clock, 
  Tag,
  Waves,
  Youtube
} from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";
import { toast } from "sonner";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface GenerationProgress {
  status: "analyzing" | "composing" | "mastering" | "completed";
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

const MusicCreator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
  const [duration, setDuration] = useState([60]);
  const [mood, setMood] = useState("relaxed");
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
    status: "analyzing",
    progress: 0,
    message: "Analyzing your prompt..."
  });
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error("Please enter a description for your music");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedMusic(null);
    setUploadComplete(false);
    
    // Simulate AI music generation with progressive updates
    setProgress({
      status: "analyzing",
      progress: 10,
      message: "Analyzing musical elements in your prompt..."
    });
    
    const simulateProgress = () => {
      // Analyzing phase - 0-30%
      setTimeout(() => {
        setProgress({
          status: "analyzing",
          progress: 25,
          message: "Determining melody and chord progression..."
        });
        
        // Composing phase - 30-70%
        setTimeout(() => {
          setProgress({
            status: "composing",
            progress: 40,
            message: "Composing melody..."
          });
          
          const interval = setInterval(() => {
            setProgress(prev => {
              if (prev.progress >= 70) {
                clearInterval(interval);
                
                // Mastering phase - 70-100%
                setProgress({
                  status: "mastering",
                  progress: 75,
                  message: "Mastering audio..."
                });
                
                setTimeout(() => {
                  setProgress({
                    status: "mastering",
                    progress: 90,
                    message: "Applying final touches..."
                  });
                  
                  setTimeout(() => {
                    setProgress({
                      status: "completed",
                      progress: 100,
                      message: "Music ready!"
                    });
                    
                    setIsGenerating(false);
                    setGeneratedMusic("https://file-examples.com/storage/fee788a10e64f06aae9f905/2017/11/file_example_MP3_700KB.mp3");
                    
                    // Auto-populate YouTube settings
                    setYoutubeSettings({
                      ...youtubeSettings,
                      title: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Music - ${duration[0]} seconds`,
                      description: `AI-generated ${mood} music created with prompt: "${prompt}"`,
                      tags: `ai music, ${mood}, generated music`
                    });
                    
                    toast.success("Music generated successfully!");
                  }, 1500);
                }, 1500);
                
                return prev;
              }
              
              return {
                ...prev,
                progress: prev.progress + 5,
                message: prev.progress < 55 
                  ? "Creating harmonic structure..." 
                  : "Adding instrumentation..."
              };
            });
          }, 500);
          
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
  
  const moodOptions = [
    "relaxed",
    "energetic",
    "melancholic",
    "happy",
    "mysterious",
    "romantic"
  ];
  
  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Wand2 className="w-5 h-5" />
            <h3 className="text-lg font-medium">Describe your music</h3>
          </div>
          
          <Textarea
            placeholder="Describe the music you want to create... (e.g., 'A peaceful piano melody with subtle strings in the background')"
            className="min-h-[120px] resize-none rounded-xl border-input bg-white/50 dark:bg-black/20"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Duration (seconds)</span>
              </div>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={15}
                max={600} 
                step={15}
                className="w-full"
              />
              <div className="text-sm text-right text-muted-foreground">
                {duration[0]} seconds ({Math.floor(duration[0] / 60)}:{String(duration[0] % 60).padStart(2, "0")})
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Mood</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((option) => (
                  <Button
                    key={option}
                    variant={mood === option ? "default" : "outline"}
                    size="sm"
                    className="rounded-full capitalize"
                    onClick={() => setMood(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
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
                Composing your music...
              </>
            ) : (
              <>
                <Music className="w-4 h-4" />
                Generate Music
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
                  <h3 className="text-lg font-medium">Composing Your Music</h3>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {progress.progress}%
                </div>
              </div>
              
              <Progress value={progress.progress} className="h-2" />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${progress.status === "analyzing" ? "bg-blue-500" : "bg-gray-300"}`}></div>
                <span className={progress.status === "analyzing" ? "text-blue-500 font-medium" : ""}>Analyzing</span>
                <div className="h-px bg-gray-200 flex-1"></div>
                <div className={`w-2 h-2 rounded-full ${progress.status === "composing" ? "bg-purple-500" : "bg-gray-300"}`}></div>
                <span className={progress.status === "composing" ? "text-purple-500 font-medium" : ""}>Composing</span>
                <div className="h-px bg-gray-200 flex-1"></div>
                <div className={`w-2 h-2 rounded-full ${progress.status === "mastering" ? "bg-amber-500" : "bg-gray-300"}`}></div>
                <span className={progress.status === "mastering" ? "text-amber-500 font-medium" : ""}>Mastering</span>
                <div className="h-px bg-gray-200 flex-1"></div>
                <div className={`w-2 h-2 rounded-full ${progress.status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
                <span className={progress.status === "completed" ? "text-green-500 font-medium" : ""}>Complete</span>
              </div>
              
              <div className="flex items-center justify-center">
                <motion.div 
                  className="flex items-end h-10 gap-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary rounded-full"
                      animate={{ 
                        height: [
                          `${Math.random() * 30 + 10}%`, 
                          `${Math.random() * 70 + 30}%`, 
                          `${Math.random() * 30 + 10}%`
                        ] 
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        delay: i * 0.1 
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <p className="text-sm text-center italic">
                {progress.message}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      )}
      
      {generatedMusic && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard elevation="high">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Music className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Your Generated Music</h3>
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
              
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                <audio className="w-full" controls src={generatedMusic}>
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {duration[0]} seconds ({Math.floor(duration[0] / 60)}:{String(duration[0] % 60).padStart(2, "0")})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>Mood: {mood}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

export default MusicCreator;
