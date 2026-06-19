import { useState } from "react";
import { STORE_CONFIG } from "../config";

function Stars({ rating }) {
  return (
    <span style={{ color: STORE_CONFIG.accentColor, fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#6b7280", marginLeft: 4, fontWeight: 500 }}>{rating}</span>
    </span>
  );
}

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 16px 40px rgba(15,76,129,0.18)"
          : "0 2px 12px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        transform: hovered ? "translateY(-5px)" : "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={imgError ? "https://placehold.co/400x200?text=No+Image" : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
        />
        {product.badge && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            background: STORE_CONFIG.accentColor, color: "#fff",
            borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700,
          }}>
            {product.badge}
          </span>
        )}
        <span style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(15,76,129,0.88)", color: "#fff",
          borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600,
          backdropFilter: "blur(4px)",
        }}>
          {product.store}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{
          fontSize: 10, fontWeight: 800, color: STORE_CONFIG.primaryColor,
          textTransform: "uppercase", letterSpacing: 1.2,
        }}>
          {product.category}
        </div>

        <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111827", lineHeight: 1.3, margin: 0 }}>
          {product.name}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            ({product.reviews?.toLocaleString()})
          </span>
        </div>

        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.55, flex: 1, margin: "4px 0 0" }}>
          {product.description}
        </p>

        {/* Price + CTA */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 23, fontWeight: 900, color: "#111827" }}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>
          {product.commission && (
            <div style={{ fontSize: 11, color: "#10b981", fontWeight: 700, marginBottom: 10 }}>
              ✓ Commission: {product.commission}
            </div>
          )}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", textAlign: "center",
              background: STORE_CONFIG.primaryColor, color: "#fff",
              borderRadius: 10, padding: "11px 0",
              fontWeight: 700, fontSize: 14,
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0a3761"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = STORE_CONFIG.primaryColor; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Shop Now →
          </a>
        </div>
      </div>
    </div>
  );
}
