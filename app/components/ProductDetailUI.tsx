"use client";

import Link from "next/link";

/* ─── Animated Back Button ───────────────────────────────────────────────── */
export function BackButton() {
  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        color: "var(--text-secondary)",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
        padding: "8px 16px",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.03)",
        transition: "all 0.2s",
        marginBottom: "36px",
        marginTop: "8px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent-primary)";
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
      }}
    >
      ← Back to Showcase
    </Link>
  );
}

/* ─── Animated Visit Website Button ─────────────────────────────────────── */
export function VisitButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-in delay-4"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 28px",
        background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
        color: "#fff",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "15px",
        boxShadow: "0 8px 32px var(--accent-glow)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px var(--accent-glow)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px var(--accent-glow)";
      }}
    >
      🌐 Visit Website →
    </a>
  );
}
