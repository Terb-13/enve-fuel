import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src="/brand/enve-logo-light.jpg"
            alt="ENVE"
            className="h-8 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            ENVE Fuel — performance nutrition designed with the same obsession
            we bring to carbon composites. Engineered for the riders who refuse
            average watts.
          </p>
          <a
            href="https://enve.com"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm font-medium text-fg underline-offset-4 hover:underline"
          >
            enve.com
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:justify-items-end">
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
              Shop
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a href="/#gels" className="hover:text-fg">
                  Gels
                </a>
              </li>
              <li>
                <a href="/#hydration" className="hover:text-fg">
                  Hydration
                </a>
              </li>
              <li>
                <a href="/#chews" className="hover:text-fg">
                  Chews
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
              Company
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a
                  href="https://enve.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-fg"
                >
                  ENVE Composites
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-fg">
                  Account
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
              Support
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Free shipping over $100</li>
              <li>Factory limited warranty</li>
              <li>Fuel@enve.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} ENVE Composites. All rights reserved.</p>
          <p>Demo storefront — performance nutrition concept.</p>
        </div>
      </div>
    </footer>
  );
}
