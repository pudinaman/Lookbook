import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EnquiryModal({
  product,
  onClose,
  businessPhone,
  businessEmail,
}) {
  if (!product) return null;

  const images = product?.images?.length
    ? product.images.map((img) => img.url)
    : ["/placeholder.png"];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="
            relative 
            rounded-3xl 
            w-full max-w-lg 
            p-6

            bg-white/10
            backdrop-blur-xl
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.45)]
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* ✅ Custom SVG Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-black/30 hover:bg-black/50 transition cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* ✅ Image Slider */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-white/5">

            {/* Image */}
            <motion.img
              key={current}
              src={images[current]}
              alt={product?.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="
                w-full 
                h-[300px] sm:h-[350px] md:h-[380px] 
                object-contain 
                p-2
              "
            />

            {/* ✅ Left Arrow */}
            {images.length > 1 && (
              <button
                onClick={prevSlide}
                className="
                  absolute left-2 top-1/2 -translate-y-1/2 
                  bg-black/40 backdrop-blur-md p-2 
                  rounded-full text-white 
                  hover:bg-black/60 transition
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* ✅ Right Arrow */}
            {images.length > 1 && (
              <button
                onClick={nextSlide}
                className="
                  absolute right-2 top-1/2 -translate-y-1/2 
                  bg-black/40 backdrop-blur-md p-2 
                  rounded-full text-white 
                  hover:bg-black/60 transition
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            {/* ✅ Dot Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 w-full flex justify-center gap-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 w-2 rounded-full cursor-pointer transition ${
                      current === index
                        ? "bg-white"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Product Name */}
          <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4 mb-2 text-center">
            {product?.name}
          </h2>

          {/* ✅ Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${businessPhone.replace(
                "+",
                ""
              )}?text=${encodeURIComponent(
                `Hi! I'm interested in *${product?.name}*.\n\nProduct Images:\n${images.join(
                  "\n"
                )}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 
                bg-green-600 text-white 
                text-center py-2.5 
                rounded-lg font-medium 
                hover:bg-green-700 transition
              "
            >
              Enquire on WhatsApp
            </a>

            {/* Email */}
            <button
              onClick={() =>
                toast.error("Email service unavailable. Use WhatsApp instead.", {
                  duration: 2500,
                  style: {
                    background: "#1E40AF",
                    color: "#fff",
                    borderRadius: "0.5rem",
                  },
                })
              }
              className="
                flex-1 
                bg-blue-500 text-white 
                text-center py-2.5 
                rounded-lg font-medium 
                hover:bg-blue-600 transition
              "
            >
              Enquire via Email
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
