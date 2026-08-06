import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart((s) =>
    s.items.reduce((n, i) => n + i.price * i.quantity, 0),
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close cart"
        onClick={close}
      />
      <aside
        className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-4 text-muted" />
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
              Cart
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-10 w-10 items-center justify-center rounded-sm text-muted hover:bg-elevated hover:text-fg"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm text-muted">Your cart is empty.</p>
              <button
                type="button"
                onClick={close}
                className="rounded-sm bg-fg px-4 py-2.5 text-sm font-medium text-accent-fg"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.flavor ?? ""}`}
                  className="flex gap-3 border-b border-border pb-4"
                >
                  <Link
                    to="/products/$slug"
                    params={{ slug: item.slug }}
                    onClick={close}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-border bg-elevated"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to="/products/$slug"
                          params={{ slug: item.slug }}
                          onClick={close}
                          className="text-sm font-medium text-fg hover:underline"
                        >
                          {item.name}
                        </Link>
                        {item.flavor && (
                          <p className="text-xs text-muted">{item.flavor}</p>
                        )}
                        <p className="mt-1 font-mono text-sm text-muted">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.productId, item.flavor)}
                        className="text-subtle hover:text-fg"
                        aria-label="Remove"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-sm border border-border hover:bg-elevated"
                        onClick={() =>
                          setQty(
                            item.productId,
                            item.quantity - 1,
                            item.flavor,
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-sm border border-border hover:bg-elevated"
                        onClick={() =>
                          setQty(
                            item.productId,
                            item.quantity + 1,
                            item.flavor,
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-5 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono text-base font-medium tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mb-4 text-xs text-subtle">
              Shipping calculated at checkout. Free over $100.
            </p>
            <button
              type="button"
              className="w-full rounded-sm bg-fg py-3.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 active:scale-[0.99]"
              onClick={() => {
                toast.success("Order placed — thanks for riding with ENVE Fuel.", {
                  description: "Demo checkout complete. Cart cleared.",
                });
                clear();
                close();
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
