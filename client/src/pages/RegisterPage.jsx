import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [error, setError]           = useState('');
  const [loading, setLoading]       = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, paddingBottom: 40 }} id="register-page">
      {/* Logo */}
      <Link to="/" style={{ marginBottom: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#FF9900', letterSpacing: '-1px', lineHeight: 1 }}>SYED</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#FF9900', letterSpacing: '-1px', lineHeight: 1 }}>menswear</div>
        </div>
      </Link>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: 360, border: '1px solid #DDD', borderRadius: 4, padding: '22px 26px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 20 }}>Create account</h1>

        {error && (
          <div style={{ border: '1px solid #CC0C39', borderLeft: '4px solid #CC0C39', borderRadius: 3, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#CC0C39', background: '#fff8f8' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Your name', type: 'text', value: name, setter: setName, id: 'name-input', placeholder: 'First and last name', required: true },
            { label: 'Email', type: 'email', value: email, setter: setEmail, id: 'email-input', placeholder: '', required: true },
            { label: 'Password', type: 'password', value: password, setter: setPassword, id: 'password-input', placeholder: 'At least 6 characters', required: true, hint: 'Passwords must be at least 6 characters.' },
            { label: 'Re-enter password', type: 'password', value: confirm, setter: setConfirm, id: 'confirm-input', placeholder: '', required: true },
          ].map(f => (
            <div key={f.id} style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F1111', marginBottom: 4 }}>
                {f.label}
              </label>
              <input
                type={f.type}
                required={f.required}
                value={f.value}
                onChange={e => f.setter(e.target.value)}
                placeholder={f.placeholder}
                id={f.id}
                className="amz-input"
              />
              {f.hint && <p style={{ fontSize: 11, color: '#565959', marginTop: 3 }}>{f.hint}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            id="create-account-btn"
            className="amz-btn-orange"
            style={{ width: '100%', padding: '9px 0', fontSize: 14, marginTop: 4 }}
          >
            {loading ? 'Creating account...' : 'Create your account'}
          </button>

          <p style={{ fontSize: 11, color: '#565959', marginTop: 14, lineHeight: 1.5 }}>
            By creating an account, you agree to SYED's{' '}
            <Link to="/terms" style={{ color: '#007185' }} className="hover:underline">Conditions of Use</Link>{' '}
            and{' '}
            <Link to="/privacy" style={{ color: '#007185' }} className="hover:underline">Privacy Notice</Link>.
          </p>
        </form>

        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #DDD' }}>
          <p style={{ fontSize: 14, color: '#0F1111' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#007185' }} className="hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[{ label: 'Conditions of Use', to: '/terms' }, { label: 'Privacy Notice', to: '/privacy' }, { label: 'Help', to: '/help' }].map(l => (
          <Link key={l.label} to={l.to} style={{ fontSize: 12, color: '#007185' }} className="hover:underline">{l.label}</Link>
        ))}
      </div>
      <p style={{ fontSize: 12, color: '#767676', marginTop: 8 }}>
        © {new Date().getFullYear()} SYED, Inc.
      </p>
    </div>
  );
};

export default RegisterPage;
