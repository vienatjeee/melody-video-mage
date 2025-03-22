
import React, { useState } from "react";
import { toast } from "sonner";
import VideoCreationForm from "./VideoCreationForm";
import VideoGenerationProgress, { GenerationProgress } from "./VideoGenerationProgress";
import GeneratedVideoDisplay, { YouTubeSettings } from "./GeneratedVideoDisplay";
import { simulateVideoGeneration, simulateYouTubeUpload } from "./videoGenerationService";

const VideoCreator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState([15]);
  const [style, setStyle] = useState("realistic");
  const [aspect, setAspect] = useState("16:9");
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
    status: "preparing",
    progress: 0,
    message: "Preparing your request..."
  });
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error("Please enter a description for your video");
      return;
    }
    
    simulateVideoGeneration(
      setIsGenerating,
      setGeneratedVideo,
      setProgress,
      setYoutubeSettings,
      youtubeSettings,
      prompt,
      style,
      duration
    );
  };
  
  const handleYouTubeUpload = () => {
    if (!youtubeSettings.title) {
      toast.error("Please provide a title for your YouTube video");
      return;
    }
    
    simulateYouTubeUpload(
      setIsUploading,
      setUploadComplete,
      setProgress
    );
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
      <VideoCreationForm
        prompt={prompt}
        setPrompt={setPrompt}
        duration={duration}
        setDuration={setDuration}
        style={style}
        setStyle={setStyle}
        aspect={aspect}
        setAspect={setAspect}
        handleGenerate={handleGenerate}
        isGenerating={isGenerating}
        styleOptions={styleOptions}
      />
      
      <VideoGenerationProgress
        isGenerating={isGenerating}
        progress={progress}
      />
      
      {generatedVideo && (
        <GeneratedVideoDisplay
          generatedVideo={generatedVideo}
          duration={duration}
          style={style}
          aspect={aspect}
          youtubeSettings={youtubeSettings}
          setYoutubeSettings={setYoutubeSettings}
          handleYouTubeUpload={handleYouTubeUpload}
          isUploading={isUploading}
          uploadComplete={uploadComplete}
          progress={progress}
        />
      )}
    </div>
  );
};

export default VideoCreator;
