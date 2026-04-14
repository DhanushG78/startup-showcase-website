import Stack from "@/lib/contentstack";

export interface Product {
  uid: string;
  product_name: string;
  tagline?: string;
  description?: string;
  website_url?: string;
  product_image?: { url: string; title?: string };
  category?: { uid: string; title: string };
  founder?: { uid: string; name: string; bio?: string; avatar?: { url: string } };
}

/** Safely deep-clone via JSON, returning the fallback if the value is null/undefined/unserializable. */
function safeClone<T>(value: unknown, fallback: T): T {
  if (value === undefined || value === null) return fallback;
  try {
    return JSON.parse(JSON.stringify(value)) as T;
  } catch {
    return fallback;
  }
}

/**
 * Fetch all products directly from the Contentstack Stack (server-side only).
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const Query = (Stack as any).ContentType("product").Query();
    Query.includeReference(["category", "founder"]);
    const result = await Query.toJSON().find();

    // SDK v3 returns [entriesArray, count] — handle both shapes safely
    let entries: unknown = result?.[0];
    if (entries && typeof entries === "object" && !Array.isArray(entries)) {
      // Some versions wrap in { entries: [] }
      entries = (entries as { entries?: unknown }).entries ?? entries;
    }
    if (!Array.isArray(entries)) entries = [];

    return safeClone<Product[]>(entries, []);
  } catch (err) {
    console.error("[getAllProducts] error:", err);
    return [];
  }
}

/**
 * Fetch a single product by UID (server-side only).
 */
export async function getProductByUid(uid: string): Promise<Product | null> {
  try {
    const Query = (Stack as any).ContentType("product").Query();
    Query.where("uid", uid);
    Query.includeReference(["category", "founder"]);
    const result = await Query.toJSON().find();
    const entry = result[0]?.[0] ?? result[0]?.entries?.[0] ?? null;
    return entry ? safeClone<Product>(entry, null as unknown as Product) : null;
  } catch (err) {
    console.error("[getProductByUid] error:", err);
    return null;
  }
}
