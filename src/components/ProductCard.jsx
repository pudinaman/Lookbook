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
      whileHover={{ scale: 1.04 }}
      className="
        cursor-pointer 
        rounded-3xl 
        overflow-hidden 

        /* ✅ GLASS EFFECT */
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20 

        /* ✅ Subtle shadow + hover glow */
        shadow-[0_4px_20px_rgba(0,0,0,0.3)]
        hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)]
        transition-all duration-300
      "
      onClick={() => onClick?.(product)}
    >
      {/* Image */}
      <div className="aspect-[3/4] w-full bg-black/20">
        <img
          src={imageUrl}
          alt={product?.images?.[0]?.altText || product?.name || "Product"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x400?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Text section – switched to lighter colors for dark theme */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-white truncate capitalize">
          {product?.name || "Unnamed Product"}
        </h3>

        <p className="text-xs text-gray-300 mt-1">
          {product?.category || "General"}
          {product?.subCategory && ` • ${product.subCategory}`}
        </p>

        
      </div>
    </motion.div>
  );
}
