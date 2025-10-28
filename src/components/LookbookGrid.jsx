import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CategoryHeader from './CategoryHeader'
import ProductCard from './ProductCard'
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function LookbookGrid({ groups, onProductClick }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)

  // Generate category → subcategory mapping
  const sidebarData = useMemo(() => {
    const map = {}
    Object.entries(groups || {}).forEach(([category, items]) => {
      map[category] = [...new Set(items.map((p) => p.subCategory || 'Others'))]
    })
    return map
  }, [groups])

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!groups) return []
    if (!selectedCategory) return Object.values(groups).flat()
    let products = groups[selectedCategory] || []
    if (selectedSubCategory) {
      products = products.filter((p) => p.subCategory === selectedSubCategory)
    }
    return products
  }, [groups, selectedCategory, selectedSubCategory])

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 py-6">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white rounded-2xl shadow-md border border-gray-100 h-fit p-5">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 tracking-tight border-b pb-2">
          Categories
        </h2>
        <ul className="space-y-3">
          {Object.entries(sidebarData).map(([category, subs]) => (
            <li key={category} className="border-b border-gray-100 pb-2">
              <button
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={`flex justify-between items-center w-full text-base font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-500'
                }`}
              >
                {category}
                <motion.span
                  animate={{ rotate: selectedCategory === category ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={18} />
                </motion.span>
              </button>

              <AnimatePresence>
                {selectedCategory === category && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="pl-4 mt-2 space-y-1 overflow-hidden"
                  >
                    {subs.map((sub) => (
                      <li key={sub}>
                        <button
                          onClick={() =>
                            setSelectedSubCategory(
                              selectedSubCategory === sub ? null : sub
                            )
                          }
                          className={`text-sm rounded-md px-2 py-1 transition-all duration-200 ${
                            selectedSubCategory === sub
                              ? 'bg-blue-50 text-blue-600 font-semibold'
                              : 'text-gray-600 hover:text-blue-500'
                          }`}
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Product Display */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <CategoryHeader
            name={selectedSubCategory || selectedCategory || 'All Products'}
          />
          {(selectedCategory || selectedSubCategory) && (
            <button
              onClick={() => {
                setSelectedCategory(null)
                setSelectedSubCategory(null)
              }}
              className="text-sm text-gray-500 hover:text-blue-600 transition"
            >
              Clear Filters ✕
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 mt-10 text-center text-lg">
            No products found in this category.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
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
      </main>
    </div>
  )
}
