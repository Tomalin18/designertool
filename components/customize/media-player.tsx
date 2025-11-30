"use client"

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, SkipBack, SkipForward, Heart, Repeat, Shuffle, Upload } from "lucide-react";

interface MediaPlayerProps {
  className?: string;
  trackTitle?: string;
  artist?: string;
  album?: string;
  albumArtUrl?: string;
  currentTime?: string;
  totalTime?: string;
  progress?: number; // 0-100
  isPlaying?: boolean;
  isLoved?: boolean;
  isShuffle?: boolean;
  isRepeat?: boolean;
  showShuffle?: boolean;
  showRepeat?: boolean;
  showHeart?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  glowColor1?: string;
  glowColor2?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientWidth?: number;
  gradientAnimated?: boolean;
  enableImageUpload?: boolean;
  onPlayPause?: (isPlaying: boolean) => void;
  onLove?: (isLoved: boolean) => void;
  onShuffle?: (isShuffle: boolean) => void;
  onRepeat?: (isRepeat: boolean) => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onImageUpload?: (imageUrl: string) => void;
  onTimeChange?: (currentTime: string, progress: number) => void;
}

// Helper functions for time conversion
const timeToSeconds = (time: string): number => {
  const parts = time.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return 0;
};

const secondsToTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const MediaPlayer = ({ 
  className,
  trackTitle = "Midnight City",
  artist = "M83",
  album = "Hurry Up, We're Dreaming",
  albumArtUrl: initialAlbumArtUrl = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
  currentTime: initialCurrentTime = "2:14",
  totalTime: initialTotalTime = "4:03",
  progress: initialProgress,
  isPlaying: initialIsPlaying = true,
  isLoved: initialIsLoved = false,
  isShuffle: initialIsShuffle = false,
  isRepeat: initialIsRepeat = false,
  showShuffle = true,
  showRepeat = true,
  showHeart = true,
  backgroundColor = "rgb(23 23 23 / 0.6)", // neutral-900/60
  borderColor = "rgba(255, 255, 255, 0.1)",
  borderRadius = 24, // rounded-3xl
  glowColor1 = "rgb(99 102 241 / 0.2)", // indigo-500/20
  glowColor2 = "rgb(168 85 247 / 0.2)", // purple-500/20
  gradientFrom,
  gradientTo,
  gradientWidth = 2,
  gradientAnimated = false,
  enableImageUpload = false,
  onPlayPause,
  onLove,
  onShuffle,
  onRepeat,
  onSkipBack,
  onSkipForward,
  onImageUpload,
  onTimeChange,
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  const [isLoved, setIsLoved] = useState(initialIsLoved);
  const [isShuffle, setIsShuffle] = useState(initialIsShuffle);
  const [isRepeat, setIsRepeat] = useState(initialIsRepeat);
  const [albumArtUrl, setAlbumArtUrl] = useState(initialAlbumArtUrl);
  const [currentTime, setCurrentTime] = useState(initialCurrentTime);
  const [totalTime, setTotalTime] = useState(initialTotalTime);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevIsShuffleRef = useRef(initialIsShuffle);
  const prevIsRepeatRef = useRef(initialIsRepeat);
  const prevIsPlayingRef = useRef(initialIsPlaying);
  const prevIsLovedRef = useRef(initialIsLoved);

  // Calculate progress from times
  const calculateProgressFromTimes = (currTime: string, totTime: string): number => {
    const currentSeconds = timeToSeconds(currTime);
    const totalSeconds = timeToSeconds(totTime);
    if (totalSeconds === 0) return 0;
    return (currentSeconds / totalSeconds) * 100;
  };

  // Calculate currentTime from progress
  const calculateTimeFromProgress = (prog: number, totTime: string): string => {
    const totalSeconds = timeToSeconds(totTime);
    const currentSeconds = (prog / 100) * totalSeconds;
    return secondsToTime(currentSeconds);
  };

  // Use progress if provided, otherwise calculate from times
  const [progress, setProgress] = useState(
    initialProgress !== undefined 
      ? initialProgress 
      : calculateProgressFromTimes(initialCurrentTime, initialTotalTime)
  );

  // Sync progress when times change (if progress is not controlled)
  useEffect(() => {
    if (initialProgress === undefined) {
      const newProgress = calculateProgressFromTimes(currentTime, totalTime);
      setProgress(newProgress);
      onTimeChange?.(currentTime, newProgress);
    }
  }, [currentTime, totalTime]);

  // Sync currentTime when progress changes (if progress is controlled)
  useEffect(() => {
    if (initialProgress !== undefined) {
      const newCurrentTime = calculateTimeFromProgress(initialProgress, totalTime);
      setCurrentTime(newCurrentTime);
      setProgress(initialProgress);
      onTimeChange?.(newCurrentTime, initialProgress);
    }
  }, [initialProgress, totalTime]);

  // Update local state when props change
  useEffect(() => {
    setCurrentTime(initialCurrentTime);
  }, [initialCurrentTime]);

  useEffect(() => {
    setTotalTime(initialTotalTime);
  }, [initialTotalTime]);

  useEffect(() => {
    if (initialProgress !== undefined) {
      setProgress(initialProgress);
    }
  }, [initialProgress]);

  // Update local state when props change (only if prop value actually changed)
  useEffect(() => {
    if (prevIsPlayingRef.current !== initialIsPlaying) {
      setIsPlaying(initialIsPlaying);
      prevIsPlayingRef.current = initialIsPlaying;
    }
  }, [initialIsPlaying]);

  useEffect(() => {
    if (prevIsLovedRef.current !== initialIsLoved) {
      setIsLoved(initialIsLoved);
      prevIsLovedRef.current = initialIsLoved;
    }
  }, [initialIsLoved]);

  useEffect(() => {
    if (prevIsShuffleRef.current !== initialIsShuffle) {
      setIsShuffle(initialIsShuffle);
      prevIsShuffleRef.current = initialIsShuffle;
    }
  }, [initialIsShuffle]);

  useEffect(() => {
    if (prevIsRepeatRef.current !== initialIsRepeat) {
      setIsRepeat(initialIsRepeat);
      prevIsRepeatRef.current = initialIsRepeat;
    }
  }, [initialIsRepeat]);

  const handlePlayPause = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    onPlayPause?.(newState);
  };

  const handleLove = () => {
    const newState = !isLoved;
    setIsLoved(newState);
    onLove?.(newState);
  };

  const handleShuffle = () => {
    const newState = !isShuffle;
    setIsShuffle(newState);
    onShuffle?.(newState);
  };

  const handleRepeat = () => {
    const newState = !isRepeat;
    setIsRepeat(newState);
    onRepeat?.(newState);
  };

  const handleSkipBack = () => {
    onSkipBack?.();
  };

  const handleSkipForward = () => {
    onSkipForward?.();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setAlbumArtUrl(imageUrl);
        onImageUpload?.(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (enableImageUpload) {
      fileInputRef.current?.click();
    }
  };

  // Convert hex to rgb if needed
  const hexToRgb = (hex: string) => {
    if (!hex || !hex.startsWith('#')) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r} ${g} ${b})`;
  };

  const bgColor = backgroundColor.startsWith('#') ? hexToRgb(backgroundColor) : backgroundColor;
  const borderCol = borderColor.startsWith('#') ? hexToRgb(borderColor) : borderColor;
  const glow1 = glowColor1.startsWith('#') ? hexToRgb(glowColor1) : glowColor1;
  const glow2 = glowColor2.startsWith('#') ? hexToRgb(glowColor2) : glowColor2;
  
  // Gradient colors
  const gradientFromColor = gradientFrom || 'var(--primary)';
  const gradientToColor = gradientTo || 'var(--accent)';
  const gradientInset = `-${gradientWidth}px`;

  return (
    <div 
      className={cn("relative group overflow-hidden border p-6 backdrop-blur-xl", className)}
      style={{
        backgroundColor: bgColor,
        borderColor: borderCol,
        borderRadius: `${borderRadius}px`,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {/* Gradient Border Effect */}
      {(gradientFrom || gradientTo) && (
        <div 
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-0"
          style={{
            inset: gradientInset,
            backgroundImage: gradientAnimated 
              ? `linear-gradient(90deg, ${gradientFromColor}, ${gradientToColor}, ${gradientFromColor})`
              : `linear-gradient(to right, ${gradientFromColor}, ${gradientToColor})`,
            backgroundSize: gradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: `${borderRadius + gradientWidth}px`,
            animation: gradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      {/* Background Glow */}
      <div 
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl pointer-events-none" 
        style={{ backgroundColor: glow1 }}
      />
      <div 
        className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl pointer-events-none" 
        style={{ backgroundColor: glow2 }}
      />

      {/* Album Art */}
      <div 
        className={cn(
          "relative mx-auto mb-6 aspect-square w-full overflow-hidden shadow-2xl shadow-black/50",
          enableImageUpload && "cursor-pointer group"
        )}
        style={{ borderRadius: `${Math.max(0, borderRadius - 8)}px` }}
        onClick={handleImageClick}
      >
        <img 
          src={albumArtUrl} 
          alt="Album Art" 
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10" />
        {enableImageUpload && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-white">
                <Upload className="h-8 w-8" />
                <span className="text-sm font-medium">上傳圖片</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Track Info */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{trackTitle}</h3>
          <p className="text-sm font-medium text-neutral-400">
            {artist}{album ? ` • ${album}` : ''}
          </p>
        </div>
        {showHeart && (
          <button 
            onClick={handleLove}
            className={cn("transition-colors hover:scale-110", isLoved ? "text-rose-500" : "text-neutral-500 hover:text-white")}
          >
            <Heart className={cn("h-6 w-6", isLoved && "fill-current")} />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
        <div 
          className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      <div className="mb-6 flex justify-between text-xs font-medium text-neutral-500">
        <span>{currentTime}</span>
        <span>{totalTime}</span>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-between px-2">
        {showShuffle ? (
          <button 
            onClick={handleShuffle}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all",
              isShuffle 
                ? "bg-white/20 text-white" 
                : "text-neutral-500 hover:text-white hover:bg-white/10"
            )}
          >
            <Shuffle size={18} className={isShuffle ? "text-white" : "text-current"} />
          </button>
        ) : (
          <div />
        )}
        
        <div className="flex items-center gap-6">
          <button 
            onClick={handleSkipBack}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button 
            onClick={handlePlayPause}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-white/20 transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1"/>}
          </button>
          <button 
            onClick={handleSkipForward}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        {showRepeat ? (
          <button 
            onClick={handleRepeat}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all",
              isRepeat 
                ? "bg-white/20 text-white" 
                : "text-neutral-500 hover:text-white hover:bg-white/10"
            )}
          >
            <Repeat size={18} className={isRepeat ? "text-white" : "text-current"} />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};










