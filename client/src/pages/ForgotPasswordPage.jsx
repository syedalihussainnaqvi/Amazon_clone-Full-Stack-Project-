import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    try {
      const res = await authAPI.forgotPassword({ email });
      setStatus(res.data.message || 'If an account with that email exists, a password reset link has been sent.');
    } catch (err) {
      setStatus(err.response?.data?.message || 'There was a problem. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, paddingBottom: 40 }} id="forgot-password-page">
      {/* Logo */}
      <Link to="/" style={{ marginBottom: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#FF9900', letterSpacing: '-1px', lineHeight: 1 }}>SYED</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#FF9900', letterSpacing: '-1px', lineHeight: 1 }}>menswear</div>
        </div>
      </Link>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: 350, border: '1px solid #DDD', borderRadius: 4, padding: '22px 26px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 12 }}>Password assistance</h1>
        <p style={{ fontSize: 13, color: '#0F1111', marginBottom: 16 }}>
          Enter the email address associated with your SYED account.
        </p>

        {status && (
          <div style={{ border: '1px solid #007185', borderLeft: '4px solid #007185', borderRadius: 3, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#0F1111', background: '#f0fafe' }}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F1111', marginBottom: 4 }}>
              Email address
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

          <button
            type="submit"
            disabled={loading}
            id="continue-btn"
            className="amz-btn-orange"
            style={{ width: '100%', padding: '9px 0', fontSize: 14 }}
          >
            {loading ? 'Sending...' : 'Continue'}
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div style={{ width: '100%', maxWidth: 350, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: '#DDD' }} />
          <span style={{ fontSize: 12, color: '#767676', whiteSpace: 'nowrap' }}>Remembered your password?</span>
          <div style={{ flex: 1, height: 1, background: '#DDD' }} />
        </div>
        <Link
          to="/login"
          style={{ display: 'block', textAlign: 'center', border: '1px solid #DDD', borderRadius: 3, padding: '9px 0', fontSize: 14, color: '#0F1111', background: '#f7f8f8' }}
          className="hover:bg-[#e7e9ec] transition-colors"
        >
          Sign in
        </Link>
      </div>

    </div>
  );
};

export default ForgotPasswordPage;
