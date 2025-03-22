
import React, { useState } from "react";
import { motion } from "framer-motion";
import MusicCreationForm, { MusicPromptData } from "./MusicCreationForm";
import MusicGenerationProgress, { GenerationProgress } from "./MusicGenerationProgress";
import GeneratedMusicDisplay, { YouTubeSettings } from "./GeneratedMusicDisplay";
import { generateMusic, uploadToYoutube } from "./musicGenerationService";
import { toast } from "sonner";

const MusicCreator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
  const [duration, setDuration] = useState([60]);
  const [mood, setMood] = useState("relaxed");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [youtubeSettings, setYoutubeSettings] = useState<YouTubeSettings>({
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
  
  const handleGenerate = (promptData: MusicPromptData) => {
    setDuration(promptData.duration);
    setMood(promptData.mood);
    
    generateMusic(
      promptData,
      setProgress,
      setIsGenerating,
      setGeneratedMusic,
      setYoutubeSettings,
      setUploadComplete
    );
  };
  
  const handleYouTubeUpload = () => {
    if (!youtubeSettings.title) {
      toast.error("Please provide a title for your YouTube video");
      return;
    }
    
    uploadToYoutube(
      setIsUploading,
      setUploadComplete,
      setProgress
    );
  };
  
  return (
    <div className="space-y-6">
      <MusicCreationForm 
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />
      
      <MusicGenerationProgress 
        isGenerating={isGenerating}
        progress={progress}
      />
      
      {generatedMusic && (
        <GeneratedMusicDisplay
          generatedMusic={generatedMusic}
          duration={duration}
          mood={mood}
          youtubeSettings={youtubeSettings}
          setYoutubeSettings={setYoutubeSettings}
          handleYouTubeUpload={handleYouTubeUpload}
          isUploading={isUploading}
          uploadComplete={uploadComplete}
          setUploadComplete={setUploadComplete}
          progress={progress}
        />
      )}
    </div>
  );
};

export default MusicCreator;
