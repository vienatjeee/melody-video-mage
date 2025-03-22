
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui-elements/GlassCard";
import { Music, Video, Image, ChevronRight, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { SlideUpTransition, StaggeredChildren } from "@/components/animations/Transitions";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-10">
      <div className="max-w-5xl mx-auto w-full px-4 space-y-16">
        <section className="text-center space-y-6">
          <SlideUpTransition>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Create stunning content with AI
            </div>
          </SlideUpTransition>
          
          <SlideUpTransition delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
              Transform your ideas into <br />
              <span className="text-primary">music and videos</span>
            </h1>
          </SlideUpTransition>
          
          <SlideUpTransition delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional quality music tracks and videos in seconds using 
              the power of artificial intelligence. No technical skills required.
            </p>
          </SlideUpTransition>
          
          <SlideUpTransition delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/music">
                <Button size="lg" className="rounded-full gap-2 px-6">
                  <Music className="w-4 h-4" />
                  Create Music
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/video">
                <Button size="lg" variant="outline" className="rounded-full gap-2 px-6">
                  <Video className="w-4 h-4" />
                  Create Video
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </SlideUpTransition>
        </section>
        
        <section className="pt-10">
          <StaggeredChildren containerClassName="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div>
              <GlassCard className="h-full" interactive>
                <div className="flex flex-col items-center text-center space-y-3 p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Music className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium">AI Music Creation</h3>
                  <p className="text-muted-foreground">
                    Generate custom music tracks based on your descriptions, mood, and duration preferences.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.div>
              <GlassCard className="h-full" interactive>
                <div className="flex flex-col items-center text-center space-y-3 p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Video className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium">AI Video Generation</h3>
                  <p className="text-muted-foreground">
                    Create stunning videos from text descriptions. Choose your style, aspect ratio and length.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.div>
              <GlassCard className="h-full" interactive>
                <div className="flex flex-col items-center text-center space-y-3 p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium">Fast Processing</h3>
                  <p className="text-muted-foreground">
                    Get your content in seconds. Save, download and share your creations instantly.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </StaggeredChildren>
        </section>
        
        <section className="pt-10">
          <GlassCard>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4">
              <div className="space-y-4 max-w-md">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Premium Quality
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Powered by advanced AI technology
                </h2>
                <p className="text-muted-foreground">
                  Our application leverages cutting-edge AI models to generate high-quality music and videos that match your creative vision.
                </p>
                <div className="pt-2">
                  <Link to="/gallery">
                    <Button variant="outline" className="rounded-full gap-2">
                      <Image className="w-4 h-4" />
                      View Gallery
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-lg">
                <motion.div 
                  className="w-full h-full bg-gradient-to-br from-primary/60 to-accent/60"
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    repeatType: "reverse"
                  }}
                >
                  <div className="w-full h-full backdrop-blur-sm flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Video className="w-8 h-8 text-primary" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
};

export default Index;
