import { ArrowRight, Gauge, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-bg">
        <img
          src="/products/hero-lifestyle.jpg"
          alt=""
          className="h-full w-full object-cover object-[center_40%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-bg/50" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-6 bg-race" />
            Performance nutrition
          </p>
          <h1 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            Fuel
            <br />
            engineered
            <br />
            <span className="text-muted">like carbon.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Gels, electrolytes, and chews built for the same riders who race
            ENVE wheels. Precision carbs. Zero fluff. Ready when the wattage
            climbs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#shop"
              className="inline-flex h-12 items-center gap-2 rounded-sm bg-fg px-6 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
            >
              Shop ENVE Fuel
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#science"
              className="inline-flex h-12 items-center gap-2 rounded-sm border border-border-strong px-6 text-sm font-medium text-fg transition-colors hover:bg-elevated"
            >
              See the science
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-5">
          <div className="col-span-2 overflow-hidden rounded-md border border-border bg-elevated">
            <img
              src="/products/gel-30.jpg"
              alt="ENVE Gel 30"
              className="aspect-[21/9] w-full object-cover object-center sm:aspect-[2.4/1]"
            />
          </div>
          <div className="rounded-md border border-border bg-bg/80 p-4 backdrop-blur-sm sm:p-5">
            <Zap className="size-5 text-race" strokeWidth={1.75} />
            <p className="mt-3 font-display text-3xl font-semibold tabular-nums sm:text-4xl">
              30–50g
            </p>
            <p className="mt-1 text-sm text-muted">Carb per gel, race-tuned</p>
          </div>
          <div className="rounded-md border border-border bg-bg/80 p-4 backdrop-blur-sm sm:p-5">
            <Gauge className="size-5 text-fg" strokeWidth={1.75} />
            <p className="mt-3 font-display text-3xl font-semibold tabular-nums sm:text-4xl">
              0g
            </p>
            <p className="mt-1 text-sm text-muted">Sugar in ENVE Fizz</p>
          </div>
        </div>
      </div>
    </section>
  );
}
