
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Video, Save, Download, Youtube, Clock, Tag, Film } from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";
import { YoutubeUploadDialog } from "./YoutubeUploadDialog";

interface GeneratedVideoDisplayProps {
  generatedVideo: string | null;
  duration: number[];
  style: string;
  aspect: string;
  youtubeSettings: YouTubeSettings;
  setYoutubeSettings: React.Dispatch<React.SetStateAction<YouTubeSettings>>;
  handleYouTubeUpload: () => void;
  isUploading: boolean;
  uploadComplete: boolean;
  progress: GenerationProgress;
}

export interface YouTubeSettings {
  title: string;
  description: string;
  tags: string;
  isPublic: boolean;
  isForKids: boolean;
}

import { GenerationProgress } from "./VideoGenerationProgress";

const GeneratedVideoDisplay: React.FC<GeneratedVideoDisplayProps> = ({
  generatedVideo,
  duration,
  style,
  aspect,
  youtubeSettings,
  setYoutubeSettings,
  handleYouTubeUpload,
  isUploading,
  uploadComplete,
  progress
}) => {
  if (!generatedVideo) return null;
  
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
              
              <YoutubeUploadDialog 
                youtubeSettings={youtubeSettings}
                setYoutubeSettings={setYoutubeSettings}
                handleYouTubeUpload={handleYouTubeUpload}
                isUploading={isUploading}
                uploadComplete={uploadComplete}
                progress={progress}
              />
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
  );
};

export default GeneratedVideoDisplay;
