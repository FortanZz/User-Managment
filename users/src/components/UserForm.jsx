import { useState } from "react";

// ── Field is defined OUTSIDE UserForm ──────────────────────────────────────
// If it were inside, React would treat it as a brand-new component type on
// every render, unmount + remount the <input>, and you'd lose focus after
// each keystroke. Keeping it outside fixes that completely.
function Field({ label, field, type = "text", required = false, value, error, onChange }) {
  const hasErr = !!error;
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", fontSize: 11, fontWeight: 700, color: "#666",
        marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {label}{required && <span style={{ color: "#E74C3C" }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(ev) => onChange(field, ev.target.value)}
        style={{
          width: "100%", padding: "10px 12px", borderRadius: 8,
          border: `1.5px solid ${hasErr ? "#E74C3C" : "#E0E0EA"}`,
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#0A0F1E",
          outline: "none", background: hasErr ? "#FFF5F5" : "#FAFAFA",
          boxSizing: "border-box",
        }}
        onFocus={(ev) => (ev.target.style.borderColor = hasErr ? "#E74C3C" : "#3D5AFE")}
        onBlur={(ev)  => (ev.target.style.borderColor = hasErr ? "#E74C3C" : "#E0E0EA")}
      />
      {hasErr && (
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "#E74C3C", fontFamily: "'DM Sans', sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// USER FORM  (Add & Edit)
// ─────────────────────────────────────────────────────────────────────────────
export default function UserForm({ initial = {}, onSubmit, onCancel, submitLabel = "Save" }) {
  const [form, setForm] = useState({
    name:    initial.name            ?? "",
    email:   initial.email           ?? "",
    phone:   initial.phone           ?? "",
    website: initial.website         ?? "",
    company: initial.company?.name   ?? "",
    street:  initial.address?.street ?? "",
    city:    initial.address?.city   ?? "",
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name.trim())  errs.name  = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address";
    return errs;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    onSubmit({
      ...initial,
      name:    form.name,
      email:   form.email,
      phone:   form.phone,
      website: form.website,
      company: { ...(initial.company ?? {}), name: form.company },
      address: { ...(initial.address ?? {}), street: form.street, city: form.city },
    });
  }

  // Single change handler shared by all fields
  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Full Name" field="name"  type="text"  required value={form.name}    error={errors.name}    onChange={handleChange} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Email"     field="email" type="email" required value={form.email}   error={errors.email}   onChange={handleChange} />
        </div>
        <Field label="Phone"   field="phone"   value={form.phone}   error={errors.phone}   onChange={handleChange} />
        <Field label="Website" field="website" value={form.website} error={errors.website} onChange={handleChange} />
        <Field label="Company" field="company" value={form.company} error={errors.company} onChange={handleChange} />
        <Field label="City"    field="city"    value={form.city}    error={errors.city}    onChange={handleChange} />
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 8, justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={{
          padding: "10px 20px", borderRadius: 8, border: "1.5px solid #E0E0EA",
          background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, fontWeight: 600, color: "#555",
        }}>
          Cancel
        </button>
        <button type="submit" style={{
          padding: "10px 24px", borderRadius: 8, border: "none",
          background: "linear-gradient(135deg,#3D5AFE,#7B2FF7)",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, fontWeight: 700, color: "#fff",
          boxShadow: "0 4px 16px rgba(61,90,254,0.35)",
        }}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}