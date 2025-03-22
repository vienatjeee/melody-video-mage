
import { GenerationProgress } from "./MusicGenerationProgress";
import { MusicPromptData } from "./MusicCreationForm";
import { YouTubeSettings } from "./GeneratedMusicDisplay";
import { toast } from "sonner";

/**
 * Simulates the process of generating music based on user input
 */
export const generateMusic = (
  promptData: MusicPromptData,
  setProgress: React.Dispatch<React.SetStateAction<GenerationProgress>>,
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>,
  setGeneratedMusic: React.Dispatch<React.SetStateAction<string | null>>,
  setYoutubeSettings: React.Dispatch<React.SetStateAction<YouTubeSettings>>,
  setUploadComplete: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsGenerating(true);
  setGeneratedMusic(null);
  setUploadComplete(false);
  
  // Initial progress state
  setProgress({
    status: "analyzing",
    progress: 10,
    message: "Analyzing musical elements in your prompt..."
  });
  
  // Simulate AI music generation with progressive updates
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
                  setYoutubeSettings(prevSettings => ({
                    ...prevSettings,
                    title: `${promptData.mood.charAt(0).toUpperCase() + promptData.mood.slice(1)} Music - ${promptData.duration[0]} seconds`,
                    description: `AI-generated ${promptData.mood} music created with prompt: "${promptData.prompt}"`,
                    tags: `ai music, ${promptData.mood}, generated music`
                  }));
                  
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

/**
 * Simulates uploading the generated music to YouTube
 */
export const uploadToYoutube = (
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
