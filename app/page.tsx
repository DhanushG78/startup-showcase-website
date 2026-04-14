import { Suspense } from "react";
import { getAllProducts } from "@/lib/fetchProducts";
import ProductsGrid from "@/app/components/ProductsGrid";

/* ─── Hero section ───────────────────────────────────────────────────────── */
function Hero({ count }: { count: number }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 0 60px",
        position: "relative",
      }}
    >
      {/* Background glow orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <h1
        className="animate-in"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #f1f5f9 0%, #a5b4fc 50%, #c4b5fd 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Startup Showcase
      </h1>

      <p
        className="animate-in delay-1"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "var(--text-secondary)",
          maxWidth: "520px",
          margin: "0 auto 36px",
          lineHeight: 1.7,
        }}
      >
        Discover{" "}
        <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
          {count} innovative startups
        </span>{" "}
        built by visionary founders. Browse, filter, and explore in real time.
      </p>

      {/* Stats row */}
      <div
        className="animate-in delay-2"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Startups", value: count },
          { label: "Categories", value: "∞" },
          { label: "Real-time", value: "✓" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                marginTop: "4px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Loading skeleton for grid ─────────────────────────────────────────── */
function GridSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "24px",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div className="skeleton" style={{ height: "190px" }} />
          <div style={{ padding: "20px" }}>
            <div
              className="skeleton"
              style={{ height: "18px", width: "70%", marginBottom: "10px" }}
            />
            <div
              className="skeleton"
              style={{ height: "13px", width: "90%", marginBottom: "6px" }}
            />
            <div className="skeleton" style={{ height: "13px", width: "60%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
      }}
    >
      {/* Top nav bar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8, 11, 20, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          padding: "0 clamp(16px, 4vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            style={{
              fontSize: "18px",
              fontWeight: 800,
              background: "var(--gradient-hero)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            🚀 StartupHub
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "999px",
              padding: "5px 12px",
              fontSize: "12px",
              color: "var(--accent-primary)",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
            Live CMS
          </div>
        </div>
      </nav>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 80px) 80px",
        }}
      >
        <Hero count={products.length} />

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
            marginBottom: "48px",
          }}
        />

        <Suspense fallback={<GridSkeleton />}>
          <ProductsGrid products={products} />
        </Suspense>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "24px clamp(16px, 4vw, 80px)",
          textAlign: "center",
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        <span>
          Built with{" "}
          <span style={{ color: "var(--accent-primary)" }}>Contentstack</span>{" "}
          &amp; Next.js — Data refreshes on every request
        </span>
      </footer>
    </main>
  );
}
