
import React from "react";
import VideoCreator from "@/components/video/VideoCreator";
import { SlideUpTransition } from "@/components/animations/Transitions";
import { Video } from "lucide-react";

const VideoStudio = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <SlideUpTransition>
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Video className="w-4 h-4 mr-2" />
            AI Video Studio
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Generate stunning videos with AI
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Describe the video you want to create, choose your style and settings, and watch as our AI brings your vision to life.
          </p>
        </div>
      </SlideUpTransition>
      
      <SlideUpTransition delay={0.1}>
        <VideoCreator />
      </SlideUpTransition>
    </div>
  );
};

export default VideoStudio;
