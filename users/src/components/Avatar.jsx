const PALETTE = [
  ["#FF6B6B", "#fff"], ["#4ECDC4", "#fff"], ["#45B7D1", "#fff"],
  ["#96CEB4", "#fff"], ["#F7DC6F", "#333"], ["#DDA0DD", "#fff"],
  ["#98D8C8", "#333"], ["#BB8FCE", "#fff"], ["#85C1E9", "#fff"], ["#F0A500", "#fff"],
];

export default function Avatar({ name, size = 40 }) {
  const idx = name ? name.charCodeAt(0) % PALETTE.length : 0;
  const [bg, fg] = PALETTE[idx];
  const initials = name
    ? name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase()
    : "?";

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: fg, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
      fontSize: size * 0.36, letterSpacing: "0.02em",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    }}>
      {initials}
    </div>
  );
}