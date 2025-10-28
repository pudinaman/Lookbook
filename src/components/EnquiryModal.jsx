import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";


export default function EnquiryModal({
  product,
  onClose,
  businessPhone,
  businessEmail,
}) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-5 sm:p-6"
          onClick={(e) => e.stopPropagation()} // Prevent close on modal click
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          >
            <X size={22} />
          </button>

          {/* Product Image */}
          <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-4">
            <img
              src={product?.images?.[0]?.url || "/placeholder.png"}
              alt={product?.name}
              className="w-full h-full object-contain bg-gray-50"
            />
          </div>

          {/* Product Info */}
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
            {product?.name}
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            AED {product?.additionalInfo?.price || product?.basePrice || "N/A"}
          </p>

          {/* Enquiry Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${businessPhone.replace(
                "+",
                ""
              )}?text=${encodeURIComponent(
                `Hi! I'm interested in *${
                  product?.name
                }*.\n\nHere’s the product image:\n${
                  product?.images?.[0]?.url || "Image not available"
                }`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Enquire on WhatsApp
            </a>

            <button
              onClick={() =>
                toast.error(
                  "This service is currently unavailable. Please use WhatsApp for enquiries.",
                  {
                    duration: 3000,
                    style: {
                      background: "#1E40AF", // blue-800
                      color: "#fff",
                      fontWeight: "500",
                      borderRadius: "0.5rem",
                    },
                  }
                )
              }
              className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Enquire via Email
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
