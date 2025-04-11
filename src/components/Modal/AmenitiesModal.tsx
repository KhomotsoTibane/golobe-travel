import { AnimatePresence, motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

const chunkArray = <T,>(arr: T[], chunkCount: number): T[][] => {
  const chunks: T[][] = Array.from({ length: chunkCount }, () => []);
  arr.forEach((item, index) => {
    chunks[index % chunkCount].push(item);
  });
  return chunks;
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  amenities,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  amenities: string[];
}) => {
  const columns = chunkArray(amenities, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-center mb-4">All Amenities</h3>

              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                {columns.map((col, colIdx) => (
                  <ul key={colIdx} className="space-y-2 text-sm">
                    {col.map((item, idx) => (
                      <li key={idx} className="border-b pb-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700 font-semibold w-full py-2 rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
