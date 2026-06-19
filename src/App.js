import { useState } from "react";
import { STORE_CONFIG, CATEGORIES } from "./config";
import { useProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [showAdmin, setShowAdmin] = useState(false);

  // Filter + sort products
  const filtered = products
    .filter((p) => category === "All" || p.category === category)
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "price-asc" ? a.price - b.price :
      sort === "price-desc" ? b.price - a.price :
      sort === "rating" ? b.rating - a.rating : 0
    );

  const handleAdminClick = () => {
    const pass = window.prompt("Enter admin password:");
    if (pass === null) return;
    if (pass === STORE_CONFIG.adminPassword) {
      setShowAdmin(true);
    } else {
      alert("Incorrect password.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* ── Header ── */}
      <header style={{
        background: STORE_CONFIG.primaryColor, color: "#fff",
        padding: "0 24px", position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 16px rgba(15,76,129,0.3)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: -0.5 }}>
            {STORE_CONFIG.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, opacity: 0.65 }}>{products.length} products</span>
            <button onClick={handleAdminClick}
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
              ⚙️ Admin
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div style={{
        background: `linear-gradient(135deg, ${STORE_CONFIG.primaryColor} 0%, #1a6fb5 60%, #0d3d6b 100%)`,
        color: "#fff", textAlign: "center", padding: "56px 24px 48px",
      }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", opacity: 0.65, marginBottom: 14 }}>
          Affiliate Picks
        </div>
        <h1 style={{ margin: "0 0 14px", fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
          {STORE_CONFIG.tagline}
        </h1>
        <p style={{ margin: "0 auto 32px", maxWidth: 520, opacity: 0.82, fontSize: 16, lineHeight: 1.65 }}>
          {STORE_CONFIG.description}
        </p>
        {/* Search */}
        <div style={{ display: "flex", maxWidth: 500, margin: "0 auto", gap: 10 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.5, fontSize: 16 }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              style={{ width: "100%", padding: "13px 18px 13px 42px", borderRadius: 11, border: "none", fontSize: 15, outline: "none", boxSizing: "border-box" }}
            />
          </div>
          {search && (
            <button onClick={() => setSearch("")}
              style={{ background: "rgba(255,255,255,0.18)", border: "none", color: "#fff", borderRadius: 11, padding: "0 18px", cursor: "pointer", fontWeight: 700, fontSize: 18 }}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", position: "sticky", top: 64, zIndex: 90, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "12px 0" }}>
          {/* Category pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                style={{
                  padding: "6px 16px", borderRadius: 20,
                  border: `1.5px solid ${category === c ? STORE_CONFIG.primaryColor : "#d1d5db"}`,
                  background: category === c ? STORE_CONFIG.primaryColor : "#fff",
                  color: category === c ? "#fff" : "#374151",
                  fontWeight: category === c ? 700 : 500,
                  cursor: "pointer", fontSize: 13, transition: "all 0.15s",
                }}>
                {c}
              </button>
            ))}
          </div>
          {/* Sort */}
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            style={{ padding: "7px 14px", borderRadius: 9, border: "1.5px solid #d1d5db", fontSize: 13, cursor: "pointer", background: "#fff", outline: "none" }}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 60px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#374151", marginBottom: 8 }}>No products found</div>
            <div>Try a different search term or category</div>
            {search && (
              <button onClick={() => setSearch("")}
                style={{ marginTop: 20, background: STORE_CONFIG.primaryColor, color: "#fff", border: "none", borderRadius: 9, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 22, color: "#6b7280", fontSize: 14 }}>
              Showing <strong style={{ color: "#111" }}>{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}
              {category !== "All" && <> in <strong style={{ color: STORE_CONFIG.primaryColor }}>{category}</strong></>}
              {search && <> matching "<strong style={{ color: "#111" }}>{search}</strong>"</>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(285px, 1fr))", gap: 24 }}>
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer style={{ background: "#1e293b", color: "#94a3b8", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontWeight: 800, color: "#f1f5f9", fontSize: 18, marginBottom: 4 }}>
            {STORE_CONFIG.name}
          </div>
          <div style={{ fontSize: 13, marginBottom: 20, opacity: 0.7 }}>{STORE_CONFIG.tagline}</div>
          <div style={{ background: "#0f172a", borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 6, fontSize: 14 }}>
              📋 Affiliate Disclosure
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#94a3b8" }}>
              {STORE_CONFIG.name} participates in affiliate marketing programs including Amazon Associates and others. When you click a product link and make a purchase, we may earn a small commission at no additional cost to you. We only feature products we genuinely believe provide value.
            </p>
          </div>
          <div style={{ borderTop: "1px solid #334155", paddingTop: 16, fontSize: 12, color: "#475569" }}>
            © {new Date().getFullYear()} {STORE_CONFIG.name} · All rights reserved
          </div>
        </div>
      </footer>

      {/* Admin Panel Modal */}
      {showAdmin && (
        <AdminPanel
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
          resetToDefaults={resetToDefaults}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}
