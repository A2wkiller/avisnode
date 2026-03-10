import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Zap, 
  Lock, 
  ToggleRight, 
  MousePointer2, 
  ChevronRight,
  Shield,
  Globe
} from "lucide-react";
import { Link } from "react-router";
import { assets } from "../../assets";

// Floating element component for 3D-like icons
const FloatingElement = ({ 
  children, 
  className, 
  delay = 0, 
  duration = 3,
  yOffset = 20,
  rotate = 0,
  hoverScale = 1.1
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
  duration?: number;
  yOffset?: number;
  rotate?: number;
  hoverScale?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 0, rotate }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -yOffset, 0],
      rotate: [rotate, rotate + 2, rotate]
    }}
    whileHover={{ 
      scale: hoverScale, 
      z: 50,
      transition: { duration: 0.2 }
    }}
    transition={{
      opacity: { duration: 0.8, delay },
      scale: { duration: 0.8, delay },
      y: {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      },
      rotate: {
        duration: duration * 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }
    }}
    className={`absolute z-20 cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

export default function PaywayHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-[95vh] w-full flex flex-col items-center justify-center bg-background text-foreground overflow-hidden px-4 py-20 transition-colors duration-800">
      {/* Noise Texture Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url("/assets/noise.svg")` }} 
      />
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.05),transparent_70%)]" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 max-w-5xl text-center flex flex-col items-center"
      >
        {/* Main Title Section */}
        <div className="relative mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] font-black text-foreground leading-[0.82] tracking-[-0.04em] mb-4"
          >
            Game Hosting <br />
            <span className="block mt-2">that feel</span>
            <span className="text-teal-500 block mt-2 italic font-serif">effortless</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-md mx-auto text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mt-8 px-4"
          >
            Designed for modern gaming experiences that feel seamless from the first click to final confirmation.
          </motion.p>
        </div>

        {/* CTA Button with Micro-interactions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6"
        >
          <Link 
            to="/games"
            className="group relative inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-4 rounded-[1.5rem] text-lg font-bold transition-all hover:opacity-90 hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] shadow-xl shadow-primary/20"
          >
            <span>Get started</span>
            <div className="bg-teal-500 p-1 rounded-lg group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
            
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 rounded-[1.5rem] border border-white/10 pointer-events-none" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Elements - Inspired by Payway */}
      
      {/* Left Side Elements */}
      <FloatingElement 
        className="top-[15%] left-[5%] lg:left-[12%]" 
        delay={0.2} 
        yOffset={15} 
        rotate={-15}
      >
        <div className="w-28 h-40 sm:w-32 sm:h-44 bg-[#FFD600] rounded-2xl shadow-[0_20px_40px_rgba(255,214,0,0.3)] p-5 flex flex-col justify-between border border-yellow-200 group transition-all">
          <div className="w-10 h-10 rounded-full bg-white/30" />
          <div className="font-black text-yellow-900 text-xl leading-none">Mine<br/>craft</div>
        </div>
      </FloatingElement>

      <FloatingElement 
        className="top-[38%] left-[2%] lg:left-[8%]" 
        delay={0.5} 
        yOffset={25} 
        rotate={-5}
      >
        <div className="w-28 h-40 sm:w-32 sm:h-44 bg-secondary rounded-2xl shadow-2xl p-5 flex flex-col justify-between border border-border">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">vps</div>
          </div>
          <div className="font-black text-foreground text-xl leading-none">Rust</div>
        </div>
      </FloatingElement>

      <FloatingElement 
        className="top-[60%] left-[8%] lg:left-[15%]" 
        delay={0.8} 
        yOffset={20} 
        rotate={12}
      >
        <div className="w-28 h-40 sm:w-32 sm:h-44 bg-foreground rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-5 flex flex-col justify-between border border-border">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-background/30" />
            <div className="text-[10px] font-bold text-background/50 uppercase tracking-widest">pro</div>
          </div>
          <div className="font-black text-background text-xl leading-none">ARK</div>
        </div>
      </FloatingElement>

      <FloatingElement 
        className="top-[55%] left-[22%] lg:left-[28%] hidden sm:block" 
        delay={1.1} 
        yOffset={10} 
        rotate={-22}
      >
        <div className="w-44 h-28 bg-[#00D1FF] rounded-2xl shadow-[0_20px_40px_rgba(0,209,255,0.3)] p-5 flex flex-col justify-between border border-blue-300">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-900" />
            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest">Network</span>
          </div>
          <div className="font-black text-blue-900 text-2xl tracking-tighter italic leading-none">Low Latency</div>
        </div>
      </FloatingElement>

      {/* Right Side Elements */}
      <FloatingElement 
        className="top-[18%] right-[5%] lg:right-[12%]" 
        delay={0.4} 
        yOffset={30} 
        rotate={18}
      >
        <div className="bg-card p-8 rounded-[2.5rem] shadow-2xl border border-border flex items-center justify-center">
          <ToggleRight className="w-16 h-16 text-[#00E676] drop-shadow-sm" />
        </div>
      </FloatingElement>

      <FloatingElement 
        className="top-[42%] right-[2%] lg:right-[10%]" 
        delay={0.7} 
        yOffset={20} 
        rotate={-12}
      >
        <div className="bg-foreground p-10 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-border flex items-center justify-center">
          <Zap className="w-14 h-14 text-[#FFD600] fill-[#FFD600]" />
        </div>
      </FloatingElement>

      <FloatingElement 
        className="top-[65%] right-[10%] lg:right-[18%]" 
        delay={1.0} 
        yOffset={15} 
        rotate={15}
      >
        <div className="bg-[#2962FF] p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(41,98,255,0.4)] border border-blue-400 flex items-center justify-center overflow-hidden">
          <Lock className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
        </div>
      </FloatingElement>

      <FloatingElement 
        className="top-[28%] right-[18%] lg:right-[22%] hidden md:block" 
        delay={1.3} 
        yOffset={18} 
        rotate={-8}
      >
        <div className="bg-card p-6 rounded-3xl shadow-xl border border-border flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#FF6D00] shadow-[0_0_20px_rgba(255,109,0,0.5)]" />
          </div>
        </div>
      </FloatingElement>

      {/* Cursor Interaction */}
      <FloatingElement 
        className="top-[30%] left-[35%] lg:left-[42%] pointer-events-none" 
        delay={1.5} 
        yOffset={40} 
        rotate={-5}
      >
        <MousePointer2 className="w-14 h-14 text-foreground drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]" />
      </FloatingElement>

      {/* Bottom Subtle Gradient for transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-30" />
    </div>
  );
}
