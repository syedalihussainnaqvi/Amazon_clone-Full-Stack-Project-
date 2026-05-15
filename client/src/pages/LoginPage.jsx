import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'There was a problem. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, paddingBottom: 40 }} id="login-page">
      {/* Logo */}
      <Link to="/" style={{ marginBottom: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#FF9900', letterSpacing: '-1px', lineHeight: 1 }}>SYED</div>
        </div>
      </Link>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: 350, border: '1px solid #DDD', borderRadius: 4, padding: '22px 26px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 6 }}>Sign in</h1>
        <p style={{ fontSize: 13, color: '#0F1111', marginBottom: 16 }}>
          New to SYED?{' '}
          <Link to="/register" style={{ color: '#007185' }} className="hover:underline">Create your account</Link>
        </p>

        {error && (
          <div style={{ border: '1px solid #CC0C39', borderLeft: '4px solid #CC0C39', borderRadius: 3, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#CC0C39', background: '#fff8f8' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F1111', marginBottom: 4 }}>
              Email or mobile phone number
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="amz-input"
              id="email-input"
              autoComplete="email"
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#0F1111' }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: 13, color: '#007185' }} className="hover:underline">Forgot your password?</Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="amz-input"
              id="password-input"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            id="signin-btn"
            className="amz-btn-orange"
            style={{ width: '100%', padding: '9px 0', fontSize: 14 }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
            <input type="checkbox" id="keep-signed-in" style={{ width: 13, height: 13 }} />
            <label htmlFor="keep-signed-in" style={{ fontSize: 13, color: '#0F1111' }}>Keep me signed in</label>
          </div>
        </form>

        <p style={{ fontSize: 11, color: '#565959', marginTop: 16, lineHeight: 1.5 }}>
          By signing in you agree to SYED's{' '}
          <Link to="/terms" style={{ color: '#007185' }} className="hover:underline">Conditions of Use</Link>{' '}
          and{' '}
          <Link to="/privacy" style={{ color: '#007185' }} className="hover:underline">Privacy Notice</Link>.
        </p>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', maxWidth: 350, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: '#DDD' }} />
          <span style={{ fontSize: 12, color: '#767676', whiteSpace: 'nowrap' }}>New to SYED?</span>
          <div style={{ flex: 1, height: 1, background: '#DDD' }} />
        </div>
        <Link
          to="/register"
          id="create-account-link"
          style={{ display: 'block', textAlign: 'center', border: '1px solid #DDD', borderRadius: 3, padding: '9px 0', fontSize: 14, color: '#0F1111', background: 'linear-gradient(to bottom, #f7f8f8, #e7e9ec)' }}
          className="hover:bg-[#e7e9ec] transition-colors"
        >
          Create your SYED account
        </Link>
      </div>

      {/* Footer links */}
      <div style={{ marginTop: 24, borderTop: '1px solid #DDD', paddingTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Conditions of Use', to: '/terms' },
          { label: 'Privacy Notice', to: '/privacy' },
          { label: 'Help', to: '/help' },
        ].map(l => (
          <Link key={l.label} to={l.to} style={{ fontSize: 12, color: '#007185' }} className="hover:underline">{l.label}</Link>
        ))}
      </div>
      <p style={{ fontSize: 12, color: '#767676', marginTop: 8 }}>
        © {new Date().getFullYear()} SYED, Inc.
      </p>
    </div>
  );
};

export default LoginPage;
