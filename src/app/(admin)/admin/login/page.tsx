"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#1e3d2b';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,61,43,0.08)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .login-left { width: 60%; }
        .login-right { width: 40%; }
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { width: 100% !important; }
        }
      `}} />

      {/* Left Panel */}
      <div className="login-left" style={{
        background: '#1e3d2b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Lines */}
        {[12.5, 25, 37.5, 50, 62.5, 75, 87.5].map((left, i) => (
          <span key={i} style={{
            position: 'absolute',
            top: '-10%',
            height: '120%',
            width: '1px',
            background: 'rgba(255,255,255,0.04)',
            left: `${left}%`
          }} />
        ))}
        
        {/* Logo and Tagline */}
        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Image src='/logo.png' alt='Trifort Logo' width={72} height={72} style={{ objectFit: 'contain', marginBottom: '24px' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: 'white', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            Trifort Builders
          </h1>
          <p style={{ margin: 0, fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#c8701a', marginBottom: '48px' }}>
            Transparency Through Builds.
          </p>
        </div>

        {/* Quote Block */}
        <div style={{
          borderLeft: '2px solid #c8701a',
          paddingLeft: '20px',
          position: 'absolute',
          bottom: '60px',
          left: '60px',
          right: '60px',
          zIndex: 1
        }}>
          <p style={{ margin: '0 0 12px 0', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: 'white', opacity: 0.7 }}>
            "Every great structure starts with a single conversation."
          </p>
          <div style={{ fontSize: '0.55rem', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', color: '#c8701a', letterSpacing: '1px' }}>
            — TRIFORT BUILDERS
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right" style={{
        background: '#fcfaf7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 40px'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          
          <h2 style={{ margin: '0 0 6px 0', fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#1e3d2b' }}>
            Welcome back
          </h2>
          <p style={{ margin: '0 0 40px 0', fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem', color: 'rgba(0,0,0,0.45)' }}>
            Sign in to your dashboard
          </p>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.2)',
              borderRadius: '6px',
              color: '#dc2626',
              fontSize: '0.875rem',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.55)', fontWeight: 600 }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  height: '48px',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: '6px',
                  padding: '0 16px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  background: 'transparent'
                }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.55)', fontWeight: 600 }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  height: '48px',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: '6px',
                  padding: '0 16px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  background: 'transparent'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '48px',
                background: '#1e3d2b',
                color: 'white',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => { if(!loading) e.currentTarget.style.background = '#c8701a' }}
              onMouseLeave={(e) => { if(!loading) e.currentTarget.style.background = '#1e3d2b' }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

        </div>
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
