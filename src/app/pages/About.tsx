import { motion } from "motion/react";
import { SEO } from "../components/SEO";
import { SchemaOrg } from "../components/SchemaOrg";
import { spring, viewportDefaults } from "../lib/animations";

export default function About() {
  return (
    <div className="bg-background text-foreground transition-colors duration-800">
      <SEO 
        title="About Us" 
        description="Learn about AvixNode's mission to provide the world's most reliable and high-performance game server hosting."
      />
      <SchemaOrg type="Organization" name="AvixNode" />
      
      <main className="max-w-4xl mx-auto px-6 py-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportDefaults}
          transition={spring.gentle}
          className="mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 speakable-content">Our Mission</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Founded by a team of dedicated gamers and infrastructure engineers, AvixNode was born out of a simple need: game servers that actually perform.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We don't just host servers; we build the hardware and network foundations that power competitive gaming globally. Our expertise in high-frequency compute and low-latency networking ensures your community has the best possible experience.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportDefaults}
          transition={{ ...spring.gentle, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">Experience</h3>
            <p className="text-muted-foreground">10+ years in the hosting industry, specializing in game server architecture and DDoS mitigation.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Expertise</h3>
            <p className="text-muted-foreground">Experts in Ryzen 9 architecture and NVMe Gen4/5 storage solutions for maximum IOPS.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Trust</h3>
            <p className="text-muted-foreground">Trusted by over 10,000 customers worldwide with a 4.9/5 rating on Trustpilot.</p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportDefaults}
          transition={{ ...spring.gentle, delay: 0.2 }}
          className="p-8 rounded-2xl bg-foreground/5 border border-border"
        >
          <h2 className="text-3xl font-bold mb-6">Topical Authority</h2>
          <p className="text-muted-foreground mb-4">
            AvixNode is recognized as a leader in high-performance game hosting. We regularly contribute to open-source gaming projects and provide technical insights on server optimization for:
          </p>
          <ul className="grid grid-cols-2 gap-4 text-sm font-bold text-foreground/70">
            <li>• Pterodactyl Panel Optimization</li>
            <li>• Advanced Java GC Tuning</li>
            <li>• Rust Server Network Performance</li>
            <li>• Enterprise DDoS Mitigation</li>
          </ul>
        </motion.section>
      </main>
    </div>
  );
}
