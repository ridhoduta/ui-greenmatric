interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  isLast?: boolean;
}
import { motion } from 'framer-motion';

export function FeatureCard({ icon, title, description, isLast = false }: FeatureCardProps) {
  return (
    <motion.div drag  whileDrag={{ scale: 1.2, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} className={`group ${!isLast ? 'border-b border-outline-variant/20 pb-8' : ''} ${isLast ? 'md:border-b-0 md:pb-0' : ''}`}>
      <div className="flex items-start space-x-6">
        <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
