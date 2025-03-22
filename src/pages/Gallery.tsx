
import React from "react";
import GlassCard from "@/components/ui-elements/GlassCard";
import { SlideUpTransition, StaggeredChildren } from "@/components/animations/Transitions";
import { Image, Download, Video, Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Gallery = () => {
  const sampleVideos = [
    {
      id: 1,
      title: "Coastal Sunset",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=500&h=300&fit=crop",
      url: "https://file-examples.com/storage/fee788a10e64f06aae9f905/2017/04/file_example_MP4_480_1_5MG.mp4"
    },
    {
      id: 2,
      title: "Urban Timelapse",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&h=300&fit=crop",
      url: "https://file-examples.com/storage/fee788a10e64f06aae9f905/2017/04/file_example_MP4_480_1_5MG.mp4"
    }
  ];
  
  const sampleMusic = [
    {
      id: 3,
      title: "Ambient Piano",
      type: "music",
      thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&h=300&fit=crop",
      url: "https://file-examples.com/storage/fee788a10e64f06aae9f905/2017/11/file_example_MP3_700KB.mp3"
    },
    {
      id: 4,
      title: "Electronic Beats",
      type: "music",
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=300&fit=crop",
      url: "https://file-examples.com/storage/fee788a10e64f06aae9f905/2017/11/file_example_MP3_700KB.mp3"
    }
  ];
  
  const handleDownload = (item: any) => {
    toast.success(`Downloading ${item.title}`);
  };
  
  const handlePlay = (item: any) => {
    toast.success(`Playing ${item.title}`);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <SlideUpTransition>
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Image className="w-4 h-4 mr-2" />
            Gallery
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Your AI Creations
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            View, play, and download your generated music and videos.
          </p>
        </div>
      </SlideUpTransition>
      
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Videos
          </h2>
          
          <StaggeredChildren containerClassName="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleVideos.map((video) => (
              <motion.div key={video.id}>
                <GlassCard interactive elevation="high">
                  <div className="space-y-3">
                    <div className="aspect-video rounded-lg overflow-hidden bg-black/5 relative group">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="default"
                          size="icon"
                          className="rounded-full"
                          onClick={() => handlePlay(video)}
                        >
                          <Play className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{video.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => handleDownload(video)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </StaggeredChildren>
        </section>
        
        <section>
          <h2 className="text-2xl font-medium mb-4 flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            Music
          </h2>
          
          <StaggeredChildren containerClassName="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleMusic.map((item) => (
              <motion.div key={item.id}>
                <GlassCard interactive elevation="high">
                  <div className="space-y-3">
                    <div className="aspect-video rounded-lg overflow-hidden bg-black/5 relative group">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="default"
                          size="icon"
                          className="rounded-full"
                          onClick={() => handlePlay(item)}
                        >
                          <Play className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => handleDownload(item)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <audio className="w-full" controls src={item.url}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </StaggeredChildren>
        </section>
      </div>
    </div>
  );
};

export default Gallery;
