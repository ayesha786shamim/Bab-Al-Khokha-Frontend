import ProductCard from './ProductCard';

const ProductPanel = ({ products, isDatabaseConnected }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} isDatabaseConnected={isDatabaseConnected} />
      ))}
    </div>
  );
};

export default ProductPanel;
