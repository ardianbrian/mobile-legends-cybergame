"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Search } from "lucide-react";
import LoadingMain from "../heroes/loading";

interface Match {
  id: string;
  title: string;
  matchTime: string;
  teamScore: number;
  enemyScore: number;
  teamGold: number;
  enemyGold: number;
  description?: string;
  status: string;
  createdAt: string;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"title" | "matchTime" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("/api/matches", {
          params: {
            page: currentPage,
            limit: 20,
            searchQuery,
            sortOption,
          },
        });

        setMatches(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch matches:", err);
        setError("Failed to fetch matches");
        setLoading(false);
      }
    };

    fetchMatches();
  }, [currentPage, searchQuery, sortOption]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (matchId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this match?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/matches/${matchId}`);
      alert("Match deleted successfully!");
      setMatches((prevMatches) =>
        prevMatches.filter((match) => match.id !== matchId)
      );
    } catch (err) {
      console.error("Failed to delete match:", err);
      alert("Failed to delete match.");
    }
  };

  if (loading) {
    return <LoadingMain />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
        <div className="max-w-6xl mx-auto text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-500">Matches List</h1>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 pl-10 rounded-lg bg-gray-700 text-white w-full"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <select
            value={sortOption || ""}
            onChange={(e) =>
              setSortOption(e.target.value as "title" | "matchTime" | null)
            }
            className="p-3 rounded-lg bg-gray-700 text-white flex-grow"
          >
            <option value="">Sort By</option>
            <option value="title">Title</option>
            <option value="matchTime">Match Time</option>
          </select>

          <Link
            href="/matches/add"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg transition flex items-center"
          >
            Add Match
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {match.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {new Date(match.matchTime).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/matches/${match.id}/edit`)}
                    className="text-yellow-500 hover:text-yellow-400 transition"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(match.id)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="text-center flex-grow p-2 rounded-lg">
                  <span className="text-2xl font-bold text-blue-600 block">
                    {match.teamScore}
                  </span>
                  <span className="text-xs text-blue-600">Team Score</span>
                </div>
                <div className="text-center flex-grow p-2 rounded-lg">
                  <span className="text-2xl font-bold text-red-600 block">
                    {match.enemyScore}
                  </span>
                  <span className="text-xs text-red-600">Enemy Score</span>
                </div>
              </div>

              <div
                className={`text-center py-2 rounded-lg font-semibold ${
                  match.status === "VICTORY"
                    ? "bg-green-600"
                    : match.status === "DEFEAT"
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}
              >
                {match.status}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-700"
            }`}
          >
            &lt;
          </button>
          <span className="px-4 py-2 bg-gray-700 text-white rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-700"
            }`}
          >
            &gt;
          </button>
        </div>

        {matches.length === 0 && (
          <div className="text-center py-4 text-gray-300">No matches found</div>
        )}
      </div>
    </div>
  );
}
