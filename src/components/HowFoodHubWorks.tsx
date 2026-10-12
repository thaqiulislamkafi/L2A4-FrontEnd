
import HowFoodHubWorksAnimations from "./HowFoodHubWorksAnimations";

const HowFoodHubWorks = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-orange-50/50 to-white py-28 dark:from-orange-950/10 dark:via-orange-950/20 dark:to-orange-950/10">
      {/* Background Decorations */}

      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/2 size-96 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-80 rounded-full bg-orange-300/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <HowFoodHubWorksAnimations />
      </div>
    </section>
  );
};

export default HowFoodHubWorks;