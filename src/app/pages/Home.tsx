import ServerFeaturesSection from "../components/ServerFeaturesSection";
import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";

import { CountdownTimer } from "../components/ui/CountdownTimer";
import PaywayHero from "../components/ui/PaywayHero";
import { FocusRail, type FocusRailItem } from "../components/ui/focus-rail";

const POPULAR_GAMES_ITEMS: FocusRailItem[] = [
  {
    id: "Minecraft",
    title: "Minecraft",
    description: "Build, explore, and survive in your own custom blocky world.",
    meta: "1M+ Players • Sandbox",
    imageSrc: "/img1/minecraft.png",
    href: "/games/Minecraft",
  },
  {
    id: "Rust",
    title: "Rust",
    description:
      "Survive the harsh wilderness and other players in this brutal multiplayer game.",
    meta: "50k+ Players • Survival",
    imageSrc: "/img1/rust.jpg",
    href: "/games/Rust",
  },
  {
    id: "ARK",
    title: "ARK: Survival Evolved",
    description:
      "Tame dinosaurs and conquer the prehistoric lands with your tribe.",
    meta: "25k+ Players • Survival",
    imageSrc: "/img1/ark.png",
    href: "/games/ARK",
  },
  {
    id: "CS2",
    title: "Counter-Strike 2",
    description: "Experience the next era of competitive tactical shooters.",
    meta: "100k+ Players • FPS",
    imageSrc: "/img1/cs2.png",
    href: "/games/CS2",
  },
  {
    id: "Valheim",
    title: "Valheim",
    description:
      "A brutal exploration and survival game for 1-10 players set in a procedurally-generated purgatory.",
    meta: "40k+ Players • RPG",
    imageSrc: "/img1/valheim-logo.png",
    href: "/games/Valheim",
  },
  {
    id: "GarrysMod",
    title: "Garry's Mod",
    description:
      "A physics sandbox. There aren't any predefined aims or goals. We give you the tools and leave you to play.",
    meta: "30k+ Players • Sandbox",
    imageSrc: "/img1/garry mod.png",
    href: "/games/GarrysMod",
  },
  {
    id: "Hytale",
    title: "Hytale",
    description:
      "Embark on a journey of adventure and creativity! Hytale combines the scope of a sandbox with the depth of a roleplaying game.",
    meta: "Coming Soon • RPG",
    imageSrc: "/img1/hytale.png",
    href: "/games/Hytale",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground transition-colors duration-800">
      {/* Hero Section */}
      <PaywayHero />

      {/* Popular Games Rail */}
      <section
        className="w-full flex flex-col items-center justify-center py-20 bg-background text-foreground transition-colors duration-800"
        id="games"
      >
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular Games
          </h2>
          <p className="text-muted-foreground text-lg">
            Navigate the rail to explore our most popular hosting options.
          </p>
        </div>

        <FocusRail items={POPULAR_GAMES_ITEMS} autoPlay={false} loop={true} />
      </section>

      <ServerFeaturesSection />

      {/* FAQ */}
      <FAQ />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl bg-secondary/10 backdrop-blur-2xl border border-white/5 p-12 md:p-20 relative overflow-hidden text-center transition-colors duration-800">
          {/* Subtle Glow Effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Make The Switch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
              Join thousands of gamers who switched to faster, more reliable
              hosting. Experience the difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="text-right">
                <p className="font-bold text-lg">SAVE 10%</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">
                  Use Code: WELCOME10
                </p>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <CountdownTimer labelSize="text-xs" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
