import { assets } from "../assets";
import { Features } from "../components/Features";

import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";
import { Server, Cpu, HardDrive, Network, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { Button } from "../components/ui/moving-border";

const plans = [
  {
    name: "DS-Entry",
    cpu: "Intel Xeon E3-1230 v6",
    cores: "4c/8t 3.5GHz",
    ram: "32GB DDR4",
    storage: "2x 250GB SSD",
    bandwidth: "1Gbps Unmetered",
    price: "₹7,999.00",
    stock: "In Stock",
    highlight: false,
  },
  {
    name: "DS-Pro",
    cpu: "Intel Core i7-7700K",
    cores: "4c/8t 4.2GHz",
    ram: "64GB DDR4",
    storage: "2x 500GB NVMe",
    bandwidth: "1Gbps Unmetered",
    price: "₹11,499.00",
    stock: "Low Stock",
    highlight: true,
  },
  {
    name: "DS-Enterprise",
    cpu: "AMD EPYC 7351P",
    cores: "16c/32t 2.4GHz",
    ram: "128GB DDR4 ECC",
    storage: "2x 1TB NVMe",
    bandwidth: "10Gbps Unmetered",
    price: "₹21,299.00",
    stock: "In Stock",
    highlight: false,
  },
  {
    name: "DS-Ultimate",
    cpu: "AMD Ryzen 9 5950X",
    cores: "16c/32t 3.4GHz",
    ram: "128GB DDR4",
    storage: "2x 2TB NVMe Gen4",
    bandwidth: "10Gbps Unmetered",
    price: "₹32,599.00",
    stock: "Pre-Order",
    highlight: false,
  },
];

export default function Dedicated() {
  const navigate = useNavigate();

  const handleOrderNow = (plan: { name: string; price: string }) => {
    try {
      const cartItem = {
        id: crypto.randomUUID(),
        name: plan.name,
        price: plan.price,
        gameId: "dedicated",
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

  return (
    <div className="bg-background pt-20 transition-colors duration-800">
      <div className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 transition-colors duration-800">
          DEDICATED SERVERS
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg transition-colors duration-800">
          Enterprise bare metal servers with full root access, dedicated
          resources, and maximum performance.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap gap-4 justify-center">
        <button className="bg-teal-500 text-white dark:text-black px-6 py-2 rounded-full font-bold text-sm">
          All Processors
        </button>
        <button className="bg-secondary text-muted-foreground hover:text-foreground px-6 py-2 rounded-full font-medium text-sm border border-border transition-colors duration-800">
          AMD
        </button>
        <button className="bg-secondary text-muted-foreground hover:text-foreground px-6 py-2 rounded-full font-medium text-sm border border-border transition-colors duration-800">
          Intel
        </button>
        <button className="bg-secondary text-muted-foreground hover:text-foreground px-6 py-2 rounded-full font-medium text-sm border border-border transition-colors duration-800">
          Storage
        </button>
      </div>

      {/* Pricing Table */}
      <div className="max-w-7xl mx-auto px-6 space-y-4 mb-20">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-2xl border transition-all duration-800 ${plan.highlight ? "border-teal-500/50 bg-teal-500/5" : "border-border bg-card"} flex flex-col lg:flex-row items-center gap-8 hover:border-teal-500/30 transition-all`}
          >
            <div className="flex items-center gap-4 min-w-[200px]">
              <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center p-2 transition-colors duration-800">
                <img
                  src={assets.imgIntel}
                  alt="CPU"
                  className="w-full h-full object-contain dark:invert opacity-80"
                />
              </div>
              <div>
                <h3 className="text-foreground font-bold text-lg transition-colors duration-800">{plan.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-800 ${plan.stock === "In Stock" ? "bg-green-500/20 text-green-600 dark:text-green-400" : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"}`}
                >
                  {plan.stock}
                </span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground/40 text-xs uppercase tracking-wider transition-colors duration-800">
                  <Cpu className="w-3 h-3" /> Processor
                </div>
                <p className="text-foreground font-medium transition-colors duration-800">{plan.cpu}</p>
                <p className="text-muted-foreground/40 text-xs transition-colors duration-800">{plan.cores}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground/40 text-xs uppercase tracking-wider transition-colors duration-800">
                  <Server className="w-3 h-3" /> Memory
                </div>
                <p className="text-foreground font-medium transition-colors duration-800">{plan.ram}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground/40 text-xs uppercase tracking-wider transition-colors duration-800">
                  <HardDrive className="w-3 h-3" /> Storage
                </div>
                <p className="text-foreground font-medium transition-colors duration-800">{plan.storage}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground/40 text-xs uppercase tracking-wider transition-colors duration-800">
                  <Network className="w-3 h-3" /> Network
                </div>
                <p className="text-foreground font-medium transition-colors duration-800">{plan.bandwidth}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto border-t lg:border-t-0 border-border pt-6 lg:pt-0 transition-colors duration-800">
              <div className="text-center lg:text-right min-w-[120px]">
                <p className="text-foreground font-bold text-2xl transition-colors duration-800">{plan.price}</p>
                <p className="text-muted-foreground/40 text-xs transition-colors duration-800">/month</p>
              </div>
              <Button
                onClick={() => handleOrderNow(plan)}
                containerClassName="w-full lg:w-48 h-12 text-sm"
                className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold transition-all flex items-center justify-center gap-2"
                borderClassName="bg-[radial-gradient(var(--color-teal-500)_40%,transparent_60%)]"
              >
                Order Now
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Features />
      <FAQ />
      <Testimonials />
    </div>
  );
}
