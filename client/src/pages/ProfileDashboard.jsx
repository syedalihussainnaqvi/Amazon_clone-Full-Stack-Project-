import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

/* Shared Amazon-style account sidebar — exported for reuse */
export const DashboardSidebar = ({ active }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  const links = [
    { to: '/profile', label: 'Your Account', icon: '👤' },
    { to: '/orders',  label: 'Your Orders',  icon: '📦' },
    { to: '/wishlist',label: 'Your Wishlist', icon: '❤️' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 220 }} className="shrink-0">
      <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ background: '#232F3E', padding: '12px 16px' }}>
          <p style={{ color: '#FF9900', fontSize: 14, fontWeight: 700 }}>Account Navigation</p>
        </div>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '11px 16px',
              fontSize: 13,
              color: active === l.to ? '#CC0C39' : '#007185',
              fontWeight: active === l.to ? 700 : 400,
              borderBottom: '1px solid #f0f0f0',
              background: active === l.to ? '#fff8f8' : '#fff',
            }}
            className="hover:bg-gray-50"
          >
            <span>{l.icon}</span>
            {l.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          id="logout-btn"
          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '11px 16px', fontSize: 13, color: '#565959', background: 'none', border: 'none', cursor: 'pointer' }}
          className="hover:bg-gray-50"
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
};

/* Account tile for the main dashboard grid */
const AccountTile = ({ icon, title, desc, to }) => (
  <Link
    to={to}
    style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 18px', display: 'flex', gap: 14, alignItems: 'flex-start', transition: 'box-shadow 0.15s' }}
    className="hover:shadow-md"
  >
    <div style={{ fontSize: 32, lineHeight: 1 }}>{icon}</div>
    <div>
      <p style={{ fontSize: 15, fontWeight: 700, color: '#007185', marginBottom: 4 }}>{title}</p>
      <p style={{ fontSize: 13, color: '#565959', lineHeight: 1.5 }}>{desc}</p>
    </div>
  </Link>
);

const ProfileDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="profile-page">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="amz-breadcrumb flex items-center gap-1 mb-4">
          <Link to="/">SYED</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <span style={{ color: '#0F1111', fontWeight: 700 }}>Your Account</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 16 }}>Your Account</h1>

        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <DashboardSidebar active="/profile" />

          <div style={{ flex: 1 }}>
            {/* Account tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <AccountTile icon="📦" title="Your Orders" desc="Track, return, or buy again" to="/orders" />
              <AccountTile icon="❤️" title="Your Wishlist" desc="Saved items for later" to="/wishlist" />
              <AccountTile icon="🔒" title="Login & Security" desc="Edit name, email, and password" to="/profile" />
              <AccountTile icon="📍" title="Your Addresses" desc="Edit addresses for orders" to="/profile" />
              <AccountTile icon="💳" title="Payment Methods" desc="Edit or add payment methods" to="/profile" />
              <AccountTile icon="📧" title="Email Preferences" desc="Manage your communication" to="/profile" />
            </div>

            {/* Profile info card */}
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #DDD' }}>
                Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: user?.name },
                  { label: 'Email Address', value: user?.email },
                  { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
                  { label: 'Account Status', value: 'Active' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: 12, color: '#565959', marginBottom: 3 }}>{label}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0F1111' }}>{value || '—'}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <button className="amz-btn-primary" style={{ fontSize: 13, padding: '7px 18px', opacity: 0.6, cursor: 'not-allowed' }}>
                  Edit Profile (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
