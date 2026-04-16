import React from 'react';
import { FEATURES } from '../../constants/features';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
      {FEATURES.map((feature) => (
        <Link to={`/${feature.title}`} key={feature.title.toLowerCase()}>
        <FeatureCard title={feature.title} description={feature.description} />
        </Link>
      ))}
    </section>
  );
};

export default FeatureSection;
