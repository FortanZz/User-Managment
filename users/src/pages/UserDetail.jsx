import { useState } from "react";
import Modal    from "../components/Modal";
import UserForm from "../components/UserForm";
import Avatar   from "../components/Avatar";
import Icon     from "../components/Icon";

const cardStyle = {
  background: "#fff", borderRadius: 16, padding: "20px 24px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F0F0F5",
};

function InfoRow({ icon, label, value }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      padding: "14px 0", borderBottom: "1px solid #F0F0F5",
    }}>
      <span style={{ color: "#3D5AFE", marginTop: 2, flexShrink: 0 }}>
        <Icon name={icon} size={18} />
      </span>
      <div>
        <div style={{
          fontSize: 11, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "#AAA", marginBottom: 2,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {label}
        </div>
        <div style={{ fontSize: 15, color: "#0A0F1E", fontFamily: "'DM Sans', sans-serif" }}>
          {value || "—"}
        </div>
      </div>
    </div>
  );
}

export default function UserDetail({ user, navigate, dispatch }) {
  const [editing, setEditing] = useState(false);

  if (!user) return (
    <div style={{ textAlign: "center", padding: 80, color: "#888", fontFamily: "'DM Sans', sans-serif" }}>
      User not found.{" "}
      <button onClick={() => navigate("/")} style={{
        color: "#3D5AFE", background: "none", border: "none", cursor: "pointer", fontWeight: 600,
      }}>
        Go back
      </button>
    </div>
  );

  function handleUpdate(updated) {
    dispatch({ type: "UPDATE_USER", payload: { ...updated, id: user.id } });
    setEditing(false);
  }

  return (
    <div>
      {editing && (
        <Modal title="Edit User" onClose={() => setEditing(false)}>
          <UserForm
            initial={user}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
            submitLabel="Update"
          />
        </Modal>
      )}

      <button onClick={() => navigate("/")} style={{
        display: "flex", alignItems: "center", gap: 8, background: "none",
        border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        fontSize: 14, fontWeight: 600, color: "#3D5AFE", padding: "0 0 24px",
      }}>
        <Icon name="back" size={16} /> Back to Users
      </button>

      <div style={{
        background: "linear-gradient(135deg,#3D5AFE 0%,#7B2FF7 100%)",
        borderRadius: 20, padding: "40px 32px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 24,
        flexWrap: "wrap", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 200, height: 200,
          borderRadius: "50%", background: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }} />

        <Avatar name={user.name} size={80} />

        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{
            margin: "0 0 6px", color: "#fff",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px,4vw,32px)",
          }}>
            {user.name}
          </h1>
          <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            @{user.username || user.name.toLowerCase().replace(/\s+/g, ".")}
          </p>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            {user.company?.name}
          </p>
        </div>

        <button onClick={() => setEditing(true)} style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)",
          color: "#fff", padding: "10px 18px", borderRadius: 10, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
        }}>
          <Icon name="edit" size={15} /> Edit
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>

        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#0A0F1E" }}>
            Contact
          </h3>
          <InfoRow icon="mail"  label="Email"   value={user.email} />
          <InfoRow icon="phone" label="Phone"   value={user.phone} />
          <InfoRow icon="globe" label="Website" value={user.website} />
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#0A0F1E" }}>
            Address
          </h3>
          <InfoRow icon="map"      label="Street" value={user.address?.street} />
          <InfoRow icon="map"      label="Suite"  value={user.address?.suite} />
          <InfoRow icon="building" label="City"   value={[user.address?.city, user.address?.zipcode].filter(Boolean).join(" ")} />
        </div>

        <div style={{ ...cardStyle, gridColumn: "1 / -1" }}>
          <h3 style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#0A0F1E" }}>
            Company
          </h3>
          <InfoRow icon="building" label="Name"        value={user.company?.name} />
          <InfoRow icon="globe"    label="Catch Phrase" value={user.company?.catchPhrase} />
          <InfoRow icon="building" label="Business"    value={user.company?.bs} />
        </div>

      </div>
    </div>
  );
}