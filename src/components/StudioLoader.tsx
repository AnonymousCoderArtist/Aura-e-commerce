import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Cpu, Compass } from 'lucide-react';

interface StudioLoaderProps {
  onComplete: () => void;
}

export default function StudioLoader({ onComplete }: StudioLoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progress counter animation
    const duration = 2.4; // seconds
    const intervalTime = 25; // ms
    const steps = (duration * 1000) / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        
        // GSAP transition to slide out the curtain
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        tl.to([logoRef.current, taglineRef.current, counterRef.current, statusRef.current], {
          y: -40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.in'
        })
        .to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // premium curtain shutter effect
          duration: 0.8,
          ease: 'power4.inOut'
        });
      }
    }, intervalTime);

    // Initial GSAP entry animations
    gsap.fromTo(logoRef.current, 
      { letterSpacing: '0.1em', opacity: 0, y: 30 },
      { letterSpacing: '0.3em', opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo(taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 0.6, y: 0, duration: 1, delay: 0.4, ease: 'power2.out' }
    );

    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  const statuses = [
    'POLISHING TITANIUM CHASIS...',
    'INTEGRATING MIYOTA 9015 FREQUENCY...',
    'CALIBRATING GEOLOGICAL STONE MONOLITHS...',
    'TUNING SONIC ACOUSTICAL HOUSING...',
    'REFRACTING OPTION GLASS SPHERES...',
    'LAUNCHING CURATORIAL ARCHITECTURE...'
  ];

  const currentStatusIndex = Math.min(
    Math.floor((progress / 100) * statuses.length), 
    statuses.length - 1
  );

  return (
    <div
      ref={containerRef}
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-between p-12 select-none"
    >
      {/* Decorative luxury hud matrix borders */}
      <div className="absolute inset-8 border border-white/[0.03] pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-white/20">
          <span>PROJECT / AURA NOIR DEVELOPMENT</span>
          <span>EST. TIME 2026</span>
        </div>
        <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-white/20">
          <span>COORDINATES [52.5200, 13.4050]</span>
          <span>CURATIVE PLATFORM</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-dashed border-white/[0.015] rounded-full animate-[spin_100s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/[0.01] rounded-full animate-[spin_50s_linear-reverse_infinite]" />
      </div>

      {/* Spacing dummy */}
      <div />

      {/* Centered Luxury Logo Element */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative mb-2">
          <Compass className="w-10 h-10 text-amber-500/40 animate-[spin_10s_linear_infinite] mx-auto" />
          <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full" />
        </div>
        <div ref={logoRef} className="flex flex-col items-center">
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-[0.25em] text-white">
            A U R A
          </h1>
          <span className="text-[10px] font-mono tracking-[0.55em] uppercase text-amber-500 font-bold mt-1.5">
            NOIR & ÉTHER STUDIOS
          </span>
        </div>
        <div ref={taglineRef} className="text-[11px] font-sans font-light tracking-[0.25em] uppercase text-neutral-400">
          Curating Micro-Mechanical Artifacts
        </div>
      </div>

      {/* Dynamic bottom counter & status display */}
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-4 z-10">
        <h2 
          ref={counterRef} 
          className="font-mono text-3xl sm:text-4xl text-white font-light tracking-tight selection:bg-transparent"
        >
          {progress}<span className="text-amber-500 text-xl font-medium">%</span>
        </h2>

        {/* Progress Bar with glowing outline */}
        <div className="w-full h-[2px] bg-white/[0.05] rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div 
          ref={statusRef} 
          className="text-[9px] font-mono tracking-widest text-amber-500 flex items-center justify-center space-x-2"
        >
          <Cpu className="w-3.5 h-3.5 animate-pulse" />
          <span>{statuses[currentStatusIndex]}</span>
        </div>
      </div>
    </div>
  );
}
