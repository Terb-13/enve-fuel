import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/#shop", label: "Shop Fuel" },
  { href: "/#gels", label: "Gels" },
  { href: "/#hydration", label: "Hydration" },
  { href: "/#chews", label: "Chews" },
  { href: "/#science", label: "Science" },
];

export function Header() {
  const openCart = useCart((s) => s.open);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isPending } = useCurrentUserState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-[var(--grok-banner-h,0px)] z-40 border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-bg/90 backdrop-blur-md"
          : "border-transparent bg-bg/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src="/brand/enve-logo-light.jpg"
            alt="ENVE"
            className="h-7 w-auto object-contain sm:h-8"
          />
          <span className="hidden h-4 w-px bg-border-strong sm:block" />
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted sm:inline">
            Fuel
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-elevated" />
          ) : user ? (
            <SignedIn>
              <UserButton />
            </SignedIn>
          ) : (
            <SignedOut>
              <Link
                to="/login"
                className="hidden rounded-sm px-3 py-2 text-sm text-muted transition-colors hover:text-fg sm:inline"
              >
                Sign in
              </Link>
            </SignedOut>
          )}

          <button
            type="button"
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-sm text-fg transition-colors hover:bg-elevated"
            aria-label={`Open cart${count ? `, ${count} items` : ""}`}
          >
            <ShoppingBag className="size-5" strokeWidth={1.75} />
            {count > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-fg px-1 font-mono text-[10px] font-semibold text-accent-fg">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-sm text-fg md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border py-3 text-sm text-fg last:border-0"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm text-muted"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
