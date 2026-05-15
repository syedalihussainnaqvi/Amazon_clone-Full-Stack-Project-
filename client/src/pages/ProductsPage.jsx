import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { ProductSkeleton } from '../components/LoadingSpinner';

const StarFilter = ({ value, onChange }) => (
  <div className="flex flex-col gap-1">
    {[4, 3, 2, 1].map(n => (
      <button
        key={n}
        onClick={() => onChange(n === value ? '' : n)}
        className="flex items-center gap-1 hover:underline text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}
      >
        <div className="flex">
          {[1,2,3,4,5].map(s => (
            <svg key={s} style={{ width: 13, height: 13, color: s <= n ? '#FF9900' : '#DDD' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span style={{ fontSize: 13, color: '#007185' }}>&amp; Up</span>
        {n === value && <span style={{ fontSize: 11, color: '#CC0C39', marginLeft: 4 }}>✓</span>}
      </button>
    ))}
  </div>
);

const ProductListCard = ({ product }) => {
  const { _id, title, price, originalPrice, image, category, averageRating, reviews } = product;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  return (
    <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 16, display: 'flex', gap: 16 }}>
      <Link to={`/products/${_id}`} style={{ flexShrink: 0, width: 140, height: 140, background: '#f7f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
        <img src={image} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} loading="lazy" />
      </Link>
      <div style={{ flex: 1 }}>
        <Link to={`/products/${_id}`}>
          <p className="line-clamp-2" style={{ color: '#007185', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{title}</p>
        </Link>
        {averageRating > 0 && (
          <div className="flex items-center gap-1 mb-1">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <svg key={s} style={{ width: 14, height: 14, color: s <= Math.round(averageRating) ? '#FF9900' : '#DDD' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span style={{ color: '#007185', fontSize: 13 }}>{reviews?.length || 0}</span>
          </div>
        )}
        <div className="flex items-baseline gap-1 mb-1">
          <span style={{ fontSize: 11, color: '#CC0C39', fontWeight: 700, verticalAlign: 'super' }}>$</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#CC0C39', lineHeight: 1 }}>{Math.floor(price)}</span>
          <span style={{ fontSize: 11, color: '#CC0C39', fontWeight: 700, verticalAlign: 'super' }}>{String(price.toFixed(2)).split('.')[1]}</span>
          {originalPrice && <span style={{ fontSize: 13, color: '#565959', textDecoration: 'line-through', marginLeft: 6 }}>Was ${originalPrice.toFixed(2)}</span>}
          {discount > 0 && <span style={{ fontSize: 12, color: '#CC0C39', marginLeft: 4 }}>({discount}% off)</span>}
        </div>
        <p style={{ color: '#007600', fontSize: 13, marginBottom: 4 }}>In Stock</p>
        <p style={{ color: '#565959', fontSize: 12, marginBottom: 8 }}>
          <span style={{ fontWeight: 700 }}>FREE</span> delivery Thu, May 15
        </p>
        <div style={{ display: 'inline-block', fontSize: 11, color: '#565959', background: '#f0f2f2', padding: '2px 6px', borderRadius: 2, marginBottom: 10 }}>
          {category}
        </div>
        <div>
          <Link to={`/products/${_id}`} className="amz-btn-primary" style={{ fontSize: 13, padding: '6px 14px' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [size, setSize] = useState(searchParams.get('size') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [minRating, setMinRating] = useState('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const sorts = [
    { value: 'newest',     label: 'Newest Arrivals' },
    { value: 'popular',    label: 'Best Sellers' },
    { value: 'price_asc',  label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating',     label: 'Avg. Customer Review' },
  ];

  useEffect(() => {
    productAPI.getCategories().then(res => setCategories(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = { category, sort, minPrice, maxPrice, size, search };
        Object.keys(params).forEach(k => !params[k] && delete params[k]);
        const { data } = await productAPI.getAll(params);
        let prods = data.products;
        if (minRating) prods = prods.filter(p => (p.averageRating || 0) >= Number(minRating));
        setProducts(prods);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category, sort, minPrice, maxPrice, size, search, minRating]);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const updateFilters = (key, value) => {
    if (value) searchParams.set(key, value); else searchParams.delete(key);
    setSearchParams(searchParams);
    if (key === 'category') setCategory(value);
    if (key === 'sort')     setSort(value);
    if (key === 'size')     setSize(value);
  };

  const handlePriceApply = (e) => {
    e.preventDefault();
    if (minPrice) searchParams.set('minPrice', minPrice); else searchParams.delete('minPrice');
    if (maxPrice) searchParams.set('maxPrice', maxPrice); else searchParams.delete('maxPrice');
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setCategory(''); setSort('newest'); setMinPrice(''); setMaxPrice('');
    setSize(''); setSearch(''); setMinRating('');
  };

  const breadcrumb = [
    { label: 'SYED', to: '/' },
    ...(category ? [{ label: "Men's Clothing", to: '/products' }, { label: category }] : [{ label: "Men's Clothing" }]),
    ...(search ? [{ label: `"${search}"` }] : []),
  ];

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh' }} id="products-page">
      <div className="max-w-[1200px] mx-auto px-4 py-4">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 mb-3 flex-wrap amz-breadcrumb">
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span style={{ color: '#aaa' }}>›</span>}
              {b.to ? <Link to={b.to}>{b.label}</Link> : <span style={{ color: '#0F1111', fontWeight: 700 }}>{b.label}</span>}
            </span>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">

          {/* ── SIDEBAR ── */}
          <aside className={`lg:w-56 shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #DDD' }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111' }}>Filters</h2>
                <button onClick={clearFilters} style={{ fontSize: 12, color: '#007185', background: 'none', border: 'none', cursor: 'pointer' }}>Clear all</button>
              </div>

              {/* Department */}
              <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #DDD' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#0F1111' }}>Department</h3>
                <div className="flex flex-col gap-1">
                  <button onClick={() => updateFilters('category', '')} style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: category === '' ? '#CC0C39' : '#007185', fontWeight: category === '' ? 700 : 400, padding: '2px 0' }}>
                    All Men's Clothing
                  </button>
                  {categories.map(c => (
                    <button key={c} onClick={() => updateFilters('category', c)} style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: category === c ? '#CC0C39' : '#007185', fontWeight: category === c ? 700 : 400, padding: '2px 0' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avg Rating */}
              <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #DDD' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#0F1111' }}>Avg. Customer Review</h3>
                <StarFilter value={Number(minRating)} onChange={setMinRating} />
              </div>

              {/* Price */}
              <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #DDD' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#0F1111' }}>Price</h3>
                {[['Under $25', '', '25'], ['$25–$50', '25', '50'], ['$50–$100', '50', '100'], ['Over $100', '100', '']].map(([label, min, max]) => (
                  <button key={label} onClick={() => { setMinPrice(min); setMaxPrice(max); }} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#007185', padding: '2px 0' }}>{label}</button>
                ))}
                <form onSubmit={handlePriceApply} className="flex items-center gap-1 mt-2">
                  <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="amz-input" style={{ fontSize: 12, padding: '4px 6px' }} />
                  <span style={{ color: '#565959' }}>–</span>
                  <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="amz-input" style={{ fontSize: 12, padding: '4px 6px' }} />
                  <button type="submit" className="amz-btn-primary" style={{ padding: '4px 8px', fontSize: 11, whiteSpace: 'nowrap' }}>Go</button>
                </form>
              </div>

              {/* Size */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#0F1111' }}>Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button key={s} onClick={() => updateFilters('size', size === s ? '' : s)}
                      style={{ border: `1px solid ${size === s ? '#e77600' : '#DDD'}`, borderRadius: 2, padding: '3px 9px', fontSize: 12, cursor: 'pointer', background: size === s ? '#fff3e0' : '#fff', color: '#0F1111', boxShadow: size === s ? '0 0 0 2px rgba(228,121,17,0.3)' : 'none' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main style={{ flex: 1 }}>
            {/* Results header */}
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '10px 14px', marginBottom: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 14, color: '#0F1111' }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>
                  {search ? `Results for "${search}"` : category || "Men's Clothing"}
                </span>
                <span style={{ color: '#565959', fontSize: 13, marginLeft: 8 }}>{products.length} results</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="lg:hidden flex items-center gap-1"
                  style={{ background: 'none', border: '1px solid #DDD', borderRadius: 3, padding: '5px 10px', fontSize: 13, cursor: 'pointer' }}
                >
                  <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                  Filters
                </button>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 13, color: '#0F1111', whiteSpace: 'nowrap' }}>Sort by:</span>
                  <select value={sort} onChange={e => updateFilters('sort', e.target.value)}
                    className="amz-input" style={{ width: 'auto', fontSize: 13, padding: '4px 8px' }}>
                    {sorts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Product list */}
            {loading ? (
              <div className="flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 16, display: 'flex', gap: 16 }}>
                    <div className="skeleton" style={{ width: 140, height: 140, borderRadius: 2 }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton" style={{ height: 16, width: '70%', marginBottom: 8, borderRadius: 2 }} />
                      <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 8, borderRadius: 2 }} />
                      <div className="skeleton" style={{ height: 20, width: '25%', borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="flex flex-col gap-3">
                {products.map(p => <ProductListCard key={p._id} product={p} />)}
              </div>
            ) : (
              <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 48, textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 8 }}>No results found</p>
                <p style={{ fontSize: 14, color: '#565959', marginBottom: 16 }}>Check the spelling or use less specific search terms.</p>
                <button onClick={clearFilters} className="amz-btn-primary" style={{ padding: '8px 20px' }}>Clear Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
