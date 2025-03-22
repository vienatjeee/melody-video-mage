
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Youtube } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { YouTubeSettings } from "./GeneratedMusicDisplay";
import { GenerationProgress } from "./MusicGenerationProgress";

interface YoutubeUploadDialogMusicProps {
  youtubeSettings: YouTubeSettings;
  setYoutubeSettings: React.Dispatch<React.SetStateAction<YouTubeSettings>>;
  handleYouTubeUpload: () => void;
  isUploading: boolean;
  uploadComplete: boolean;
  setUploadComplete: React.Dispatch<React.SetStateAction<boolean>>;
  progress: GenerationProgress;
}

export const YoutubeUploadDialogMusic: React.FC<YoutubeUploadDialogMusicProps> = ({
  youtubeSettings,
  setYoutubeSettings,
  handleYouTubeUpload,
  isUploading,
  uploadComplete,
  setUploadComplete,
  progress
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500">
          <Youtube className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload to YouTube</DialogTitle>
          <DialogDescription>
            Fill in the details for your YouTube video
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={youtubeSettings.title}
              onChange={(e) => setYoutubeSettings({...youtubeSettings, title: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={youtubeSettings.description}
              onChange={(e) => setYoutubeSettings({...youtubeSettings, description: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              value={youtubeSettings.tags}
              onChange={(e) => setYoutubeSettings({...youtubeSettings, tags: e.target.value})}
              className="col-span-3"
              placeholder="Separate tags with commas"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="visibility" className="text-right">
              Public
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="visibility"
                checked={youtubeSettings.isPublic}
                onCheckedChange={(checked) => 
                  setYoutubeSettings({...youtubeSettings, isPublic: checked})
                }
              />
              <span className="text-sm text-muted-foreground">
                {youtubeSettings.isPublic ? "Public video" : "Private video"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="kids" className="text-right">
              For Kids
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="kids"
                checked={youtubeSettings.isForKids}
                onCheckedChange={(checked) => 
                  setYoutubeSettings({...youtubeSettings, isForKids: checked})
                }
              />
              <span className="text-sm text-muted-foreground">
                {youtubeSettings.isForKids ? "Content for kids" : "Not for kids"}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          {isUploading ? (
            <div className="w-full space-y-2">
              <Progress value={progress.progress} className="h-2 w-full" />
              <p className="text-sm text-center">{progress.message}</p>
            </div>
          ) : uploadComplete ? (
            <div className="flex flex-col items-center w-full gap-2">
              <div className="text-green-500 font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Upload Complete
              </div>
              <Button onClick={() => setUploadComplete(false)}>Close</Button>
            </div>
          ) : (
            <Button 
              onClick={handleYouTubeUpload}
              className="bg-red-500 hover:bg-red-600"
            >
              <Youtube className="w-4 h-4 mr-2" />
              Upload to YouTube
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
