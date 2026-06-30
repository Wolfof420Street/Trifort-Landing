"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }

      const redirectPath = searchParams.get("redirect") || "/admin/dashboard";
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--cream, #fcfaf7)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 10px 40px rgba(30, 61, 43, 0.08)',
        borderTop: '6px solid #1e3d2b'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#1e3d2b',
            marginBottom: '16px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="#c8701a"/>
            </svg>
          </div>
          <h1 style={{ color: '#1e3d2b', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>Trifort Admin</h1>
          <p style={{ color: '#666', marginTop: '8px', fontSize: '15px' }}>Sign in to access your dashboard</p>
        </div>

        {error && (
          <div style={{
            background: '#fff0f0',
            color: '#d32f2f',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '24px',
            fontSize: '14px',
            textAlign: 'center',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#1e3d2b' }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                fontSize: '15px',
                color: '#333',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c8701a'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#1e3d2b' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                fontSize: '15px',
                color: '#333',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c8701a'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#1e3d2b',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px',
              fontWeight: '600',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 12px rgba(30, 61, 43, 0.2)'
            }}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.background = '#152b1e' }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.background = '#1e3d2b' }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', minHeight: '100vh', background: '#1a1a1a', alignItems: 'center', justifyContent: 'center', color: 'var(--gold, #d4af37)' }}>Loading...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
