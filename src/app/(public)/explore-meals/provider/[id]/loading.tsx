import { PrimaryMealSpinner } from "@/components/ui/spinner";

export default function ProviderMealsLoading() {
  return (
    <section className="py-24">
      <PrimaryMealSpinner />
    </section>
  );
}