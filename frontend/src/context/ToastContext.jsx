import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="text-secondary shrink-0" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-500 shrink-0" />;
      default:
        return <Info size={16} className="text-primary shrink-0" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed top-24 right-6 md:right-12 z-[100] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="pointer-events-auto w-full bg-white/90 backdrop-blur-md border border-stone-200/50 shadow-ambient rounded-2xl p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                {getIcon(t.type)}
                <span className="text-[11px] font-bold font-sans text-stone-700 leading-normal">
                  {t.message}
                </span>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="p-1 hover:bg-stone-50 rounded-lg text-stone-300 hover:text-stone-500 transition-colors shrink-0"
              >
                <X size={13} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
