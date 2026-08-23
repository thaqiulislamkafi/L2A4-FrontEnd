import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

function PrimaryMealSpinner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-orange-100">
      <div className="mx-auto flex min-h-162.5 max-w-7xl items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="size-10 text-orange-600" />

          <p className="text-sm font-medium text-orange-700">
            Preparing something delicious...
          </p>
        </div>
      </div>
    </section>
  );
}

function GlobalSpinner() {
  return (
    <main className={`${geist.className} flex min-h-screen items-center justify-center bg-orange-100/10 backdrop-blur-2xl`}>
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-10 text-orange-600" />

        <p className="text-sm font-medium text-orange-700">
          Checking your session...
        </p>
      </div>
    </main>
  );
}

export { Spinner, PrimaryMealSpinner, GlobalSpinner }
