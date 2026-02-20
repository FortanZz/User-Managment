import Icon from "./Icon";

export default function Modal({ title, children, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(10,15,30,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "20px", backdropFilter: "blur(4px)",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(ev) => ev.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16, width: "100%", maxWidth: 500,
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          animation: "slideUp 0.2s ease", overflow: "hidden",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: "1px solid #F0F0F5",
        }}>
          <h2 style={{
            margin: 0, fontFamily: "'Playfair Display', serif",
            fontSize: 20, color: "#0A0F1E",
          }}>
            {title}
          </h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#888", padding: 4, display: "flex", alignItems: "center",
          }}>
            <Icon name="x" size={20} />
          </button>
        </div>

        <div style={{ padding: "24px" }}>{children}</div>
      </div>
    </div>
  );
}