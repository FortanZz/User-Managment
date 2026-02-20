// ─────────────────────────────────────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────────────────────────────────────
export const initialState = {
  users: [],
  loading: true,
  error: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// REDUCER  (Redux-like pattern using useReducer)
// ─────────────────────────────────────────────────────────────────────────────
export function usersReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, users: action.payload, loading: false };

    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "ADD_USER":
      return { ...state, users: [action.payload, ...state.users] };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? { ...u, ...action.payload } : u
        ),
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

    default:
      return state;
  }
}