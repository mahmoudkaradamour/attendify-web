"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import TopNav from "@/components/top-nav";
import { DEMO_ADMIN_LOGIN, apiFetch, saveSession } from "@/lib/platform";
import { useLanguage } from "@/lib/site-language";

type AuthState = {
  name: string;
  email: string;
  password: string;
};

const emptyAuthState = { name: "", email: "", password: "" };

export default function AccessPage() {
  const { locale } = useLanguage();
  const ar = locale === "ar";
  const [registerForm, setRegisterForm] = useState<AuthState>(emptyAuthState);
  const [loginForm, setLoginForm] = useState<AuthState>({
    name: "",
    email: DEMO_ADMIN_LOGIN.email,
    password: DEMO_ADMIN_LOGIN.password
  });
  const [message, setMessage] = useState<string>("");
  const [busy, setBusy] = useState<"login" | "register" | null>(null);

  const demoCopy = useMemo(() => ({
    admin: DEMO_ADMIN_LOGIN.email,
    password: DEMO_ADMIN_LOGIN.password
  }), []);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("login");
    setMessage("");

    try {
      const payload = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password
        })
      });

      const session = {
        token: payload.data.token,
        company: payload.data.company
      };

      saveSession(session);
      setMessage(ar ? "تم تسجيل الدخول بنجاح." : "Signed in successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setBusy(null);
    }
  }

  async function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("register");
    setMessage("");

    try {
      const payload = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(registerForm)
      });

      const session = {
        token: payload.data.token,
        company: payload.data.company
      };

      saveSession(session);
      setMessage(ar ? "تم إنشاء الشركة وتسجيل الدخول تلقائياً." : "Company created and signed in automatically.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="page-shell">
      <TopNav />

      <section className="hero-grid compact">
        <div className="hero-copy glass-panel">
          <span className="eyebrow">Access</span>
          <h1>{ar ? "دخول مؤسسي نظيف مع مسار أدمن واضح" : "A clean enterprise entry point with a clear admin path"}</h1>
          <p className="section-copy">
            {ar
              ? "استخدم هذا المسار لتسجيل الشركات، تسجيل الدخول، ثم الانتقال إلى لوحة الأدمن لإدارة الشركات والأجهزة والاشتراكات."
              : "Use this flow to register companies, sign in, and move directly into the admin console to manage companies, devices, and subscriptions."}
          </p>

          <div className="button-row">
            <Link href="/admin" className="button-primary">
              {ar ? "فتح لوحة الأدمن" : "Open admin console"}
            </Link>
            <Link href="/" className="button-secondary">
              {ar ? "عودة إلى الرئيسية" : "Back to home"}
            </Link>
          </div>

          <div className="command-card compact">
            <div className="command-card__title">Demo admin credentials</div>
            <p>
              {demoCopy.admin} / {demoCopy.password}
            </p>
            <p className="muted">Seeded locally for the dashboard and API validation.</p>
          </div>
        </div>

        <div className="auth-grid">
          <form className="auth-card glass-panel" onSubmit={submitLogin}>
            <div className="section-header compact">
              <span className="eyebrow">Login</span>
              <h2>Sign back into an existing company or admin account</h2>
            </div>
            <label>
              Email
              <input
                className="input"
                type="email"
                value={loginForm.email}
                onChange={(event) => setLoginForm((state) => ({ ...state, email: event.target.value }))}
                placeholder="admin@attendify.local"
              />
            </label>
            <label>
              Password
              <input
                className="input"
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((state) => ({ ...state, password: event.target.value }))}
                placeholder="••••••••••"
              />
            </label>
            <button className="button-primary" type="submit" disabled={busy === "login"}>
              {busy === "login" ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <form className="auth-card glass-panel" onSubmit={submitRegister}>
            <div className="section-header compact">
              <span className="eyebrow">Register</span>
              <h2>Create a new company workspace</h2>
            </div>
            <label>
              Company name
              <input
                className="input"
                type="text"
                value={registerForm.name}
                onChange={(event) => setRegisterForm((state) => ({ ...state, name: event.target.value }))}
                placeholder="Northstar Logistics"
              />
            </label>
            <label>
              Email
              <input
                className="input"
                type="email"
                value={registerForm.email}
                onChange={(event) => setRegisterForm((state) => ({ ...state, email: event.target.value }))}
                placeholder="owner@company.com"
              />
            </label>
            <label>
              Password
              <input
                className="input"
                type="password"
                value={registerForm.password}
                onChange={(event) => setRegisterForm((state) => ({ ...state, password: event.target.value }))}
                placeholder="Choose a strong password"
              />
            </label>
            <button className="button-secondary" type="submit" disabled={busy === "register"}>
              {busy === "register" ? "Creating..." : "Create company"}
            </button>
          </form>
        </div>
      </section>

      {message ? <section className="section-shell glass-panel notice-panel">{message}</section> : null}

      <section className="section-shell">
        <div className="section-header">
          <span className="eyebrow">What happens next</span>
          <h2>Everything is wired for company operations and the admin console</h2>
        </div>
        <div className="feature-grid">
          {[
            ["Login", "JWT is issued through the Cloudflare Worker gateway and saved locally for the console."],
            ["Register", "New companies are created in a controlled pending-verification state."],
            ["Admin", "The console can review tenants, update plans, and manage device lifecycle data."],
            ["Demo seed", "A local seed script creates an admin account and several demo companies/devices."]
          ].map(([title, body]) => (
            <article key={title} className="feature-card">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}