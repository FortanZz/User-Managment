import { useEffect, useReducer } from "react";
import { initialState, usersReducer } from "./store/reducer";
import { useRouter }  from "./hooks/useRouter";
import Icon           from "./components/Icon";
import UserList       from "./pages/UserList";
import UserDetail     from "./pages/UserDetail";

export default function App() {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { route, navigate } = useRouter();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((err)  => dispatch({ type: "FETCH_ERROR",   payload: err.message }));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeIn      { from { opacity:0 }                             to { opacity:1 } }
        @keyframes slideUp     { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin        { to   { transform:rotate(360deg) } }

        button:focus-visible { outline: 2px solid #6B5B45; outline-offset: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F2F0ED" }}>

        <header style={{
          background: "#fff", borderBottom: "1px solid #E4E0DB",
          padding: "0 24px", position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            display: "flex", alignItems: "center", height: 64, gap: 16,
          }}>
            <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg,#4A3F32,#6B5B45)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
              }}>
                <Icon name="user" size={18} />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: "#1A1A1A" }}>
                UserVault
              </span>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
              {route.path === "/user" && (
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888",
                  background: "#F0EDE8", padding: "4px 12px", borderRadius: 20,
                }}>
                  Detail View
                </span>
              )}
              {!state.loading && !state.error && (
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                  color: "#6B5B45", background: "rgba(107,91,69,0.07)",
                  padding: "4px 12px", borderRadius: 20,
                }}>
                  {state.users.length} Users
                </span>
              )}
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

          {state.loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "100px 20px", gap: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                border: "3px solid #E2DDD8", borderTopColor: "#A0845C",
                animation: "spin 0.8s linear infinite",
              }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#888", margin: 0 }}>
                Fetching users…
              </p>
            </div>
          )}

          {!state.loading && state.error && (
            <div style={{
              textAlign: "center", padding: "80px 20px",
              fontFamily: "'DM Sans', sans-serif", color: "#E74C3C",
            }}>
               Could not load users: {state.error}
            </div>
          )}

          {!state.loading && !state.error && route.path === "/user" && (
            <UserDetail user={route.params.user} navigate={navigate} dispatch={dispatch} />
          )}

          {!state.loading && !state.error && route.path === "/" && (
            <UserList users={state.users} dispatch={dispatch} navigate={navigate} />
          )}

        </main>
      </div>
    </>
  );
}