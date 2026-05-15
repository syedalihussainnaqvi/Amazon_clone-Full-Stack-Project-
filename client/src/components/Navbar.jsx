import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accountRef = useRef(null);

  const categories = ['All', 'Shirts', 'T-Shirts', 'Pants', 'Shoes', 'Accessories', 'Activewear', 'Outerwear'];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams({ search: searchQuery.trim() });
      if (searchCategory !== 'All') params.set('category', searchCategory);
      navigate(`/products?${params.toString()}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setAccountMenuOpen(false);
    navigate('/');
  };

  const firstName = user?.name?.split(' ')[0] || 'Sign In';

  return (
    <header className="sticky top-0 z-50" id="main-header">

      {/* ── ROW 1: Main Navbar ── */}
      <div style={{ backgroundColor: '#131921' }}>
        <div className="max-w-[1500px] mx-auto px-3 flex items-center gap-2" style={{ height: 60 }}>

          {/* Logo */}
          <Link
            to="/"
            id="logo-link"
            style={{
              display: 'flex', flexDirection: 'column', lineHeight: 1, flexShrink: 0,
              padding: '6px 8px',
              border: '1px solid transparent', borderRadius: 2,
              transition: 'border-color 0.1s', textDecoration: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
          >
            <span style={{ fontSize: 20, fontWeight: 700, color: '#FF9900', letterSpacing: '-0.5px' }}>
              SYED
            </span>
          </Link>

          {/* Deliver to */}
          <div
            className="hidden lg:flex flex-col shrink-0 cursor-pointer"
            style={{
              padding: '6px 8px',
              border: '1px solid transparent', borderRadius: 2,
              transition: 'border-color 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
          >
            <span style={{ fontSize: 11, color: '#ccc' }}>Deliver to</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg style={{ width: 14, height: 14, color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Your location</span>
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-1 rounded overflow-hidden"
            style={{ height: 40 }}
            id="search-form"
          >
            {/* Category dropdown — Amazon exact: #f3f3f3 bg, 12px, #555 text */}
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="hidden md:block shrink-0 outline-none cursor-pointer"
              style={{
                background: '#f3f3f3',
                borderRight: '1px solid #cdcdcd',
                fontSize: 12,
                color: '#555',
                padding: '0 6px',
                minWidth: 50,
                maxWidth: 120,
              }}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Text input — 16px prevents iOS zoom, Amazon standard */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SYED"
              className="outline-none flex-grow px-2 py-1 text-sm"
              style={{ backgroundColor: '#fff', border: 'none', fontSize: 14 }}
              id="search-input"
            />

            {/* Go / Search button */}
            <button
              type="submit"
              id="search-btn"
              style={{
                backgroundColor: '#FF9900',
                padding: '0 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, cursor: 'pointer', border: 'none',
                borderRadius: '0 4px 4px 0',
                transition: 'background-color 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fa8900'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FF9900'}
            >
              <svg style={{ width: 20, height: 20, color: '#333' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0, marginLeft: 4 }}>

            {/* Account & Lists */}
            <div style={{ position: 'relative' }} ref={accountRef}>
              <button
                onClick={() => isAuthenticated ? setAccountMenuOpen(!accountMenuOpen) : navigate('/login')}
                id="account-btn"
                style={{
                  display: 'flex', flexDirection: 'column',
                  padding: '6px 8px',
                  border: '1px solid transparent', borderRadius: 2,
                  background: 'none', cursor: 'pointer',
                  textAlign: 'left', transition: 'border-color 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
              >
                <span style={{ fontSize: 12, color: '#ccc', lineHeight: 1.3 }}>
                  Hello, {isAuthenticated ? firstName : 'sign in'}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 2, lineHeight: 1.3 }}>
                  Account &amp; Lists
                  <svg style={{ width: 10, height: 10 }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
                </span>
              </button>

              {/* Account Dropdown */}
              {accountMenuOpen && isAuthenticated && (
                <div
                  id="account-dropdown"
                  className="animate-slide-down"
                  style={{
                    position: 'absolute', right: 0, top: '100%', marginTop: 4,
                    width: 260, background: '#fff', color: '#0F1111',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    borderRadius: 4, border: '1px solid #ddd', zIndex: 50,
                  }}
                >
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', background: '#f7f8f8' }}>
                    <p style={{ fontSize: 13, fontWeight: 700 }}>{user?.name}</p>
                    <p style={{ fontSize: 12, color: '#565959' }}>{user?.email}</p>
                  </div>
                  <div style={{ padding: '6px 0' }}>
                    {[
                      { label: 'Your Account', to: '/profile' },
                      { label: 'Your Orders', to: '/orders' },
                      { label: 'Your Wishlist', to: '/wishlist' },
                    ].map(item => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setAccountMenuOpen(false)}
                        style={{ display: 'block', padding: '8px 16px', fontSize: 13, color: '#0F1111', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid #eee', margin: '4px 0' }} />
                    <button
                      onClick={handleLogout}
                      id="logout-btn"
                      style={{ width: '100%', textAlign: 'left', padding: '8px 16px', fontSize: 13, color: '#0F1111', background: 'none', border: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Returns & Orders */}
            <Link
              to="/orders"
              id="returns-link"
              className="hidden lg:flex flex-col"
              style={{
                padding: '6px 8px',
                border: '1px solid transparent', borderRadius: 2,
                transition: 'border-color 0.1s', textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            >
              <span style={{ fontSize: 12, color: '#ccc', lineHeight: 1.3 }}>Returns</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>&amp; Orders</span>
            </Link>

            {/* Cart — Amazon style: count number above icon, no circle */}
            <Link
              to="/cart"
              id="cart-link"
              style={{
                display: 'flex', alignItems: 'flex-end', gap: 3,
                padding: '6px 8px',
                border: '1px solid transparent', borderRadius: 2,
                transition: 'border-color 0.1s', textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={{ position: 'relative', width: 35, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: 35, height: 35, color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                {/* Amazon-style count: orange number positioned top-right, no circle */}
                <span style={{
                  position: 'absolute', top: 0, right: 0,
                  color: '#F08804', fontSize: 18, fontWeight: 700,
                  lineHeight: 1, minWidth: 16, textAlign: 'center',
                }}>
                  {cartCount > 0 ? (cartCount > 99 ? '99+' : cartCount) : '0'}
                </span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', paddingBottom: 4 }}>Cart</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-btn"
              className="lg:hidden"
              style={{
                padding: '6px 8px',
                border: '1px solid transparent', borderRadius: 2,
                background: 'none', cursor: 'pointer',
                transition: 'border-color 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            >
              <svg style={{ width: 22, height: 22, color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>



      {/* ── ROW 2: Category Nav ── */}
      <div style={{ backgroundColor: '#232F3E' }}>
        <div className="max-w-[1500px] mx-auto px-3 flex items-center h-10 gap-0.5 overflow-x-auto scrollbar-hide">

          {/* All / Hamburger */}
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '7px 10px',
              fontSize: 13, fontWeight: 700,
              color: '#fff',
              background: 'none',
              border: '1px solid transparent',
              borderRadius: 2,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'border-color 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
          >
            <svg style={{ width: 18, height: 18 }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
            All
          </button>

          {[
            { label: "Today's Deals", to: '/products' },
            { label: 'Shirts', to: '/products?category=Shirts' },
            { label: 'T-Shirts', to: '/products?category=T-Shirts' },
            { label: 'Pants', to: '/products?category=Pants' },
            { label: 'Shoes', to: '/products?category=Shoes' },
            { label: 'Accessories', to: '/products?category=Accessories' },
            { label: 'Activewear', to: '/products?category=Activewear' },
            { label: 'Outerwear', to: '/products?category=Outerwear' },
            { label: 'New Arrivals', to: '/products?sort=newest' },
            { label: 'Best Sellers', to: '/products?sort=popular' },
            { label: 'Customer Service', to: '/contact' },
          ].map(item => (
            <Link
              key={item.label}
              to={item.to}
              style={{
                padding: '7px 10px',
                fontSize: 13,
                fontWeight: 400,
                color: '#fff',
                border: '1px solid transparent',
                borderRadius: 2,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'border-color 0.1s',
                textDecoration: 'none',
                display: 'block',
                lineHeight: '20px',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: '#232F3E' }} className="lg:hidden animate-slide-down" id="mobile-menu">
          <div className="px-4 py-3 flex flex-col gap-0 border-t border-gray-600">
            {[
              { label: "Today's Deals", to: '/products' },
              { label: 'Shirts', to: '/products?category=Shirts' },
              { label: 'T-Shirts', to: '/products?category=T-Shirts' },
              { label: 'Pants', to: '/products?category=Pants' },
              { label: 'Shoes', to: '/products?category=Shoes' },
              { label: 'Accessories', to: '/products?category=Accessories' },
              { label: 'Activewear', to: '/products?category=Activewear' },
              { label: 'Outerwear', to: '/products?category=Outerwear' },
              { label: 'New Arrivals', to: '/products?sort=newest' },
              { label: 'Best Sellers', to: '/products?sort=popular' },
              { label: 'Customer Service', to: '/contact' },
              { label: 'Returns & Orders', to: '/orders' },
              { label: 'Your Account', to: '/profile' },
              ...(!isAuthenticated ? [{ label: 'Sign In', to: '/login' }] : []),
            ].map(item => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 400,
                  padding: '10px 0',
                  borderBottom: '1px solid #37475A',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
