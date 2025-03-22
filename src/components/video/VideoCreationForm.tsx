
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, VideoIcon, Clock, Tag, Film, Loader2 } from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";

interface VideoCreationFormProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  duration: number[];
  setDuration: React.Dispatch<React.SetStateAction<number[]>>;
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
  aspect: string;
  setAspect: React.Dispatch<React.SetStateAction<string>>;
  handleGenerate: () => void;
  isGenerating: boolean;
  styleOptions: string[];
}

const VideoCreationForm: React.FC<VideoCreationFormProps> = ({
  prompt,
  setPrompt,
  duration,
  setDuration,
  style,
  setStyle,
  aspect,
  setAspect,
  handleGenerate,
  isGenerating,
  styleOptions
}) => {
  return (
    <GlassCard>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Wand2 className="w-5 h-5" />
          <h3 className="text-lg font-medium">Describe your video</h3>
        </div>
        
        <Textarea
          placeholder="Describe the video you want to create... (e.g., 'A stunning timelapse of a coastal city at sunset, with boats sailing in the harbor')"
          className="min-h-[120px] resize-none rounded-xl border-input bg-white/50 dark:bg-black/20"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Duration (seconds)</span>
            </div>
            <Slider
              value={duration}
              onValueChange={setDuration}
              min={5}
              max={600}
              step={5}
              className="w-full"
            />
            <div className="text-sm text-right text-muted-foreground">
              {duration[0]} seconds ({Math.floor(duration[0] / 60)}:{String(duration[0] % 60).padStart(2, "0")})
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Style</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((option) => (
                <Button
                  key={option}
                  variant={style === option ? "default" : "outline"}
                  size="sm"
                  className="rounded-full capitalize"
                  onClick={() => setStyle(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Aspect Ratio</span>
            </div>
            <Select value={aspect} onValueChange={setAspect}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
                <SelectItem value="9:16">Vertical (9:16)</SelectItem>
                <SelectItem value="1:1">Square (1:1)</SelectItem>
                <SelectItem value="4:3">Standard (4:3)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button
          className="w-full rounded-xl gap-2"
          size="lg"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating your video...
            </>
          ) : (
            <>
              <VideoIcon className="w-4 h-4" />
              Generate Video
            </>
          )}
        </Button>
      </div>
    </GlassCard>
  );
};

export default VideoCreationForm;
