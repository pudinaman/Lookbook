import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ product, onClick }) {
  if (!product || typeof product !== "object") return null;

  const imageUrl =
    product?.images?.[0]?.url && typeof product.images[0].url === "string"
      ? product.images[0].url
      : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      // Updated with softer radius, refined shadows, and a clearer border
      className="cursor-pointer bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden group"
      onClick={() => {
      console.log("Clicked:", product?.name); // ✅ ADD THIS LINE
      onClick?.(product);
  }}
    >
      <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={product?.images?.[0]?.altText || product?.name || "Product"}
          // Added transition for a smooth zoom effect on hover
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x400?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Increased padding and adjusted text styles for better hierarchy */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 truncate capitalize">
          {product?.name || "Unnamed Product"}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {product?.category || "General"}
          {product?.subCategory && ` • ${product.subCategory}`}
        </p>
        <p className="text-lg font-bold text-gray-900 mt-2">
          AED {product?.additionalInfo?.price || product?.basePrice || "—"}
        </p>
      </div>
    </motion.div>
  );
}
