export default function Loading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        padding: "0 clamp(16px, 4vw, 80px)",
      }}
    >
      {/* Nav skeleton */}
      <div
        style={{
          height: "60px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div className="skeleton" style={{ width: "130px", height: "22px", borderRadius: "6px" }} />
        <div className="skeleton" style={{ width: "80px", height: "22px", borderRadius: "999px" }} />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Hero skeleton */}
        <div style={{ textAlign: "center", padding: "80px 0 60px" }}>
          <div className="skeleton" style={{ width: "180px", height: "28px", borderRadius: "999px", margin: "0 auto 24px" }} />
          <div className="skeleton" style={{ width: "60%", height: "52px", borderRadius: "10px", margin: "0 auto 16px" }} />
          <div className="skeleton" style={{ width: "40%", height: "20px", borderRadius: "6px", margin: "0 auto 36px" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="skeleton" style={{ width: "50px", height: "30px", borderRadius: "6px", marginBottom: "6px" }} />
                <div className="skeleton" style={{ width: "60px", height: "14px", borderRadius: "4px" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Search skeleton */}
        <div className="skeleton" style={{ height: "50px", borderRadius: "12px", marginBottom: "24px" }} />

        {/* Category pills skeleton */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "36px", flexWrap: "wrap" }}>
          {[80, 60, 90, 70, 50].map((w, i) => (
            <div key={i} className="skeleton" style={{ width: `${w}px`, height: "36px", borderRadius: "999px" }} />
          ))}
        </div>

        {/* Grid skeleton */}
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
                <div className="skeleton" style={{ height: "18px", width: "70%", marginBottom: "10px" }} />
                <div className="skeleton" style={{ height: "13px", width: "90%", marginBottom: "6px" }} />
                <div className="skeleton" style={{ height: "13px", width: "60%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
