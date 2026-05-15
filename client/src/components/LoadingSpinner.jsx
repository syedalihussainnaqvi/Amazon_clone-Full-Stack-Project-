const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizes[size]} border-3 border-gray-200 border-t-[#3B82F6] rounded-full animate-spin`}></div>
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
    <div className="aspect-[3/4] skeleton"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 skeleton rounded w-3/4"></div>
      <div className="h-3 skeleton rounded w-1/2"></div>
      <div className="h-5 skeleton rounded w-1/3"></div>
    </div>
  </div>
);

export { LoadingSpinner, ProductSkeleton };
