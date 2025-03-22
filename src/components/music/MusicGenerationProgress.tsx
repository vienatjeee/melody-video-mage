
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";

export interface GenerationProgress {
  status: "analyzing" | "composing" | "mastering" | "completed";
  progress: number;
  message: string;
}

interface MusicGenerationProgressProps {
  isGenerating: boolean;
  progress: GenerationProgress;
}

const MusicGenerationProgress: React.FC<MusicGenerationProgressProps> = ({
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
  );
};

export default MusicGenerationProgress;
