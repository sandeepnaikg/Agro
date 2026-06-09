import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.07, ease },
  }),
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export function ScrollReveal({ children, className = '', delay = 0, variant = 'fadeUp' }) {
  const hidden =
    variant === 'scaleIn' ? { opacity: 0, scale: 0.92 }
    : variant === 'fadeIn' ? { opacity: 0 }
    : { opacity: 0, y: 36 };

  const visible =
    variant === 'scaleIn' ? { opacity: 1, scale: 1, transition: { duration: 0.55, delay, ease } }
    : variant === 'fadeIn' ? { opacity: 1, transition: { duration: 0.6, delay, ease } }
    : { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease } };

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: '-60px', amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGrid({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px', amount: 0.1 }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

export function AnimatedCounter({ value, suffix = '', className = '' }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
    >
      {value}{suffix}
    </motion.span>
  );
}
