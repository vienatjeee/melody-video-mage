
import React from "react";
import MusicCreator from "@/components/music/MusicCreator";
import { SlideUpTransition } from "@/components/animations/Transitions";
import { Music } from "lucide-react";

const MusicStudio = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <SlideUpTransition>
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Music className="w-4 h-4 mr-2" />
            AI Music Studio
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Create beautiful music with AI
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Describe the music you want to create, adjust the settings, and let our AI composer generate a unique track for you.
          </p>
        </div>
      </SlideUpTransition>
      
      <SlideUpTransition delay={0.1}>
        <MusicCreator />
      </SlideUpTransition>
    </div>
  );
};

export default MusicStudio;
