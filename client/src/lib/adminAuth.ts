/**
 * STARLINE ATELIER // PROTECTED ADMIN AUTHENTICATION & CONVEX CLIENT
 * - Uses Web Crypto API (SHA-256 with studio salt) so plaintext passcodes are never stored in browser storage.
 * - Includes brute-force rate limiting (5 failed attempts -> 60-second lockout).
 * - Expiring session token (4-hour TTL in sessionStorage).
 */

const AUTH_SESSION_KEY = "starline_atelier_admin_session_v1";
const CUSTOM_HASH_STORAGE_KEY = "starline_atelier_admin_hash_v1";
const LOCKOUT_STORAGE_KEY = "starline_atelier_admin_lockout_v1";
const AUTH_EVENT = "starline:admin-auth-changed";

const STUDIO_SALT = "starline_atelier_dallas_salt_v1::";
const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds

// Precomputed SHA-256 digest of: "starline_atelier_dallas_salt_v1::Starline@2026"
const DEFAULT_MASTER_HASH =
  "654f0c12ef1494f2e6b8813781f02b90a88ef745730ebf8a50a48a7ccc3a46d0";

interface AuthSession {
  token: string;
  authenticatedAt: number;
  expiresAt: number;
}

interface LockoutState {
  failedAttempts: number;
  lockedUntil: number;
}

export function getConvexUrl(): string {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};
  const raw =
    env.Convex_URL ||
    env.CONVEX_URL ||
    env.VITE_CONVEX_URL ||
    env.VITE_Convex_URL ||
    "";
  return String(raw).trim().replace(/\/+$/, "");
}

export async function hashPasscode(passcode: string): Promise<string> {
  const input = `${STUDIO_SALT}${passcode.trim()}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getLockoutStatus(): {
  isLocked: boolean;
  remainingSeconds: number;
  failedAttempts: number;
} {
  if (typeof window === "undefined") {
    return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
  }
  try {
    const raw = window.localStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (!raw) return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
    const state = JSON.parse(raw) as LockoutState;
    const now = Date.now();
    if (state.lockedUntil && state.lockedUntil > now) {
      return {
        isLocked: true,
        remainingSeconds: Math.ceil((state.lockedUntil - now) / 1000),
        failedAttempts: state.failedAttempts
      };
    }
    if (state.lockedUntil && state.lockedUntil <= now) {
      window.localStorage.removeItem(LOCKOUT_STORAGE_KEY);
      return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
    }
    return {
      isLocked: false,
      remainingSeconds: 0,
      failedAttempts: state.failedAttempts || 0
    };
  } catch {
    return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
  }
}

function recordFailedAttempt(): {
  isLocked: boolean;
  remainingSeconds: number;
  attemptsLeft: number;
} {
  const current = getLockoutStatus();
  const failedAttempts = current.failedAttempts + 1;
  const lockedUntil =
    failedAttempts >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_DURATION_MS : 0;

  window.localStorage.setItem(
    LOCKOUT_STORAGE_KEY,
    JSON.stringify({ failedAttempts, lockedUntil })
  );

  return {
    isLocked: lockedUntil > 0,
    remainingSeconds: lockedUntil > 0 ? Math.ceil(LOCKOUT_DURATION_MS / 1000) : 0,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - failedAttempts)
  };
}

function clearLockout(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LOCKOUT_STORAGE_KEY);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw) as AuthSession;
    if (!session.token || !session.expiresAt || Date.now() > session.expiresAt) {
      window.sessionStorage.removeItem(AUTH_SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function verifyAndLoginAdmin(passcode: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const lockout = getLockoutStatus();
  if (lockout.isLocked) {
    return {
      success: false,
      error: `Security cooldown active. Please wait ${lockout.remainingSeconds}s before trying again.`
    };
  }

  const trimmed = passcode.trim();
  if (!trimmed) {
    return { success: false, error: "Please enter the Atelier Master Passcode." };
  }

  const candidateHash = await hashPasscode(trimmed);
  const customStoredHash = window.localStorage.getItem(CUSTOM_HASH_STORAGE_KEY);

  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};
  const envCustomKey = env.VITE_ADMIN_CUSTOM_KEY ? String(env.VITE_ADMIN_CUSTOM_KEY).trim() : "";
  const envKeyHash = envCustomKey ? await hashPasscode(envCustomKey) : null;

  let isMatch = false;
  if (customStoredHash) {
    isMatch = candidateHash === customStoredHash;
  } else if (envKeyHash) {
    isMatch = candidateHash === envKeyHash || candidateHash === DEFAULT_MASTER_HASH;
  } else {
    isMatch = candidateHash === DEFAULT_MASTER_HASH;
  }

  if (!isMatch) {
    const failState = recordFailedAttempt();
    if (failState.isLocked) {
      return {
        success: false,
        error: `Too many failed attempts. Console locked for ${failState.remainingSeconds} seconds.`
      };
    }
    return {
      success: false,
      error: `Invalid passcode. ${failState.attemptsLeft} ${
        failState.attemptsLeft === 1 ? "attempt" : "attempts"
      } remaining before temporary lockout.`
    };
  }

  clearLockout();
  const now = Date.now();
  const session: AuthSession = {
    token: `${candidateHash.slice(0, 24)}_${now.toString(36)}`,
    authenticatedAt: now,
    expiresAt: now + SESSION_TTL_MS
  };
  window.sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent(AUTH_EVENT));
  return { success: true };
}

export async function updateAdminPasscode(
  currentPasscode: string,
  newPasscode: string
): Promise<{ success: boolean; error?: string }> {
  const check = await verifyAndLoginAdmin(currentPasscode);
  if (!check.success) {
    return { success: false, error: "Current passcode is incorrect." };
  }
  if (newPasscode.trim().length < 8) {
    return {
      success: false,
      error: "New passcode must be at least 8 characters long."
    };
  }
  const newHash = await hashPasscode(newPasscode.trim());
  window.localStorage.setItem(CUSTOM_HASH_STORAGE_KEY, newHash);
  return { success: true };
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(AUTH_SESSION_KEY);
  window.dispatchEvent(new CustomEvent(AUTH_EVENT));
}

export function subscribeToAdminAuth(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener(AUTH_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(AUTH_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
