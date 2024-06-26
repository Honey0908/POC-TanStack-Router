import { ErrorComponent, Link, createFileRoute } from '@tanstack/react-router';
import { fetchProductById } from '../../services/products';

// dynamic route
export const Route = createFileRoute('/products/$productId')({
  component: Product,
  // get dynamic params in loader to fetch data before page load.
  loader: async ({ params: { productId } }) => fetchProductById(productId),
  // custom not found page, can be shown by throwing notFound() error.
  notFoundComponent: () => {
    return <p className='text-center text-3xl text-red-700 my-5'>Product not found</p>;
  },
  errorComponent: ErrorComponent
});

function Product() {
  // data fetched by loader 
  const product = Route.useLoaderData();

  return (
    <div className="container mx-auto py-12">
      {product && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-600 mb-4">${product.price}</p>
              <p className="text-gray-700">{product.description}</p>
              {/* mask route to "/products/" and it won't remember the masked route because unmaskOnReload is ture. */}
              <Link to="/products/$productId/edit" mask={{ to: "/products/", unmaskOnReload: true }} params={{ productId: product.id }}>Edit</Link>
            </div>
            <div className="p-6">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
