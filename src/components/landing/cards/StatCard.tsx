interface StatCardProps {
  value: string;
  label: string;
  description: string;
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="flex flex-col space-y-2 lg:px-8 first:pl-0 pt-4 md:pt-0">
      <span className="font-display-lg text-display-lg text-primary">{value}</span>
      <span className="font-label-md text-label-md text-on-surface uppercase tracking-wide">
        {label}
      </span>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-2">
        {description}
      </p>
    </div>
  );
}
