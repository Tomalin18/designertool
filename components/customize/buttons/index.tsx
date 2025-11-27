"use client"

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    ArrowRight, Check, Copy, Download, Loader2, Share2, Twitter, Facebook, Linkedin,
    Zap, Play, ArrowUp, ArrowDown, ArrowLeft, Printer, Save, Trash, Heart, Bell,
    Upload, Plus, X, MousePointerClick, CornerDownRight, Terminal, AlertCircle,
    Settings, Send, RefreshCw, Lock
} from "lucide-react";

// 1. Magnetic Button
export const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * 0.3;
        const y = (e.clientY - (top + height / 2)) * 0.3;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            className={cn(
                "rounded-full bg-white px-8 py-3 font-medium text-black transition-transform duration-100 ease-out hover:bg-neutral-200",
                className
            )}
        >
            {children}
        </button>
    );
};

// 2. Glitch Button
export const GlitchButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="group relative px-8 py-3 font-bold text-white transition-colors hover:bg-transparent">
            <div className="absolute inset-0 bg-cyan-500 translate-x-1 translate-y-1 opacity-0 transition-opacity group-hover:opacity-100 mix-blend-screen" />
            <div className="absolute inset-0 bg-red-500 -translate-x-1 -translate-y-1 opacity-0 transition-opacity group-hover:opacity-100 mix-blend-screen" />
            <div className="relative border border-white bg-black px-8 py-3 uppercase tracking-wider z-10">
                {children}
            </div>
        </button>
    );
};

// 3. Liquid Hover Button
export const LiquidHoverButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="group relative overflow-hidden rounded-lg border border-indigo-500 bg-transparent px-8 py-3 font-medium text-indigo-500 transition-colors hover:text-white">
            <div className="absolute inset-0 -translate-x-full bg-indigo-500 transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

// 4. Neumorphic Button
export const NeumorphicButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="rounded-xl bg-[#e0e5ec] px-8 py-3 font-bold text-[#4d5b7c] shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff] transition-all hover:shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] active:scale-95">
            {children}
        </button>
    );
};

// 5. Gradient Border Button
export const GradientBorderButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="group relative rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-[2px] transition-transform active:scale-95">
            <div className="relative rounded-[6px] bg-black px-8 py-3 transition-colors group-hover:bg-transparent">
                <span className="font-medium text-white">{children}</span>
            </div>
        </button>
    );
};

// 6. Shimmer Button
export const ShimmerButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 font-medium text-white transition-colors hover:bg-neutral-700">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {children}
        </button>
    );
};

// 7. Pulse Glow Button
export const PulseGlowButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="relative rounded-full bg-indigo-600 px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-500">
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-indigo-600 opacity-75" />
            {children}
        </button>
    );
};

// 8. Slide Arrow Button
export const SlideArrowButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="group flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-all hover:gap-4">
            {children}
            <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
        </button>
    );
};

// 9. 3D Press Button
export const ThreeDPressButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="rounded-lg border-b-4 border-blue-700 bg-blue-500 px-8 py-3 font-bold text-white transition-all active:border-b-0 active:translate-y-1">
            {children}
        </button>
    );
};

// 10. Ripple Button
export const RippleButton = ({ children }: { children: React.ReactNode }) => {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);

    useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
            setIsRippling(true);
            setTimeout(() => setIsRippling(false), 500);
        } else {
            setIsRippling(false);
        }
    }, [coords]);

    useEffect(() => {
        if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);

    return (
        <button
            className="relative overflow-hidden rounded-lg bg-emerald-500 px-8 py-3 font-medium text-white shadow hover:bg-emerald-600"
            onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
        >
            {isRippling && (
                <span
                    className="absolute animate-[ripple_600ms_linear] rounded-full bg-white/30"
                    style={{ left: coords.x, top: coords.y, width: 20, height: 20, transform: 'translate(-50%, -50%)' }}
                />
            )}
            <span className="relative z-10">{children}</span>
            <style>{`
                @keyframes ripple {
                    0% { width: 0; height: 0; opacity: 0.5; }
                    100% { width: 500px; height: 500px; opacity: 0; }
                }
            `}</style>
        </button>
    );
};

// 11. Ghost Hover Button
export const GhostHoverButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="rounded-lg border border-white/20 bg-transparent px-8 py-3 font-medium text-white transition-all hover:bg-white hover:text-black hover:scale-105">
            {children}
        </button>
    );
};

// 12. Status Loading Button
export const StatusLoadingButton = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleClick = () => {
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
        }, 1500);
    };

    return (
        <button
            onClick={handleClick}
            disabled={status !== 'idle'}
            className={cn(
                "flex min-w-[140px] items-center justify-center rounded-lg px-6 py-3 font-medium text-white transition-all",
                status === 'idle' && "bg-indigo-600 hover:bg-indigo-500",
                status === 'loading' && "bg-indigo-400 cursor-wait",
                status === 'success' && "bg-green-500"
            )}
        >
            {status === 'idle' && "Submit"}
            {status === 'loading' && <Loader2 className="animate-spin" />}
            {status === 'success' && <Check />}
        </button>
    );
};

// 13. Spotlight Button
export const SpotlightButton = ({ children }: { children: React.ReactNode }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className="relative overflow-hidden rounded-lg bg-neutral-900 px-8 py-3 text-neutral-200"
        >
            <span
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 40%)`
                }}
            />
            <div className="relative z-10 border border-white/10 rounded-[7px] bg-neutral-900/50 px-8 py-3">
                {children}
            </div>
        </button>
    );
};

// 14. Pixel Art Button
export const PixelArtButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="relative px-6 py-3 font-mono font-bold uppercase text-black transition-transform active:translate-y-1 active:shadow-none">
            <div className="absolute inset-0 bg-neutral-300 translate-y-1 translate-x-1" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />
            <div className="absolute inset-0 border-2 border-black bg-yellow-400" />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

// 15. Glassmorphism Button
export const GlassmorphismButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="rounded-lg border border-white/20 bg-white/10 px-8 py-3 font-medium text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105">
            {children}
        </button>
    );
};

// 16. Neon Flicker Button
export const NeonFlickerButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="group rounded-lg border border-cyan-400 bg-transparent px-8 py-3 font-medium text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]">
            <span className="group-hover:animate-pulse">{children}</span>
        </button>
    );
};

// 17. Elastic Button
export const ElasticButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="rounded-2xl bg-orange-500 px-8 py-3 font-bold text-white transition-transform hover:scale-110 active:scale-90 duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275)">
            {children}
        </button>
    );
};

// 18. Copy Clipboard Button
export const CopyClipboardButton = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <button
            onClick={handleCopy}
            className={cn(
                "flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all",
                copied
                    ? "border-green-500 bg-green-500/10 text-green-500"
                    : "border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            )}
        >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy Code"}
        </button>
    );
};

// 19. Social Share Button
export const SocialShareButton = () => {
    return (
        <div className="group flex items-center overflow-hidden rounded-full bg-blue-600 text-white transition-all hover:w-48 w-12 h-12">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                <Share2 size={20} />
            </div>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-4">
                <button className="hover:text-blue-200"><Twitter size={16} /></button>
                <button className="hover:text-blue-200"><Facebook size={16} /></button>
                <button className="hover:text-blue-200"><Linkedin size={16} /></button>
            </div>
        </div>
    );
};

// 20. Download Progress Button
export const DownloadProgressButton = () => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<'idle' | 'downloading' | 'complete'>('idle');

    const startDownload = () => {
        if (status !== 'idle') return;
        setStatus('downloading');
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 10;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setStatus('complete');
                setTimeout(() => {
                    setStatus('idle');
                    setProgress(0);
                }, 2000);
            }
            setProgress(p);
        }, 100);
    };

    return (
        <button
            onClick={startDownload}
            className="relative h-12 w-40 overflow-hidden rounded-lg bg-neutral-800 font-medium text-white"
        >
            <div
                className="absolute inset-0 bg-green-600 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
            />
            <div className="relative z-10 flex items-center justify-center gap-2">
                {status === 'idle' && <><Download size={18} /> Download</>}
                {status === 'downloading' && `${Math.round(progress)}%`}
                {status === 'complete' && <><Check size={18} /> Done</>}
            </div>
        </button>
    );
};

// --- NEW BUTTONS (21-70) ---

// 21. Swipe Right Button
export const SwipeRightButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all">
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 h-full w-full translate-x-[-100%] bg-blue-600 transition-transform duration-300 group-hover:translate-x-0" />
    </button>
);

// 22. Swipe Up Button
export const SwipeUpButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all">
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 h-full w-full translate-y-[100%] bg-purple-600 transition-transform duration-300 group-hover:translate-y-0" />
    </button>
);

// 23. Scale Up Button
export const ScaleUpButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all">
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-pink-600 transition-transform duration-300 group-hover:scale-100" />
    </button>
);

// 24. Draw Border Button
export const DrawBorderButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative px-8 py-3 text-blue-400 transition-colors hover:text-blue-300">
        {children}
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
        <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-blue-400 transition-all duration-300 group-hover:h-full" />
        <span className="absolute top-0 right-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
        <span className="absolute top-0 right-0 h-0 w-[2px] bg-blue-400 transition-all duration-300 group-hover:h-full" />
    </button>
);

// 25. Dotted Border Button
export const DottedBorderButton = ({ children }: { children: React.ReactNode }) => (
    <button className="rounded-lg border-2 border-dashed border-neutral-600 px-8 py-3 text-neutral-400 transition-all hover:border-white hover:text-white hover:tracking-wider">
        {children}
    </button>
);

// 26. Gradient Ring Button
export const GradientRingButton = ({ children }: { children: React.ReactNode }) => (
    <button className="relative rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] transition-transform hover:scale-105">
        <div className="rounded-full bg-black px-8 py-3 text-white transition-colors hover:bg-opacity-90">
            {children}
        </div>
    </button>
);

// 27. Cyber Button
export const CyberButton = ({ children }: { children: React.ReactNode }) => (
    <button className="relative border border-yellow-400 bg-yellow-400/10 px-8 py-3 font-mono text-yellow-400 clip-path-polygon-[0_0,100%_0,100%_70%,85%_100%,0_100%] hover:bg-yellow-400 hover:text-black">
        {children}
        <div className="absolute bottom-0 right-0 h-2 w-2 bg-yellow-400" />
    </button>
);

// 28. Retro 95 Button
export const Retro95Button = ({ children }: { children: React.ReactNode }) => (
    <button className="border-t-2 border-l-2 border-b-4 border-r-4 border-t-white border-l-white border-b-neutral-800 border-r-neutral-800 bg-neutral-300 px-6 py-2 font-sans font-bold text-black active:border-t-neutral-800 active:border-l-neutral-800 active:border-b-white active:border-r-white">
        {children}
    </button>
);

// 29. Clay Button
export const ClayButton = ({ children }: { children: React.ReactNode }) => (
    <button className="rounded-2xl bg-[#f0f0f3] px-8 py-3 font-bold text-neutral-600 shadow-[10px_10px_20px_#d1d1d4,-10px_-10px_20px_#ffffff] transition-transform hover:scale-95 active:shadow-[inset_10px_10px_20px_#d1d1d4,inset_-10px_-10px_20px_#ffffff]">
        {children}
    </button>
);

// 30. Skeuo Button
export const SkeuoButton = ({ children }: { children: React.ReactNode }) => (
    <button className="rounded-lg border-b-4 border-neutral-700 bg-gradient-to-b from-neutral-500 to-neutral-600 px-8 py-3 font-bold text-white shadow-lg active:mt-1 active:border-b-0">
        {children}
    </button>
);

// 31. Shake Error Button
export const ShakeErrorButton = () => {
    const [shaking, setShaking] = useState(false);
    return (
        <button
            onClick={() => { setShaking(true); setTimeout(() => setShaking(false), 500); }}
            className={cn("rounded-lg bg-red-600 px-8 py-3 font-medium text-white hover:bg-red-700", shaking && "animate-[shake_0.5s_ease-in-out]")}
        >
            <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }`}</style>
            Error Shake
        </button>
    );
};

// 32. Confetti Button (CSS Burst)
export const ConfettiButton = () => {
    const [burst, setBurst] = useState(false);
    return (
        <button
            onClick={() => { setBurst(true); setTimeout(() => setBurst(false), 500); }}
            className="relative rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-8 py-3 font-bold text-white"
        >
            Celebration
            {burst && (
                <>
                    <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-10 rounded-full bg-yellow-400 animate-[ping_0.5s_ease-out]" />
                    <div className="absolute top-0 left-1/3 h-2 w-2 -translate-y-8 rounded-full bg-red-400 animate-[ping_0.6s_ease-out]" />
                    <div className="absolute top-0 right-1/3 h-2 w-2 -translate-y-8 rounded-full bg-green-400 animate-[ping_0.4s_ease-out]" />
                </>
            )}
        </button>
    );
};

// 33. Hold to Confirm
export const HoldButton = () => {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<any>(null);

    const start = () => {
        intervalRef.current = setInterval(() => {
            setProgress(p => p >= 100 ? 100 : p + 2);
        }, 20);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        setProgress(0);
    };

    return (
        <button
            onMouseDown={start}
            onMouseUp={stop}
            onMouseLeave={stop}
            className="relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 font-medium text-white select-none"
        >
            <div className="absolute inset-0 bg-green-600 transition-all duration-75 ease-linear" style={{ width: `${progress}%` }} />
            <span className="relative z-10">{progress >= 100 ? "Confirmed!" : "Hold to Confirm"}</span>
        </button>
    );
};

// 34. Delete Confirm
export const DeleteButton = () => {
    const [step, setStep] = useState(0);
    return (
        <button
            onClick={() => setStep(step === 0 ? 1 : 0)}
            className={cn(
                "flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors",
                step === 0 ? "bg-neutral-800 text-white hover:bg-neutral-700" : "bg-red-600 text-white hover:bg-red-700"
            )}
        >
            <Trash size={18} />
            {step === 0 ? "Delete" : "Are you sure?"}
        </button>
    );
};

// 35. Like Heart Button
export const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    return (
        <button
            onClick={() => setLiked(!liked)}
            className={cn(
                "flex items-center gap-2 rounded-full border px-6 py-2 transition-all",
                liked ? "border-pink-500 bg-pink-50 text-pink-500" : "border-neutral-700 bg-transparent text-neutral-400 hover:border-neutral-500"
            )}
        >
            <Heart size={18} className={cn("transition-all", liked && "fill-current scale-110")} />
            {liked ? "Liked" : "Like"}
        </button>
    );
};

// 36. Skew Button
export const SkewButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group -skew-x-12 border border-white px-8 py-3 text-white transition-colors hover:bg-white hover:text-black">
        <div className="skew-x-12">{children}</div>
    </button>
);

// 37. Blob Button
export const BlobButton = ({ children }: { children: React.ReactNode }) => (
    <button className="rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-indigo-500 px-8 py-4 font-bold text-white transition-all hover:rounded-[70%_30%_30%_70%_/_70%_70%_30%_30%] hover:bg-indigo-600">
        {children}
    </button>
);

// 38. Underline Button
export const UnderlineButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative px-4 py-2 text-white">
        {children}
        <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
    </button>
);

// 39. Bracket Button
export const BracketButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative px-6 py-2 text-white">
        <span className="absolute left-0 top-0 h-full w-2 border-l-2 border-white transition-all group-hover:h-full group-hover:border-l-4 opacity-0 group-hover:opacity-100" />
        <span className="absolute right-0 top-0 h-full w-2 border-r-2 border-white transition-all group-hover:h-full group-hover:border-r-4 opacity-0 group-hover:opacity-100" />
        [ {children} ]
    </button>
);

// 40. Curtain Button
export const CurtainButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative overflow-hidden bg-neutral-800 px-8 py-3 text-white">
        <div className="absolute inset-0 z-10 flex items-center justify-center font-bold transition-transform duration-300 group-hover:-translate-y-full">
            {children}
        </div>
        <div className="absolute inset-0 z-10 flex translate-y-full items-center justify-center font-bold text-black transition-transform duration-300 group-hover:translate-y-0 bg-white">
            {children}
        </div>
    </button>
);

// 41. Slice Button
export const SliceButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative px-8 py-3 font-bold text-white">
        <span className="absolute inset-0 bg-blue-600 transition-transform duration-300 group-hover:skew-x-12" />
        <span className="relative">{children}</span>
    </button>
);

// 42. Wet Paint Button
export const WetPaintButton = ({ children }: { children: React.ReactNode }) => (
    <button className="rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_6px_rgba(0,0,0,0.5)] hover:translate-y-[-2px]">
        {children}
    </button>
);

// 43. Particle Button (Simplified visual)
export const ParticleButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative rounded-full border border-white/20 bg-black px-8 py-3 text-white">
        <span className="absolute -top-1 left-1/4 h-1 w-1 rounded-full bg-white opacity-0 transition-all duration-500 group-hover:top-[-10px] group-hover:opacity-100" />
        <span className="absolute -bottom-1 right-1/4 h-1 w-1 rounded-full bg-white opacity-0 transition-all duration-500 group-hover:bottom-[-10px] group-hover:opacity-100" />
        {children}
    </button>
);

// 44. Isometric Button
export const IsometricButton = ({ children }: { children: React.ReactNode }) => (
    <button className="transform rotate-[-5deg] skew-x-[-5deg] bg-neutral-200 border border-neutral-300 px-8 py-3 text-neutral-800 shadow-[5px_5px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.2)] transition-all">
        {children}
    </button>
);

// 45. Paper Fold Button
export const PaperFoldButton = ({ children }: { children: React.ReactNode }) => (
    <button className="relative bg-white px-8 py-3 text-black shadow-md transition-transform hover:-rotate-2 hover:scale-105">
        <div className="absolute top-0 right-0 h-4 w-4 bg-neutral-300" style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%)" }} />
        {children}
    </button>
);

// 46. Text Fill Button
export const TextFillButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative border border-white px-8 py-3 font-bold text-transparent bg-clip-text bg-white transition-colors hover:text-black">
        <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10" />
        {children}
    </button>
);

// 47. Icon Slide Button
export const IconSlideButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group flex items-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-6 py-3 text-white">
        <span className="-translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <ArrowRight size={18} />
        </span>
        <span className="-translate-x-2 transition-all duration-300 group-hover:translate-x-0">{children}</span>
    </button>
);

// 48. Multi Layer Button
export const MultiLayerButton = ({ children }: { children: React.ReactNode }) => (
    <div className="relative group cursor-pointer">
        <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-lg bg-pink-500 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-blue-500 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
        <button className="relative rounded-lg bg-white px-8 py-3 font-bold text-black border-2 border-black">
            {children}
        </button>
    </div>
);

// 49. Upload Button
export const UploadButton = () => (
    <button className="group flex items-center gap-2 rounded-lg bg-neutral-800 px-6 py-3 text-white transition-all hover:bg-neutral-700">
        <Upload size={18} className="transition-transform duration-300 group-hover:-translate-y-1" />
        Upload
    </button>
);

// 50. Toggle Switch Button
export const ToggleSwitchButton = () => {
    const [on, setOn] = useState(false);
    return (
        <button
            onClick={() => setOn(!on)}
            className={cn("relative h-8 w-14 rounded-full transition-colors", on ? "bg-green-500" : "bg-neutral-600")}
        >
            <div className={cn("absolute top-1 h-6 w-6 rounded-full bg-white transition-all", on ? "left-7" : "left-1")} />
        </button>
    );
};

// 51. Swipe Left Button
export const SwipeLeftButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all">
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 h-full w-full translate-x-[100%] bg-red-600 transition-transform duration-300 group-hover:translate-x-0" />
    </button>
);

// 52. Swipe Down Button
export const SwipeDownButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all">
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 h-full w-full -translate-y-[100%] bg-orange-600 transition-transform duration-300 group-hover:translate-y-0" />
    </button>
);

// 53. Double Border Button
export const DoubleBorderButton = ({ children }: { children: React.ReactNode }) => (
    <button className="rounded-lg border-4 border-double border-white px-8 py-2 font-bold text-white hover:bg-white hover:text-black transition-colors">
        {children}
    </button>
);

// 54. Spinning Border Button
export const SpinningBorderButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative overflow-hidden rounded-lg bg-neutral-900 px-8 py-3 text-white">
        <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ffffff_50%,#000000_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative block rounded bg-neutral-900 px-4 py-1 z-10">{children}</span>
    </button>
);

// 55. Letter Spacing Button
export const LetterSpacingButton = ({ children }: { children: React.ReactNode }) => (
    <button className="rounded-lg border border-neutral-500 px-8 py-3 text-neutral-300 transition-all hover:tracking-[0.5em] hover:text-white hover:border-white">
        {children}
    </button>
);

// 56. Blur Reveal Button
export const BlurRevealButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative px-8 py-3 text-white">
        <span className="absolute inset-0 blur-md bg-white/20 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
        <span className="relative">{children}</span>
    </button>
);

// 57. Vaporwave Button
export const VaporwaveButton = ({ children }: { children: React.ReactNode }) => (
    <button className="bg-gradient-to-r from-pink-500 to-cyan-500 px-8 py-3 font-bold text-white italic shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] transition-all">
        {children}
    </button>
);

// 58. Save Button
export const SaveButton = () => (
    <button className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white shadow-md hover:bg-blue-700 active:bg-blue-800">
        <Save size={16} /> Save
    </button>
);

// 59. Print Button
export const PrintButton = () => (
    <button className="flex items-center gap-2 rounded-md border border-neutral-600 bg-transparent px-6 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white">
        <Printer size={16} /> Print
    </button>
);

// 60. Notification Button
export const NotificationButton = () => (
    <button className="relative rounded-full bg-neutral-800 p-3 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors">
        <Bell size={20} />
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-neutral-900" />
    </button>
);

// 61. Circle to Square Button
export const CircleToSquareButton = () => (
    <button className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white text-black transition-all duration-300 hover:w-32 hover:rounded-lg">
        <Plus size={24} className="shrink-0" />
        <span className="ml-2 w-0 overflow-hidden opacity-0 whitespace-nowrap transition-all duration-300 hover:w-auto hover:opacity-100">Add New</span>
    </button>
);

// 62. Morph FAB Button
export const MorphFabButton = () => (
    <button className="group flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all hover:rotate-90 hover:bg-red-500">
        <Plus size={24} className="transition-transform group-hover:rotate-45" />
    </button>
);

// 63. Shiny Reflection Button
export const ShinyReflectionButton = ({ children }: { children: React.ReactNode }) => (
    <button className="relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white border border-neutral-700">
        <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        <span className="relative">{children}</span>
    </button>
);

// 64. Dot Hover Button
export const DotHoverButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group relative px-8 py-3 text-white transition-all hover:text-indigo-400">
        <span className="absolute left-2 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-indigo-400 opacity-0 transition-all group-hover:left-4 group-hover:opacity-100" />
        {children}
    </button>
);

// 65. Text Marquee Button
export const TextMarqueeButton = () => (
    <button className="group relative w-32 overflow-hidden rounded-full border border-white/20 py-2 text-white">
        <div className="flex w-full justify-center transition-transform duration-300 group-hover:-translate-y-[150%]">
            Start
        </div>
        <div className="absolute inset-0 flex items-center justify-center translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">
            Let's Go!
        </div>
    </button>
);

// 66. Scramble Text Button (Simulated)
export const ScrambleTextButton = ({ children }: { children: React.ReactNode }) => (
    <button className="group font-mono px-8 py-3 text-green-500 border border-green-500/50 hover:bg-green-500/10">
        <span className="group-hover:hidden">{children}</span>
        <span className="hidden group-hover:inline">#{children}*</span>
    </button>
);

// 67. Typewriter Button
export const TypewriterButton = () => (
    <button className="group flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-neutral-300 border border-neutral-800 hover:border-neutral-600">
        <Terminal size={16} />
        <span className="border-r-2 border-neutral-500 pr-1 animate-pulse">Execute</span>
    </button>
);

// 68. Liquid Blob Button (SVG Filter needed, simplified here)
export const LiquidBlobButton = ({ children }: { children: React.ReactNode }) => (
    <button className="relative rounded-lg bg-indigo-500 px-8 py-3 text-white transition-transform hover:scale-110">
        <div className="absolute inset-0 -z-10 rounded-lg bg-indigo-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
        {children}
    </button>
);

// 69. CyberPunk Glitch 2
export const CyberPunkGlitch2Button = ({ children }: { children: React.ReactNode }) => (
    <button className="relative border-2 border-yellow-300 bg-black px-6 py-2 font-bold uppercase text-yellow-300 hover:bg-yellow-300 hover:text-black transition-colors">
        <span className="absolute -top-1 -left-1 block h-2 w-2 bg-yellow-300" />
        <span className="absolute -bottom-1 -right-1 block h-2 w-2 bg-yellow-300" />
        {children}
    </button>
);

// 70. Rounded Corner Morph
export const RoundedCornerMorphButton = ({ children }: { children: React.ReactNode }) => (
    <button className="rounded-sm bg-neutral-200 px-8 py-3 text-black transition-all duration-500 hover:rounded-full hover:bg-neutral-300">
        {children}
    </button>
);

// Export all components by name for the component library
export const buttonComponentsByName: Record<string, React.ComponentType<any>> = {
    MagneticButton,
    GlitchButton,
    LiquidHoverButton,
    NeumorphicButton,
    GradientBorderButton,
    ShimmerButton,
    PulseGlowButton,
    SlideArrowButton,
    ThreeDPressButton,
    RippleButton,
    GhostHoverButton,
    StatusLoadingButton,
    SpotlightButton,
    PixelArtButton,
    GlassmorphismButton,
    NeonFlickerButton,
    ElasticButton,
    CopyClipboardButton,
    SocialShareButton,
    DownloadProgressButton,
    SwipeRightButton,
    SwipeUpButton,
    ScaleUpButton,
    DrawBorderButton,
    DottedBorderButton,
    GradientRingButton,
    CyberButton,
    Retro95Button,
    ClayButton,
    SkeuoButton,
    ShakeErrorButton,
    ConfettiButton,
    HoldButton,
    DeleteButton,
    LikeButton,
    SkewButton,
    BlobButton,
    UnderlineButton,
    BracketButton,
    CurtainButton,
    SliceButton,
    WetPaintButton,
    ParticleButton,
    IsometricButton,
    PaperFoldButton,
    TextFillButton,
    IconSlideButton,
    MultiLayerButton,
    UploadButton,
    ToggleSwitchButton,
    SwipeLeftButton,
    SwipeDownButton,
    DoubleBorderButton,
    SpinningBorderButton,
    LetterSpacingButton,
    BlurRevealButton,
    VaporwaveButton,
    SaveButton,
    PrintButton,
    NotificationButton,
    CircleToSquareButton,
    MorphFabButton,
    ShinyReflectionButton,
    DotHoverButton,
    TextMarqueeButton,
    ScrambleTextButton,
    TypewriterButton,
    LiquidBlobButton,
    CyberPunkGlitch2Button,
    RoundedCornerMorphButton,
};
