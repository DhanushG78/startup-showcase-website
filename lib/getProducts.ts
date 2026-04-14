export const getProducts = async () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const response = await fetch(`${origin}/api/products`, { cache: "no-store" });

  if (!response.ok) {
    const message = await response.text().catch(() => "Failed to fetch products");
    throw new Error(message || "Failed to fetch products");
  }

  return (await response.json()) ?? [];
};
