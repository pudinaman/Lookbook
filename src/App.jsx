import React, { useEffect, useMemo, useState } from "react";
import useProducts from "./hooks/useProducts";
import LookbookGrid from "./components/LookbookGrid";
import EnquiryModal from "./components/EnquiryModal";
import { Toaster } from "react-hot-toast";
import logo from "./assets/logo.png";
import Loader from "./components/Loader";

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

  function useFixMobileVh() {
    useEffect(() => {
      const setVh = () => {
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`
        );
      };
      setVh();
      window.addEventListener("resize", setVh);
      return () => window.removeEventListener("resize", setVh);
    }, []);
  }

  // inside App()
  useFixMobileVh();
  return (
    <div
      className="min-h-[calc(var(--vh)*100)] flex flex-col bg-[#192E40] p-6 lg:p-12"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <header className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Brand Logo"
            className="h-40 w-auto object-contain"
          />
        </div>
        <p className="text-gray-100 mt-2 text-center">
          Browse this season's collection. Click any item to enquire.
        </p>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        {loading && (
          <div>
            <Loader />
          </div>
        )}

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
