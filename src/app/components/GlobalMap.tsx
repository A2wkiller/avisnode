import createGlobe from "cobe";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Cpu, Wifi, HardDrive, Info, AlertCircle } from "lucide-react";

// Defined outside the component so the array reference is stable and never
// triggers unnecessary re-runs of the useEffect that depends on it.
export const LOCATIONS = [
  {
    id: "de",
    name: "Frankfurt, Germany",
    coords: [50.1109, 8.6821] as [number, number],
    ping: "14ms",
    cpu: "Ryzen 9 7950X",
    ram: "DDR5 ECC",
    operational: false,
  },
  {
    id: "in",
    name: "Mumbai, India",
    coords: [19.076, 72.8777] as [number, number],
    ping: "28ms",
    cpu: "EPYC 9654",
    ram: "DDR5 ECC",
    operational: true,
  },
  {
    id: "us",
    name: "New York, USA",
    coords: [40.7128, -74.006] as [number, number],
    ping: "18ms",
    cpu: "Core i9-13900K",
    ram: "DDR5 ECC",
    operational: false,
  },
  {
    id: "sg",
    name: "Singapore",
    coords: [1.3521, 103.8198] as [number, number],
    ping: "22ms",
    cpu: "Ryzen 9 7950X",
    ram: "DDR5 ECC",
    operational: true,
  },
  {
    id: "au",
    name: "Sydney, Australia",
    coords: [-33.8688, 151.2093] as [number, number],
    ping: "35ms",
    cpu: "EPYC 9654",
    ram: "DDR5 ECC",
    operational: false,
  },
];

export function GlobalMap({ 
  showHeader = true,
  showCard = true 
}: { 
  showHeader?: boolean;
  showCard?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  // Refs for tracking animation and interaction state without re-rendering
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const rRef = useRef(0); // Current smoothed rotation offset
  const targetPhiRef = useRef<number | null>(null);
  
  // WebGL Error state
  const [webglError, setWebglError] = useState(false);

  // Focus on a specific location
  const [focusLocation, setFocusLocation] = useState<string | null>(null);

  const activeLoc = LOCATIONS.find((l) => l.id === focusLocation);

  const updateGlobe = useCallback(() => {
    if (!canvasRef.current) return;

    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        widthRef.current = width;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    try {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 20000, // Increased texture quality
        mapBrightness: 8,  // Increased lighting effects
        baseColor: [0.03, 0.03, 0.08], // Deeper dark blue for better contrast
        markerColor: [0.07, 0.72, 0.65], // Vibrant teal markers
        glowColor: [0.07, 0.72, 0.65],
        opacity: 0.9,
        markers: LOCATIONS.map((l) => ({
          location: l.coords,
          size: l.id === focusLocation ? 0.1 : (l.operational ? 0.06 : 0.03),
        })),
        onRender: (state) => {
          // If we have a target phi (focused on a location), smoothly rotate to it
          if (targetPhiRef.current !== null && !pointerInteracting.current) {
            const diff = targetPhiRef.current - phiRef.current;
            const normalizedDiff = ((diff + Math.PI) % (2 * Math.PI)) - Math.PI;
            phiRef.current += normalizedDiff * 0.05;
          } else if (!pointerInteracting.current && !focusLocation) {
            // Auto-rotation speed increased to match Games page reference
            phiRef.current += 0.005; 
          }

          // Apply combined rotation
          state.phi = phiRef.current + rRef.current;

          // Keep canvas sized correctly after any resize
          state.width = widthRef.current * 2;
          state.height = widthRef.current * 2;
        },
      });

      return () => {
        globe.destroy();
        window.removeEventListener("resize", onResize);
      };
    } catch (e) {
      console.error("Globe failed to initialize:", e);
      setWebglError(true);
    }
  }, [focusLocation]);

  useEffect(() => {
    const cleanup = updateGlobe();
    return () => cleanup?.();
  }, [updateGlobe]);

  const handleLocationClick = (locId: string) => {
    if (locId === focusLocation) {
      setFocusLocation(null);
      targetPhiRef.current = null;
    } else {
      setFocusLocation(locId);
      const loc = LOCATIONS.find(l => l.id === locId);
      if (loc) {
        targetPhiRef.current = (loc.coords[1] * Math.PI) / 180 + Math.PI / 2;
      }
    }
  };

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto ${showHeader ? "py-12 md:py-20 px-4 md:px-6" : ""}`}
    >
      {showHeader && (
        <div className="text-center mb-8 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent mb-4"
          >
            Global Network Infrastructure
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            High-availability nodes strategically deployed in tier-1 data centers across the globe.
          </p>
        </div>
      )}

      <div
        className={`relative aspect-[4/3] sm:aspect-[16/9] w-full flex items-center justify-center transition-all duration-700 ${showCard ? "bg-card/50 rounded-3xl border border-border shadow-2xl overflow-hidden" : "bg-transparent border-none shadow-none"}`}
      >
        {webglError ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Globe Failed to Load</h3>
            <p className="text-muted-foreground max-w-xs">
              Your browser or hardware might not support WebGL. Try updating your browser.
            </p>
          </div>
        ) : (
          <>
            {/* Interaction Layer */}
            <div
              className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
              }}
              onPointerUp={() => {
                pointerInteracting.current = null;
                if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
              }}
              onPointerOut={() => {
                pointerInteracting.current = null;
                if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
              }}
              onMouseMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta;
                  rRef.current = delta / 200;
                }
              }}
            />

            {/* Cobe Globe */}
            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "800px",
                aspectRatio: "1",
              }}
              className="opacity-90 transition-opacity duration-1000 ease-in-out pointer-events-none"
            />

            {/* Radial Glow Effect - Remains visible even when background is gone */}
            <div className={`absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-teal-500/${showCard ? "10" : "25"} via-transparent to-transparent pointer-events-none transition-all duration-700`} />

            {/* Location Selection Overlay (Bottom) */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 flex-wrap px-4 pointer-events-none">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleLocationClick(loc.id)}
                  title={`${loc.name} - ${loc.operational ? 'Live' : 'Coming Soon'}`}
                  className={`pointer-events-auto px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all flex items-center gap-2 ${focusLocation === loc.id ? "bg-teal-500 text-black border-teal-500 scale-110 shadow-lg shadow-teal-500/20" : "bg-black/60 text-white/70 border-white/10 hover:bg-white/20 hover:text-white"}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${loc.operational ? "bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-amber-500/50"}`}
                  />
                  {loc.name.split(",")[0]}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Selected Location Info Card */}
        <AnimatePresence>
          {activeLoc && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="absolute top-6 right-6 z-30 w-64 bg-background/80 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-2xl pointer-events-none hidden md:block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-teal-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground leading-none">{activeLoc.name.split(",")[0]}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">{activeLoc.name.split(",")[1]}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${activeLoc.operational ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}`}>
                  {activeLoc.operational ? "Live" : "Coming Soon"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">Latency</p>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-teal-500" />
                    <span className="text-xs font-mono font-bold">{activeLoc.ping}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">CPU Tier</p>
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-teal-500" />
                    <span className="text-xs font-mono font-bold">{activeLoc.cpu.split(" ")[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <HardDrive className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-medium">{activeLoc.ram}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-teal-500 font-bold">
                    <Info className="w-3 h-3" />
                    <span>Deploy Now</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
