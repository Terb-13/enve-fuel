import { Link, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="relative flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] flex-col items-center justify-center px-4 py-16">
      <div className="enve-grid absolute inset-0 opacity-40" />
      <div className="relative w-full max-w-sm rounded-lg border border-border bg-surface p-8 shadow-soft">
        <Link to="/" className="mb-8 flex justify-center">
          <img
            src="/brand/enve-logo-light.jpg"
            alt="ENVE"
            className="h-8 w-auto object-contain"
          />
        </Link>
        <h1 className="text-center font-display text-2xl font-semibold uppercase tracking-wide">
          Sign in
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Access your ENVE Fuel account
        </p>

        <div className="mt-8 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                className="w-full rounded-sm border border-border-strong bg-bg px-4 py-3 text-sm font-medium text-fg transition-colors hover:bg-elevated"
              >
                Continue with {p.label}
              </button>
            ))
          ) : (
            <p className="text-center text-sm text-muted">
              Sign-in is disabled.
            </p>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-subtle">
          <Link to="/" className="underline-offset-2 hover:underline">
            Back to shop
          </Link>
        </p>
      </div>
    </main>
  );
}
