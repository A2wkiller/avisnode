import GlobalServerLocations from './GlobalServerLocations';
import { FeaturesGrid } from './FeatureCard';

export default function ServerFeaturesSection() {
    return (
        <div className="bg-background text-foreground py-12 md:py-20 relative overflow-hidden transition-colors duration-800" id="locations">
            {/* Background noise texture */}
            <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                {/* Global Server Locations with 3D Globe */}
                <GlobalServerLocations />

                {/* Feature Cards with Glass Morphism */}
                <div className="mt-12 md:mt-20 w-full">
                    <FeaturesGrid />
                </div>
            </div>
        </div>
    );
}
