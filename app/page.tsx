import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-yellow-500 mb-4">CyberGame</h1>
          <p className="text-2xl text-gray-300 mb-8">
            Where Legends Unite, Reviews Ignite
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Join the ultimate Mobile Legends community where players come
            together to analyze matches, share strategies, and elevate their
            gameplay. CyberGame: Your premier destination for in-depth MLBB
            match reviews and team analysis.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
          <Link
            href="/heroes"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-200 w-64 text-center"
          >
            Heroes List
          </Link>

          <Link
            href="/matches"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-200 w-64 text-center"
          >
            Match Reviews
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-yellow-500 mb-3">
              Match Analysis
            </h3>
            <p className="text-gray-400">
              Deep dive into game statistics, team compositions, and strategic
              decisions.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-yellow-500 mb-3">
              Hero Database
            </h3>
            <p className="text-gray-400">
              Comprehensive information about all Mobile Legends heroes and
              their roles.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-yellow-500 mb-3">
              Community Insights
            </h3>
            <p className="text-gray-400">
              Share and learn from match reviews by fellow MLBB enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
