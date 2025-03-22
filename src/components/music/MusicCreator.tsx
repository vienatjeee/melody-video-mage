
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Music, 
  Play, 
  Download, 
  Save, 
  Wand2, 
  Loader2, 
  Volume2, 
  Clock, 
  Tag 
} from "lucide-react";
import GlassCard from "../ui-elements/GlassCard";
import { toast } from "sonner";

const MusicCreator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
  const [duration, setDuration] = useState([60]);
  const [mood, setMood] = useState("relaxed");
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error("Please enter a description for your music");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedMusic("https://file-examples.com/storage/fee788a10e64f06aae9f905/2017/11/file_example_MP3_700KB.mp3");
      toast.success("Music generated successfully!");
    }, 3000);
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
    <div className="space-y-6">
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
                max={180}
                step={15}
                className="w-full"
              />
              <div className="text-sm text-right text-muted-foreground">
                {duration[0]} seconds
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
            onClick={handleGenerate}
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
      
      {generatedMusic && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard elevation="high">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Music className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Your Generated Music</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                <audio className="w-full" controls src={generatedMusic}>
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {duration[0]} seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>Mood: {mood}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

export default MusicCreator;
