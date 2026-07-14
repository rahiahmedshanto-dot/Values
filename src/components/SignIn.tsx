import { useState } from 'react';
import { PText, PButtonPure, PIcon } from '@porsche-design-system/components-react';
import { useAuth } from '../lib/auth';

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await signIn(email, password);
    setSubmitting(false);
    if (result.error) setError(result.error);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0E0E12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '40px 32px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              background: '#10b981',
              borderRadius: 12,
              marginBottom: 16,
            }}
          >
            <PIcon name="play" theme="dark" size="small" />
          </span>
          <span
            style={{
              fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#FBFCFF',
              letterSpacing: '-0.02em',
            }}
          >
            FlixWorld
          </span>
          <PText theme="dark" size="small" color="contrast-medium" style={{ marginTop: 4 }}>
            Welcome back
          </PText>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label
              htmlFor="email"
              style={{
                fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '12px 14px',
                color: '#FBFCFF',
                fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label
              htmlFor="password"
              style={{
                fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '12px 14px',
                color: '#FBFCFF',
                fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          {error && (
            <div
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 8,
                padding: '10px 12px',
              }}
            >
              <PText theme="dark" size="x-small" color="notification-error">
                {error}
              </PText>
            </div>
          )}

          <PButtonPure
            type="submit"
            theme="dark"
            icon={submitting ? 'refresh' : undefined}
            disabled={submitting}
            style={{ width: '100%', marginTop: 4 }}
          >
            {submitting ? 'Please wait...' : 'Sign In'}
          </PButtonPure>
        </form>
      </div>
    </div>
  );
}
