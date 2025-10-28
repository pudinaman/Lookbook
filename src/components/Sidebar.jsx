// Sidebar.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, X } from "lucide-react";

const Sidebar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products/all");
        const products = res.data;

        const grouped = {};
        products.forEach((p) => {
          if (!grouped[p.category]) grouped[p.category] = new Set();
          if (p.subcategory) grouped[p.category].add(p.subcategory);
        });

        const structured = Object.entries(grouped).map(([name, subs]) => ({
          name,
          subcategories: Array.from(subs),
        }));

        setCategories(structured);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectSub = (catName, sub) => {
    onSelectCategory(catName, sub);
    setSelectedSub(sub);
  };

  const clearFilter = () => {
    onSelectCategory(null, null);
    setSelectedSub(null);
    setOpenCategory(null);
  };

  return (
    <aside className="w-72 bg-white p-6 rounded-3xl shadow-lg border border-gray-200 h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button
          onClick={clearFilter}
          className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
          title="Clear filter"
        >
          <X size={18} />
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              onClick={() =>
                setOpenCategory(openCategory === cat.name ? null : cat.name)
              }
              className={`flex items-center justify-between w-full text-lg font-semibold p-2 rounded-lg transition-colors duration-300 ${
                openCategory === cat.name
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <span>{cat.name}</span>
              {openCategory === cat.name ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>

            <AnimatePresence>
              {openCategory === cat.name && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 ml-4 space-y-1"
                >
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <button
                        onClick={() => handleSelectSub(cat.name, sub)}
                        className={`w-full text-left text-sm font-medium p-2 rounded-md transition-colors duration-300 ${
                          selectedSub === sub
                            ? "text-blue-600 bg-blue-50 font-semibold"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
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
  );
};

export default Sidebar;
