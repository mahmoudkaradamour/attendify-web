"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import TopNav from "@/components/top-nav";
import { ATTENDIFY_API_BASE, AuthSession, apiFetch, clearSession, loadSession, saveSession } from "@/lib/platform";

type Overview = {
  counts: {
    companies: number;
    activeCompanies: number;
    suspendedCompanies: number;
    pendingCompanies: number;
    adminCompanies: number;
    devices: number;
    activeDevices: number;
  };
  planCounts: Record<string, number>;
};

type CompanyRow = {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  roles: string[];
  isActive: boolean;
  deviceCount: number;
  idpUrl?: string | null;
};

type DeviceRow = {
  id: string;
  companyId: string;
  employeeId: string | null;
  publicKey: string | null;
  keyVersion: number;
  status: string;
};

type LogEntry = {
  label: string;
  ok: boolean;
  detail: string;
  time: string;
};

type PublicApiCall = {
  name: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH";
  body?: Record<string, unknown>;
  requiresAuth?: boolean;
};

const defaultCreateCompany = {
  name: "",
  email: "",
  password: "",
  plan: "starter"
};

const testMatrix: PublicApiCall[] = [
  { name: "Auth login", path: "/auth/login", method: "POST", body: { email: "admin@attendify.local", password: "Admin@2026!Demo" }, requiresAuth: false },
  { name: "Auth register", path: "/auth/register", method: "POST", body: { name: "Lab Company", email: "lab+company@attendify.local", password: "Lab@2026!Pass" }, requiresAuth: false },
  { name: "Company profile", path: "/company/profile", method: "GET", requiresAuth: true },
  { name: "Company me", path: "/company/me", method: "GET", requiresAuth: true },
  { name: "Public lookup", path: "/company/lookup/northstar", method: "GET", requiresAuth: false },
  { name: "Nonce", path: "/nonce", method: "GET", requiresAuth: false },
  { name: "Verify", path: "/verify", method: "POST", requiresAuth: true, body: { deviceId: "demo-device", timestamp: Date.now(), signature: "demo", version: "v1", nonce: "demo", evidence: { sample: true }, companyId: "demo-company" } },
  { name: "Admin overview", path: "/admin/overview", method: "GET", requiresAuth: true },
  { name: "Admin companies", path: "/admin/companies", method: "GET", requiresAuth: true },
  { name: "Admin devices", path: "/admin/devices", method: "GET", requiresAuth: true },
  { name: "Company debugger", path: "/company/debugger", method: "GET", requiresAuth: true },
  { name: "Company audit hash", path: "/company/audit/last-hash", method: "GET", requiresAuth: true }
];

export default function AdminPage() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [companies, setCompanies] = useState<CompanyRow[]>([]);
  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [message, setMessage] = useState<string>("");
  const [busy, setBusy] = useState<string>("");
  const [createForm, setCreateForm] = useState(defaultCreateCompany);
  const [loginForm, setLoginForm] = useState({ email: "admin@attendify.local", password: "Admin@2026!Demo" });
  const [testLogs, setTestLogs] = useState<LogEntry[]>([]);
  const [testBusy, setTestBusy] = useState<string>("");
  const [customPath, setCustomPath] = useState("/company/profile");
  const [customMethod, setCustomMethod] = useState<PublicApiCall["method"]>("GET");
  const [customBody, setCustomBody] = useState("{}");

  const sessionLabel = useMemo(() => {
    if (!session) return "No session";
    return `${session.company.name} • ${session.company.email}`;
  }, [session]);

  useEffect(() => {
    const existing = loadSession();
    if (existing) {
      setSession(existing);
      void loadDashboard(existing.token);
    }
  }, []);

  async function loadDashboard(token: string) {
    setBusy("load");

    try {
      const [overviewPayload, companiesPayload, devicesPayload] = await Promise.all([
        apiFetch("/admin/overview", {}, token),
        apiFetch("/admin/companies", {}, token),
        apiFetch("/admin/devices", {}, token)
      ]);

      setOverview(overviewPayload.data);
      setCompanies(companiesPayload.data.companies || []);
      setDevices(devicesPayload.data.devices || []);
      setMessage("Dashboard refreshed successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load dashboard");
    } finally {
      setBusy("");
    }
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("login");
    setMessage("");

    try {
      const payload = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginForm)
      });

      const nextSession: AuthSession = {
        token: payload.data.token,
        company: payload.data.company
      };

      saveSession(nextSession);
      setSession(nextSession);
      await loadDashboard(nextSession.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setBusy("");
    }
  }

  async function createCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;

    setBusy("create-company");

    try {
      await apiFetch("/admin/companies", {
        method: "POST",
        body: JSON.stringify(createForm)
      }, session.token);

      setCreateForm(defaultCreateCompany);
      await loadDashboard(session.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Create company failed");
    } finally {
      setBusy("");
    }
  }

  async function updateCompany(company: CompanyRow) {
    if (!session) return;

    setBusy(`company-${company.id}`);

    try {
      const payload = await apiFetch(`/admin/companies/${company.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          plan: company.plan,
          status: company.status,
          isActive: company.isActive,
          name: company.name,
          email: company.email
        })
      }, session.token);

      setCompanies((current) => current.map((item) => item.id === company.id ? payload.data.company : item));
      setMessage(`Updated ${company.name}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Company update failed");
    } finally {
      setBusy("");
    }
  }

  async function updateDevice(device: DeviceRow) {
    if (!session) return;

    setBusy(`device-${device.id}`);

    try {
      const payload = await apiFetch(`/admin/devices/${device.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: device.status,
          employeeId: device.employeeId || undefined,
          keyVersion: device.keyVersion
        })
      }, session.token);

      setDevices((current) => current.map((item) => item.id === device.id ? payload.data.device : item));
      setMessage(`Updated device ${device.employeeId || device.id}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Device update failed");
    } finally {
      setBusy("");
    }
  }

  function pushLog(entry: Omit<LogEntry, "time">) {
    setTestLogs((current) => [{ ...entry, time: new Date().toLocaleTimeString() }, ...current].slice(0, 24));
  }

  async function runApiCall(call: PublicApiCall, overrides?: { path?: string; method?: PublicApiCall["method"]; body?: unknown }) {
    if (!session) {
      throw new Error("Sign in to run authenticated tests");
    }

    const path = overrides?.path || call.path;
    const method = overrides?.method || call.method;
    const body = overrides?.body ?? call.body;
    const token = call.requiresAuth === false ? undefined : session.token;

    const response = await apiFetch(path, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body)
    }, token);

    return response;
  }

  async function runTest(call: PublicApiCall) {
    if (!session && call.requiresAuth !== false) {
      setMessage("Sign in first to run protected tests.");
      return;
    }

    setTestBusy(call.name);

    try {
      const response = await runApiCall(call);
      pushLog({ label: call.name, ok: true, detail: typeof response === "string" ? response : JSON.stringify(response.data || response).slice(0, 240) });
      setMessage(`${call.name} completed.`);
    } catch (error) {
      pushLog({ label: call.name, ok: false, detail: error instanceof Error ? error.message : "Request failed" });
      setMessage(error instanceof Error ? error.message : "Test failed");
    } finally {
      setTestBusy("");
    }
  }

  async function runCustomTest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let parsedBody: unknown = undefined;
    if (customMethod !== "GET") {
      try {
        parsedBody = JSON.parse(customBody || "{}");
      } catch {
        setMessage("Custom body must be valid JSON.");
        return;
      }
    }

    setTestBusy("custom");

    try {
      const response = await runApiCall({ name: `Custom ${customMethod} ${customPath}`, path: customPath, method: customMethod, requiresAuth: true }, { path: customPath, method: customMethod, body: parsedBody });
      pushLog({ label: `Custom ${customMethod} ${customPath}`, ok: true, detail: typeof response === "string" ? response : JSON.stringify(response.data || response).slice(0, 240) });
      setMessage("Custom request completed.");
    } catch (error) {
      pushLog({ label: `Custom ${customMethod} ${customPath}`, ok: false, detail: error instanceof Error ? error.message : "Request failed" });
      setMessage(error instanceof Error ? error.message : "Custom request failed");
    } finally {
      setTestBusy("");
    }
  }

  function logout() {
    clearSession();
    setSession(null);
    setOverview(null);
    setCompanies([]);
    setDevices([]);
    setMessage("Signed out.");
  }

  const isSignedIn = Boolean(session?.token);

  return (
    <main className="page-shell admin-page">
      <TopNav />

      <section className="admin-hero glass-panel">
        <div>
          <span className="eyebrow">Admin console</span>
          <h1>Operate companies, devices, and subscription posture from a single command center</h1>
          <p className="section-copy">
            Connected to <code>{ATTENDIFY_API_BASE}</code>. The console fetches live overview data, company lists, and device inventories from the backend gateway.
          </p>
        </div>
        <div className="admin-hero__actions">
          <span className="status-pill success">{isSignedIn ? "Session active" : "Session required"}</span>
          {isSignedIn ? (
            <button className="button-secondary" type="button" onClick={logout}>Sign out</button>
          ) : null}
        </div>
      </section>

      {message ? <section className="notice-panel glass-panel">{message}</section> : null}

      {!isSignedIn ? (
        <section className="auth-grid admin-auth-grid">
          <form className="auth-card glass-panel" onSubmit={login}>
            <div className="section-header compact">
              <span className="eyebrow">Admin login</span>
              <h2>Use the seeded admin account to open the console</h2>
            </div>
            <label>
              Email
              <input className="input" type="email" value={loginForm.email} onChange={(event) => setLoginForm((state) => ({ ...state, email: event.target.value }))} />
            </label>
            <label>
              Password
              <input className="input" type="password" value={loginForm.password} onChange={(event) => setLoginForm((state) => ({ ...state, password: event.target.value }))} />
            </label>
            <button className="button-primary" type="submit" disabled={busy === "login"}>{busy === "login" ? "Signing in..." : "Enter console"}</button>
          </form>

          <div className="auth-card glass-panel">
            <div className="section-header compact">
              <span className="eyebrow">Seeded credentials</span>
              <h2>Local admin account for validation and demos</h2>
            </div>
            <div className="command-card compact">
              <div className="command-card__title">Admin account</div>
              <p>admin@attendify.local</p>
              <p>Admin@2026!Demo</p>
            </div>
            <p className="muted">Use the backend seed script to recreate this account and demo tenants when needed.</p>
          </div>
        </section>
      ) : null}

      {isSignedIn && overview ? (
        <>
          <section className="metric-grid admin-metrics">
            {[
              ["Companies", overview.counts.companies],
              ["Active", overview.counts.activeCompanies],
              ["Pending", overview.counts.pendingCompanies],
              ["Suspended", overview.counts.suspendedCompanies],
              ["Devices", overview.counts.devices],
              ["Active devices", overview.counts.activeDevices]
            ].map(([label, value]) => (
              <article key={label as string} className="metric-card">
                <span className="metric-label">{label as string}</span>
                <strong>{value as number}</strong>
              </article>
            ))}
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-column">
              <div className="glass-panel table-panel">
                <div className="section-header compact">
                  <span className="eyebrow">Company management</span>
                  <h2>Create and adjust tenants</h2>
                </div>

                <form className="form-grid compact" onSubmit={createCompany}>
                  <label>
                    Name
                    <input className="input" value={createForm.name} onChange={(event) => setCreateForm((state) => ({ ...state, name: event.target.value }))} />
                  </label>
                  <label>
                    Email
                    <input className="input" type="email" value={createForm.email} onChange={(event) => setCreateForm((state) => ({ ...state, email: event.target.value }))} />
                  </label>
                  <label>
                    Password
                    <input className="input" type="password" value={createForm.password} onChange={(event) => setCreateForm((state) => ({ ...state, password: event.target.value }))} />
                  </label>
                  <label>
                    Plan
                    <select className="input" value={createForm.plan} onChange={(event) => setCreateForm((state) => ({ ...state, plan: event.target.value }))}>
                      <option value="starter">Starter</option>
                      <option value="business">Business</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </label>
                  <button className="button-primary" type="submit" disabled={busy === "create-company"}>Create company</button>
                </form>

                <div className="table-scroll">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Plan</th>
                        <th>Status</th>
                        <th>Devices</th>
                        <th>Active</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies.map((company) => (
                        <tr key={company.id}>
                          <td>
                            <strong>{company.name}</strong>
                            <div className="muted">{company.email}</div>
                          </td>
                          <td>
                            <select className="input compact" value={company.plan} onChange={(event) => setCompanies((current) => current.map((item) => item.id === company.id ? { ...item, plan: event.target.value } : item))}>
                              <option value="starter">Starter</option>
                              <option value="business">Business</option>
                              <option value="enterprise">Enterprise</option>
                            </select>
                          </td>
                          <td>
                            <select className="input compact" value={company.status} onChange={(event) => setCompanies((current) => current.map((item) => item.id === company.id ? { ...item, status: event.target.value } : item))}>
                              <option value="pending-verification">Pending</option>
                              <option value="active">Active</option>
                              <option value="suspended">Suspended</option>
                              <option value="deleted">Deleted</option>
                            </select>
                          </td>
                          <td>{company.deviceCount}</td>
                          <td>
                            <label className="toggle-row">
                              <input type="checkbox" checked={company.isActive} onChange={(event) => setCompanies((current) => current.map((item) => item.id === company.id ? { ...item, isActive: event.target.checked } : item))} />
                              <span>{company.isActive ? "On" : "Off"}</span>
                            </label>
                          </td>
                          <td>
                            <button className="button-secondary" type="button" onClick={() => void updateCompany(company)} disabled={busy === `company-${company.id}`}>
                              {busy === `company-${company.id}` ? "Saving..." : "Save"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="dashboard-column">
              <div className="glass-panel table-panel">
                <div className="section-header compact">
                  <span className="eyebrow">Subscription posture</span>
                  <h2>Plan mix and lifecycle state</h2>
                </div>
                <div className="stack-grid small-gap">
                  {Object.entries(overview.planCounts).map(([plan, count]) => (
                    <article key={plan} className="feature-card soft">
                      <div className="feature-card__accent">{plan}</div>
                      <h3>{count}</h3>
                      <p>Companies currently on this plan.</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="glass-panel table-panel">
                <div className="section-header compact">
                  <span className="eyebrow">Device inventory</span>
                  <h2>Inspect and update enrolled devices</h2>
                </div>
                <div className="table-scroll">
                  <table className="data-table compact">
                    <thead>
                      <tr>
                        <th>Device</th>
                        <th>Company</th>
                        <th>Version</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((device) => (
                        <tr key={device.id}>
                          <td>
                            <strong>{device.employeeId || device.id.slice(0, 8)}</strong>
                            <div className="muted mono">{device.publicKey || "No public key"}</div>
                          </td>
                          <td className="mono">{device.companyId}</td>
                          <td>
                            <input
                              className="input compact"
                              type="number"
                              min={1}
                              value={device.keyVersion}
                              onChange={(event) => setDevices((current) => current.map((item) => item.id === device.id ? { ...item, keyVersion: Number(event.target.value) || 1 } : item))}
                            />
                          </td>
                          <td>
                            <select className="input compact" value={device.status} onChange={(event) => setDevices((current) => current.map((item) => item.id === device.id ? { ...item, status: event.target.value } : item))}>
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="suspended">Suspended</option>
                              <option value="revoked">Revoked</option>
                            </select>
                          </td>
                          <td>
                            <button className="button-secondary" type="button" onClick={() => void updateDevice(device)} disabled={busy === `device-${device.id}`}>
                              {busy === `device-${device.id}` ? "Saving..." : "Save"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="section-shell">
            <div className="section-header">
              <span className="eyebrow">API test lab</span>
              <h2>Exercise the live backend paths and confirm database-backed outcomes</h2>
            </div>

            <div className="dashboard-grid">
              <div className="glass-panel table-panel">
                <div className="section-header compact">
                  <h3>Fast tests</h3>
                  <p>One-click requests for auth, company, verify, admin, and lookup flows.</p>
                </div>
                <div className="stack-grid small-gap">
                  {testMatrix.map((call) => (
                    <button
                      key={call.name}
                      className="button-secondary"
                      type="button"
                      onClick={() => void runTest(call)}
                      disabled={testBusy === call.name}
                    >
                      {testBusy === call.name ? "Running..." : `${call.method} ${call.name}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-panel table-panel">
                <div className="section-header compact">
                  <h3>Custom request</h3>
                  <p>Try any endpoint exposed by the worker-backed API.</p>
                </div>
                <form className="form-grid compact" onSubmit={runCustomTest}>
                  <label>
                    Path
                    <input className="input" value={customPath} onChange={(event) => setCustomPath(event.target.value)} placeholder="/company/profile" />
                  </label>
                  <label>
                    Method
                    <select className="input" value={customMethod} onChange={(event) => setCustomMethod(event.target.value as PublicApiCall["method"]) }>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                    </select>
                  </label>
                  <label style={{ gridColumn: "1 / -1" }}>
                    JSON body
                    <textarea className="input" rows={8} value={customBody} onChange={(event) => setCustomBody(event.target.value)} />
                  </label>
                  <button className="button-primary" type="submit" disabled={testBusy === "custom"}>
                    {testBusy === "custom" ? "Sending..." : "Run custom request"}
                  </button>
                </form>
              </div>
            </div>

            <div className="glass-panel table-panel" style={{ marginTop: 18 }}>
              <div className="section-header compact">
                <h3>Execution log</h3>
                <p>Shows the latest request outcomes, including failed calls and database-facing operations.</p>
              </div>
              <div className="table-scroll">
                <table className="data-table compact">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Operation</th>
                      <th>Status</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testLogs.length > 0 ? testLogs.map((entry, index) => (
                      <tr key={`${entry.time}-${index}`}>
                        <td className="mono">{entry.time}</td>
                        <td>{entry.label}</td>
                        <td>{entry.ok ? "Success" : "Failed"}</td>
                        <td className="muted">{entry.detail}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="muted">No test runs yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      ) : null}

      <section className="section-shell cta-panel glass-panel">
        <div>
          <span className="eyebrow">Operational notes</span>
          <h2>Everything is bound to live APIs, seeded data, and Cloudflare delivery</h2>
          <p className="section-copy">The console talks to the worker gateway; the seed script creates an admin account and sample tenants so the UI can demonstrate a real operating model immediately.</p>
        </div>
        <Link href="/" className="button-primary">
          Back to public site
        </Link>
      </section>
    </main>
  );
}