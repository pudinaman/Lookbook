import { useMemo } from "react";
import { motion } from "framer-motion";
import CategoryHeader from "./CategoryHeader";
import ProductCard from "./ProductCard";

export default function LookbookGrid({ groups, onProductClick }) {
  // Grab only Men category safely
  const menProducts = useMemo(() => {
    if (!groups) return [];
    return groups.Men || [];
  }, [groups]);

  // Filter to only items whose name includes "jacket" (case-insensitive)
  const filteredProducts = useMemo(() => {
    return menProducts.filter(
      (p) => p && p.name && p.name.toLowerCase().includes("jacket")
    );
  }, [menProducts]);

  return (
    <div
      className="flex flex-col gap-8 px-4 md:px-8 py-6"
      style={{ backgroundColor: "#192E40" }}
    >
      {/* Header — still shows "Jackets" */}
      <div className="flex justify-between items-center mb-6 mt-2">
        <CategoryHeader name="Jackets" className="text-white" />
        {/* No category/subcategory UI — nothing to clear */}
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-300 mt-10 text-center text-lg">
          No jackets found in Men category.
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
