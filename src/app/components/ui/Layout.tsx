import { Link, Outlet, useLocation } from "react-router";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageLoader from "../PageLoader";
import { assets } from "../../assets";
import { Menu, X, ShoppingCart, Home, Gamepad2, Server, Sun, Moon, Globe } from "lucide-react";
import clsx from "clsx";
import { spring } from "../../lib/animations";
import { toast } from "sonner";
import { Toaster } from "./sonner";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const location = useLocation();
  const isFirstRender = useRef(true);

  // Sync theme to body class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show page loader on every route change (skip the very first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const animeNavItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Games", url: "/games", icon: Gamepad2 },
    { name: "Cart", url: "/cart", icon: ShoppingCart },
    { name: "Shared", url: "/shared", icon: Server, comingSoon: true },
    { name: "Dedicated", url: "/dedicated", icon: Server, comingSoon: true },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Generative Engine Referral Tracking
    const referrer = document.referrer.toLowerCase();
    const aiEngines = ['perplexity.ai', 'chatgpt.com', 'claude.ai', 'gemini.google.com', 'bing.com'];
    const isAiReferral = aiEngines.some(engine => referrer.includes(engine));
    
    if (isAiReferral) {
      console.log(`[GEO] Generative Engine Referral detected: ${referrer}`);
      // Here you would typically send an event to your analytics provider
      // window.gtag('event', 'ai_referral', { engine: referrer });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-['Montserrat'] selection:bg-teal-500 selection:text-white transition-colors duration-800">
      <PageLoader isVisible={isNavigating} />
      {/* Navbar */}
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          scrolled
            ? "glass-effect-nav"
            : isHomePage 
              ? "bg-transparent border-b border-transparent shadow-none"
              : "bg-background/50 backdrop-blur-md border-b border-border shadow-none",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group !min-h-0 !min-w-0">
            <img
              src={assets.imgAvixNodeLogo}
              alt="AvixNode logo"
              className={clsx(
                "h-8 md:h-10 w-auto transition-all duration-200 group-hover:opacity-80",
                theme === "dark" ? "dark-logo-blue" : (!scrolled && isHomePage && "brightness-0")
              )}
              width="40"
              height="40"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop Nav - Matching Payway style */}
          <div className={clsx(
            "hidden md:flex items-center gap-8 transition-colors duration-300",
            !scrolled && isHomePage 
              ? (theme === "dark" ? "text-zinc-400" : "text-zinc-500") 
              : "text-foreground/70"
          )}>
            {animeNavItems.map((item) => (
              item.comingSoon ? (
                <button
                  key={item.name}
                  onClick={() => toast.info(`${item.name} is coming soon!`)}
                  className={clsx(
                    "text-sm font-medium transition-colors hover:text-teal-500 cursor-pointer flex items-center gap-1.5 !min-h-0 !min-w-0",
                    !scrolled && isHomePage && (theme === "dark" ? "hover:text-white" : "hover:text-zinc-900")
                  )}
                >
                  {item.name}
                  <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 uppercase tracking-tighter border border-teal-500/20">
                    Soon
                  </span>
                </button>
              ) : (
                <Link 
                  key={item.name} 
                  to={item.url}
                  className={clsx(
                    "text-sm font-medium transition-colors hover:text-teal-500 !min-h-0 !min-w-0",
                    !scrolled && isHomePage && (theme === "dark" ? "hover:text-white" : "hover:text-zinc-900")
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-foreground/5 text-[10px] font-bold text-muted-foreground/60">
              <Globe className="w-3 h-3" />
              <span>EN-US</span>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={clsx(
                "p-2 rounded-full transition-colors !min-h-[40px] !min-w-[40px]",
                !scrolled && isHomePage 
                  ? (theme === "dark" ? "text-white hover:bg-white/10" : "text-zinc-900 hover:bg-zinc-100")
                  : "text-foreground hover:bg-foreground/10"
              )}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
            <Link 
              to="/cart"
              className={clsx(
                "p-2 rounded-full transition-colors !min-h-[40px] !min-w-[40px]",
                !scrolled && isHomePage 
                  ? (theme === "dark" ? "text-white hover:bg-white/10" : "text-zinc-900 hover:bg-zinc-100")
                  : "text-foreground hover:bg-foreground/10"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={clsx(
                "md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 !min-h-[40px] !min-w-[40px]",
                !scrolled && isHomePage 
                  ? (theme === "dark" ? "bg-white/5 hover:bg-white/10 text-white/70" : "bg-zinc-900/5 hover:bg-zinc-900/10 text-zinc-900")
                  : "bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={spring.fast}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring.snappy}
              className="md:hidden bg-background border-t border-border absolute w-full z-40 shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-1">
                {animeNavItems.map((item, i) => {
                  const active = isActive(item.url);
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...spring.snappy, delay: i * 0.04 }}
                    >
                      {item.comingSoon ? (
                        <div
                          onClick={() => {
                            toast.info(`${item.name} is coming soon!`);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-between px-4 py-4 rounded-xl text-foreground/40 cursor-pointer hover:bg-foreground/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 opacity-50" />
                            <span className="text-sm font-medium">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 uppercase tracking-wider border border-teal-500/20">
                            Soon
                          </span>
                        </div>
                      ) : (
                        <Link
                          to={item.url}
                          className={clsx(
                            "flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200",
                            active
                              ? "bg-teal-500/10 text-teal-500 dark:text-teal-400"
                              : "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className={clsx(
                            "w-5 h-5 transition-colors",
                            active ? "text-teal-500 dark:text-teal-400" : "text-foreground/40"
                          )} />
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                          {active && (
                            <motion.div 
                              layoutId="active-mobile-dot"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400" 
                            />
                          )}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                <div className="h-px bg-border my-3" />

                <motion.div
                  className="flex flex-col gap-3 px-4"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring.snappy, delay: 0.15 }}
                >
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground/5 text-foreground font-medium hover:bg-foreground/10 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                    View Cart
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className={clsx(
        "min-h-[calc(100vh-400px)]",
        isHomePage ? "pt-0" : "pt-20"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border pt-12 md:pt-16 pb-8 transition-colors duration-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10 md:mb-12">
            <div className="flex flex-col items-start">
              <Link to="/" className="flex items-center gap-2 mb-6 !min-h-0 !min-w-0">
                <img
                  src={assets.imgAvixNodeLogo}
                  alt="AvixNode logo"
                  className="h-8 w-auto grayscale-0 opacity-100 transition-all duration-300 dark-logo-blue"
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-base font-bold tracking-tight text-foreground/80">
                  AvixNode
                </span>
              </Link>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6 max-w-xs">
                High-performance game hosting built by gamers, for gamers.
                Experience low latency, DDoS protection, and 24/7 support.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://discord.gg/RbRrQY4Pz4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!min-h-0 !min-w-0"
                >
                  <img
                    src="/img1/discord.png"
                    alt="Discord"
                    className="w-8 h-8 rounded-full bg-foreground/5 p-1.5 hover:bg-foreground/10 transition-colors"
                  />
                </a>
                <a
                  href="https://youtube.com/@belyxhost?si=DRH7f_nveOLELZCC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!min-h-0 !min-w-0"
                >
                  <img
                    src="/img1/youtube.png"
                    alt="YouTube"
                    className="w-8 h-8 rounded-full bg-foreground/5 p-1.5 hover:bg-foreground/10 transition-colors"
                  />
                </a>
                <a
                  href="https://www.instagram.com/belyxhost?igsh=MTFsM2RzNWM5eDZ6bw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!min-h-0 !min-w-0"
                >
                  <img
                    src="/img1/instagram.png"
                    alt="Instagram"
                    className="w-8 h-8 rounded-full bg-foreground/5 p-1.5 hover:bg-foreground/10 transition-colors"
                  />
                </a>
                <a
                  href="https://www.trustpilot.com/review/billing.belyxhost.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!min-h-0 !min-w-0"
                >
                  <img
                    src="/img1/trustpilot.png"
                    alt="Trustpilot"
                    className="w-8 h-8 rounded-full bg-foreground/5 p-1.5 hover:bg-foreground/10 transition-colors"
                  />
                </a>
              </div>
              <div className="mt-8 pt-8 border-t border-border/50 w-full">
                <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-4">Trusted By Enterprise</p>
                <div className="flex flex-wrap gap-4 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                   <div className="px-3 py-1.5 rounded-lg border border-border bg-foreground/5 text-[10px] font-bold">STIPE</div>
                   <div className="px-3 py-1.5 rounded-lg border border-border bg-foreground/5 text-[10px] font-bold">RAZORPAY</div>
                   <div className="px-3 py-1.5 rounded-lg border border-border bg-foreground/5 text-[10px] font-bold">PAYPAL</div>
                </div>
              </div>
            </div>

            <div className="sm:pl-4">
              <h3 className="text-foreground text-sm font-bold mb-6">Product</h3>
              <ul className="space-y-4 text-xs text-muted-foreground">
                <li>
                  <Link
                    to="/games"
                    className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors !min-h-0 !min-w-0"
                    title="Browse all high-performance game servers"
                  >
                    Browse Game Servers
                  </Link>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-foreground/60 transition-colors !min-h-0 !min-w-0"
                  onClick={() =>
                    toast.info("Dedicated Servers are coming soon!")
                  }
                >
                  <span>Dedicated Servers</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 uppercase tracking-wider border border-teal-500/20">
                    Soon
                  </span>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-foreground/60 transition-colors !min-h-0 !min-w-0"
                  onClick={() => toast.info("VPS Hosting is coming soon!")}
                >
                  <span>VPS Hosting</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 uppercase tracking-wider border border-teal-500/20">
                    Soon
                  </span>
                </li>
                <li>
                  <Link
                    to="/locations"
                    className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors !min-h-0 !min-w-0"
                  >
                    Global Locations
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sm:pl-4">
              <h3 className="text-foreground text-sm font-bold mb-6">Company</h3>
              <ul className="space-y-4 text-xs text-muted-foreground">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors !min-h-0 !min-w-0"
                  >
                    About Us
                  </Link>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-foreground/60 transition-colors !min-h-0 !min-w-0"
                  onClick={() => toast.info("Blog is coming soon!")}
                >
                  <span>Blog</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500 dark:text-teal-400 uppercase tracking-wider border border-teal-500/20">
                    Coming Soon
                  </span>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-foreground/60 transition-colors !min-h-0 !min-w-0"
                  onClick={() => toast.info("Partners program is coming soon!")}
                >
                  <span>Partners</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500 dark:text-teal-400 uppercase tracking-wider border border-teal-500/20">
                    Coming Soon
                  </span>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-foreground/60 transition-colors !min-h-0 !min-w-0"
                  onClick={() => toast.info("Careers page is coming soon!")}
                >
                  <span>Careers</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500 dark:text-teal-400 uppercase tracking-wider border border-teal-500/20">
                    Coming Soon
                  </span>
                </li>
              </ul>
            </div>

            <div className="sm:pl-4">
              <h3 className="text-foreground text-sm font-bold mb-6">Legal</h3>
              <ul className="space-y-4 text-xs text-muted-foreground">
                <li>
                  <Link
                    to="/tos"
                    className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors !min-h-0 !min-w-0"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors !min-h-0 !min-w-0"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aup"
                    className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors !min-h-0 !min-w-0"
                  >
                    Acceptable Use Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground/50">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} AvixNode. All rights reserved.
            </p>
            <p className="text-center md:text-right">Designed with ❤️ for Gamers</p>
          </div>
        </div>
      </footer>
      <Toaster richColors position="top-right" theme={theme} />
    </div>
  );
}
