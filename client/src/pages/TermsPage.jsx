import { Link } from 'react-router-dom';

const sections = [
  {
    id: 'conditions',
    title: 'Conditions of Use',
    content:
      'By using the SYED website, you agree to be bound by these conditions. Please read them carefully before using our services. If you do not accept these conditions, you may not use the SYED website.',
  },
  {
    id: 'accounts',
    title: 'Your Account',
    content:
      'If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. SYED sells products for adults only and does not sell to minors.',
  },
  {
    id: 'reviews',
    title: 'Reviews, Comments & Content',
    content:
      'Visitors may post content such as reviews and comments if they keep the content non-illegal, non-obscene, non-threatening, non-defamatory, non-invasive of privacy, and not violating of intellectual property rights. You grant SYED a non-exclusive, royalty-free, perpetual, irrevocable right to use, reproduce, modify, and display such content.',
  },
  {
    id: 'copyright',
    title: 'Copyright & Intellectual Property',
    content:
      'All content on this site — including text, graphics, logos, images, and software — is the property of SYED or its suppliers and is protected by applicable copyright and trademark law. Unauthorized reproduction or distribution is strictly prohibited.',
  },
  {
    id: 'disputes',
    title: 'Disputes & Governing Law',
    content:
      'Any dispute relating to your use of this site or any purchase shall be governed by the laws of the State of New York, without regard to its conflict of law provisions. Disputes shall be resolved through binding arbitration.',
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer of Warranties',
    content:
      'THIS SITE IS PROVIDED BY SYED ON AN "AS IS" AND "AS AVAILABLE" BASIS. SYED MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE SITE OR THE INFORMATION, CONTENT, OR PRODUCTS INCLUDED ON THIS SITE.',
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    content:
      'SYED reserves the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the site after any changes constitutes your acceptance of the new terms.',
  },
];

const TermsPage = () => (
  <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="terms-page">
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="amz-breadcrumb flex items-center gap-1 mb-4">
        <Link to="/">SYED</Link>
        <span style={{ color: '#aaa' }}>›</span>
        <span style={{ color: '#0F1111', fontWeight: 700 }}>Conditions of Use</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <nav style={{ width: '100%', maxWidth: 220 }} className="hidden lg:block">
          <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '14px 0', position: 'sticky', top: 80 }}>
            <p style={{ fontSize: 13, fontWeight: 700, padding: '0 16px 10px', borderBottom: '1px solid #DDD', marginBottom: 8 }}>On this page</p>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{ display: 'block', padding: '6px 16px', fontSize: 13, color: '#007185' }} className="hover:underline hover:bg-gray-50">
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '24px 28px' }}>
            <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 4 }}>SYED Conditions of Use</h1>
            <p style={{ fontSize: 13, color: '#565959', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #DDD' }}>
              Last updated: January 1, {new Date().getFullYear()}
            </p>
            {sections.map(s => (
              <div key={s.id} id={s.id} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #f0f0f0' }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#007185', marginBottom: 10 }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: '#0F1111', lineHeight: 1.7 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TermsPage;
