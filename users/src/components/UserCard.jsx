import { useState } from "react";
import Avatar from "./Avatar";
import Icon from "./Icon";

export default function UserCard({ user, index, onView, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 16, padding: 20,
        border: `1.5px solid ${hovered ? "#D0D8FF" : "#F0F0F5"}`,
        boxShadow: hovered ? "0 8px 32px rgba(61,90,254,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        animation: `fadeSlideIn 0.3s ease ${index * 0.03}s both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>

        <div
          onClick={onView}
          style={{ display: "flex", flex: 1, gap: 14, minWidth: 0, alignItems: "flex-start", cursor: "pointer" }}
        >
          <Avatar name={user.name} size={48} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              margin: "0 0 3px", fontFamily: "'Playfair Display', serif",
              fontSize: 17, color: "#0A0F1E",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {user.name}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "#3D5AFE" }}><Icon name="building" size={12} /></span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#888",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {user.company?.name || "—"}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          <IconBtn icon="user"  color="#3D5AFE" title="View details" onClick={onView} />
          <IconBtn icon="trash" color="#E74C3C" title="Delete user"  onClick={onDelete} />
        </div>
      </div>

      <div onClick={onView} style={{ display: "flex", flexDirection: "column", gap: 8, cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#3D5AFE", flexShrink: 0 }}><Icon name="mail" size={14} /></span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {user.email}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#3D5AFE", flexShrink: 0 }}><Icon name="map" size={14} /></span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555" }}>
            {user.address?.city || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ icon, color, title, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onClick={(ev) => { ev.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${color}20` : "none",
        border: "none", cursor: "pointer", color,
        padding: 6, borderRadius: 6, display: "flex", alignItems: "center",
        transition: "background 0.15s",
      }}
    >
      <Icon name={icon} size={15} />
    </button>
  );
}