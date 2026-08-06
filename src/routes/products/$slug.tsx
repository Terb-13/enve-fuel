import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/data/products";
import { useCart } from "@/store/cart";
import { cn, formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-muted">Product not found.</p>
      <Link to="/" className="text-sm font-medium underline">
        Back to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [flavor, setFlavor] = useState(product.flavors?.[0]);

  const related = useMemo(() => {
    const same = products.filter(
      (p) => p.id !== product.id && p.category === product.category,
    );
    if (same.length >= 3) return same.slice(0, 3);
    const extras = products.filter(
      (p) => p.id !== product.id && !same.some((s) => s.id === p.id),
    );
    return [...same, ...extras].slice(0, 3);
  }, [product]);

  return (
    <div className="min-h-[calc(100dvh-var(--grok-banner-h,0px))]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          All fuel
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover sm:aspect-[4/3]"
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-sm border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted"
                >
                  {b}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-muted">{product.tagline}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <p className="font-mono text-3xl font-medium tabular-nums">
                {formatPrice(product.price)}
              </p>
              {product.compareAt && (
                <p className="font-mono text-base text-subtle line-through">
                  {formatPrice(product.compareAt)}
                </p>
              )}
            </div>
            <p className="mt-1 text-xs text-subtle">{product.packSize}</p>

            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
              {product.description}
            </p>

            {product.flavors && product.flavors.length > 1 && (
              <div className="mt-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-subtle">
                  Flavor
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFlavor(f)}
                      className={cn(
                        "h-10 rounded-sm border px-4 text-sm transition-colors",
                        flavor === f
                          ? "border-fg bg-fg text-accent-fg"
                          : "border-border text-muted hover:text-fg",
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-sm border border-border">
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center text-muted hover:text-fg"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center font-mono tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center text-muted hover:text-fg"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => add(product, qty, flavor)}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-fg px-6 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 sm:flex-none sm:min-w-[200px]"
              >
                Add to cart
              </button>
            </div>

            <ul className="mt-8 space-y-2 border-t border-border pt-6">
              {product.specs.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="text-muted">{s.label}</span>
                  <span className="font-mono tabular-nums text-fg">{s.value}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-2">
              {[
                "Free shipping on orders over $100",
                "Ships from ENVE warehouse",
                "30-day satisfaction guarantee",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <Check className="size-3.5 shrink-0 text-fg" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-border pt-14">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
              You may also need
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
