import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative aspect-[4/3] overflow-hidden bg-bg"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {product.compareAt && (
          <span className="absolute left-3 top-3 rounded-sm bg-race px-2 py-1 font-display text-[11px] font-semibold uppercase tracking-wider text-fg">
            Save {formatPrice(product.compareAt - product.price)}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5">
          {product.badges.slice(0, 3).map((b) => (
            <span
              key={b}
              className="rounded-sm border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted"
            >
              {b}
            </span>
          ))}
        </div>

        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="mt-3"
        >
          <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-fg sm:text-2xl">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{product.tagline}</p>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="font-mono text-lg font-medium tabular-nums">
              {formatPrice(product.price)}
            </p>
            {product.compareAt && (
              <p className="font-mono text-xs text-subtle line-through">
                {formatPrice(product.compareAt)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => add(product)}
            className="inline-flex h-11 items-center gap-2 rounded-sm bg-fg px-4 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <Plus className="size-4" strokeWidth={2.25} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
