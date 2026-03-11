import { GlobalMap } from './GlobalMap';

export default function GlobalServerLocations() {
    return (
        <div className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 speakable-content">
                    Global Server Locations
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Strategically placed servers worldwide for minimal latency and maximum performance.
                </p>
            </div>

            {/* Globe Container - No background, but glow remains */}
            <div className="relative w-full max-w-5xl mx-auto">
                <GlobalMap showHeader={false} showCard={false} />
            </div>
        </div>
    );
}
