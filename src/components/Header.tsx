
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Music, Video, Image } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navigationItems = [
    { name: "Music", path: "/music", icon: <Music className="w-4 h-4" /> },
    { name: "Video", path: "/video", icon: <Video className="w-4 h-4" /> },
    { name: "Gallery", path: "/gallery", icon: <Image className="w-4 h-4" /> },
  ];
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent"
          />
          <span className="text-xl font-medium">MelodyMage</span>
        </Link>
        
        <nav>
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {item.icon}
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
