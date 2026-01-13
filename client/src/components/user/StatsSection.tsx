import React from 'react';
import { STATS } from '../../constants/stats';

interface StatsCardProps {
  value: string;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <p className="mt-1 text-gray-400 text-sm">{label}</p>
    </div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
      {STATS.map((stat) => (
        <StatsCard key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </section>
  );
};

export default StatsSection;
