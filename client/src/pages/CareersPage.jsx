import StaticPageLayout from '../components/StaticPageLayout';
import { Link } from 'react-router-dom';

const openings = [
  { dept: 'Engineering', title: 'Senior Full-Stack Developer', location: 'Remote / New York, NY', type: 'Full-Time' },
  { dept: 'Engineering', title: 'Mobile Developer (React Native)', location: 'Remote', type: 'Full-Time' },
  { dept: 'Design', title: 'UI/UX Designer', location: 'Los Angeles, CA', type: 'Full-Time' },
  { dept: 'Marketing', title: 'Digital Marketing Specialist', location: 'Remote', type: 'Full-Time' },
  { dept: 'Operations', title: 'Supply Chain Coordinator', location: 'Chicago, IL', type: 'Full-Time' },
  { dept: 'Customer Experience', title: 'Customer Service Lead', location: 'Remote', type: 'Full-Time' },
];

const CareersPage = () => (
  <StaticPageLayout title="Careers at SYED">
    <p style={{ fontSize: 15, marginBottom: 16 }}>
      At SYED, we're on a mission to redefine men's fashion — one great outfit at a time.
      Join a team of passionate people building the future of online menswear retail.
    </p>

    <div style={{ background: 'linear-gradient(135deg, #131921, #232F3E)', borderRadius: 8, padding: '24px 28px', marginBottom: 32, color: '#fff' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Why Work at SYED?</h2>
      <ul style={{ paddingLeft: 20, lineHeight: 2.2, color: '#DDD', fontSize: 14 }}>
        <li>Competitive salary + performance bonuses</li>
        <li>Flexible remote-first culture</li>
        <li>30% employee discount on all products</li>
        <li>Health, dental & vision coverage</li>
        <li>Continuous learning & development budget</li>
      </ul>
    </div>

    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Open Positions</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
      {openings.map(job => (
        <div key={job.title} style={{ border: '1px solid #DDD', borderRadius: 4, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#FF9900', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{job.dept}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1111', marginBottom: 4 }}>{job.title}</div>
            <div style={{ fontSize: 13, color: '#565959' }}>📍 {job.location} &nbsp;·&nbsp; {job.type}</div>
          </div>
          <Link
            to="/contact"
            style={{ background: '#FF9900', color: '#111', fontWeight: 700, fontSize: 13, padding: '8px 18px', borderRadius: 20, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            Apply Now
          </Link>
        </div>
      ))}
    </div>

    <p style={{ fontSize: 13, color: '#565959' }}>
      Don't see a role that fits?{' '}
      <Link to="/contact" style={{ color: '#007185' }}>Send us your resume</Link> and we'll keep you in mind for future openings.
    </p>
  </StaticPageLayout>
);

export default CareersPage;
