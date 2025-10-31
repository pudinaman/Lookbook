import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import CategoryHeader from "./CategoryHeader";
import ProductCard from "./ProductCard";

export default function LookbookGrid({ groups, onProductClick }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Category → SubCategory mapping
  const sidebarData = useMemo(() => {
    const map = {};
    Object.entries(groups || {}).forEach(([category, items]) => {
      map[category] = [...new Set(items.map((p) => p.subCategory || "Others"))];
    });
    return map;
  }, [groups]);

  // Products filtering
  const filteredProducts = useMemo(() => {
    if (!groups) return [];
    if (!selectedCategory) return Object.values(groups).flat();

    let products = groups[selectedCategory] || [];
    if (selectedSubCategory) {
      products = products.filter((p) => p.subCategory === selectedSubCategory);
    }
    return products;
  }, [groups, selectedCategory, selectedSubCategory]);

  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 py-6"
         style={{ backgroundColor: "#192E40" }}  // ✅ Your new background
    >

      {/* ✅ TOP CATEGORY BAR */}
      <div className="w-full flex flex-wrap gap-3 justify-center">
        {Object.keys(groups).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(selectedCategory === cat ? null : cat);
              setSelectedSubCategory(null);
            }}
            className={`px-4 py-2 rounded-full text-sm transition-all border backdrop-blur-md
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-400"
                  : "text-gray-200 border-gray-600 hover:bg-white/10"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ SUBCATEGORY BAR */}
      {selectedCategory && (
        <div className="w-full flex flex-wrap gap-2 justify-center mt-2">
          {sidebarData[selectedCategory].map((sub) => (
            <button
              key={sub}
              onClick={() =>
                setSelectedSubCategory(
                  selectedSubCategory === sub ? null : sub
                )
              }
              className={`px-3 py-1 rounded-full text-sm transition-all 
                ${
                  selectedSubCategory === sub
                    ? "bg-blue-400 text-white"
                    : "bg-white/10 text-gray-200 hover:bg-white/20"
                }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* ✅ HEADER + CLEAR BUTTON */}
      <div className="flex justify-between items-center mb-6 mt-2">
        <CategoryHeader
          name={selectedSubCategory || selectedCategory || "All Products"}
          className="text-white"
        />

        {(selectedCategory || selectedSubCategory) && (
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubCategory(null);
            }}
            className="text-sm text-gray-300 hover:text-blue-300 transition"
          >
            Clear Filters ✕
          </button>
        )}
      </div>

      {/* ✅ PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-300 mt-10 text-center text-lg">
          No products found in this category.
        </p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((p) => (
            <ProductCard
              key={p._id || p.id || Math.random()}
              product={p}
              onClick={onProductClick}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
