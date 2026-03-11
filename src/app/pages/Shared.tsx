import { motion } from "motion/react";
import { viewportDefaults, spring } from "../lib/animations";
import { Shield, Zap, Globe, Cpu, Clock, Server, Info } from "lucide-react";
import { useState } from "react";

import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { SEO } from "../components/SEO";
import { SchemaOrg } from "../components/SchemaOrg";
import { CountdownTimer } from "../components/ui/CountdownTimer";
import { assets } from "../assets";
import { toast } from "sonner";
import { Button } from "../components/ui/moving-border";
import { useNavigate } from "react-router";

export default function Shared() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("performance"); // budget, performance, enterprise
  const [cpuFilter, setCpuFilter] = useState("all"); // all, amd, intel
  const [locationFilter, setLocationFilter] = useState("all"); // all, in, sg

  const handleBuyNow = (plan: { name: string; price: string }) => {
    try {
      const cartItem = {
        id: crypto.randomUUID(),
        name: plan.name,
        price: plan.price,
        gameId: "vps",
      };

      const existingCart = JSON.parse(
        localStorage.getItem("avixnode_cart") || "[]",
      );
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("avixnode_cart", JSON.stringify(updatedCart));

      toast.success(`${plan.name} added to cart!`);
      navigate("/cart");
    } catch {
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const plans = [
    {
      name: "Platinum 4 vCore / 8 GB",
      price: "₹299.00",
      specs: {
        cpu: "4 vCPU Cores",
        ram: "8 GB DDR4 RAM",
        storage: "80 GB NVMe SSD",
        bandwidth: "Unmetered Bandwidth",
      },
      category: "performance",
      cpuType: "amd",
      popular: false,
    },
    {
      name: "Platinum 6 vCore / 16 GB",
      price: "₹499.00",
      specs: {
        cpu: "6 vCPU Cores",
        ram: "16 GB DDR4 RAM",
        storage: "150 GB NVMe SSD",
        bandwidth: "Unmetered Bandwidth",
      },
      category: "performance",
      cpuType: "amd",
      popular: false,
    },
    {
      name: "Platinum 6 vCore / 24 GB",
      price: "₹799.00",
      specs: {
        cpu: "6 vCPU Cores",
        ram: "24 GB DDR4 RAM",
        storage: "300 GB NVMe SSD",
        bandwidth: "Unmetered Bandwidth",
      },
      category: "performance",
      cpuType: "intel",
      popular: false,
    },
    {
      name: "Platinum 8 vCore / 32 GB",
      price: "₹999.00",
      specs: {
        cpu: "8 vCPU Cores",
        ram: "32 GB DDR4 RAM",
        storage: "200 GB NVMe SSD",
        bandwidth: "Unmetered Bandwidth",
      },
      category: "performance",
      cpuType: "intel",
      popular: true,
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-teal-400" />,
      title: "Instant Setup",
      desc: "Get your server up and running in seconds. No complicated configurations.",
    },
    {
      icon: <Shield className="w-6 h-6 text-teal-400" />,
      title: "DDoS Protection",
      desc: "Enterprise protection keeps your server online and secure against any attack.",
    },
    {
      icon: <Clock className="w-6 h-6 text-teal-400" />,
      title: "99.9% Uptime",
      desc: "Our redundant infrastructure ensures your server stays online.",
    },
    {
      icon: <Info className="w-6 h-6 text-teal-400" />,
      title: "24/7 Support",
      desc: "Expert support team available around the clock to help with any issues.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-teal-400" />,
      title: "Powerful Hardware",
      desc: "High performance NVMe SSDs and latest gen CPUs for lag-free gaming.",
    },
    {
      icon: <Globe className="w-6 h-6 text-teal-400" />,
      title: "Global Locations",
      desc: "Multiple data centers worldwide to ensure low latency for all players.",
    },
  ];

  return (
    <div className="bg-background min-h-screen pt-16 md:pt-20 transition-colors duration-800">
      <SEO 
        title="VPS Hosting Plans"
        description="High-performance virtual private servers with full root access, SSD storage, and instant deployment for any application."
        keywords="vps hosting, virtual private server, cloud hosting, linux vps, windows vps, avixnode"
      />
      <SchemaOrg 
        type="SoftwareApplication"
        name="VPS Hosting Plans"
        description="High-performance virtual private servers with full root access and instant deployment."
      />
      {/* Hero / Pricing Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 max-w-7xl mx-auto relative">
        <div className="text-center mb-10 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring.gentle}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase tracking-tight transition-colors duration-800"
          >
            VPS HOSTING PLANS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.gentle, delay: 0.08 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg transition-colors duration-800"
          >
            High-performance virtual private servers with full root access, SSD
            storage, and instant deployment.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col items-center gap-4 md:gap-6 mb-10 md:mb-12">
          {/* Category Tabs */}
          <div className="bg-secondary p-1 rounded-full flex gap-1 border border-border transition-colors duration-800 flex-wrap justify-center">
            {["Budget", "Performance", "Enterprise"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat.toLowerCase())}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all !min-h-0 !min-w-0 ${category === cat.toLowerCase() ? "bg-teal-500 text-white dark:text-black shadow-lg shadow-teal-500/20" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <div className="flex items-center bg-secondary rounded-full border border-border px-2 py-1 transition-colors duration-800">
              <button
                onClick={() => setCpuFilter("all")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all !min-h-0 !min-w-0 ${cpuFilter === "all" ? "bg-teal-500 text-white dark:text-black" : "text-muted-foreground/40 hover:text-foreground"}`}
              >
                All
              </button>
              <span className="text-border mx-1">-</span>
              <button
                onClick={() => setCpuFilter("amd")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all !min-h-0 !min-w-0 ${cpuFilter === "amd" ? "bg-teal-500 text-white dark:text-black" : "text-muted-foreground/40 hover:text-foreground"}`}
              >
                AMD
              </button>
              <span className="text-border mx-1">-</span>
              <button
                onClick={() => setCpuFilter("intel")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all !min-h-0 !min-w-0 ${cpuFilter === "intel" ? "bg-teal-500 text-white dark:text-black" : "text-muted-foreground/40 hover:text-foreground"}`}
              >
                Intel
              </button>
            </div>

            <div className="flex items-center bg-secondary rounded-full border border-border px-2 py-1 transition-colors duration-800">
              <button
                onClick={() => setLocationFilter("in")}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all !min-h-0 !min-w-0 ${locationFilter === "in" ? "bg-teal-500 text-white dark:text-black" : "text-muted-foreground/40 hover:text-foreground"}`}
              >
                IN
              </button>
              <span className="text-border mx-1">-</span>
              <button
                onClick={() => setLocationFilter("sg")}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all !min-h-0 !min-w-0 ${locationFilter === "sg" ? "bg-teal-500 text-white dark:text-black" : "text-muted-foreground/40 hover:text-foreground"}`}
              >
                SG
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 px-4 sm:px-0">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportDefaults}
              transition={{ ...spring.snappy, delay: i * 0.07 }}
              className={`relative p-6 rounded-3xl border flex flex-col group transition-all duration-300 ${plan.popular ? "bg-card border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.1)]" : "bg-card border-border hover:border-teal-500/20"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white dark:text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg z-10">
                  Popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-foreground font-bold text-lg leading-tight mb-2 transition-colors duration-800">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground transition-colors duration-800">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-xs transition-colors duration-800">/month</span>
                </div>
              </div>

              <div className="h-px bg-border mb-6 transition-colors duration-800" />

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-start gap-3 text-xs font-medium text-muted-foreground transition-colors duration-800">
                  <Cpu className="w-4 h-4 text-teal-500 shrink-0" />{" "}
                  {plan.specs.cpu}
                </div>
                <div className="flex items-start gap-3 text-xs font-medium text-muted-foreground transition-colors duration-800">
                  <Zap className="w-4 h-4 text-teal-500 shrink-0" />{" "}
                  {plan.specs.ram}
                </div>
                <div className="flex items-start gap-3 text-xs font-medium text-muted-foreground transition-colors duration-800">
                  <Server className="w-4 h-4 text-teal-500 shrink-0" />{" "}
                  {plan.specs.storage}
                </div>
                <div className="flex items-start gap-3 text-xs font-medium text-muted-foreground transition-colors duration-800">
                  <Globe className="w-4 h-4 text-teal-500 shrink-0" />{" "}
                  {plan.specs.bandwidth}
                </div>
                <div className="flex items-start gap-3 text-xs font-medium text-muted-foreground transition-colors duration-800">
                  <Info className="w-4 h-4 text-teal-500 shrink-0" /> Support
                  included
                </div>
              </div>

              {plan.popular ? (
                <Button
                  onClick={() => handleBuyNow(plan)}
                  duration={2000}
                  containerClassName="w-full h-12 text-sm"
                  className="bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold transition-all flex items-center justify-center"
                  borderClassName="bg-[radial-gradient(var(--color-teal-500)_40%,transparent_60%)]"
                >
                  Buy now
                </Button>
              ) : (
                <Button
                  onClick={() => handleBuyNow(plan)}
                  containerClassName="w-full h-12 text-sm"
                  className="bg-primary text-primary-foreground font-bold transition-all flex items-center justify-center hover:opacity-90"
                  borderClassName="bg-[radial-gradient(var(--color-primary)_40%,transparent_60%)]"
                >
                  Buy now
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Supported OS */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 mb-20 grayscale hover:grayscale-0 transition-all duration-500">
          {[
            "Ubuntu",
            "Debian",
            "CentOS",
            "Fedora",
            "Windows",
            "Alpine",
            "Arch",
          ].map((os) => (
            <div
              key={os}
              className="flex items-center gap-2 text-white font-medium group cursor-default"
            >
              <div
                className={`w-2 h-2 rounded-full ${os === "Ubuntu" ? "bg-orange-500" : os === "Debian" ? "bg-red-500" : os === "Windows" ? "bg-blue-500" : "bg-teal-500"} group-hover:scale-150 transition-transform`}
              />
              <span className="group-hover:text-white transition-colors">
                {os}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Global Locations */}

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportDefaults}
              transition={{ ...spring.snappy, delay: i * 0.07 }}
              className="bg-[#0F0F0F] border border-white/5 p-8 rounded-3xl hover:border-teal-500/20 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-teal-500/10 blur-2xl rounded-full" />
              </div>
              <div className="mb-6 w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#0F1615] border border-white/5 p-12 md:p-20 relative overflow-hidden">
          {/* Background Lightning Bolt Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-900/5 to-transparent skew-x-12 opacity-50" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Make The Switch
              </h2>
              <p className="text-white/60 max-w-lg text-lg mb-8">
                Join thousands of gamers who switched to faster, more reliable
                hosting. Experience the difference today.
              </p>
              <div className="flex gap-4">
                <img
                  src={assets.imgAvixNodeLogo}
                  className="h-8 grayscale opacity-50 dark:grayscale-0 dark:opacity-100 dark-logo-blue"
                />
              </div>
            </div>

            <div className="text-right">
              <div className="text-right mb-6">
                <p className="text-white font-bold text-2xl">SAVE 10%</p>
                <p className="text-white/40 text-sm uppercase tracking-wider">
                  USE COUPON CODE{" "}
                  <span className="text-white font-bold">WELCOME10</span>
                </p>
              </div>
              <div className="flex items-center justify-end">
                <CountdownTimer labelSize="text-[10px]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
