"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Product } from "@/lib/fetchProducts";

/* ─── Category pill ──────────────────────────────────────────────────────── */
function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        borderRadius: "999px",
        border: active
          ? "1.5px solid var(--accent-primary)"
          : "1.5px solid var(--border)",
        background: active
          ? "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
          : "rgba(255,255,255,0.03)",
        color: active ? "#fff" : "var(--text-secondary)",
        fontWeight: active ? 600 : 400,
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap" as const,
        boxShadow: active ? "0 0 16px var(--accent-glow)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--accent-primary)";
          (e.currentTarget as HTMLButtonElement).style.color =
            "var(--text-primary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--border)";
          (e.currentTarget as HTMLButtonElement).style.color =
            "var(--text-secondary)";
        }
      }}
    >
      {label}
    </button>
  );
}

/* ─── Product card ───────────────────────────────────────────────────────── */
function ProductCard({
  product,
  idx,
}: {
  product: Product;
  idx: number;
}) {
  const delay =
    idx < 6 ? `delay-${Math.min((idx % 6) + 1, 6)}` : "";

  return (
    <Link
      href={`/product/${product.uid}`}
      style={{ textDecoration: "none" }}
      className={`animate-in ${delay}`}
    >
      <article
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "all 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-6px)";
          el.style.borderColor = "var(--border-hover)";
          el.style.boxShadow =
            "0 20px 60px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(99,102,241,0.2)";
          el.style.background = "var(--bg-card-hover)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
          el.style.background = "var(--bg-card)";
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "190px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #1e1b4b, #0e0f1f)",
          }}
        >
          {product.product_image?.url ? (
            <img
              src={product.product_image.url}
              alt={product.product_name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1)";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1e1b4b 0%, #0c0a2e 100%)",
                fontSize: "48px",
              }}
            >
              🚀
            </div>
          )}
          {/* Category badge */}
          {product.category?.title && (
            <span
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "rgba(99,102,241,0.85)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "999px",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}
            >
              {product.category.title}
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h2
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "8px",
              lineHeight: 1.3,
            }}
          >
            {product.product_name}
          </h2>

          {product.tagline && (
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--text-secondary)",
                lineHeight: 1.55,
                flex: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.tagline}
            </p>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: "16px",
              paddingTop: "14px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {product.founder?.name ? (
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                👤 {product.founder.name}
              </span>
            ) : (
              <span />
            )}
            <span
              style={{
                fontSize: "12px",
                color: "var(--accent-primary)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── Skeleton card ──────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <div className="skeleton" style={{ height: "190px" }} />
      <div style={{ padding: "20px" }}>
        <div className="skeleton" style={{ height: "18px", width: "70%", marginBottom: "10px" }} />
        <div className="skeleton" style={{ height: "13px", width: "90%", marginBottom: "6px" }} />
        <div className="skeleton" style={{ height: "13px", width: "60%" }} />
      </div>
    </div>
  );
}

/* ─── Empty state ────────────────────────────────────────────────────────── */
function EmptyState({ query }: { query: string }) {
  return (
    <div
      className="animate-fade"
      style={{
        gridColumn: "1 / -1",
        textAlign: "center",
        padding: "80px 24px",
        color: "var(--text-muted)",
      }}
    >
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔍</div>
      <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
        No results found
      </h3>
      <p style={{ fontSize: "14px" }}>
        {query
          ? `No startups match "${query}". Try a different keyword.`
          : "No startups match the selected category."}
      </p>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function ProductsGrid({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.category?.title) cats.add(p.category.title);
    });
    return ["All", ...Array.from(cats).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      const matchesCat =
        activeCategory === "All" || p.category?.title === activeCategory;
      const matchesQuery =
        !q ||
        p.product_name?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.category?.title?.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <div>
      {/* Search */}
      <div style={{ position: "relative", marginBottom: "24px" }}>
        <span
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "18px",
            pointerEvents: "none",
          }}
        >
          🔍
        </span>
        <input
          id="product-search"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setActiveCategory("All");
          }}
          placeholder="Search startups by name, tagline, or category…"
          style={{
            width: "100%",
            padding: "14px 20px 14px 48px",
            background: "var(--bg-card)",
            border: "1.5px solid var(--border)",
            borderRadius: "12px",
            color: "var(--text-primary)",
            fontSize: "15px",
            outline: "none",
            fontFamily: "inherit",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "var(--accent-primary)";
            (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px var(--accent-glow)";
          }}
          onBlur={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "var(--border)";
            (e.target as HTMLInputElement).style.boxShadow = "none";
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "6px",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "4px 8px",
              fontSize: "12px",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "36px",
        }}
      >
        {categories.map((cat) => (
          <CategoryPill
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => {
              setActiveCategory(cat);
              setSearchQuery("");
            }}
          />
        ))}
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          Showing{" "}
          <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
            {filtered.length}
          </span>{" "}
          of {products.length} startups
        </p>
        {(searchQuery || activeCategory !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "4px 10px",
              cursor: "pointer",
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {filtered.length === 0 ? (
          <EmptyState query={searchQuery} />
        ) : (
          filtered.map((product, idx) => (
            <ProductCard key={product.uid} product={product} idx={idx} />
          ))
        )}
      </div>
    </div>
  );
}
