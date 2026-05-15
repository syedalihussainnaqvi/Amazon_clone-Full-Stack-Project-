import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const cols = [
    {
      heading: 'Get to Know Us',
      links: [
        { label: 'About SYED', to: '/about' },
        { label: 'Careers', to: '/careers' },
        { label: 'Press Releases', to: '/press-releases' },
        { label: 'SYED Cares', to: '/odion-cares' },
      ],
    },
    {
      heading: 'Make Money with Us',
      links: [
        { label: 'Sell on SYED', to: '/sell' },
        { label: 'Become an Affiliate', to: '/affiliate' },
        { label: 'Advertise Your Products', to: '/advertise' },
      ],
    },
    {
      heading: 'Payment Methods',
      links: [
        { label: 'SYED Business Card', to: '/business-card' },
        { label: 'Gift Cards', to: '/gift-cards' },
        { label: 'View All Payment Methods', to: '/payment-methods' },
      ],
    },
    {
      heading: 'Let Us Help You',
      links: [
        { label: 'Your Account', to: '/profile' },
        { label: 'Your Orders', to: '/orders' },
        { label: 'Shipping Rates & Policies', to: '/shipping' },
        { label: 'Returns & Replacements', to: '/returns' },
        { label: 'Help', to: '/help' },
      ],
    },
  ];

  return (
    <footer id="main-footer">
      {/* Band 1 – Back to top */}
      <div
        onClick={scrollToTop}
        style={{ backgroundColor: '#37475A', cursor: 'pointer' }}
        className="w-full text-center py-3 hover:bg-[#3d5068] transition-colors"
        id="back-to-top"
      >
        <span style={{ color: '#fff', fontSize: 13 }}>Back to top</span>
      </div>

      {/* Band 2 – Link columns */}
      <div style={{ backgroundColor: '#232F3E' }}>
        <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((col) => (
            <div key={col.heading}>
              <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} style={{ color: '#DDD', fontSize: 13 }} className="hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-600 mx-4" />

        {/* Band 3 – Logo + region */}
        <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" id="footer-logo" className="flex flex-col leading-none">
            <span style={{ fontSize: 10, color: '#aaa' }}>SYED</span>
          </Link>
          <div className="flex gap-3">
            <button style={{ border: '1px solid #aaa', borderRadius: 3, color: '#fff', fontSize: 12, padding: '4px 10px', background: 'transparent', cursor: 'pointer' }}>
              🌐 English
            </button>
            <button style={{ border: '1px solid #aaa', borderRadius: 3, color: '#fff', fontSize: 12, padding: '4px 10px', background: 'transparent', cursor: 'pointer' }}>
              🇺🇸 United States
            </button>
          </div>
        </div>
      </div>

      {/* Band 4 – Legal */}
      <div style={{ backgroundColor: '#131921' }} className="py-6">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center gap-3">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {[
              { label: 'Conditions of Use', to: '/terms' },
              { label: 'Privacy Notice', to: '/privacy' },
              { label: 'Your Ads Privacy Choices', to: '/privacy' },
            ].map((l) => (
              <Link key={l.label} to={l.to} style={{ color: '#DDD', fontSize: 12 }} className="hover:underline">
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{ color: '#aaa', fontSize: 12, textAlign: 'center' }}>
            © 1996–{new Date().getFullYear()}, SYED, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
