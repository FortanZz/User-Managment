import { useState, useMemo } from "react";
import Modal    from "../components/Modal";
import UserForm from "../components/UserForm";
import UserCard from "../components/UserCard";
import Icon     from "../components/Icon";

export default function UserList({ users, dispatch, navigate }) {
  const [search,       setSearch]       = useState("");
  const [sortField,    setSortField]    = useState(null);
  const [sortDir,      setSortDir]      = useState("asc");
  const [showAdd,      setShowAdd]      = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function handleSort(field) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
    if (sortField) {
      list = [...list].sort((a, b) => {
        const av = sortField === "company" ? (a.company?.name ?? "") : (a[sortField] ?? "");
        const bv = sortField === "company" ? (b.company?.name ?? "") : (b[sortField] ?? "");
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return list;
  }, [users, search, sortField, sortDir]);

  function handleAdd(user) {
    dispatch({
      type: "ADD_USER",
      payload: {
        ...user,
        id: Date.now(),
        username: user.name.toLowerCase().replace(/\s+/g, "."),
      },
    });
    setShowAdd(false);
  }

  function SortBtn({ field, label }) {
    const active = sortField === field;
    return (
      <button onClick={() => handleSort(field)} style={{
        background: active ? "rgba(61,90,254,0.1)" : "none",
        border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6,
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11,
        textTransform: "uppercase", letterSpacing: "0.08em",
        color: active ? "#3D5AFE" : "#888",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {label}
        <span style={{ opacity: active ? 1 : 0.35 }}>
          {active && sortDir === "desc" ? "↓" : "↑"}
        </span>
      </button>
    );
  }

  return (
    <div>
      {showAdd && (
        <Modal title="Add New User" onClose={() => setShowAdd(false)}>
          <UserForm
            onSubmit={handleAdd}
            onCancel={() => setShowAdd(false)}
            submitLabel="Add User"
          />
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete User" onClose={() => setDeleteTarget(null)}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#444", lineHeight: 1.6, marginTop: 0 }}>
            Are you sure you want to delete <strong>{deleteTarget.name}</strong>?
            This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
            <button onClick={() => setDeleteTarget(null)} style={{
              padding: "10px 20px", borderRadius: 8, border: "1.5px solid #E0E0EA",
              background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: 14, color: "#555",
            }}>Cancel</button>
            <button
              onClick={() => {
                dispatch({ type: "DELETE_USER", payload: deleteTarget.id });
                setDeleteTarget(null);
              }}
              style={{
                padding: "10px 20px", borderRadius: 8, border: "none",
                background: "#E74C3C", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: 14, color: "#fff",
              }}
            >Delete</button>
          </div>
        </Modal>
      )}

      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220, position: "relative" }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: "#AAA", pointerEvents: "none",
          }}>
            <Icon name="search" size={16} />
          </span>
          <input
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder="Search by name or email…"
            style={{
              width: "100%", padding: "11px 14px 11px 42px", borderRadius: 10,
              border: "1.5px solid #E0E0EA", fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, color: "#0A0F1E", outline: "none",
              background: "#FAFAFA", boxSizing: "border-box",
            }}
          />
        </div>
        <button onClick={() => setShowAdd(true)} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "11px 20px", borderRadius: 10, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg,#3D5AFE,#7B2FF7)", color: "#fff",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14,
          boxShadow: "0 4px 16px rgba(61,90,254,0.35)", whiteSpace: "nowrap",
        }}>
          <Icon name="plus" size={16} /> Add User
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#AAA", marginRight: 6 }}>
          Sort:
        </span>
        <SortBtn field="name"    label="Name" />
        <SortBtn field="email"   label="Email" />
        <SortBtn field="company" label="Company" />
        <span style={{ marginLeft: "auto", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#AAA" }}>
          {filtered.length} user{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 16 }}>
        {filtered.map((user, i) => (
          <UserCard
            key={user.id}
            user={user}
            index={i}
            onView={()   => navigate("/user", { user })}
            onDelete={()  => setDeleteTarget(user)}
          />
        ))}
        {filtered.length === 0 && (
          <div style={{
            gridColumn: "1 / -1", textAlign: "center", padding: "60px 20px",
            color: "#AAA", fontFamily: "'DM Sans', sans-serif", fontSize: 15,
          }}>
            No users found{search ? ` matching "${search}"` : ""}
          </div>
        )}
      </div>
    </div>
  );
}