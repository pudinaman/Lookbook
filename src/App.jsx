import React, { useMemo, useState } from "react";
import useProducts from "./hooks/useProducts";
import LookbookGrid from "./components/LookbookGrid";
import EnquiryModal from "./components/EnquiryModal";
import { Toaster } from "react-hot-toast";


export default function App() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Business info
  const BUSINESS_PHONE = "+918989944488";
  

  const BUSINESS_EMAIL = "sales@yourbrand.com";

  // Normalize products
  const safeProducts = Array.isArray(products)
    ? products
    : Array.isArray(products?.data?.products)
    ? products.data.products
    : [];

  // Group by category
  const groups = useMemo(() => {
    const map = {};
    for (const p of safeProducts) {
      const cat = p.category || "Uncategorized";
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    }
    return map;
  }, [safeProducts]);
  

  return (
    <div className="min-h-screen bg-white p-6 lg:p-12">
      <header className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center">New Era</h1>
        <p className="text-gray-600 mt-2 text-center">
          Browse this season's collection. Click any item to enquire.
        </p>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        {loading && <div>Loading products...</div>}

        {error && (
          <div className="text-red-600">
            Failed to fetch products: {error.message || String(error)}
          </div>
        )}

        {!loading && !error && (
          <LookbookGrid
            groups={groups}
           onProductClick={(p) => {
           console.log("Product selected:", p?.name); // ✅ debug log
           setSelectedProduct(p);
          }}
          />
        )}
      </main>

      {/* ✅ Show modal when a product is selected */}
      {selectedProduct && (
        <EnquiryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          businessPhone={BUSINESS_PHONE}
          businessEmail={BUSINESS_EMAIL}
        />
      )}
      
    <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
