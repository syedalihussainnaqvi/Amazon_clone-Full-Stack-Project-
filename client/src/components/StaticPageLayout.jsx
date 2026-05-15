import { Link, useLocation } from 'react-router-dom';

const sidebarLinks = [
  { title: 'Help & Customer Service', to: '/help', isHeader: true },
  { title: 'Returns & Replacements', to: '/returns' },
  { title: 'Shipping Rates & Policies', to: '/shipping' },
  { title: 'About SYED', to: '/about' },
  { title: 'Careers', to: '/careers' },
  { title: 'Press Releases', to: '/press-releases' },
  { title: 'SYED Cares', to: '/odion-cares' },
  { title: 'Sell on SYED', to: '/sell' },
  { title: 'Become an Affiliate', to: '/affiliate' },
  { title: 'Advertise Your Products', to: '/advertise' },
  { title: 'SYED Business Card', to: '/business-card' },
  { title: 'Gift Cards', to: '/gift-cards' },
  { title: 'Payment Methods', to: '/payment-methods' },
];

const StaticPageLayout = ({ title, children }) => {
  const location = useLocation();

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '16px 0' }} id="static-page-layout">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row gap-8">

        {/* Amazon Help Sidebar Style */}
        <aside style={{ width: '100%', maxWidth: 240, flexShrink: 0 }} className="hidden md:block">
          <div style={{ borderRight: '1px solid #DDD', paddingRight: 16 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarLinks.map((link) => (
                <li key={link.to} style={{ marginBottom: link.isHeader ? 16 : 8 }}>
                  <Link
                    to={link.to}
                    style={{
                      fontSize: link.isHeader ? 16 : 13,
                      fontWeight: link.isHeader || location.pathname === link.to ? 700 : 400,
                      color: location.pathname === link.to ? '#e77600' : (link.isHeader ? '#0F1111' : '#007185'),
                      textDecoration: 'none'
                    }}
                    className={location.pathname !== link.to && !link.isHeader ? "hover:underline hover:text-[#C45500]" : ""}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1 }}>
          <div className="amz-breadcrumb flex items-center gap-1 mb-4">
            <Link to="/">SYED</Link>
            <span style={{ color: '#aaa' }}>›</span>
            <span style={{ color: '#0F1111', fontWeight: 700 }}>{title}</span>
          </div>

          <div style={{ borderBottom: '1px solid #DDD', paddingBottom: 16, marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111' }}>{title}</h1>
          </div>

          <div style={{ fontSize: 14, color: '#0F1111', lineHeight: 1.6 }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaticPageLayout;
