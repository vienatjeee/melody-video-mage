
import { toast } from "sonner";
import { GenerationProgress } from "./VideoGenerationProgress";
import { YouTubeSettings } from "./GeneratedVideoDisplay";

export const simulateVideoGeneration = (
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>,
  setGeneratedVideo: React.Dispatch<React.SetStateAction<string | null>>,
  setProgress: React.Dispatch<React.SetStateAction<GenerationProgress>>,
  setYoutubeSettings: React.Dispatch<React.SetStateAction<YouTubeSettings>>,
  youtubeSettings: YouTubeSettings,
  prompt: string,
  style: string,
  duration: number[]
) => {
  setIsGenerating(true);
  setGeneratedVideo(null);
  
  // Simulate AI video generation with progressive updates
  setProgress({
    status: "preparing",
    progress: 10,
    message: "Analyzing your prompt..."
  });
  
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

export const simulateYouTubeUpload = (
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setUploadComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setProgress: React.Dispatch<React.SetStateAction<GenerationProgress>>
) => {
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
