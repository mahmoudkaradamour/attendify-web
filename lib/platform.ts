export const ATTENDIFY_API_BASE =
  process.env.NEXT_PUBLIC_ATTENDIFY_API_BASE_URL ||
  "https://attendify-worker.mahmouddamour-3aa.workers.dev";

export const DEMO_ADMIN_LOGIN = {
  email: "admin@attendify.local",
  password: "Admin@2026!Demo"
};

export const TRUST_METRICS = [
  { label: "Companies onboarded", value: "4", detail: "Seeded tenants + enterprise-ready flows" },
  { label: "Active devices", value: "4 / 6", detail: "Healthy binding and lifecycle control" },
  { label: "Admin access", value: "Role-based", detail: "JWT + RBAC + company-scoped actions" },
  { label: "Cloudflare edge", value: "Live", detail: "Frontend and gateway are publicly reachable" }
] as const;

export const PUBLIC_HIGHLIGHTS = [
  {
    title: "Trust-first product front door",
    description: "A premium landing experience for operators, auditors, and procurement teams.",
    accent: "Command-grade"
  },
  {
    title: "Company lifecycle management",
    description: "Create, activate, suspend, and inspect tenants through a single control surface.",
    accent: "Multi-tenant"
  },
  {
    title: "Device identity and attestation",
    description: "Enroll devices, rotate keys, and preserve attestation history per tenant.",
    accent: "Cryptographic"
  }
] as const;

export const PLAN_MATRIX = [
  {
    name: "Starter",
    price: "$0",
    description: "For pilots and proof-of-value rollouts.",
    features: ["1 company", "2 devices", "Basic support", "Webhook visibility"]
  },
  {
    name: "Business",
    price: "$99",
    description: "For operational teams with regular usage.",
    features: ["5 companies", "25 devices", "Admin dashboard", "Policy controls"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For regulated orgs that need governance and scale.",
    features: ["Unlimited tenants", "Advanced RBAC", "Audit exports", "SSO/on-prem support"]
  }
] as const;

export const DOC_CARDS = [
  {
    title: "System overview",
    description: "Architecture, trust boundaries, and the current control plane shape."
  },
  {
    title: "Integration guide",
    description: "How company systems verify evidence and keep their own decisioning."
  },
  {
    title: "Operations runbook",
    description: "Deployment checks, incident handling, and rollback guidance."
  }
] as const;

export type AuthSession = {
  token: string;
  company: {
    id: string;
    name: string;
    email: string;
    roles?: string[];
  };
};

const SESSION_KEY = "attendify_session";

export function apiUrl(path: string) {
  return `${ATTENDIFY_API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function loadSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

export async function apiFetch(path: string, options: RequestInit = {}, token?: string) {
  const headers = new Headers(options.headers || {});

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(apiUrl(path), {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload?.message || "Request failed");
    }
    return payload;
  }

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.text();
}

export const DEFAULT_COMPANY_FORM = {
  name: "",
  email: "",
  password: "",
  plan: "starter" as const
};
