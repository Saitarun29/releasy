import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-12 sm:p-16 text-center max-w-3xl mx-auto border-border/50">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Ready to ship faster?
          </h2>
          <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
            Turn your next GitHub release into a complete marketing campaign in one click.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app">
              <Button size="lg" className="w-full sm:w-auto text-base gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
