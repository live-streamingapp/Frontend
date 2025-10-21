import React, { Suspense, lazy } from "react";
import Hero from "../components/Landing/Hero";
import Services from "../components/Landing/Services";
import PremiumServices from "../components/Landing/PremiumServices";
import LazyLoadWrapper from "../components/Landing/LazyLoadWrapper";
import "../App.css";

// Lazy load components that aren't immediately visible
const FreeServices = lazy(() => import("../components/Landing/FreeServices"));
const UpcomingEvents = lazy(() =>
	import("../components/Landing/UpcomingEvents")
);
const Podcasts = lazy(() => import("../components/Podcasts/Podcasts"));
const TestimonialsSection = lazy(() =>
	import("../components/Landing/TestimonialsSection")
);
const LetsTalk = lazy(() => import("../components/Landing/LetsTalk"));

// Loading fallback component
const SectionSkeleton = ({ height = "400px" }) => (
	<div
		className="animate-pulse bg-gray-200 rounded-lg mx-4 sm:mx-8 md:mx-12 lg:mx-14"
		style={{ height, minHeight: height }}
	>
		<div className="flex items-center justify-center h-full text-gray-400">
			Loading...
		</div>
	</div>
);

const Landing = () => {
	return (
		<>
			{/* Immediately visible sections - load immediately */}
			<Hero />
			<Services />
			<PremiumServices />

			{/* Lazy load sections below the fold */}
			<LazyLoadWrapper
				fallback={<SectionSkeleton height="300px" />}
				delay={100}
			>
				<Suspense fallback={<SectionSkeleton height="300px" />}>
					<FreeServices />
				</Suspense>
			</LazyLoadWrapper>

			<LazyLoadWrapper
				fallback={<SectionSkeleton height="450px" />}
				delay={200}
			>
				<Suspense fallback={<SectionSkeleton height="450px" />}>
					<UpcomingEvents />
				</Suspense>
			</LazyLoadWrapper>

			<LazyLoadWrapper
				fallback={<SectionSkeleton height="400px" />}
				delay={300}
			>
				<Suspense fallback={<SectionSkeleton height="400px" />}>
					<Podcasts />
				</Suspense>
			</LazyLoadWrapper>

			<LazyLoadWrapper
				fallback={<SectionSkeleton height="500px" />}
				delay={400}
			>
				<Suspense fallback={<SectionSkeleton height="500px" />}>
					<TestimonialsSection />
				</Suspense>
			</LazyLoadWrapper>

			<LazyLoadWrapper
				fallback={<SectionSkeleton height="600px" />}
				delay={500}
			>
				<Suspense fallback={<SectionSkeleton height="600px" />}>
					<LetsTalk />
				</Suspense>
			</LazyLoadWrapper>
		</>
	);
};

export default Landing;
