import { useState } from "react";
import { STORE_CONFIG, CATEGORIES } from "../config";

const EMPTY_FORM = {
  name: "", category: "Electronics", price: "", commission: "",
  image: "", description: "", affiliateUrl: "", badge: "",
  rating: "4.5", reviews: "0", store: "Amazon",
};

function Field({ label, value, onChange, type = "text", placeholder, full, options }) {
  const inputStyle = {
    width: "100%", padding: "9px 12px",
    border: "1.5px solid #d1d5db", borderRadius: 8,
    fontSize: 14, outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", transition: "border-color 0.15s",
  };

  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3}
          style={{ ...inputStyle, resize: "vertical" }} />
      ) : options ? (
        <select value={value} onChange={onChange} style={inputStyle}>
          {options.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={inputStyle} />
      )}
    </div>
  );
}

export default function AdminPanel({ products, addProduct, updateProduct, deleteProduct, resetToDefaults, onClose }) {
  const [tab, setTab] = useState("list");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleEdit = (p) => {
    setForm({ ...EMPTY_FORM, ...p, badge: p.badge || "", price: String(p.price), rating: String(p.rating), reviews: String(p.reviews) });
    setEditId(p.id);
    setTab("form");
  };

  const handleNew = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setTab("form");
  };

  const handleSave = () => {
    if (!form.name.trim()) return alert("Product name is required.");
    if (!form.affiliateUrl.trim()) return alert("Affiliate URL is required.");
    if (!form.price) return alert("Price is required.");

    const product = {
      ...form,
      price: parseFloat(form.price) || 0,
      rating: parseFloat(form.rating) || 4.5,
      reviews: parseInt(form.reviews) || 0,
      badge: form.badge.trim() || null,
    };

    if (editId) {
      updateProduct(editId, product);
    } else {
      addProduct(product);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setForm(EMPTY_FORM);
    setEditId(null);
    setTab("list");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteProduct(id);
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 18, width: "min(95vw, 820px)", maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.35)" }}>

        {/* Header */}
        <div style={{ background: STORE_CONFIG.primaryColor, color: "#fff", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>⚙️ Store Admin</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
              {products.length} products · Changes save automatically
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
            ✕ Close
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
          {[
            { key: "list", label: `📋 All Products (${products.length})` },
            { key: "form", label: editId ? "✏️ Edit Product" : "➕ Add Product" },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => key === "form" ? handleNew() : setTab("list")}
              style={{ padding: "13px 22px", border: "none", background: "none", fontWeight: tab === key ? 700 : 500, color: tab === key ? STORE_CONFIG.primaryColor : "#6b7280", borderBottom: tab === key ? `2.5px solid ${STORE_CONFIG.primaryColor}` : "2.5px solid transparent", cursor: "pointer", fontSize: 14, transition: "color 0.15s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto", flex: 1, padding: 24 }}>

          {/* ── Product List ── */}
          {tab === "list" && (
            <div>
              <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
                  style={{ flex: 1, padding: "9px 14px", border: "1.5px solid #d1d5db", borderRadius: 9, fontSize: 14, outline: "none" }} />
                <button onClick={handleNew} style={{ background: STORE_CONFIG.accentColor, border: "none", borderRadius: 9, padding: "9px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14, whiteSpace: "nowrap" }}>
                  + Add Product
                </button>
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
                  <div style={{ fontWeight: 600, color: "#374151" }}>No products found</div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filtered.map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 8px", borderRadius: 10, transition: "background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <img src={p.image || "https://placehold.co/60x60?text=?"} alt={p.name}
                      style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                      onError={e => e.target.src = "https://placehold.co/60x60?text=?"} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                        {p.category} · <strong>${parseFloat(p.price).toFixed(2)}</strong> · {p.store}
                        {p.badge && <span style={{ marginLeft: 8, background: "#fef3c7", color: "#92400e", borderRadius: 4, padding: "1px 6px", fontSize: 11, fontWeight: 700 }}>{p.badge}</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button onClick={() => handleEdit(p)}
                        style={{ background: "#dbeafe", border: "none", borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#1d4ed8" }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)}
                        style={{ background: "#fee2e2", border: "none", borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#dc2626" }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={resetToDefaults}
                  style={{ background: "none", border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, color: "#9ca3af" }}>
                  ↺ Reset to defaults
                </button>
              </div>
            </div>
          )}

          {/* ── Add / Edit Form ── */}
          {tab === "form" && (
            <div>
              <div style={{ marginBottom: 20, padding: "12px 16px", background: "#f0f9ff", borderRadius: 10, border: "1px solid #bae6fd", fontSize: 13, color: "#0369a1" }}>
                💡 All changes save automatically to your browser. Products will still be there after you refresh.
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Product Name *" value={form.name} onChange={f("name")} full />
                <Field label="Affiliate URL *" value={form.affiliateUrl} onChange={f("affiliateUrl")} type="url" placeholder="https://..." full />
                <Field label="Price ($) *" value={form.price} onChange={f("price")} type="number" placeholder="29.99" />
                <Field label="Commission" value={form.commission} onChange={f("commission")} placeholder="e.g. Up to 4%" />
                <Field label="Affiliate Store / Program" value={form.store} onChange={f("store")} placeholder="Amazon, ShareASale…" />
                <Field label="Badge (optional)" value={form.badge} onChange={f("badge")} placeholder="Best Seller, Deal, New…" />
                <Field label="Star Rating (0–5)" value={form.rating} onChange={f("rating")} type="number" placeholder="4.5" />
                <Field label="Number of Reviews" value={form.reviews} onChange={f("reviews")} type="number" placeholder="1250" />
                <Field label="Category" value={form.category} onChange={f("category")} options={CATEGORIES} />
                <Field label="Image URL" value={form.image} onChange={f("image")} type="url" placeholder="https://…" />
                <Field label="Description" value={form.description} onChange={f("description")} type="textarea" placeholder="Describe the product…" full />
              </div>

              {/* Preview */}
              {form.image && (
                <div style={{ marginTop: 20, padding: 16, background: "#f9fafb", borderRadius: 10, border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Image Preview</div>
                  <img src={form.image} alt="preview"
                    style={{ height: 120, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" }}
                    onError={e => { e.target.style.display = "none"; }} />
                </div>
              )}

              <div style={{ display: "flex", gap: 12, marginTop: 24, paddingTop: 20, borderTop: "1px solid #f3f4f6" }}>
                <button onClick={handleSave}
                  style={{ background: saved ? "#10b981" : STORE_CONFIG.primaryColor, color: "#fff", border: "none", borderRadius: 9, padding: "11px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15, transition: "background 0.2s" }}>
                  {saved ? "✓ Saved!" : editId ? "💾 Save Changes" : "➕ Add Product"}
                </button>
                <button onClick={() => { setTab("list"); setEditId(null); setForm(EMPTY_FORM); }}
                  style={{ background: "#f3f4f6", border: "none", borderRadius: 9, padding: "11px 20px", fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
