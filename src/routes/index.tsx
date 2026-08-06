import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Activity, Droplets, Flame, Shield } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  products,
  type ProductCategory,
} from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  const gels = products.filter((p) => p.category === "gels");
  const hydration = products.filter((p) => p.category === "hydration");
  const chews = products.filter((p) => p.category === "chews");

  return (
    <div className="min-h-[calc(100dvh-var(--grok-banner-h,0px))]">
      <Header />
      <main>
        <Hero />

        {/* Trust bar */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {[
              { icon: Flame, label: "Race-day carbs", sub: "30g & 50g gels" },
              { icon: Droplets, label: "0 sugar fizz", sub: "B12 + electrolytes" },
              { icon: Activity, label: "2:1 ratio", sub: "Glucose : fructose" },
              { icon: Shield, label: "ENVE standard", sub: "Tested for the road" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-start gap-3 bg-surface px-4 py-5 sm:px-6"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-muted" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-medium text-fg">{label}</p>
                  <p className="text-xs text-subtle">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shop all */}
        <section id="shop" className="scroll-mt-24 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
                  The lineup
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
                  Shop ENVE Fuel
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFilter(c.id)}
                    className={cn(
                      "h-10 rounded-sm border px-4 text-sm font-medium transition-colors",
                      filter === c.id
                        ? "border-fg bg-fg text-accent-fg"
                        : "border-border text-muted hover:border-border-strong hover:text-fg",
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Category spotlights */}
        <CategoryBlock
          id="gels"
          eyebrow="Gels"
          title="Black pouches. White numbers. Clear power."
          body="From steady-state 30g hits to 50g rocket loads with caffeine — ENVE gels keep the math simple when the race gets loud."
          products={gels}
          reverse={false}
        />
        <CategoryBlock
          id="hydration"
          eyebrow="Hydration"
          title="Drop. Shake. Ride."
          body="ENVE Fizz turns plain water into B12 energy with electrolytes and zero sugar. Tubes for the jersey pocket. Combo packs for the season."
          products={hydration}
          reverse
        />
        <CategoryBlock
          id="chews"
          eyebrow="Chews"
          title="Paceable pocket fuel."
          body="Soft pink lemonade energy chews — portion mid-climb, share on the group ride, stack the box in the team fridge."
          products={chews}
          reverse={false}
        />

        {/* Science */}
        <section
          id="science"
          className="scroll-mt-24 border-b border-border bg-surface"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
                  Why it works
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
                  Fuel science,{" "}
                  <span className="text-muted">composite mindset</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  We approach nutrition the way we approach carbon layups —
                  measured, intentional, and race-validated. No mystery blends.
                  Just the numbers you need on the bar computer.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {[
                  {
                    t: "Dual-source carbs",
                    d: "2:1 glucose to fructose so you can push higher carb rates without GI blow-ups.",
                  },
                  {
                    t: "Caffeine where it counts",
                    d: "100mg in Rocket Gel for late-race punches — optional, never forced into every SKU.",
                  },
                  {
                    t: "Zero-sugar hydration",
                    d: "Fizz keeps bottles light on sugar while covering B12 and electrolytes.",
                  },
                  {
                    t: "Packaging that races",
                    d: "Tear notches, matte black graphics, and form factors that fit jersey pockets and team cars.",
                  },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="rounded-md border border-border bg-bg p-5"
                  >
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
                      {item.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="enve-grid absolute inset-0 opacity-60" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
                Ride what you fuel.
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted sm:text-base">
                Pair ENVE Fuel with SES wheels, bars, and cockpit — the full
                race system from composites to carbs.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#shop"
                className="inline-flex h-12 items-center rounded-sm bg-fg px-6 text-sm font-semibold text-accent-fg"
              >
                Shop the lineup
              </a>
              <a
                href="https://enve.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center rounded-sm border border-border-strong px-6 text-sm font-medium"
              >
                Visit ENVE.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CategoryBlock({
  id,
  eyebrow,
  title,
  body,
  products: list,
  reverse,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  products: typeof products;
  reverse: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border">
      <div
        className={cn(
          "mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:items-center",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div className="lg:col-span-4">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
        </div>
        <div
          className={cn(
            "grid gap-4 sm:grid-cols-2 lg:col-span-8",
            list.length === 1 && "sm:grid-cols-1 sm:max-w-md",
          )}
        >
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
