import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

/**
 * Call this on every protected page.
 * - Redirects to index.html if not logged in.
 * - Returns the user + their Firestore userData.
 * - Optionally restrict to specific roles: guardAuth(['admin','pm'])
 */
export async function guardAuth(allowedRoles = []) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "index.html";
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists()) {
          window.location.href = "index.html";
          return;
        }
        const userData = snap.data();
        if (allowedRoles.length && !allowedRoles.includes(userData.role)) {
          window.location.href = "unauthorized.html";
          return;
        }
        resolve({ user, userData });
      } catch (e) {
        console.error("Auth guard error:", e);
        window.location.href = "index.html";
      }
    });
  });
}

/**
 * Redirect logged-in users away from the login page.
 * Call on index.html only.
 */
export function redirectIfLoggedIn() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) return;
      const role = snap.data().role;
      if (role === "admin" || role === "pm") {
        window.location.href = "dashboard.html";
      } else if (role === "freelancer") {
        window.location.href = "profile.html";
      }
    } catch (e) {
      console.error(e);
    }
  });
}
