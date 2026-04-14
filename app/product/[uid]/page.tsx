import type { Metadata } from "next";
import Link from "next/link";
import { getProductByUid } from "@/lib/fetchProducts";
import { BackButton, VisitButton } from "@/app/components/ProductDetailUI";

/* ─── Generate metadata ─────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}): Promise<Metadata> {
  const { uid } = await params;
  const product = await getProductByUid(uid);
  return {
    title: product
      ? `${product.product_name} — Startup Showcase`
      : "Product Not Found",
    description: product?.tagline ?? "Explore this startup on Startup Showcase.",
  };
}

/* ─── Info row helper ────────────────────────────────────────────────────── */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <div>
        <div
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "15px",
            color: "var(--text-primary)",
            fontWeight: 500,
            marginTop: "2px",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const product = await getProductByUid(uid);

  /* ── Not found ─────────────────────────────────────────── */
  if (!product) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "var(--bg-primary)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "72px", marginBottom: "24px" }}>🔍</div>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Startup Not Found
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "32px",
            maxWidth: "400px",
          }}
        >
          We couldn&apos;t find a startup with that ID. It may have been removed
          or the link is incorrect.
        </p>
        <Link
          href="/"
          style={{
            padding: "12px 28px",
            background:
              "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
            color: "#fff",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          ← Back to Showcase
        </Link>
      </main>
    );
  }

  /* ── Found ─────────────────────────────────────────────── */
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Nav */}
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
            maxWidth: "1100px",
            margin: "0 auto",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "18px",
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textDecoration: "none",
            }}
          >
            🚀 StartupHub
          </Link>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Product Detail
          </span>
        </div>
      </nav>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 80px) 80px",
        }}
      >
        {/* Client-side back button */}
        <BackButton />

        {/* Hero image */}
        {product.product_image?.url && (
          <div
            className="animate-in"
            style={{
              width: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "40px",
              border: "1px solid var(--border)",
              maxHeight: "420px",
              position: "relative",
            }}
          >
            <img
              src={product.product_image.url}
              alt={product.product_name}
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background:
                  "linear-gradient(to top, var(--bg-primary), transparent)",
              }}
            />
          </div>
        )}

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr min(340px, 35%)",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* ── Left column ─────────────────────────── */}
          <div>
            {product.category?.title && (
              <span
                className="animate-in"
                style={{
                  display: "inline-block",
                  background: "rgba(99,102,241,0.15)",
                  color: "var(--accent-primary)",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(99,102,241,0.3)",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {product.category.title}
              </span>
            )}

            <h1
              className="animate-in delay-1"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              {product.product_name}
            </h1>

            {product.tagline && (
              <p
                className="animate-in delay-2"
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                  borderLeft: "3px solid var(--accent-primary)",
                  paddingLeft: "16px",
                }}
              >
                {product.tagline}
              </p>
            )}

            {product.description && (
              <div
                className="animate-in delay-3"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "28px",
                  marginBottom: "32px",
                }}
              >
                <h2
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--accent-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "14px",
                  }}
                >
                  About
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {product.description}
                </p>
              </div>
            )}

            {/* Client-side animated CTA */}
            {product.website_url && (
              <VisitButton href={product.website_url} />
            )}
          </div>

          {/* ── Right column (sidebar) ───────────────── */}
          <aside
            className="animate-in delay-2"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              position: "sticky",
              top: "80px",
            }}
          >
            {/* ── Startup block ── */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--accent-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "10px",
              }}
            >
              Startup
            </div>

            {/* Startup name */}
            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "4px",
              }}
            >
              {product.product_name}
            </div>

            {product.category?.title && (
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(99,102,241,0.12)",
                  color: "var(--accent-primary)",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(99,102,241,0.25)",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {product.category.title}
              </span>
            )}

            {/* ── Divider ── */}
            {product.founder?.name && (
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "var(--border)",
                  margin: "4px 0 20px",
                }}
              />
            )}

            {/* ── Founder block ── */}
            {product.founder?.name && (
              <>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--accent-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "12px",
                  }}
                >
                  Founder
                </div>

                {/* Avatar + name row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: product.founder.bio ? "14px" : "0",
                  }}
                >
                  {/* Avatar placeholder */}
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {product.founder.avatar?.url ? (
                      <img
                        src={product.founder.avatar.url}
                        alt={product.founder.name}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "👤"
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {product.founder.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                      }}
                    >
                      Founder &amp; CEO
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {product.founder.bio && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                    }}
                  >
                    {product.founder.bio}
                  </p>
                )}
              </>
            )}

            {!product.category?.title && !product.founder?.name && (
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  paddingTop: "8px",
                }}
              >
                No additional info available.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
