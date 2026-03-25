import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Code2,
  Briefcase,
  Code,
  Trophy,
  TrendingUp,
  Users,
  Search,
  Target,
  BarChart3,
  Zap,
  Award,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const candidateFeatures = [
    {
      icon: Code,
      title: "Practice Real Challenges",
      description:
        "Solve curated coding problems across multiple difficulty levels.",
    },
    {
      icon: Trophy,
      title: "Compete in Contests",
      description:
        "Participate in timed contests designed to simulate real interviews.",
    },
    {
      icon: TrendingUp,
      title: "Track Performance",
      description:
        "Analyze your progress with detailed performance insights.",
    },
    {
      icon: ShieldCheck,
      title: "Get Discovered",
      description:
        "Be visible to verified recruiters searching for skilled developers.",
    },
  ];

  const recruiterFeatures = [
    {
      icon: Search,
      title: "Find Proven Talent",
      description:
        "Access developers ranked by real coding performance.",
    },
    {
      icon: Target,
      title: "Skill-Based Matching",
      description:
        "Match candidates to roles based on technical strengths.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Review coding metrics and contest rankings.",
    },
    {
      icon: Zap,
      title: "Faster Hiring",
      description:
        "Shortlist skilled candidates instantly.",
    },
  ];

  const stats = [
    { icon: Code, label: "Real Coding Challenges" },
    { icon: Users, label: "Growing Developer Community" },
    { icon: Award, label: "Performance-Based Evaluation" },
    { icon: ShieldCheck, label: "Verified Recruiter Accounts" },
  ];

  const 
  scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white scroll-smooth">
      <nav id="navbar" className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CE</span>
            </div>
            <span className="text-xl font-bold">
              Code<span className="text-purple-400">Elevate</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("candidates")}
              className="text-gray-300 hover:text-white transition"
            >
              Developers
            </button>
            <button
              onClick={() => scrollToSection("recruiters")}
              className="text-gray-300 hover:text-white transition"
            >
              Recruiters
            </button>

            <div className="flex items-center gap-4 ml-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition shadow-md shadow-purple-500/30"
              >
                Get Started
              </Link>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-4 border-t border-gray-800">
            <button
              onClick={() => scrollToSection("candidates")}
              className="block w-full text-left"
            >
              Developers
            </button>
            <button
              onClick={() => scrollToSection("recruiters")}
              className="block w-full text-left"
            > Recruiters </button>

            <div className="pt-4 border-t border-gray-800 space-y-3">
              <Link to="/login" className="block text-center">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block text-center px-4 py-2 bg-purple-500 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden py-24 text-center">
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-gray-900 to-pink-900/20" />

        <div className="relative max-w-4xl mx-auto px-6">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Prove Your Skills.
            <br />
            <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get Hired for Your Code.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            CodeElevate connects developers and recruiters through real coding
            performance — not resumes. Practice, compete, and get discovered
            based on your actual skills.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 transition flex items-center justify-center gap-2"
            >
              <Code2 size={20} />
              I’m a Developer
            </Link>

            <Link
              to="/recruiter/signup"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              <Briefcase size={20} />
              I’m a Recruiter
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            No resumes. No bias. Just skill.
          </p>
        </div>
      </section>

      <section id="candidates" className="py-24 bg-gray-800/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Master Coding. Get Noticed.
            </h2>

            <p className="text-gray-400 mb-8">
              Improve your problem-solving skills and showcase your real coding
              ability to companies actively hiring.
            </p>

            <div className="space-y-6 mb-8">
              {candidateFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="text-purple-400" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/signup"
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition"
            >
              Start Coding
            </Link>
          </div>

          <div className="hidden lg:block h-80 rounded-2xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-gray-800 items-center justify-center text-gray-400">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              <img
                src="/images/developer-coding.jpg"
                alt="Developer coding"
                className="relative rounded-2xl shadow-2xl w-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop';
                }}
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      <section id="recruiters" className="py-24 scroll-mt-44 md:scroll-mt-5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block h-80 rounded-2xl bg-linear-to-br from-pink-500/20 to-purple-500/20 border border-gray-800 items-center justify-center text-gray-400">
            <div>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-bl from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <img
                src="/images/recruiter-hiring.jpg"
                alt="Recruiter hiring"
                className="relative rounded-2xl shadow-2xl w-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop';
                }}
              />
            </div>
          </div>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Hire Based on Real Skill
            </h2>

            <p className="text-gray-400 mb-8">
              Evaluate developers through performance data — not just resumes.
            </p>

            <div className="space-y-6 mb-8">
              {recruiterFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="text-pink-400" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/recruiter/signup"
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition"
            >
              Find Talent
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12">
            Built for Skill-Based Hiring
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 border border-gray-800 rounded-xl bg-gray-900/50 hover:border-purple-500 transition"
              >
                <stat.icon
                  size={28}
                  className="text-purple-400 mx-auto mb-4"
                />
                <p className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} codeElevate. All rights reserved.
      </footer>
    </div>
  );
}
