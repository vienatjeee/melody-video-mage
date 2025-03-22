
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Music, Wand2, Loader2, Clock, Tag } from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";
import { toast } from "sonner";

interface MusicCreationFormProps {
  onGenerate: (promptData: MusicPromptData) => void;
  isGenerating: boolean;
}

export interface MusicPromptData {
  prompt: string;
  duration: number[];
  mood: string;
}

const MusicCreationForm: React.FC<MusicCreationFormProps> = ({
  onGenerate,
  isGenerating
}) => {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([60]);
  const [mood, setMood] = useState("relaxed");
  
  const handleSubmit = () => {
    if (!prompt) {
      toast.error("Please enter a description for your music");
      return;
    }
    
    onGenerate({
      prompt,
      duration,
      mood
    });
  };
  
  const moodOptions = [
    "relaxed",
    "energetic",
    "melancholic",
    "happy",
    "mysterious",
    "romantic"
  ];
  
  return (
    <GlassCard>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Wand2 className="w-5 h-5" />
          <h3 className="text-lg font-medium">Describe your music</h3>
        </div>
        
        <Textarea
          placeholder="Describe the music you want to create... (e.g., 'A peaceful piano melody with subtle strings in the background')"
          className="min-h-[120px] resize-none rounded-xl border-input bg-white/50 dark:bg-black/20"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Duration (seconds)</span>
            </div>
            <Slider
              value={duration}
              onValueChange={setDuration}
              min={15}
              max={600} 
              step={15}
              className="w-full"
            />
            <div className="text-sm text-right text-muted-foreground">
              {duration[0]} seconds ({Math.floor(duration[0] / 60)}:{String(duration[0] % 60).padStart(2, "0")})
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Mood</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((option) => (
                <Button
                  key={option}
                  variant={mood === option ? "default" : "outline"}
                  size="sm"
                  className="rounded-full capitalize"
                  onClick={() => setMood(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <Button
          className="w-full rounded-xl gap-2"
          size="lg"
          onClick={handleSubmit}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Composing your music...
            </>
          ) : (
            <>
              <Music className="w-4 h-4" />
              Generate Music
            </>
          )}
        </Button>
      </div>
    </GlassCard>
  );
};

export default MusicCreationForm;
