
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";

export interface GenerationProgress {
  status: "preparing" | "generating" | "rendering" | "completed";
  progress: number;
  message: string;
}

interface VideoGenerationProgressProps {
  isGenerating: boolean;
  progress: GenerationProgress;
}

const VideoGenerationProgress: React.FC<VideoGenerationProgressProps> = ({
  isGenerating,
  progress
}) => {
  if (!isGenerating) return null;
  
  return (
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
  );
};

export default VideoGenerationProgress;
