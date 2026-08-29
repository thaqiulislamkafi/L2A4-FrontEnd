import AboutCTA from "./AboutCTA";
import AboutHero from "./AboutHero";
import MissionVision from "./MissionVision";
import OurStory from "./OurStory";
import WhyChooseFoodHub from "./WhyChooseFoodHub";



export default function AboutPage() {
  return (
    <main>
      <AboutHero />

      <OurStory />

      <MissionVision />

      <WhyChooseFoodHub />

      <AboutCTA />
    </main>
  );
}