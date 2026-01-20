import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Level Up Your <br />
          <span className="text-purple-400">Coding Skills</span>
        </h1>

        <p className="mt-4 text-gray-400 max-w-md">
          Practice coding, prepare for interviews, and get hired at top tech companies.
        </p>

        <Link
          to="/problems"
          className="inline-block mt-6 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition"
        >
          Start Coding Now
        </Link>
      </div>

      <div className="hidden lg:flex justify-center">
        <img src="/images/developer-home.png" alt="Coding Illustration" className="max-w-md" />
      </div>
    </section>
  );
};

export default HeroSection;
