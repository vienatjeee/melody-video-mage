
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music, Save, Download, Clock, Tag } from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";
import { YoutubeUploadDialogMusic } from "./YoutubeUploadDialogMusic";
import { GenerationProgress } from "./MusicGenerationProgress";

export interface YouTubeSettings {
  title: string;
  description: string;
  tags: string;
  isPublic: boolean;
  isForKids: boolean;
}

interface GeneratedMusicDisplayProps {
  generatedMusic: string;
  duration: number[];
  mood: string;
  youtubeSettings: YouTubeSettings;
  setYoutubeSettings: React.Dispatch<React.SetStateAction<YouTubeSettings>>;
  handleYouTubeUpload: () => void;
  isUploading: boolean;
  uploadComplete: boolean;
  setUploadComplete: React.Dispatch<React.SetStateAction<boolean>>;
  progress: GenerationProgress;
}

const GeneratedMusicDisplay: React.FC<GeneratedMusicDisplayProps> = ({
  generatedMusic,
  duration,
  mood,
  youtubeSettings,
  setYoutubeSettings,
  handleYouTubeUpload,
  isUploading,
  uploadComplete,
  setUploadComplete,
  progress
}) => {
  if (!generatedMusic) return null;
  
  return (
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
              
              <YoutubeUploadDialogMusic 
                youtubeSettings={youtubeSettings}
                setYoutubeSettings={setYoutubeSettings}
                handleYouTubeUpload={handleYouTubeUpload}
                isUploading={isUploading}
                uploadComplete={uploadComplete}
                setUploadComplete={setUploadComplete}
                progress={progress}
              />
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
  );
};

export default GeneratedMusicDisplay;
