import { motion } from 'motion/react';
import { GlobalMap } from './GlobalMap';

export default function GlobalServerLocations() {
    return (
        <div className="py-24 px-6 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Global Server Locations
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Strategically placed servers worldwide for minimal latency and maximum performance.
                </p>
            </div>

            {/* Globe Container */}
            <div className="relative w-full max-w-5xl mx-auto">
                <div className="relative aspect-square mx-auto">
                    <div className="w-full h-full scale-110 md:scale-125">
                        <GlobalMap showHeader={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
